import { z } from "zod";

const sourceSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  publisher: z.string().min(1),
  kind: z.literal("project-authored-synthetic"),
  rights: z.string().min(1),
  checkedAt: z.string().datetime({ offset: true }),
  nonAuthoritative: z.literal(true),
}).strict();

const anchorStateSchema = z.enum([
  "current",
  "low-confidence",
  "stale",
  "unsupported",
]);

export const anchorSchema = z.object({
  id: z.string().min(1),
  shortCode: z.string().min(1).max(2),
  name: z.string().min(1),
  mapPosition: z.object({
    x: z.number().min(0).max(100),
    y: z.number().min(0).max(100),
  }).strict(),
  state: anchorStateSchema,
  confidence: z.string().min(1),
  verifiedAt: z.string().datetime({ offset: true }),
  expiresAt: z.string().datetime({ offset: true }),
  accessibility: z.string().min(1),
  metadata: z.array(z.string().min(1)).min(1),
  prompt: z.object({
    id: z.string().min(1),
    question: z.string().min(1),
    cue: z.string().min(1),
    unsupportedInference: z.string().min(1),
  }).strict(),
  sourceRefs: z.array(z.string().min(1)).min(1),
}).strict();

function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalJson(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function computeAreaContentFingerprint(
  manifest: Record<string, unknown>,
): string {
  const content = { ...manifest };
  delete content.contentFingerprint;
  const bytes = new TextEncoder().encode(canonicalJson(content));
  let hash = 0x811c9dc5;
  for (const byte of bytes) {
    hash ^= byte;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `fnv1a32:${hash.toString(16).padStart(8, "0")}`;
}

export const areaManifestSchema = z
  .object({
    schemaVersion: z.literal("1.0.0"),
    areaId: z.string().min(1),
    releaseId: z.string().min(1),
    contentFingerprint: z.string().min(1),
    title: z.string().min(1),
    subtitle: z.string().min(1),
    status: z.literal("active"),
    nonAuthoritative: z.literal(true),
    theme: z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
    }).strict(),
    validity: z.object({
      verifiedAt: z.string().datetime({ offset: true }),
      reviewDueAt: z.string().datetime({ offset: true }),
      expiresAt: z.string().datetime({ offset: true }),
      validConditions: z.array(z.string().min(1)).min(1),
    }).strict(),
    rights: z.object({
      fixtureLicense: z.literal("CC0-1.0"),
      mapGeometry: z.string().min(1),
      copy: z.string().min(1),
      distribution: z.string().min(1),
    }).strict(),
    sources: z.array(sourceSchema).min(1),
    route: z.object({
      label: z.string().min(1),
      notNavigation: z.literal(true),
      anchorIds: z.array(z.string().min(1)).min(4).max(6),
    }).strict(),
    anchors: z.array(anchorSchema).min(4).max(6),
  })
  .strict()
  .superRefine((manifest, ctx) => {
    const anchorIdList = manifest.anchors.map((anchor) => anchor.id);
    const sourceIdList = manifest.sources.map((source) => source.id);
    const anchorIds = new Set(anchorIdList);
    const sourceIds = new Set(sourceIdList);
    const verifiedAt = Date.parse(manifest.validity.verifiedAt);
    const reviewDueAt = Date.parse(manifest.validity.reviewDueAt);
    const expiresAt = Date.parse(manifest.validity.expiresAt);

    const expectedFingerprint = computeAreaContentFingerprint(
      manifest as unknown as Record<string, unknown>,
    );
    if (manifest.contentFingerprint !== expectedFingerprint) {
      ctx.addIssue({
        code: "custom",
        message: `Manifest content fingerprint must be ${expectedFingerprint}`,
        path: ["contentFingerprint"],
      });
    }

    if (!(verifiedAt <= reviewDueAt && reviewDueAt <= expiresAt)) {
      ctx.addIssue({
        code: "custom",
        message: "Manifest validity must satisfy verifiedAt <= reviewDueAt <= expiresAt",
        path: ["validity"],
      });
    }

    if (anchorIds.size !== anchorIdList.length) {
      ctx.addIssue({ code: "custom", message: "Anchor IDs must be unique", path: ["anchors"] });
    }
    if (sourceIds.size !== sourceIdList.length) {
      ctx.addIssue({ code: "custom", message: "Source IDs must be unique", path: ["sources"] });
    }
    if (new Set(manifest.route.anchorIds).size !== manifest.route.anchorIds.length) {
      ctx.addIssue({ code: "custom", message: "Route anchor IDs must be unique", path: ["route", "anchorIds"] });
    }

    for (const routeId of manifest.route.anchorIds) {
      if (!anchorIds.has(routeId)) {
        ctx.addIssue({
          code: "custom",
          message: `Route references missing anchor: ${routeId}`,
          path: ["route", "anchorIds"],
        });
      } else {
        const routeAnchor = manifest.anchors.find((anchor) => anchor.id === routeId);
        if (routeAnchor?.state === "stale" || routeAnchor?.state === "unsupported") {
          ctx.addIssue({
            code: "custom",
            message: `Route cannot start with ${routeAnchor.state} anchor: ${routeId}`,
            path: ["route", "anchorIds"],
          });
        }
      }
    }

    for (const [index, anchor] of manifest.anchors.entries()) {
      if (Date.parse(anchor.verifiedAt) > Date.parse(anchor.expiresAt)) {
        ctx.addIssue({
          code: "custom",
          message: `Anchor verifiedAt must not be after expiresAt: ${anchor.id}`,
          path: ["anchors", index],
        });
      }
      for (const sourceRef of anchor.sourceRefs) {
        if (!sourceIds.has(sourceRef)) {
          ctx.addIssue({
            code: "custom",
            message: `Anchor references missing source: ${sourceRef}`,
            path: ["anchors", index, "sourceRefs"],
          });
        }
      }
    }
  });

export type AreaManifest = z.infer<typeof areaManifestSchema>;
export type Anchor = z.infer<typeof anchorSchema>;
export type AnchorFixtureState = z.infer<typeof anchorStateSchema>;

export const provenanceManifestSchema = z.object({
  schemaVersion: z.literal("1.0.0"),
  fixtureSet: z.string().min(1),
  createdAt: z.string().datetime({ offset: true }),
  authoring: z.string().min(1),
  nonAuthoritative: z.literal(true),
  containsRealLocations: z.literal(false),
  containsPersonalData: z.literal(false),
  containsThirdPartyMedia: z.literal(false),
  assets: z.array(
    z.object({
      path: z.string().min(1),
      kind: z.string().min(1),
      rights: z.string().min(1),
      source: z.string().min(1),
    }).strict(),
  ),
  dependencyNotices: z.array(
    z.object({ name: z.string().min(1), version: z.string().min(1), license: z.string().min(1) }).strict(),
  ),
  notices: z.array(z.string().min(1)),
}).strict();

export type ProvenanceManifest = z.infer<typeof provenanceManifestSchema>;

export function validateFixturePair(
  area: AreaManifest,
  provenance: ProvenanceManifest,
): string[] {
  return provenance.fixtureSet === area.releaseId
    ? []
    : [
        `Provenance fixture set ${provenance.fixtureSet} does not match area release ${area.releaseId}`,
      ];
}
