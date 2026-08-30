import {
  ArrowLeft,
  ArrowSquareOut,
  Check,
  NotePencil,
  Prohibit,
  Warning,
} from "@phosphor-icons/react";
import { Button } from "react-aria-components";
import type { EvidenceRecap } from "../domain/recap";
import type { AreaManifest } from "../domain/schema";
import type { SessionSnapshot } from "../domain/session";

interface RecapViewProps {
  manifest: AreaManifest;
  session: SessionSnapshot;
  recap: EvidenceRecap;
  onCorrect: (anchorId: string) => void;
  onReturn: () => void;
  onExport: () => void;
  onOpenData: () => void;
  exportMessage: string;
}

const statusLabels = {
  found: "Participant reported found",
  unsure: "Unsure",
  skipped: "Skipped",
} as const;

export function RecapView({
  manifest,
  session,
  recap,
  onCorrect,
  onReturn,
  onExport,
  onOpenData,
  exportMessage,
}: RecapViewProps) {
  const counts = { found: 0, unsure: 0, skipped: 0, unrecorded: 0 };
  for (const anchorId of manifest.route.anchorIds) {
    const status = session.checkins[anchorId];
    if (status) counts[status] += 1;
    else counts.unrecorded += 1;
  }
  const inspectionOnlyCount = manifest.anchors.length - manifest.route.anchorIds.length;

  return (
    <div className="recap-screen">
      <header className="recap-header">
        <p className="boundary-line">Deterministic preview · No model output</p>
        <h1 id="screen-title" tabIndex={-1}>
          {session.stoppedAt ? "Partial record" : "Evidence-linked recap"}
        </h1>
        <p className="recap-intro">
          This preview reorganises your latest saved records. It does not infer why people stay, whether a place is suitable, or what happened in a real location.
        </p>
        <p className="recap-disclaimer">
          Immediate synthetic portfolio preview. The research draft keeps outcome review locked until 48 hours. This screen is not field evidence.
        </p>
      </header>

      <dl className="recap-counts" aria-label="Record status counts">
        <div><dt>Found</dt><dd>{counts.found}</dd></div>
        <div><dt>Unsure</dt><dd>{counts.unsure}</dd></div>
        <div><dt>Skipped</dt><dd>{counts.skipped}</dd></div>
        <div><dt>Unrecorded</dt><dd>{counts.unrecorded}</dd></div>
      </dl>
      <p className="recap-scope-note">
        Counts cover the {manifest.route.anchorIds.length} active protocol anchors. The {inspectionOnlyCount} fail-closed examples are inspection-only and do not count toward completion.
      </p>

      <section className="evidence-ledger" aria-labelledby="records-heading">
        <div className="ledger-section-heading">
          <div>
            <p className="evidence-kind"><NotePencil size={18} aria-hidden="true" /> User record</p>
            <h2 id="records-heading">Your saved observations</h2>
          </div>
          <span>Exact text, latest revision</span>
        </div>

        {manifest.anchors.filter((anchor) => session.checkins[anchor.id]).length === 0 ? (
          <div className="empty-state">
            <strong>No observation saved</strong>
            <p>The recap stays empty instead of inventing a narrative.</p>
          </div>
        ) : (
          <ol className="record-list">
            {manifest.anchors
              .filter((anchor) => session.checkins[anchor.id])
              .map((anchor) => {
                const status = session.checkins[anchor.id]!;
                const note = session.notes[anchor.id];
                return (
                  <li className="record-entry" id={`record-${anchor.id}`} key={anchor.id}>
                    <div className="record-heading">
                      <span className="anchor-index" aria-hidden="true">{anchor.shortCode}</span>
                      <div>
                        <h3>{anchor.name}</h3>
                        <p>{statusLabels[status]}</p>
                      </div>
                      <Button className="button button-quiet" onPress={() => onCorrect(anchor.id)}>
                        Correct record
                      </Button>
                    </div>
                    {note?.text ? (
                      <blockquote>{note.text}</blockquote>
                    ) : (
                      <p className="empty-note">No written note. The manual status is retained without added interpretation.</p>
                    )}
                    <div className="source-line">
                      <Check size={16} weight="bold" aria-hidden="true" />
                      <span>{note ? `${note.id}, revision ${note.revision}` : `check-in-${anchor.id}`}</span>
                    </div>
                  </li>
                );
              })}
          </ol>
        )}
      </section>

      <section className="evidence-ledger" aria-labelledby="fixture-heading">
        <div className="ledger-section-heading">
          <div>
            <p className="evidence-kind"><ArrowSquareOut size={18} aria-hidden="true" /> Fixture metadata</p>
            <h2 id="fixture-heading">What the synthetic pack supplies</h2>
          </div>
          <span>Non-authoritative</span>
        </div>
        {recap.fixtureMetadata.length === 0 ? (
          <div className="empty-state"><strong>No fixture claims used</strong><p>No checked-in anchor supplied eligible metadata.</p></div>
        ) : (
          <ul className="claim-list">
            {recap.fixtureMetadata.map((item) => (
              <li key={item.id} className={`claim-item claim-${item.status}`}>
                {item.status === "stale" ? <Warning size={20} aria-hidden="true" /> : <Check size={20} aria-hidden="true" />}
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <small>Sources: {item.sourceLinks.map((link) => link.label).join(", ")}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="evidence-ledger" aria-labelledby="unsupported-heading">
        <div className="ledger-section-heading">
          <div>
            <p className="evidence-kind"><Prohibit size={18} aria-hidden="true" /> Inference unavailable</p>
            <h2 id="unsupported-heading">What this recap will not claim</h2>
          </div>
          <span>Abstention is the result</span>
        </div>
        <ul className="claim-list">
          {recap.unavailableInferences.map((item) => (
            <li key={item.id} className="claim-item claim-unsupported">
              <Prohibit size={20} aria-hidden="true" />
              <div><h3>{item.title}</h3><p>{item.body}</p></div>
            </li>
          ))}
        </ul>
      </section>

      <div className="recap-actions">
        <Button className="button button-secondary" onPress={onReturn}>
          <ArrowLeft size={18} aria-hidden="true" /> {session.stoppedAt ? "Back to stopped session" : "Back to anchors"}
        </Button>
        <Button className="button button-primary" onPress={onExport}>Export JSON</Button>
        <Button className="button button-quiet" onPress={onOpenData}>Data and deletion</Button>
        <span className="save-status" aria-live="polite">{exportMessage}</span>
      </div>
    </div>
  );
}
