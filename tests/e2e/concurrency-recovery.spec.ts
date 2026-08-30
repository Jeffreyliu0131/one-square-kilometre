import { expect, setValidSyntheticClock, test } from "./helpers";

test("an idle second tab cannot overwrite a session and observes deletion", async ({ context }) => {
  const first = await context.newPage();
  const second = await context.newPage();
  await Promise.all([setValidSyntheticClock(first), setValidSyntheticClock(second)]);
  await Promise.all([first.goto("/?demo=fresh"), second.goto("/?demo=fresh")]);
  await Promise.all([
    expect(first.getByRole("button", { name: "Start synthetic session" })).toBeEnabled(),
    expect(second.getByRole("button", { name: "Start synthetic session" })).toBeEnabled(),
  ]);

  await first.getByRole("button", { name: "Start synthetic session" }).click();
  await expect(second.getByText(/Another tab changed this local session/)).toBeVisible();
  await expect(second.getByRole("button", { name: "Start synthetic session" })).toBeDisabled();

  await first.getByText("I found this anchor", { exact: true }).click();
  await first.getByRole("textbox", { name: /Field note/i }).fill("First tab exact synthetic note.");
  await first.getByRole("button", { name: "Save observation" }).click();
  await expect(first.getByText(/saved in this browser/i).last()).toBeVisible();

  const storedBeforeLoad = await first.evaluate(() => localStorage.getItem("osk.synthetic-session.v1"));
  expect(storedBeforeLoad).toContain("First tab exact synthetic note.");
  await second.getByRole("button", { name: "Load newer version" }).click();
  await expect(second.getByRole("textbox", { name: /Field note/i })).toHaveValue("First tab exact synthetic note.");

  await second.goto("/?demo=fresh");
  await expect(second.getByRole("textbox", { name: /Field note/i })).toHaveValue("First tab exact synthetic note.");
  expect(await second.evaluate(() => localStorage.getItem("osk.synthetic-session.v1"))).toContain("First tab exact synthetic note.");

  await first.getByRole("button", { name: "Data", exact: true }).click();
  await first.getByRole("button", { name: "Review deletion" }).click();
  await first.getByRole("button", { name: "Delete local data" }).click();
  await expect(first.getByText(/Local session deleted after storage verification/)).toBeVisible();
  await expect(second.getByText(/Another tab changed this local session/)).toBeVisible();
  await second.getByRole("button", { name: "Load newer version" }).click();
  await expect(second.getByRole("button", { name: "Start synthetic session" })).toBeVisible();
  expect(await second.evaluate(() => localStorage.getItem("osk.synthetic-session.v1"))).toBeNull();
});

test("fixture boot failure keeps a valid old release exportable without current recap metadata", async ({ page }) => {
  const oldEnvelope = {
    schemaVersion: "1.0.0",
    areaReleaseId: "synthetic-old-release-r0",
    contentFingerprint: "fixture:old-release:r0",
    savedAt: "2026-08-30T10:00:00.000Z",
    current: {
      phase: "field",
      selectedAnchorId: "old-anchor",
      checkins: { "old-anchor": "found" },
      notes: {
        "old-anchor": {
          id: "note-old-anchor",
          anchorId: "old-anchor",
          text: "Exact old-release synthetic note.",
          updatedAt: "2026-08-30T10:00:00.000Z",
          revision: 1,
        },
      },
      drafts: {},
      startedAt: "2026-08-30T09:55:00.000Z",
      stoppedAt: null,
      stopReason: null,
    },
    past: [],
  };
  const raw = JSON.stringify(oldEnvelope);

  await page.goto("/");
  await page.evaluate((value) => localStorage.setItem("osk.synthetic-session.v1", value), raw);
  await page.goto("/?demo=fixture-parse-error");
  await expect(page.getByRole("heading", { name: "The synthetic pack could not be read" })).toBeVisible();
  await page.getByRole("button", { name: "Data", exact: true }).click();
  await expect(page.getByText("Local data needs recovery")).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export local record" }).click();
  const download = await downloadPromise;
  const stream = await download.createReadStream();
  let content = "";
  for await (const chunk of stream) content += chunk.toString();
  const recovery = JSON.parse(content) as Record<string, unknown> & {
    recovery: boolean;
    session: typeof oldEnvelope;
    recapUnavailable: string;
  };
  expect(recovery.recovery).toBe(true);
  expect(recovery.session.current.notes["old-anchor"].text).toBe("Exact old-release synthetic note.");
  expect(recovery.recapUnavailable).toMatch(/No recap was generated/);
  expect(recovery).not.toHaveProperty("recap");
  expect(await page.evaluate(() => localStorage.getItem("osk.synthetic-session.v1"))).toBe(raw);

  await page.goto("/?demo=provenance-parse-error");
  await expect(page.getByRole("heading", { name: "The synthetic pack could not be read" })).toBeVisible();
  await page.getByRole("button", { name: "Data", exact: true }).click();
  await expect(page.getByText("Local data needs recovery")).toBeVisible();
  await expect(page.getByRole("button", { name: "Export local record" })).toBeEnabled();
  expect(await page.evaluate(() => localStorage.getItem("osk.synthetic-session.v1"))).toBe(raw);
});

test("an incompatible external value makes the old in-memory session read-only", async ({ context }) => {
  const first = await context.newPage();
  const second = await context.newPage();
  await Promise.all([setValidSyntheticClock(first), setValidSyntheticClock(second)]);
  await first.goto("/");
  await first.getByRole("button", { name: "Start synthetic session" }).click();
  await first.getByText("I found this anchor", { exact: true }).click();
  await first.getByRole("textbox", { name: /Field note/i }).fill("Old in-memory synthetic note.");
  await first.getByRole("button", { name: "Save observation" }).click();

  await second.goto("/");
  const incompatible = JSON.stringify({
    schemaVersion: "1.0.0",
    areaReleaseId: "synthetic-other-release-r9",
    contentFingerprint: "fnv1a32:00000000",
    savedAt: "2026-08-30T10:00:00.000Z",
    current: {
      phase: "overview",
      selectedAnchorId: null,
      checkins: {},
      notes: {},
      drafts: {},
      startedAt: null,
      stoppedAt: null,
      stopReason: null,
    },
    past: [],
  });
  await second.evaluate((raw) => localStorage.setItem("osk.synthetic-session.v1", raw), incompatible);

  await expect(first.getByText(/Another tab changed this local session/)).toBeVisible();
  await first.getByRole("button", { name: "Load newer version" }).click();
  await expect(first.getByText(/Editing is paused because browser storage is in recovery/).first()).toBeVisible();
  await expect(first.getByRole("textbox", { name: /Field note/i })).toBeDisabled();

  const retry = first.getByRole("button", { name: "Retry save" });
  if (await retry.isVisible()) await retry.click();
  expect(await first.evaluate(() => localStorage.getItem("osk.synthetic-session.v1"))).toBe(incompatible);

  await first.getByRole("button", { name: "Stop and exit" }).first().click();
  await first.getByRole("button", { name: "Stop this session" }).click();
  await expect(first.getByRole("heading", { name: "You stopped this session" })).toBeVisible();
  await expect(first.getByText("Stop was not saved locally")).toBeVisible();
  expect(await first.evaluate(() => localStorage.getItem("osk.synthetic-session.v1"))).toBe(incompatible);
});
