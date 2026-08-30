import { commitObservation, expect, startFreshSession, test } from "./helpers";

test("manual field protocol reaches a deterministic evidence recap", async ({ page }, testInfo) => {
  await startFreshSession(page);
  await commitObservation(page, "Lantern Steps", "I found this anchor", "The lower edge leaves a wider clear strip beside me.");
  await commitObservation(page, "Rainline Court", "I am not sure", "The fixture does not show whether the cover is useful in wind.");
  await commitObservation(page, "Quiet Cut", "Skip this prompt");
  await commitObservation(page, "Canal Screen", "I found this anchor", "The perforated screen changes how enclosed the edge appears.");

  await expect(page.getByText("4 of 4")).toBeVisible();
  await page.screenshot({
    path: `artifacts/screenshots/${testInfo.project.name}-field.png`,
    fullPage: true,
  });

  await page.getByRole("button", { name: "Review complete record" }).click();
  await expect(page.getByRole("heading", { name: "Evidence-linked recap" })).toBeVisible();
  await expect(page.getByText("The lower edge leaves a wider clear strip beside me.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "What the synthetic pack supplies" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What this recap will not claim" })).toBeVisible();
  await expect(page.getByText(/48 hours/)).toBeVisible();
  await expect(page.getByText(/not field evidence/i)).toBeVisible();
  await expect(page.getByText("Unrecorded")).toBeVisible();
  await expect(page.locator(".recap-counts").getByText("0", { exact: true })).toBeVisible();
  await expect(page.getByText(/2 fail-closed examples are inspection-only/i)).toBeVisible();

  await page.screenshot({
    path: `artifacts/screenshots/${testInfo.project.name}-recap.png`,
    fullPage: true,
  });
});

test("a saved record can be corrected and the prior version restored with undo", async ({ page }) => {
  await startFreshSession(page);
  await commitObservation(page, "Lantern Steps", "I found this anchor", "First synthetic note.");
  await page.getByRole("button", { name: "Review partial record" }).click();
  await page.getByRole("button", { name: "Correct record" }).click();
  await expect(page.getByRole("heading", { name: "Correct a saved record" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Lantern Steps", level: 2 })).toBeFocused();
  await page.getByText("I am not sure", { exact: true }).click();
  await page.getByRole("textbox", { name: /Field note/i }).fill("Corrected synthetic note.");
  await page.getByRole("button", { name: "Save correction" }).click();
  await expect(page.getByText(/revision 2/i)).toBeVisible();

  await page.getByRole("button", { name: "Undo last change" }).click();
  await expect(page.getByRole("textbox", { name: /Field note/i })).toHaveValue("First synthetic note.");
  await expect(page.getByRole("radio", { name: /I found this anchor/i })).toBeChecked();
  await page.getByRole("button", { name: "Return to recap" }).click();
  await expect(page.getByRole("heading", { name: "Evidence-linked recap" })).toBeVisible();
});

test("JSON export contains synthetic provenance and explicit exclusions", async ({ page }) => {
  await startFreshSession(page);
  await commitObservation(page, "Lantern Steps", "I found this anchor", "Export fixture note.");
  await page.getByRole("button", { name: "Review partial record" }).click();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export JSON" }).click();
  const download = await downloadPromise;
  const stream = await download.createReadStream();
  let content = "";
  for await (const chunk of stream) content += chunk.toString();
  const payload = JSON.parse(content) as {
    nonAuthoritative: boolean;
    provenance: { containsRealLocations: boolean; containsPersonalData: boolean };
    exclusions: string[];
  };

  expect(payload.nonAuthoritative).toBe(true);
  expect(payload.provenance.containsRealLocations).toBe(false);
  expect(payload.provenance.containsPersonalData).toBe(false);
  expect(payload.exclusions).toContain("No real location data");
  await expect(page.getByText(/Downloads are outside this demo's control/)).toBeVisible();
});

test("Undo preserves an unrelated newer durable draft", async ({ page }) => {
  await startFreshSession(page);
  await page.locator(".anchor-row").filter({ hasText: "Rainline Court" }).click();
  await page.getByText("I am not sure", { exact: true }).click();
  await page.getByRole("textbox", { name: /Field note/i }).fill("Old B draft");
  await expect(page.getByText(/Draft saved in this browser/i)).toBeVisible();

  await commitObservation(page, "Lantern Steps", "I found this anchor", "Committed A note.");
  await page.locator(".anchor-row").filter({ hasText: "Rainline Court" }).click();
  await page.getByRole("textbox", { name: /Field note/i }).fill("New B draft");
  await expect(page.getByRole("textbox", { name: /Field note/i })).toHaveValue("New B draft");
  await expect(page.getByText(/Draft saved in this browser/i)).toBeVisible();

  await page.getByRole("button", { name: "Undo last change" }).click();
  await expect(page.getByRole("textbox", { name: /Field note/i })).toHaveValue("New B draft");
  await expect(page.locator(".anchor-row").filter({ hasText: "Lantern Steps" })).toContainText("Not recorded");
});
