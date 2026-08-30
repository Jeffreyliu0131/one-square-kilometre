import {
  Check,
  Circle,
  Minus,
  Prohibit,
  Question,
  Warning,
} from "@phosphor-icons/react";
import { Button } from "react-aria-components";
import type { Anchor, AreaManifest } from "../domain/schema";
import type { CheckinStatus } from "../domain/session";

interface FieldMapProps {
  manifest: AreaManifest;
  checkins: Record<string, CheckinStatus>;
  selectedAnchorId: string | null;
  listOnly: boolean;
  temporallyExpiredAnchorIds: Set<string>;
  onSelect: (anchorId: string) => void;
}

function anchorStateLabel(anchor: Anchor, checkin?: CheckinStatus, temporallyExpired = false): string {
  if (anchor.state === "stale") return "Stale fixture";
  if (anchor.state === "unsupported") return "Not supported";
  if (temporallyExpired) return "Expired fixture";
  if (checkin === "found") return "Participant reported found";
  if (checkin === "unsure") return "Unsure";
  if (checkin === "skipped") return "Skipped";
  if (anchor.state === "low-confidence") return "Low confidence";
  return "Not recorded";
}

function StateIcon({ anchor, checkin, temporallyExpired }: { anchor: Anchor; checkin?: CheckinStatus; temporallyExpired: boolean }) {
  const common = { size: 18, weight: "bold" as const, "aria-hidden": true };
  if (anchor.state === "stale") return <Warning {...common} />;
  if (anchor.state === "unsupported") return <Prohibit {...common} />;
  if (temporallyExpired) return <Warning {...common} />;
  if (checkin === "found") return <Check {...common} />;
  if (checkin === "unsure") return <Question {...common} />;
  if (checkin === "skipped") return <Minus {...common} />;
  if (anchor.state === "low-confidence") return <Question {...common} />;
  return <Circle {...common} />;
}

export function FieldMap({
  manifest,
  checkins,
  selectedAnchorId,
  listOnly,
  temporallyExpiredAnchorIds,
  onSelect,
}: FieldMapProps) {
  return (
    <section className="map-region" aria-labelledby="map-heading">
      <div className="section-heading-row">
        <div>
          <h2 id="map-heading">Area sketch</h2>
          <p>Exploration suggestion, not directions. No live position.</p>
        </div>
        <span className="map-scale" aria-label="Synthetic map scale">
          100 synthetic m
        </span>
      </div>

      {listOnly ? (
        <div className="map-fallback" role="status">
          <Prohibit size={24} aria-hidden="true" />
          <div>
            <strong>Map layer unavailable</strong>
            <p>The complete protocol remains available in the anchor list.</p>
          </div>
        </div>
      ) : (
        <figure className="map-figure" aria-labelledby="map-caption">
          <div className="map-canvas">
            <svg
              className="map-geometry"
              viewBox="0 0 100 100"
              role="img"
              aria-label="Synthetic plan showing paths, planted areas, water, and six lettered anchors"
            >
              <rect className="map-land" width="100" height="100" rx="3" />
              <path className="map-water" d="M0 82 C22 73 30 88 48 80 C67 72 76 87 100 75 L100 100 L0 100 Z" />
              <path className="map-path" d="M5 18 C27 26 45 26 93 16" />
              <path className="map-path" d="M14 11 C24 42 38 60 55 91" />
              <path className="map-path" d="M90 9 C75 35 62 50 43 79" />
              <path className="map-route" d="M19 28 L48 35 L67 61 L24 67" />
              <rect className="map-building" x="34" y="13" width="21" height="13" rx="1.5" />
              <rect className="map-building" x="66" y="13" width="15" height="20" rx="1.5" />
              <rect className="map-building" x="8" y="48" width="23" height="14" rx="1.5" />
              <circle className="map-planting" cx="58" cy="42" r="8" />
              <circle className="map-planting" cx="79" cy="68" r="10" />
            </svg>
            <div className="map-markers" aria-label="Map anchor controls">
              {manifest.anchors.map((anchor) => {
              const checkin = checkins[anchor.id];
              const temporallyExpired = temporallyExpiredAnchorIds.has(anchor.id);
              return (
                  <Button
                    key={anchor.id}
                  className={`map-marker marker-${anchor.state === "stale" || anchor.state === "unsupported" ? anchor.state : temporallyExpired ? "temporal-expired" : anchor.state} ${checkin ? `marker-${checkin}` : ""}`}
                    style={{ left: `${anchor.mapPosition.x}%`, top: `${anchor.mapPosition.y}%` }}
                  aria-label={`${anchor.shortCode}, ${anchor.name}, ${anchorStateLabel(anchor, checkin, temporallyExpired)}`}
                    aria-pressed={selectedAnchorId === anchor.id}
                    onPress={() => onSelect(anchor.id)}
                  >
                    {anchor.shortCode}
                  </Button>
                );
              })}
            </div>
          </div>
          <figcaption id="map-caption">
            Project-authored synthetic geometry. Shapes do not correspond to a real place.
          </figcaption>
        </figure>
      )}

      <ol className="anchor-list" aria-label="All synthetic anchors">
        {manifest.anchors.map((anchor) => {
          const checkin = checkins[anchor.id];
          const temporallyExpired = temporallyExpiredAnchorIds.has(anchor.id);
          const state = anchorStateLabel(anchor, checkin, temporallyExpired);
          return (
            <li key={anchor.id}>
              <Button
                className="anchor-row"
                aria-current={selectedAnchorId === anchor.id ? "step" : undefined}
                onPress={() => onSelect(anchor.id)}
              >
                <span className="anchor-index" aria-hidden="true">
                  {anchor.shortCode}
                </span>
                <span className="anchor-row-copy">
                  <strong>{anchor.name}</strong>
                  <span>{state}</span>
                </span>
                <span className={`state-icon state-${anchor.state === "stale" || anchor.state === "unsupported" ? anchor.state : temporallyExpired ? "temporal-expired" : checkin ?? anchor.state}`}>
                  <StateIcon anchor={anchor} checkin={checkin} temporallyExpired={temporallyExpired} />
                </span>
              </Button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
