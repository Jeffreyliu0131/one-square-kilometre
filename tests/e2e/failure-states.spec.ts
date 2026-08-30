import { commitObservation, expect, startFreshSession, test } from "./helpers";

test("list-only and offline modes retain the complete protocol", async ({ page }) => {
  await startFreshSession(page, "list-only,offline");
  await expect(page.getByText("Map layer unavailable")).toBeVisible();
  await expect(page.getByText(/Nothing will sync/)).toBeVisible();
  await commitObservation(page, "Lantern Steps", "I am not sure", "Offline synthetic note.");
  await page.goto("/?demo=list-only,offline");
  await expect(page.getByRole("textbox", { name: /Field note/i })).toHaveValue("Offline synthetic note.");
});

test("stale and unsupported fixtures fail closed at the anchor", async ({ page }) => {
  await startFreshSession(page);
  await page.locator(".anchor-row").filter({ hasText: "North Shelter" }).click();
  await expect(page.getByText("This anchor is stale", { exact: true })).toBeVisible();
  await expect(page.getByRole("textbox", { name: /Field note/i })).toHaveCount(0);
  await page.locator(".anchor-row").filter({ hasText: "Reed Bridge" }).click();
  await expect(page.getByText("This anchor is not supported", { exact: true })).toBeVisible();
  await expect(page.getByText(/No conclusion supported/)).toBeVisible();
});

test("storage preflight, pack error, and empty pack are visible and recoverable", async ({ page }) => {
  await page.goto("/?demo=storage-preflight-error");
  await expect(page.getByText("Local storage is unavailable")).toBeVisible();
  await expect(page.getByRole("button", { name: "Start synthetic session" })).toBeDisabled();

  await page.goto("/?demo=pack-error");
  await expect(page.getByRole("heading", { name: "The synthetic pack could not be read" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open data and recovery" })).toBeVisible();
  await page.getByRole("button", { name: "Retry bundled fixture" }).click();
  await expect(page.getByRole("button", { name: "Start synthetic session" })).toBeEnabled();

  await page.goto("/?demo=empty");
  await expect(page.getByRole("heading", { name: "No prompts are available" })).toBeVisible();
});

test("actual clock expiry blocks start and a newly expired anchor becomes read-only", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2030-08-30T23:59:58+08:00"));
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Start synthetic session" })).toBeEnabled();
  await page.clock.setFixedTime(new Date("2030-08-31T00:00:00+08:00"));
  await page.getByRole("button", { name: "Start synthetic session" }).click();
  await expect(page.getByText("This pack is out of date")).toBeVisible();
  await expect(page.getByRole("button", { name: "Start synthetic session" })).toBeDisabled();

  await page.clock.setFixedTime(new Date("2026-08-30T12:00:00+08:00"));
  await page.reload();
  await page.getByRole("button", { name: "Start synthetic session" }).click();
  await page.clock.setFixedTime(new Date("2030-08-31T00:00:00+08:00"));
  await page.locator(".anchor-row").filter({ hasText: "Rainline Court" }).click();
  await expect(page.getByText("This anchor is outside its verified window")).toBeVisible();
  await expect(page.getByRole("textbox", { name: /Field note/i })).toHaveCount(0);
});

test("a session crossing expiry keeps exact user text but abstains and exports recovery", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-08-30T12:00:00+08:00"));
  await startFreshSession(page);
  await page.getByText("I found this anchor", { exact: true }).click();
  await page.getByRole("textbox", { name: /Field note/i }).fill("Pre-expiry exact synthetic note.");
  await page.getByRole("button", { name: "Save observation" }).click();
  await page.clock.setFixedTime(new Date("2030-08-31T00:00:00+08:00"));
  await page.getByRole("button", { name: "Review partial record" }).click();
  await expect(page.getByText("Pre-expiry exact synthetic note.")).toBeVisible();
  await expect(page.getByText(/Fixture metadata expired on 2030-08-30/).first()).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export JSON" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toContain("recovery");
  await expect(page.getByText(/Temporal recovery export created/)).toBeVisible();
});

test("expiry blocks Undo from mutating the durable record", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-08-30T12:00:00+08:00"));
  await startFreshSession(page);
  await commitObservation(page, "Lantern Steps", "I found this anchor", "Durable pre-expiry note.");
  const before = await page.evaluate(() => localStorage.getItem("osk.synthetic-session.v1"));

  await page.clock.setFixedTime(new Date("2030-08-31T00:00:00+08:00"));
  await page.getByRole("button", { name: "Undo last change" }).click();
  await expect(page.getByText(/Undo is unavailable because this fixture pack is outside its valid window/)).toBeVisible();
  await expect(page.locator(".anchor-row").filter({ hasText: "Lantern Steps" })).toContainText("Expired fixture");
  expect(await page.evaluate(() => localStorage.getItem("osk.synthetic-session.v1"))).toBe(before);
});

