import { expect, test as base, type Page } from "@playwright/test";

export const VALID_SYNTHETIC_TIME = "2026-08-30T12:00:00+08:00";

export async function setValidSyntheticClock(page: Page) {
  await page.clock.setFixedTime(new Date(VALID_SYNTHETIC_TIME));
}

export const test = base.extend<{ syntheticClock: void }>({
  syntheticClock: [
    async ({ page }, use) => {
      await setValidSyntheticClock(page);
      await use();
    },
    { auto: true },
  ],
});

export { expect };

export async function startFreshSession(page: Page, extraModes = "") {
  await page.goto(extraModes ? `/?demo=${extraModes}` : "/");
  await page.getByRole("button", { name: "Start synthetic session" }).click();
  await expect(page.getByRole("heading", { name: "Observe the pause conditions" })).toBeVisible();
}

export async function selectAnchor(page: Page, name: string) {
  const row = page.locator(".anchor-row").filter({ hasText: name });
  if ((await row.getAttribute("aria-current")) !== "step") await row.click();
  await expect(page.getByRole("heading", { name, level: 2 })).toBeFocused();
}

export async function commitObservation(
  page: Page,
  anchorName: string,
  statusLabel: "I found this anchor" | "I am not sure" | "Skip this prompt",
  note = "",
) {
  await selectAnchor(page, anchorName);
  await page.getByText(statusLabel, { exact: true }).click();
  if (note) await page.getByRole("textbox", { name: /Field note/i }).fill(note);
  const save = page.getByRole("button", { name: /Save observation|Save correction/i });
  await expect(save).toBeEnabled();
  await save.click();
  const expectedState = statusLabel === "I found this anchor"
    ? "Participant reported found"
    : statusLabel === "I am not sure"
      ? "Unsure"
      : "Skipped";
  await expect(page.locator(".anchor-row").filter({ hasText: anchorName })).toContainText(expectedState);
}
