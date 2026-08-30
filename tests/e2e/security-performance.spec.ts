import { expect, startFreshSession, test } from "./helpers";

test("runtime makes no external, tile, font, analytics, or model request", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.origin !== "http://127.0.0.1:4317") external.push(request.url());
  });
  await startFreshSession(page, "list-only");
  await page.getByRole("button", { name: "Data" }).click();
  await expect(page.getByText(/model adapter unavailable/i)).toBeVisible();
  expect(external).toEqual([]);
});

test("the SVG and DOM workflow does not require WebGL", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (contextId: string, ...args: unknown[]) {
      if (contextId === "webgl" || contextId === "webgl2") return null;
      return original.call(this, contextId as "2d", ...(args as []));
    };
  });
  await startFreshSession(page);
  await expect(page.locator(".map-geometry")).toBeVisible();
  await expect(page.locator(".anchor-row")).toHaveCount(6);
});

test("basic local rendering avoids long tasks after the first field screen", async ({ page }) => {
  await page.addInitScript(() => {
    (window as Window & { __longTasks?: number[] }).__longTasks = [];
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          (window as Window & { __longTasks?: number[] }).__longTasks?.push(entry.duration);
        }
      });
      try { observer.observe({ type: "longtask", buffered: true }); } catch { /* unsupported */ }
    }
  });
  await startFreshSession(page);
  await page.evaluate(() => {
    (window as Window & { __longTasks?: number[] }).__longTasks = [];
  });
  await page.locator(".anchor-row").filter({ hasText: "Rainline Court" }).click();
  await page.waitForTimeout(250);
  const longTasks = await page.evaluate(() => (window as Window & { __longTasks?: number[] }).__longTasks ?? []);
  expect(longTasks.filter((duration) => duration > 100)).toEqual([]);
});