test("an open recap re-evaluates itself when the fixture crosses expiry", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2030-08-30T23:59:30+08:00"));
  await page.goto("/");
  await page.getByRole("button", { name: "Start synthetic session" }).click();
  await expect(page.getByRole("heading", { name: "Observe the pause conditions" })).toBeVisible();
  await commitObservation(page, "Lantern Steps", "I found this anchor", "Exact note across the boundary.");
  await page.getByRole("button", { name: "Review partial record" }).click();
  await expect(page.getByText(/Synthetic fixture metadata dated 2026-08-30/).first()).toBeVisible();

  await page.clock.setFixedTime(new Date("2030-08-31T00:00:00+08:00"));
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(page.getByText(/Fixture metadata expired on 2030-08-30/).first()).toBeVisible();
  await expect(page.getByText("Exact note across the boundary.")).toBeVisible();
});

test("a failed commit keeps the prior durable projection and blocks export", async ({ page }) => {
  await startFreshSession(page, "storage-error");
  await page.getByText("I found this anchor", { exact: true }).click();
  await page.getByRole("textbox", { name: /Field note/i }).fill("This draft must remain visible.");
  await expect(page.getByText("Not saved to browser storage")).toBeVisible();
  await page.getByRole("button", { name: "Save observation" }).click();
  await expect(page.getByText(/earlier committed record is unchanged/i).first()).toBeVisible();
  await expect(page.getByText("0 of 4")).toBeVisible();
  await expect(page.getByRole("button", { name: "Review partial record" })).toBeDisabled();
});

test("stop is one visible step away and remains terminal", async ({ page }) => {
  await startFreshSession(page);
  await commitObservation(page, "Lantern Steps", "I found this anchor", "Stopped-session synthetic note.");
  await page.getByRole("button", { name: "Stop and exit" }).first().click();
  await expect(page.getByRole("heading", { name: "Stop and exit" })).toBeVisible();
  await expect(page.getByText(/Stopping is allowed and has no penalty/)).toBeVisible();
  await page.getByRole("button", { name: "Stop this session" }).click();
  await expect(page.getByRole("heading", { name: "You stopped this session" })).toBeVisible();
  await expect(page.getByText(/Partial record kept locally/)).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "You stopped this session" })).toBeVisible();
  await page.getByRole("button", { name: "Review partial record" }).click();
  await expect(page.getByRole("heading", { name: "Partial record" })).toBeVisible();
  await page.getByRole("button", { name: "Correct record" }).click();
  await expect(page.getByRole("heading", { name: "Correct a saved record" })).toBeVisible();
  await expect(page.getByText(/stopped session stays stopped/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Stop and exit" })).toHaveCount(0);
  await page.getByRole("textbox", { name: /Field note/i }).fill("Corrected after stop without resuming.");
  await page.getByRole("button", { name: "Save correction" }).click();
  await page.getByRole("button", { name: "Return to recap" }).click();
  await expect(page.getByText("Corrected after stop without resuming.")).toBeVisible();
  await page.getByRole("button", { name: "Back to stopped session" }).click();
  await expect(page.getByRole("heading", { name: "You stopped this session" })).toBeVisible();
});

test("stop remains immediate but reports a non-durable stop write honestly", async ({ page }) => {
  await startFreshSession(page, "storage-error");
  await page.getByRole("button", { name: "Stop and exit" }).first().click();
  await page.getByRole("button", { name: "Stop this session" }).click();
  await expect(page.getByRole("heading", { name: "You stopped this session" })).toBeVisible();
  await expect(page.getByText(/Session stopped in this tab/)).toBeVisible();
  await expect(page.getByText("Stop was not saved locally")).toBeVisible();
  await expect(page.getByText(/Partial record kept locally/)).toHaveCount(0);
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export JSON" }).click();
  const recoveryDownload = await downloadPromise;
  expect(recoveryDownload.suggestedFilename()).toContain("recovery");
});

test("an active correction can stop without returning to the field screen", async ({ page }) => {
  await startFreshSession(page);
  await commitObservation(page, "Lantern Steps", "I found this anchor", "Correction-stop synthetic note.");
  await page.getByRole("button", { name: "Review partial record" }).click();
  await page.getByRole("button", { name: "Correct record" }).click();
  await expect(page.getByRole("heading", { name: "Correct a saved record" })).toBeVisible();

  await page.getByRole("button", { name: "Stop and exit" }).filter({ visible: true }).click();
  await page.getByRole("button", { name: "Stop this session" }).click();
  await expect(page.getByRole("heading", { name: "You stopped this session" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "You stopped this session" })).toBeVisible();
});

test("hard delete clears the namespaced session and survives reload", async ({ page }) => {
  await startFreshSession(page);
  await commitObservation(page, "Lantern Steps", "I found this anchor", "Delete fixture note.");
  await page.getByRole("button", { name: "Data" }).click();
  await page.getByRole("button", { name: "Review deletion" }).click();
  await expect(page.getByRole("button", { name: "Cancel" })).toBeFocused();
  await page.getByRole("button", { name: "Delete local data" }).click();
  await expect(page.getByText(/Local session deleted after storage verification/)).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("osk.synthetic-session.v1"))).toBeNull();
  await page.getByRole("button", { name: "Close data and limits" }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: "Start synthetic session" })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("osk.synthetic-session.v1"))).toBeNull();
});
