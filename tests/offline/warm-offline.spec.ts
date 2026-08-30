import { expect, test } from "../e2e/helpers";

test("a fully loaded production preview completes the local flow while offline", async ({ page, context }) => {
  await page.goto("/?demo=pack-error");
  await expect(page.getByRole("button", { name: "Start synthetic session" })).toBeEnabled();
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Start synthetic session" })).toBeEnabled();
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise<void>((resolve) => {
        navigator.serviceWorker.addEventListener("controllerchange", () => resolve(), { once: true });
      });
    }
  });
  await page.reload();
  await expect(page.getByRole("button", { name: "Start synthetic session" })).toBeEnabled();

  await context.setOffline(true);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.dispatchEvent(new Event("offline")));
  await expect(page.getByText(/Nothing will sync/)).toBeVisible();
  await page.getByRole("button", { name: "Start synthetic session" }).click();
  await page.getByText("I am not sure", { exact: true }).click();
  await page.getByRole("textbox", { name: /Field note/i }).fill("Synthetic note saved during warm offline mode.");
  await expect(page.getByRole("button", { name: "Save observation" })).toBeEnabled();
  await page.getByRole("button", { name: "Save observation" }).click();
  await expect(page.getByText(/saved in this browser/i).last()).toBeVisible();
  await page.getByRole("button", { name: "Review partial record" }).click();
  await expect(page.getByText("Synthetic note saved during warm offline mode.")).toBeVisible();

  const cacheAudit = await page.evaluate(async () => {
    const names = await caches.keys();
    const cacheEntries = (await Promise.all(names.map(async (name) => {
      const cache = await caches.open(name);
      const requests = await cache.keys();
      return Promise.all(requests.map(async (request) => ({
        url: request.url,
        body: await (await cache.match(request))?.clone().text(),
      })));
    }))).flat();
    return { names, cacheEntries };
  });
  expect(cacheAudit.names).toContain("osk-shell-2026-08-30-r2");
  expect(cacheAudit.cacheEntries.some((entry) => entry.url.includes("synthetic-session"))).toBe(false);
  expect(cacheAudit.cacheEntries.some((entry) => entry.body?.includes("Synthetic note saved during warm offline mode."))).toBe(false);
});
