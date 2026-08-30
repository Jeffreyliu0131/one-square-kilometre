import { commitObservation, expect, test } from "./helpers";

test("captures a compact acceptance screenshot set", async ({ page }, testInfo) => {
  const mobile = testInfo.project.name.includes("mobile");
  await page.setViewportSize(mobile ? { width: 390, height: 844 } : { width: 1280, height: 720 });
  const prefix = mobile ? "mobile" : "desktop";
  const capture = async (name: string) => {
    await page.screenshot({
      path: `artifacts/screenshots/${prefix}-experience-${name}.png`,
      fullPage: false,
      scale: "css",
    });
  };

  await page.goto("/");
  await expect(page.getByRole("button", { name: "Start synthetic session" })).toBeEnabled();
  await capture("01-overview");

  await page.getByRole("button", { name: "Start synthetic session" }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await capture("02-field-map");

  await commitObservation(page, "Lantern Steps", "I found this anchor", "The lower edge leaves a wider clear strip beside me.");
  await commitObservation(page, "Rainline Court", "I am not sure", "The fixture does not show whether the cover is useful in wind.");
  await commitObservation(page, "Quiet Cut", "Skip this prompt");
  await commitObservation(page, "Canal Screen", "I found this anchor", "The perforated screen changes how enclosed the edge appears.");
  const saveCorrection = page.getByRole("button", { name: "Save correction" });
  await saveCorrection.evaluate((element) => element.scrollIntoView({ block: "center" }));
  if (mobile) {
    const geometry = await page.evaluate(() => {
      const save = document.querySelector(".prompt-actions .button")?.getBoundingClientRect();
      const tray = document.querySelector(".action-tray")?.getBoundingClientRect();
      return { saveBottom: save?.bottom ?? Infinity, trayTop: tray?.top ?? -Infinity };
    });
    expect(geometry.saveBottom).toBeLessThanOrEqual(geometry.trayTop);
  }
  await capture("03-field-prompt");

  await page.locator(".anchor-row").filter({ hasText: "North Shelter" }).click();
  await page.getByText("This anchor is stale", { exact: true }).scrollIntoViewIfNeeded();
  await expect(page.getByRole("textbox", { name: /Field note/i })).toHaveCount(0);
  if (mobile) {
    const trayButtons = await page.locator(".action-tray .button").evaluateAll((buttons) =>
      buttons.map((button) => {
        const rect = button.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom, height: rect.height };
      }),
    );
    for (const rect of trayButtons) {
      expect(rect.top).toBeGreaterThanOrEqual(0);
      expect(rect.bottom).toBeLessThanOrEqual(844);
      expect(rect.height).toBeGreaterThanOrEqual(44);
    }
  }
  await capture("04-fail-closed");

  await page.getByRole("button", { name: "Review complete record" }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await capture("05-recap");
  await page.locator(".record-entry").first().evaluate((element) => element.scrollIntoView({ block: "center" }));
  await capture("05b-recap-evidence");

  await page.getByRole("button", { name: "Data and deletion" }).click();
  await capture("06-data-boundary");
  await page.getByRole("heading", { name: "Export and delete" }).evaluate((element) =>
    element.scrollIntoView({ block: "start" }),
  );
  await capture("06b-data-rights");
  await page.getByRole("button", { name: "Close data and limits" }).click();

  await page.getByRole("button", { name: "Correct record" }).first().click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await capture("07-correction");
  await page.locator(".correction-actions").evaluate((element) =>
    element.scrollIntoView({ block: "end" }),
  );
  await capture("07b-correction-actions");
  await page.getByRole("button", { name: "Return to recap" }).click();
  await page.getByRole("button", { name: "Back to anchors" }).click();
  await page.getByRole("button", { name: "Stop and exit" }).filter({ visible: true }).click();
  await capture("08-stop-and-exit");
});
