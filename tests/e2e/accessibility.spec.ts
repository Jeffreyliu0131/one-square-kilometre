import AxeBuilder from "@axe-core/playwright";
import { commitObservation, expect, startFreshSession, test } from "./helpers";

async function expectNoAxeViolations(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations, results.violations.map((item) => `${item.id}: ${item.help}`).join("\n")).toEqual([]);
}

test("overview, field, recap, and data dialog have no automated WCAG A or AA violations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Start synthetic session" })).toBeEnabled();
  await expectNoAxeViolations(page);

  await page.getByRole("button", { name: "Start synthetic session" }).click();
  await expectNoAxeViolations(page);
  await commitObservation(page, "Lantern Steps", "I found this anchor", "A short synthetic note.");
  await page.getByRole("button", { name: "Review partial record" }).click();
  await expectNoAxeViolations(page);
  await page.getByRole("button", { name: "Data", exact: true }).click();
  await expectNoAxeViolations(page);
});

test("keyboard focus reaches the selected prompt and dialog returns focus", async ({ page }) => {
  await startFreshSession(page);
  const rainline = page.locator(".anchor-row").filter({ hasText: "Rainline Court" });
  await rainline.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Rainline Court", level: 2 })).toBeFocused();

  const dataButton = page.getByRole("button", { name: "Data" });
  await dataButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Data and limits" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dataButton).toBeFocused();
});

test("keyboard activation covers record, review, correction, undo, and data", async ({ page }) => {
  await page.goto("/");
  const start = page.getByRole("button", { name: "Start synthetic session" });
  await start.focus();
  await start.press("Space");
  await expect(page.getByRole("heading", { name: "Observe the pause conditions" })).toBeVisible();

  const found = page.getByRole("radio", { name: /I found this anchor/i });
  await found.focus();
  await found.press("Space");
  await expect(found).toBeChecked();
  const note = page.getByRole("textbox", { name: /Field note/i });
  await note.focus();
  await page.keyboard.type("Keyboard-only synthetic note.");
  const save = page.getByRole("button", { name: "Save observation" });
  await save.focus();
  await save.press("Space");
  await expect(page.locator(".anchor-row").filter({ hasText: "Lantern Steps" })).toContainText("Participant reported found");

  const review = page.getByRole("button", { name: "Review partial record" });
  await review.focus();
  await review.press("Space");
  await expect(page.getByRole("heading", { name: "Evidence-linked recap" })).toBeVisible();
  const correct = page.getByRole("button", { name: "Correct record" });
  await correct.focus();
  await correct.press("Space");
  await expect(page.getByRole("heading", { name: "Correct a saved record" })).toBeVisible();
  const unsure = page.getByRole("radio", { name: /I am not sure/i });
  await unsure.focus();
  await unsure.press("Space");
  await expect(unsure).toBeChecked();
  await expect(page.getByText(/Draft saved in this browser/i)).toBeVisible();
  const correction = page.getByRole("button", { name: "Save correction" });
  await correction.focus();
  await correction.press("Space");
  await expect(page.getByText(/Observation saved in this browser, revision 2/i)).toBeVisible();
  const undo = page.getByRole("button", { name: "Undo last change" });
  await undo.focus();
  await undo.press("Space");
  await expect(found).toBeChecked();

  const returnToRecap = page.getByRole("button", { name: "Return to recap" });
  await returnToRecap.focus();
  await returnToRecap.press("Space");
  await expect(page.getByRole("heading", { name: "Evidence-linked recap" })).toBeVisible();
  const data = page.getByRole("button", { name: "Data", exact: true });
  await data.focus();
  await data.press("Space");
  await expect(page.getByRole("heading", { name: "Data and limits" })).toBeVisible();
  const reviewDeletion = page.getByRole("button", { name: "Review deletion" });
  await reviewDeletion.press("Space");
  await expect(page.getByRole("button", { name: "Cancel" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(data).toBeFocused();

  const backToAnchors = page.getByRole("button", { name: "Back to anchors" });
  await backToAnchors.focus();
  await backToAnchors.press("Space");
  await expect(page.getByRole("heading", { name: "Observe the pause conditions" })).toBeVisible();
});

test("keyboard activates the visible Stop action", async ({ page }) => {
  await startFreshSession(page);
  const stop = page.getByRole("button", { name: "Stop and exit" }).filter({ visible: true });
  await stop.scrollIntoViewIfNeeded();
  await stop.focus();
  await expect(stop).toBeFocused();
  await stop.press("Space");
  await expect(page.getByRole("heading", { name: "Stop and exit" })).toBeVisible();
  const returnTask = page.getByRole("button", { name: "Return to task" });
  await returnTask.focus();
  await returnTask.press("Space");
  await expect(page.getByRole("heading", { name: "Observe the pause conditions" })).toBeVisible();
});

test("reduced motion and 320px viewport keep the flow operable without horizontal overflow", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 720 });
  await startFreshSession(page, "list-only");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await expect(page.getByRole("button", { name: "Stop and exit" }).last()).toBeVisible();
});

test("failure, blocked, stopped, and destructive states have no automated A or AA violations", async ({ page }) => {
  await page.goto("/?demo=pack-error");
  await expect(page.getByRole("heading", { name: "The synthetic pack could not be read" })).toBeVisible();
  await expectNoAxeViolations(page);

  await page.goto("/?demo=empty");
  await expect(page.getByRole("heading", { name: "No prompts are available" })).toBeVisible();
  await expectNoAxeViolations(page);

  await startFreshSession(page);
  await page.locator(".anchor-row").filter({ hasText: "North Shelter" }).click();
  await expectNoAxeViolations(page);
  await page.locator(".anchor-row").filter({ hasText: "Reed Bridge" }).click();
  await expectNoAxeViolations(page);

  await page.getByRole("button", { name: "Stop and exit" }).first().click();
  await expectNoAxeViolations(page);
  await page.getByRole("button", { name: "Stop this session" }).click();
  await expectNoAxeViolations(page);

  await page.getByRole("button", { name: "Data", exact: true }).click();
  await page.getByRole("button", { name: "Review deletion" }).click();
  await expectNoAxeViolations(page);
});

test("recovery and local-action error states have no automated A or AA violations", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.setItem("osk.synthetic-session.v1", "{corrupt"));
  await page.reload();
  await expect(page.getByText("Local storage is unavailable")).toBeVisible();
  await page.getByRole("button", { name: /View data and limits|Open data and recovery/ }).click();
  await expectNoAxeViolations(page);
  await page.evaluate(() => localStorage.removeItem("osk.synthetic-session.v1"));

  await page.goto("/?demo=storage-error");
  await page.getByRole("button", { name: "Start synthetic session" }).click();
  await page.getByText("I found this anchor", { exact: true }).click();
  await expect(page.getByText("Not saved to browser storage")).toBeVisible();
  await expectNoAxeViolations(page);

  await page.goto("/?demo=delete-error");
  await page.getByRole("button", { name: "Data", exact: true }).click();
  await page.getByRole("button", { name: "Review deletion" }).click();
  await page.getByRole("button", { name: "Delete local data" }).click();
  await expect(page.getByText(/Deletion was not completed/)).toBeVisible();
  await expectNoAxeViolations(page);
});

test("dark theme keeps overview and field within the automated contrast baseline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Start synthetic session" })).toBeEnabled();
  await page.getByRole("button", { name: "Use dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expectNoAxeViolations(page);
  await page.getByRole("button", { name: "Start synthetic session" }).click();
  await expectNoAxeViolations(page);
});
