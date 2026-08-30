import { describe, expect, it } from "vitest";
import areaFixture from "../../src/fixtures/area-manifest.json";
import provenanceFixture from "../../src/fixtures/provenance-manifest.json";
import {
  areaManifestSchema,
  provenanceManifestSchema,
  validateFixturePair,
} from "../../src/domain/schema";

describe("synthetic manifests", () => {
  it("accepts the versioned area and provenance fixtures", () => {
    const area = areaManifestSchema.parse(areaFixture);
    const provenance = provenanceManifestSchema.parse(provenanceFixture);

    expect(area.anchors).toHaveLength(6);
    expect(area.route.anchorIds).toHaveLength(4);
    expect(area.nonAuthoritative).toBe(true);
    expect(provenance.containsRealLocations).toBe(false);
    expect(provenance.containsPersonalData).toBe(false);
    expect(provenance.containsThirdPartyMedia).toBe(false);
  });

  it("fails closed when a route includes stale or unsupported fixture state", () => {
    const invalid = structuredClone(areaFixture);
    invalid.route.anchorIds[0] = "north-shelter";

    const result = areaManifestSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.message.includes("Route cannot start"))).toBe(true);
  });

  it("rejects duplicate anchor and source identifiers", () => {
    const invalid = structuredClone(areaFixture);
    invalid.anchors[1]!.id = invalid.anchors[0]!.id;
    invalid.sources[1]!.id = invalid.sources[0]!.id;

    const result = areaManifestSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.message)).toEqual(
      expect.arrayContaining(["Anchor IDs must be unique", "Source IDs must be unique"]),
    );
  });

  it("rejects an inverted manifest validity window", () => {
    const invalid = structuredClone(areaFixture);
    invalid.validity.reviewDueAt = "2031-08-30T09:00:00+08:00";
    invalid.validity.expiresAt = "2030-08-30T23:59:59+08:00";
    const result = areaManifestSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.message.includes("verifiedAt <= reviewDueAt"))).toBe(true);
  });

  it("rejects unknown nested fields and same-release content changes without a new fingerprint", () => {
    const withCoordinates = structuredClone(areaFixture) as typeof areaFixture & {
      route: typeof areaFixture.route & { latitude: number };
    };
    withCoordinates.route.latitude = 1.3;
    expect(areaManifestSchema.safeParse(withCoordinates).success).toBe(false);

    const changedPrompt = structuredClone(areaFixture);
    changedPrompt.anchors[0]!.prompt.question = "Changed without updating the fingerprint";
    const result = areaManifestSchema.safeParse(changedPrompt);
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.message.includes("content fingerprint"))).toBe(true);
  });

  it("binds provenance fixture identity to the exact area release", () => {
    const area = areaManifestSchema.parse(areaFixture);
    const provenance = provenanceManifestSchema.parse(provenanceFixture);
    expect(validateFixturePair(area, provenance)).toEqual([]);
    expect(
      validateFixturePair(area, { ...provenance, fixtureSet: "synthetic-other-release" }),
    ).toEqual([expect.stringContaining("does not match area release")]);
  });
});
