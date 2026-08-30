import { describe, expect, it } from "vitest";
import areaFixture from "../../src/fixtures/area-manifest.json";
import {
  areRouteAnchorsTemporallyUsable,
  deriveManifestTemporalEligibility,
  isAnchorTemporallyUsable,
} from "../../src/domain/eligibility";
import { validatePersistedSessionForManifest } from "../../src/domain/invariants";
import { areaManifestSchema } from "../../src/domain/schema";
import {
  initialSessionState,
  persistedSessionSchema,
  sessionReducer,
  toPersistedSession,
} from "../../src/domain/session";

const manifest = areaManifestSchema.parse(areaFixture);

function validPersistedSession() {
  const state = sessionReducer(initialSessionState, {
    type: "START",
    firstAnchorId: "lantern-steps",
    now: "2026-08-30T10:00:00.000Z",
  });
  return toPersistedSession(
    state,
    manifest.releaseId,
    manifest.contentFingerprint,
    "2026-08-30T10:01:00.000Z",
  );
}

describe("time and manifest-bound session integrity", () => {
  it("derives ready, review-due, and expired from an injected clock", () => {
    expect(deriveManifestTemporalEligibility(manifest, new Date("2026-08-30T12:00:00+08:00"))).toBe("ready");
    expect(deriveManifestTemporalEligibility(manifest, new Date("2028-08-30T09:00:00+08:00"))).toBe("review-due");
    expect(deriveManifestTemporalEligibility(manifest, new Date("2030-08-30T23:59:59+08:00"))).toBe("expired");

    const lantern = manifest.anchors.find((anchor) => anchor.id === "lantern-steps")!;
    expect(isAnchorTemporallyUsable(lantern, new Date("2030-08-30T23:59:58+08:00"))).toBe(true);
    expect(isAnchorTemporallyUsable(lantern, new Date("2030-08-30T23:59:59+08:00"))).toBe(false);
  });

  it("blocks a new route when one active anchor expires before the pack", () => {
    const routeWithEarlyExpiry = structuredClone(manifest);
    const firstRouteAnchor = routeWithEarlyExpiry.anchors.find(
      (anchor) => anchor.id === routeWithEarlyExpiry.route.anchorIds[0],
    )!;
    firstRouteAnchor.expiresAt = "2026-08-29T23:59:59+08:00";

    const now = new Date("2026-08-30T12:00:00+08:00");
    expect(deriveManifestTemporalEligibility(routeWithEarlyExpiry, now)).toBe("ready");
    expect(areRouteAnchorsTemporallyUsable(routeWithEarlyExpiry, now)).toBe(false);
  });

  it("rejects unknown selected, record, and retained-history references", () => {
    const persisted = validPersistedSession();
    persisted.current.selectedAnchorId = "unknown-anchor";
    persisted.current.notes["lantern-steps"] = {
      id: "note-mismatch",
      anchorId: "rainline-court",
      text: "Synthetic mismatch",
      updatedAt: "2026-08-30T10:00:00.000Z",
      revision: 1,
    };
    persisted.past.push({
      ...structuredClone(persisted.current),
      selectedAnchorId: "another-unknown",
    });

    const issues = validatePersistedSessionForManifest(persisted, manifest);
    expect(issues).toEqual(expect.arrayContaining([
      expect.stringContaining("unknown anchor"),
      expect.stringContaining("does not match note.anchorId"),
      expect.stringContaining("past[0]"),
    ]));
  });

  it("rejects a changed content fingerprint and strict forward fields", () => {
    const persisted = validPersistedSession();
    persisted.contentFingerprint = "different-fixture";
    expect(validatePersistedSessionForManifest(persisted, manifest)[0]).toMatch(/fingerprint/);

    const withForwardField = { ...validPersistedSession(), futureField: true };
    expect(persistedSessionSchema.safeParse(withForwardField).success).toBe(false);
  });

  it("rejects unreachable lifecycle combinations in current and retained snapshots", () => {
    const stoppedWithoutStopData = validPersistedSession();
    stoppedWithoutStopData.current.phase = "stopped";
    expect(validatePersistedSessionForManifest(stoppedWithoutStopData, manifest)).toEqual(
      expect.arrayContaining([expect.stringContaining("stopped state lacks")]),
    );

    const fieldWithoutStart = validPersistedSession();
    fieldWithoutStart.current.startedAt = null;
    expect(validatePersistedSessionForManifest(fieldWithoutStart, manifest)).toEqual(
      expect.arrayContaining([expect.stringContaining("has no startedAt")]),
    );

    const mismatchedStopPair = validPersistedSession();
    mismatchedStopPair.current.phase = "recap";
    mismatchedStopPair.current.stoppedAt = "2026-08-30T10:05:00.000Z";
    mismatchedStopPair.current.stopReason = null;
    expect(validatePersistedSessionForManifest(mismatchedStopPair, manifest)).toEqual(
      expect.arrayContaining([expect.stringContaining("must be present together")]),
    );

    const invalidHistory = validPersistedSession();
    invalidHistory.past.push({
      ...structuredClone(invalidHistory.current),
      phase: "recap",
    });
    expect(validatePersistedSessionForManifest(invalidHistory, manifest)).toEqual(
      expect.arrayContaining([expect.stringContaining("must be a field or correction snapshot")]),
    );

    const overviewWithHistory = validPersistedSession();
    overviewWithHistory.past.push(structuredClone(overviewWithHistory.current));
    overviewWithHistory.current = {
      phase: "overview",
      selectedAnchorId: null,
      checkins: {},
      notes: {},
      drafts: {},
      startedAt: null,
      stoppedAt: null,
      stopReason: null,
    };
    expect(validatePersistedSessionForManifest(overviewWithHistory, manifest)).toEqual(
      expect.arrayContaining([expect.stringContaining("cannot retain committed observation history")]),
    );
  });

  it("rejects future-to-past note revisions and reused source identities", () => {
    const persisted = validPersistedSession();
    const baseNote = {
      id: "note-lantern-steps",
      anchorId: "lantern-steps",
      text: "Earlier content",
      updatedAt: "2026-08-30T10:01:00.000Z",
      revision: 1,
    };
    persisted.past.push({
      ...structuredClone(persisted.current),
      notes: { "lantern-steps": baseNote },
    });
    persisted.past.push({
      ...structuredClone(persisted.current),
      notes: {
        "lantern-steps": {
          ...baseNote,
          text: "Later content",
          updatedAt: "2026-08-30T10:02:00.000Z",
          revision: 2,
        },
      },
    });
    persisted.current.notes = {
      "lantern-steps": {
        ...baseNote,
        text: "Different content with a reused identity",
        updatedAt: "2026-08-30T10:03:00.000Z",
        revision: 1,
      },
    };

    const issues = validatePersistedSessionForManifest(persisted, manifest);
    expect(issues).toEqual(expect.arrayContaining([
      expect.stringContaining("reused for different content"),
      expect.stringContaining("moves lantern-steps backwards"),
    ]));
  });
});
