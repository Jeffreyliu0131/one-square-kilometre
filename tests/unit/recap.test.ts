import { describe, expect, it } from "vitest";
import areaFixture from "../../src/fixtures/area-manifest.json";
import { deterministicRecapAdapter, unavailableModelAdapter } from "../../src/domain/recap";
import { areaManifestSchema } from "../../src/domain/schema";
import { initialSnapshot, type SessionSnapshot } from "../../src/domain/session";

const manifest = areaManifestSchema.parse(areaFixture);

describe("deterministic recap", () => {
  it("separates exact user text, fixture metadata, and unavailable inference", () => {
    const session: SessionSnapshot = {
      ...structuredClone(initialSnapshot),
      phase: "recap",
      checkins: { "lantern-steps": "found", "quiet-cut": "unsure" },
      notes: {
        "lantern-steps": {
          id: "note-lantern-steps",
          anchorId: "lantern-steps",
          text: "  I would use the lower edge.\n",
          updatedAt: "2026-08-30T10:00:00.000Z",
          revision: 1,
        },
      },
    };

    const recap = deterministicRecapAdapter.generate(manifest, session, new Date("2026-08-30T12:00:00+08:00"));
    expect(recap.generatedBy).toBe("deterministic-template");
    expect(recap.userRecords[0]?.body).toBe("  I would use the lower edge.\n");
    expect(recap.userRecords[0]?.sourceLinks[0]?.kind).toBe("user-record");
    expect(recap.fixtureMetadata.every((item) => item.sourceLinks.every((link) => link.kind === "fixture-metadata"))).toBe(true);
    expect(recap.unavailableInferences.some((item) => item.title === "Quiet Cut")).toBe(true);
  });

  it("keeps the model adapter unavailable and non-fallback", () => {
    expect(unavailableModelAdapter.available).toBe(false);
    expect(() => unavailableModelAdapter.generate(manifest, initialSnapshot, new Date())).toThrow("Model adapter is disabled");
  });

  it("abstains from fixture metadata after an injected expiry clock", () => {
    const session: SessionSnapshot = {
      ...structuredClone(initialSnapshot),
      phase: "recap",
      startedAt: "2026-08-30T10:00:00.000Z",
      checkins: { "lantern-steps": "found" },
    };
    const recap = deterministicRecapAdapter.generate(
      manifest,
      session,
      new Date("2030-08-31T00:00:00+08:00"),
    );
    expect(recap.fixtureMetadata.some((item) => item.title === "Lantern Steps")).toBe(false);
    expect(recap.unavailableInferences.find((item) => item.title === "Lantern Steps")?.body).toMatch(/expired/);
  });
});
