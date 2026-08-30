import type { AreaManifest } from "./schema";
import type { PersistedSession, SessionSnapshot } from "./session";

function validateSnapshot(
  snapshot: SessionSnapshot,
  anchorIds: Set<string>,
  path: string,
): string[] {
  const issues: string[] = [];

  if (snapshot.selectedAnchorId && !anchorIds.has(snapshot.selectedAnchorId)) {
    issues.push(`${path}.selectedAnchorId references an unknown anchor`);
  }

  for (const anchorId of Object.keys(snapshot.checkins)) {
    if (!anchorIds.has(anchorId)) issues.push(`${path}.checkins contains unknown anchor ${anchorId}`);
  }

  for (const [key, note] of Object.entries(snapshot.notes)) {
    if (!anchorIds.has(key)) issues.push(`${path}.notes contains unknown anchor ${key}`);
    if (note.anchorId !== key) issues.push(`${path}.notes key ${key} does not match note.anchorId`);
  }

  for (const [key, draft] of Object.entries(snapshot.drafts)) {
    if (!anchorIds.has(key)) issues.push(`${path}.drafts contains unknown anchor ${key}`);
    if (draft.anchorId !== key) issues.push(`${path}.drafts key ${key} does not match draft.anchorId`);
  }

  if (snapshot.stoppedAt && snapshot.phase === "field") {
    issues.push(`${path} is stopped but still claims the field phase`);
  }

  if (snapshot.phase === "overview") {
    if (snapshot.startedAt || snapshot.stoppedAt || snapshot.stopReason) {
      issues.push(`${path} overview state contains lifecycle timestamps or a stop reason`);
    }
    if (
      Object.keys(snapshot.checkins).length ||
      Object.keys(snapshot.notes).length ||
      Object.keys(snapshot.drafts).length
    ) {
      issues.push(`${path} overview state contains session records`);
    }
  }

  if (snapshot.phase !== "overview" && !snapshot.startedAt) {
    issues.push(`${path} ${snapshot.phase} state has no startedAt timestamp`);
  }

  if (snapshot.phase === "field" && (snapshot.stoppedAt || snapshot.stopReason)) {
    issues.push(`${path} active field state contains stopped lifecycle data`);
  }

  if (snapshot.phase === "stopped" && (!snapshot.stoppedAt || !snapshot.stopReason)) {
    issues.push(`${path} stopped state lacks stoppedAt or stopReason`);
  }

  if (Boolean(snapshot.stoppedAt) !== Boolean(snapshot.stopReason)) {
    issues.push(`${path} stoppedAt and stopReason must be present together`);
  }

  if (
    snapshot.startedAt &&
    snapshot.stoppedAt &&
    Date.parse(snapshot.stoppedAt) < Date.parse(snapshot.startedAt)
  ) {
    issues.push(`${path} stoppedAt is before startedAt`);
  }

  return issues;
}

export function validatePersistedSessionForManifest(
  session: PersistedSession,
  manifest: AreaManifest,
): string[] {
  const issues: string[] = [];
  if (session.areaReleaseId !== manifest.releaseId) {
    issues.push(`Session release ${session.areaReleaseId} does not match ${manifest.releaseId}`);
  }
  if (session.contentFingerprint !== manifest.contentFingerprint) {
    issues.push(`Session fingerprint ${session.contentFingerprint} does not match the current fixture`);
  }
  const anchorIds = new Set(manifest.anchors.map((anchor) => anchor.id));
  issues.push(...validateSnapshot(session.current, anchorIds, "current"));
  if (session.current.phase === "overview" && session.past.length > 0) {
    issues.push("Current overview state cannot retain committed observation history");
  }
  session.past.forEach((snapshot, index) => {
    issues.push(...validateSnapshot(snapshot, anchorIds, `past[${index}]`));
    if (snapshot.phase !== "field" && snapshot.phase !== "correction") {
      issues.push(`past[${index}] must be a field or correction snapshot`);
    }
    if (
      session.current.startedAt &&
      snapshot.startedAt !== session.current.startedAt
    ) {
      issues.push(`past[${index}] does not belong to the current session start`);
    }
  });

  const noteIdentityPayload = new Map<string, string>();
  const noteIdByAnchor = new Map<string, string>();
  const maxRevisionByAnchor = new Map<string, number>();
  const timeline = [...session.past, session.current];
  timeline.forEach((snapshot, snapshotIndex) => {
    for (const [anchorId, note] of Object.entries(snapshot.notes)) {
      const identity = `${note.id}#${note.revision}`;
      const payload = JSON.stringify({
        anchorId: note.anchorId,
        text: note.text,
        updatedAt: note.updatedAt,
      });
      const priorPayload = noteIdentityPayload.get(identity);
      if (priorPayload && priorPayload !== payload) {
        issues.push(`Note identity ${identity} is reused for different content`);
      } else {
        noteIdentityPayload.set(identity, payload);
      }

      const priorId = noteIdByAnchor.get(anchorId);
      if (priorId && priorId !== note.id) {
        issues.push(`Anchor ${anchorId} changes note identity from ${priorId} to ${note.id}`);
      } else {
        noteIdByAnchor.set(anchorId, note.id);
      }

      const maxRevision = maxRevisionByAnchor.get(anchorId) ?? 0;
      if (note.revision < maxRevision) {
        issues.push(
          `Timeline snapshot ${snapshotIndex} moves ${anchorId} backwards from revision ${maxRevision} to ${note.revision}`,
        );
      } else if (note.revision > maxRevision + 1) {
        issues.push(
          `Timeline snapshot ${snapshotIndex} skips ${anchorId} from revision ${maxRevision} to ${note.revision}`,
        );
      }
      maxRevisionByAnchor.set(anchorId, Math.max(maxRevision, note.revision));
    }
  });
  return issues;
}
