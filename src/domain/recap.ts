import type { Anchor, AreaManifest } from "./schema";
import type { SessionSnapshot } from "./session";
import { isAnchorTemporallyUsable } from "./eligibility";

export interface RecapSourceLink {
  id: string;
  label: string;
  kind: "user-record" | "fixture-metadata";
}

export interface RecapItem {
  id: string;
  title: string;
  body: string;
  sourceLinks: RecapSourceLink[];
  status: "supported" | "stale" | "unsupported";
}

export interface EvidenceRecap {
  generatedBy: "deterministic-template";
  userRecords: RecapItem[];
  fixtureMetadata: RecapItem[];
  unavailableInferences: RecapItem[];
}

export interface RecapAdapter {
  id: string;
  available: boolean;
  generate(manifest: AreaManifest, session: SessionSnapshot, now: Date): EvidenceRecap;
}

function sourceLinksFor(anchor: Anchor): RecapSourceLink[] {
  return anchor.sourceRefs.map((sourceRef) => ({
    id: sourceRef,
    label: sourceRef,
    kind: "fixture-metadata" as const,
  }));
}

export const deterministicRecapAdapter: RecapAdapter = {
  id: "deterministic-template-v1",
  available: true,
  generate(manifest, session, now) {
    const userRecords = manifest.anchors.flatMap((anchor) => {
      const note = session.notes[anchor.id];
      if (!note?.text.trim()) return [];
      return [
        {
          id: `recap-user-${anchor.id}`,
          title: anchor.name,
          body: note.text,
          sourceLinks: [
            {
              id: note.id,
              label: `${note.id}, revision ${note.revision}`,
              kind: "user-record" as const,
            },
          ],
          status: "supported" as const,
        },
      ];
    });

    const fixtureMetadata = manifest.anchors
      .filter(
        (anchor) =>
          session.checkins[anchor.id] &&
          anchor.state === "current" &&
          isAnchorTemporallyUsable(anchor, now),
      )
      .map((anchor) => ({
        id: `recap-fixture-${anchor.id}`,
        title: anchor.name,
        body: `Synthetic fixture metadata dated ${anchor.verifiedAt.slice(0, 10)}: ${anchor.metadata[0]}. It is non-authoritative.`,
        sourceLinks: sourceLinksFor(anchor),
        status: "supported" as const,
      }));

    const unavailableInferences = manifest.anchors
      .filter(
        (anchor) =>
          session.checkins[anchor.id] === "unsure" ||
          anchor.state === "low-confidence" ||
          anchor.state === "stale" ||
          anchor.state === "unsupported" ||
          !isAnchorTemporallyUsable(anchor, now),
      )
      .map((anchor) => ({
        id: `recap-unsupported-${anchor.id}`,
        title: anchor.name,
        body: isAnchorTemporallyUsable(anchor, now)
          ? anchor.prompt.unsupportedInference
          : `Fixture metadata expired on ${anchor.expiresAt.slice(0, 10)}. No current claim is available.`,
        sourceLinks: sourceLinksFor(anchor),
        status: "unsupported" as const,
      }));

    if (unavailableInferences.length === 0) {
      unavailableInferences.push({
        id: "recap-unsupported-global",
        title: "Inference is not part of this prototype",
        body:
          "No claim is generated about safety, access, opening status, other people, or why anyone stays.",
        sourceLinks: [],
        status: "unsupported",
      });
    }

    return {
      generatedBy: "deterministic-template",
      userRecords,
      fixtureMetadata,
      unavailableInferences,
    };
  },
};

export const unavailableModelAdapter: RecapAdapter = {
  id: "model-adapter-disabled",
  available: false,
  generate() {
    throw new Error("Model adapter is disabled. The deterministic recap remains available.");
  },
};
