import type { AreaManifest, ProvenanceManifest } from "../domain/schema";
import type { PersistedSession } from "../domain/session";
import type { EvidenceRecap } from "../domain/recap";

export interface PrototypeExport {
  exportSchemaVersion: "1.0.0";
  exportedAt: string;
  nonAuthoritative: true;
  area: Pick<AreaManifest, "areaId" | "releaseId" | "contentFingerprint" | "title">;
  provenance: ProvenanceManifest;
  session: PersistedSession;
  recap: EvidenceRecap;
  exclusions: string[];
}

export interface RecoveryExport {
  exportSchemaVersion: "1.0.0";
  exportedAt: string;
  nonAuthoritative: true;
  recovery: true;
  validation: "valid-session-fixture-unavailable" | "corrupt-raw-storage";
  lastKnownAreaReleaseId: string | null;
  session: PersistedSession | null;
  rawStorage: string | null;
  recapUnavailable: string;
  limitations: string[];
}

export function createPrototypeExport(
  manifest: AreaManifest,
  provenance: ProvenanceManifest,
  session: PersistedSession,
  recap: EvidenceRecap,
  exportedAt = new Date().toISOString(),
): PrototypeExport {
  return {
    exportSchemaVersion: "1.0.0",
    exportedAt,
    nonAuthoritative: true,
    area: {
      areaId: manifest.areaId,
      releaseId: manifest.releaseId,
      contentFingerprint: manifest.contentFingerprint,
      title: manifest.title,
    },
    provenance,
    session,
    recap,
    exclusions: [
      "No real location data",
      "No precise or continuous GPS",
      "No photographs, audio, or bystander data",
      "No AI or model output",
      "No safety, access, or opening-hours assurance",
    ],
  };
}

export function downloadJson(data: PrototypeExport): void {
  downloadJsonFile(
    data,
    `one-square-kilometre-${safeFilenamePart(data.area.releaseId) || "synthetic-export"}.json`,
  );
}

export function createSessionRecoveryExport(
  session: PersistedSession,
  exportedAt = new Date().toISOString(),
): RecoveryExport {
  return {
    exportSchemaVersion: "1.0.0",
    exportedAt,
    nonAuthoritative: true,
    recovery: true,
    validation: "valid-session-fixture-unavailable",
    lastKnownAreaReleaseId: session.areaReleaseId,
    session,
    rawStorage: null,
    recapUnavailable: "Current fixture dependencies are unavailable or incompatible. No recap was generated.",
    limitations: [
      "Recovery data only, not a conforming prototype export",
      "No current fixture metadata or inference",
      "Downloaded files remain outside app deletion control",
    ],
  };
}

export function createRawRecoveryExport(
  rawStorage: string,
  exportedAt = new Date().toISOString(),
): RecoveryExport {
  return {
    exportSchemaVersion: "1.0.0",
    exportedAt,
    nonAuthoritative: true,
    recovery: true,
    validation: "corrupt-raw-storage",
    lastKnownAreaReleaseId: null,
    session: null,
    rawStorage,
    recapUnavailable: "The stored value is unvalidated and was not interpreted or rendered as session content.",
    limitations: [
      "Raw recovery wrapper only",
      "Content may be malformed or incompatible",
      "Downloaded files remain outside app deletion control",
    ],
  };
}

export function downloadRecoveryJson(data: RecoveryExport): void {
  const release = data.lastKnownAreaReleaseId ? safeFilenamePart(data.lastKnownAreaReleaseId) : "raw";
  downloadJsonFile(data, `one-square-kilometre-recovery-${release || "session"}.json`);
}

function safeFilenamePart(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 80);
}

function downloadJsonFile(data: PrototypeExport | RecoveryExport, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
