import type { Anchor, AreaManifest } from "./schema";

export type TemporalEligibility = "not-yet-valid" | "ready" | "review-due" | "expired";

export function deriveManifestTemporalEligibility(
  manifest: AreaManifest,
  now: Date,
): TemporalEligibility {
  const time = now.getTime();
  if (time < Date.parse(manifest.validity.verifiedAt)) return "not-yet-valid";
  if (time >= Date.parse(manifest.validity.expiresAt)) return "expired";
  if (time >= Date.parse(manifest.validity.reviewDueAt)) return "review-due";
  return "ready";
}

export function isAnchorTemporallyUsable(anchor: Anchor, now: Date): boolean {
  const time = now.getTime();
  return time >= Date.parse(anchor.verifiedAt) && time < Date.parse(anchor.expiresAt);
}

export function areRouteAnchorsTemporallyUsable(
  manifest: AreaManifest,
  now: Date,
): boolean {
  return manifest.route.anchorIds.every((anchorId) => {
    const anchor = manifest.anchors.find((candidate) => candidate.id === anchorId);
    return Boolean(anchor && isAnchorTemporallyUsable(anchor, now));
  });
}
