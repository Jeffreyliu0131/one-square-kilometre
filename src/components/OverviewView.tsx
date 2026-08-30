import { ArrowRight, Database, MapTrifold, ShieldWarning } from "@phosphor-icons/react";
import { Button } from "react-aria-components";
import type { AreaManifest } from "../domain/schema";

interface OverviewViewProps {
  manifest: AreaManifest;
  canStart: boolean;
  offlineFirst: boolean;
  stalePack: boolean;
  storageError: string;
  storagePending: boolean;
  reviewDue: boolean;
  onStart: () => void;
  onOpenData: () => void;
}

export function OverviewView({
  manifest,
  canStart,
  offlineFirst,
  stalePack,
  storageError,
  storagePending,
  reviewDue,
  onStart,
  onOpenData,
}: OverviewViewProps) {
  return (
    <div className="overview-screen">
      <section className="overview-intro" aria-labelledby="screen-title">
        <p className="boundary-line">Portfolio prototype · Synthetic place · Not navigation</p>
        <h1 id="screen-title" tabIndex={-1}>Where would I pause?</h1>
        <p className="overview-lede">
          Record four fictional anchors to examine your own choice to pause. Two additional examples show when the protocol refuses to proceed.
        </p>

        {(offlineFirst || stalePack || storageError) && (
          <div className="hard-gate" role="alert">
            <ShieldWarning size={24} weight="bold" aria-hidden="true" />
            <div>
              <strong>{offlineFirst ? "First load is incomplete" : stalePack ? "This pack is out of date" : "Local storage is unavailable"}</strong>
              <p>
                {offlineFirst
                  ? "Connect once so the local pack can load. No partial session will be created."
                  : stalePack
                    ? "Do not start a new session. Existing local records remain exportable and deletable."
                    : `${storageError} A volatile session will not be started.`}
              </p>
            </div>
          </div>
        )}

        {reviewDue && !stalePack && (
          <div className="review-due" role="status">
            <ShieldWarning size={22} aria-hidden="true" />
            <p>Fixture review is due. This synthetic pack remains available only until its stated expiry.</p>
          </div>
        )}

        <div className="overview-actions">
          <Button className="button button-primary button-large" isDisabled={!canStart} onPress={onStart}>
            Start synthetic session <ArrowRight size={20} weight="bold" aria-hidden="true" />
          </Button>
          <Button className="button button-secondary button-large" onPress={onOpenData}>
            View data and limits
          </Button>
        </div>
        {storagePending && <p className="preflight-status" role="status">Checking local save and delete capability before start.</p>}
      </section>

      <section className="pack-sheet" aria-labelledby="pack-heading">
        <div className="pack-title">
          <span className="pack-monogram" aria-hidden="true">MC</span>
          <div>
            <p className="context-label">Synthetic area pack</p>
            <h2 id="pack-heading">{manifest.title}</h2>
            <p>{manifest.subtitle}</p>
          </div>
        </div>

        <dl className="pack-facts">
          <div>
            <MapTrifold size={20} aria-hidden="true" />
            <dt>Protocol</dt>
            <dd>{manifest.route.anchorIds.length} active prompts, {manifest.anchors.length - manifest.route.anchorIds.length} blocked examples</dd>
          </div>
          <div>
            <Database size={20} aria-hidden="true" />
            <dt>Data</dt>
            <dd>Local text only, no account or sync</dd>
          </div>
          <div>
            <ShieldWarning size={20} aria-hidden="true" />
            <dt>Limits</dt>
            <dd>No safety, access, or opening assurance</dd>
          </div>
        </dl>

        <div className="pack-validity">
          <span>Release {manifest.releaseId}</span>
          <span>Review due {manifest.validity.reviewDueAt.slice(0, 10)}</span>
          <span>{manifest.rights.fixtureLicense} fixtures</span>
        </div>
      </section>
    </div>
  );
}
