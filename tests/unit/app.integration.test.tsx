import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "../../src/App";
import { STORAGE_KEY } from "../../src/lib/storage";

describe("application vertical slice", () => {
  it("records a manual observation and renders an evidence-linked recap", async () => {
    window.history.replaceState({}, "", "/");
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole("button", { name: /Start synthetic session/i }));
    expect(await screen.findByRole("heading", { name: "Observe the pause conditions" })).toBeVisible();

    await user.click(screen.getByText("I found this anchor"));
    const note = screen.getByRole("textbox", { name: /Field note/i });
    await user.type(note, "The lower edge has more room beside it.");
    await waitFor(() => expect(screen.getByRole("button", { name: "Save observation" })).toBeEnabled());
    await user.click(screen.getByRole("button", { name: "Save observation" }));
    await screen.findByText(/Observation saved in this browser/);

    await user.click(screen.getByRole("button", { name: "Review partial record" }));
    expect(await screen.findByRole("heading", { name: "Evidence-linked recap" })).toBeVisible();
    expect(screen.getByText("The lower edge has more room beside it.")).toBeVisible();
    expect(screen.getByRole("heading", { name: "What this recap will not claim" })).toBeVisible();
    expect(screen.getByText(/deterministic preview/i)).toBeVisible();
  });

  it("shows stale and unsupported anchors as read-only failure states", async () => {
    window.history.replaceState({}, "", "/?demo=list-only");
    const user = userEvent.setup();
    render(<App />);
    await user.click(await screen.findByRole("button", { name: /Start synthetic session/i }));

    await user.click(screen.getByRole("button", { name: /North Shelter/i }));
    expect(screen.getByText("This anchor is stale")).toBeVisible();
    expect(screen.queryByRole("textbox", { name: /Field note/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Reed Bridge/i }));
    expect(screen.getByText("This anchor is not supported")).toBeVisible();
    expect(screen.getByText(/no alternative route claim/i)).toBeVisible();
    expect(screen.getByText("Map layer unavailable")).toBeVisible();
  });

  it("fails closed before start when local storage preflight is unavailable", async () => {
    window.history.replaceState({}, "", "/?demo=storage-preflight-error");
    render(<App />);

    expect(await screen.findByText("Local storage is unavailable")).toBeVisible();
    expect(screen.getByRole("button", { name: /Start synthetic session/i })).toBeDisabled();
    expect(screen.getByText(/volatile session will not be started/i)).toBeVisible();
  });

  it("blocks overwrite of corrupt local data while keeping verified delete available", async () => {
    window.localStorage.setItem(STORAGE_KEY, "{corrupt");
    const user = userEvent.setup();
    render(<App />);

    expect(await screen.findByText("Local storage is unavailable")).toBeVisible();
    expect(screen.getByRole("button", { name: /Start synthetic session/i })).toBeDisabled();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("{corrupt");

    await user.click(screen.getByRole("button", { name: "Data" }));
    expect(screen.getByText("Local data needs recovery")).toBeVisible();
    expect(screen.getByRole("button", { name: "Review deletion" })).toBeEnabled();
  });

  it("routes a shape-valid but unreachable stopped lifecycle into recovery", async () => {
    const invalidLifecycle = {
      schemaVersion: "1.0.0",
      areaReleaseId: "synthetic-marshline-commons-r2",
      contentFingerprint: "fnv1a32:0dbad542",
      savedAt: "2026-08-30T10:00:00.000Z",
      current: {
        phase: "stopped",
        selectedAnchorId: "lantern-steps",
        checkins: {},
        notes: {},
        drafts: {},
        startedAt: "2026-08-30T09:55:00.000Z",
        stoppedAt: null,
        stopReason: null,
      },
      past: [],
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(invalidLifecycle));
    const user = userEvent.setup();
    render(<App />);

    expect(await screen.findByText("Local storage is unavailable")).toBeVisible();
    expect(screen.getByRole("button", { name: /Start synthetic session/i })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Data" }));
    expect(screen.getAllByText(/failed manifest integrity checks/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Export local record" })).toBeEnabled();
  });

  it("rejects recap history that could make Undo jump outside the active field lifecycle", async () => {
    const fieldSnapshot = {
      phase: "field",
      selectedAnchorId: "lantern-steps",
      checkins: {},
      notes: {},
      drafts: {},
      startedAt: "2026-08-30T09:55:00.000Z",
      stoppedAt: null,
      stopReason: null,
    };
    const invalidHistory = {
      schemaVersion: "1.0.0",
      areaReleaseId: "synthetic-marshline-commons-r2",
      contentFingerprint: "fnv1a32:0dbad542",
      savedAt: "2026-08-30T10:00:00.000Z",
      current: fieldSnapshot,
      past: [{ ...fieldSnapshot, phase: "recap" }],
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(invalidHistory));
    render(<App />);

    expect(await screen.findByText("Local storage is unavailable")).toBeVisible();
    expect(screen.getByRole("button", { name: /Start synthetic session/i })).toBeDisabled();
    expect(screen.queryByRole("button", { name: "Undo last change" })).not.toBeInTheDocument();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(invalidHistory));
  });
});
