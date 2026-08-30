import { describe, expect, it } from "vitest";
import areaFixture from "../../src/fixtures/area-manifest.json";
import provenanceFixture from "../../src/fixtures/provenance-manifest.json";
import { deterministicRecapAdapter } from "../../src/domain/recap";
import { areaManifestSchema, provenanceManifestSchema } from "../../src/domain/schema";
import { initialSessionState, sessionReducer, toPersistedSession } from "../../src/domain/session";
import { createPrototypeExport } from "../../src/lib/export";
import { deleteSession, inspectSession, preflightStorage, saveSession, STORAGE_KEY } from "../../src/lib/storage";

describe("local data boundaries", () => {
  it("preflights, saves, verifies deletion, and leaves no session key", () => {
    expect(preflightStorage()).toEqual({ ok: true });
    const manifest = areaManifestSchema.parse(areaFixture);
    const state = sessionReducer(initialSessionState, {
      type: "START",
      firstAnchorId: "lantern-steps",
      now: "2026-08-30T10:00:00.000Z",
    });
    expect(saveSession(toPersistedSession(state, manifest.releaseId, manifest.contentFingerprint)).ok).toBe(true);
    expect(window.localStorage.getItem(STORAGE_KEY)).not.toBeNull();
    expect(deleteSession()).toEqual({ ok: true });
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("exports synthetic provenance, current session, history, and explicit exclusions", () => {
    const manifest = areaManifestSchema.parse(areaFixture);
    const provenance = provenanceManifestSchema.parse(provenanceFixture);
    let state = sessionReducer(initialSessionState, {
      type: "START",
      firstAnchorId: "lantern-steps",
      now: "2026-08-30T10:00:00.000Z",
    });
    state = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "found",
      text: "Synthetic local note",
      now: "2026-08-30T10:01:00.000Z",
    });
    const persisted = toPersistedSession(
      state,
      manifest.releaseId,
      manifest.contentFingerprint,
      "2026-08-30T10:02:00.000Z",
    );
    const recap = deterministicRecapAdapter.generate(
      manifest,
      state.current,
      new Date("2026-08-30T12:00:00+08:00"),
    );
    const data = createPrototypeExport(manifest, provenance, persisted, recap, "2026-08-30T10:03:00.000Z");

    expect(data.nonAuthoritative).toBe(true);
    expect(data.session.past).toHaveLength(1);
    expect(data.exclusions).toContain("No real location data");
    expect(data.provenance.containsPersonalData).toBe(false);
  });

  it("distinguishes corrupt local data from a missing session without overwriting it", () => {
    const raw = "{not-valid-json";
    window.localStorage.setItem(STORAGE_KEY, raw);
    const result = inspectSession();
    expect(result.kind).toBe("corrupt");
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe(raw);
  });

  it("treats an existing empty-string value as corrupt recovery data", () => {
    window.localStorage.setItem(STORAGE_KEY, "");
    const result = inspectSession();
    expect(result.kind).toBe("corrupt");
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("");
  });

  it("rejects a write when the opaque storage token changed", () => {
    const manifest = areaManifestSchema.parse(areaFixture);
    const state = sessionReducer(initialSessionState, {
      type: "START",
      firstAnchorId: "lantern-steps",
      now: "2026-08-30T10:00:00.000Z",
    });
    const session = toPersistedSession(state, manifest.releaseId, manifest.contentFingerprint);
    const first = saveSession(session, null);
    expect(first.ok).toBe(true);
    if (!first.ok) throw new Error("Expected first write to pass");

    window.localStorage.setItem(STORAGE_KEY, `${first.raw} `);
    const conflict = saveSession(session, first.raw);
    expect(conflict.ok).toBe(false);
    if (conflict.ok) throw new Error("Expected conflict");
    expect(conflict.conflict).toBe(true);
  });

  it("refuses to persist a candidate that fails the runtime session schema", () => {
    const manifest = areaManifestSchema.parse(areaFixture);
    const state = sessionReducer(initialSessionState, {
      type: "START",
      firstAnchorId: "lantern-steps",
      now: "2026-08-30T10:00:00.000Z",
    });
    const invalid = toPersistedSession(
      state,
      manifest.releaseId,
      manifest.contentFingerprint,
    ) as ReturnType<typeof toPersistedSession> & { futureField: boolean };
    invalid.futureField = true;

    const result = saveSession(invalid);
    expect(result.ok).toBe(false);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
