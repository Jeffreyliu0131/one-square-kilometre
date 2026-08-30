import { Copy, FloppyDisk, Warning } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Label,
  Radio,
  RadioGroup,
  TextArea,
  TextField,
} from "react-aria-components";
import type { Anchor } from "../domain/schema";
import type { CheckinStatus, FieldNote, ObservationDraft } from "../domain/session";

export type SaveState = "clean" | "saving" | "saved" | "error";

interface PromptPanelProps {
  anchor: Anchor;
  status?: CheckinStatus;
  note?: FieldNote;
  draft?: ObservationDraft;
  editBlockReason: string;
  blockedByHistory: boolean;
  temporallyExpired: boolean;
  saveState: SaveState;
  saveMessage: string;
  onCommit: (anchorId: string, status: CheckinStatus, text: string) => void;
  onDraftChange: (anchorId: string, status: CheckinStatus | null, text: string) => void;
  onRetry: () => void;
}

const options: Array<{ value: CheckinStatus; label: string; help: string }> = [
  {
    value: "found",
    label: "I found this anchor",
    help: "Participant reported. The app does not verify arrival.",
  },
  {
    value: "unsure",
    label: "I am not sure",
    help: "Keep uncertainty. No system guess will replace it.",
  },
  {
    value: "skipped",
    label: "Skip this prompt",
    help: "Skipping is a complete response and needs no explanation.",
  },
];

export function PromptPanel({
  anchor,
  status,
  note,
  draft,
  editBlockReason,
  blockedByHistory,
  temporallyExpired,
  saveState,
  saveMessage,
  onCommit,
  onDraftChange,
  onRetry,
}: PromptPanelProps) {
  const draftStatus = draft?.status ?? status ?? null;
  const draftText = draft?.text ?? note?.text ?? "";
  const draftLength = Array.from(draftText).length;
  const overLimit = draftLength > 800;
  const [validationError, setValidationError] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => headingRef.current?.focus());
  }, [anchor.id]);

  const isBlocked = temporallyExpired || anchor.state === "stale" || anchor.state === "unsupported";
  const stateCopy = useMemo(() => {
    if (anchor.state === "stale") {
      return {
        title: "This anchor is stale",
        body: `Its synthetic metadata expired on ${anchor.expiresAt.slice(0, 10)}. No new check-in is accepted.`,
      };
    }
    if (anchor.state === "unsupported") {
      return {
        title: "This anchor is not supported",
        body: "This fixture does not support proceeding here. The prototype offers no alternative route claim.",
      };
    }
    if (temporallyExpired) {
      return {
        title: "This anchor is outside its verified window",
        body: `Its fixture window ended on ${anchor.expiresAt.slice(0, 10)}. No new check-in or note is accepted.`,
      };
    }
    if (anchor.state === "low-confidence") {
      return {
        title: "Low-confidence fixture",
        body: "Record uncertainty instead of turning missing evidence into a place claim.",
      };
    }
    return null;
  }, [anchor, temporallyExpired]);

  function handleSave() {
    if (editBlockReason || blockedByHistory || overLimit) return;
    if (!draftStatus) {
      setValidationError("Choose found, unsure, or skip before saving.");
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }
    setValidationError("");
    onCommit(anchor.id, draftStatus, draftText);
  }

  async function copyDraft() {
    await navigator.clipboard?.writeText(draftText);
  }

  return (
    <section className="prompt-panel" aria-labelledby="prompt-heading">
      <div className="prompt-anchor-heading">
        <span className="prompt-index" aria-hidden="true">
          {anchor.shortCode}
        </span>
        <div>
          <p className="context-label">Selected synthetic anchor</p>
          <h2 id="prompt-heading" ref={headingRef} tabIndex={-1}>{anchor.name}</h2>
        </div>
      </div>

      <p className="fixture-cue">{anchor.metadata[0]}</p>

      {stateCopy && (
        <div className={`state-panel state-panel-${anchor.state === "stale" || anchor.state === "unsupported" ? anchor.state : temporallyExpired ? "temporal-expired" : anchor.state}`} role={isBlocked ? "alert" : "status"}>
          <Warning size={22} weight="bold" aria-hidden="true" />
          <div>
            <strong>{stateCopy.title}</strong>
            <p>{stateCopy.body}</p>
          </div>
        </div>
      )}

      <div className="observation-prompt">
        <p>{anchor.prompt.question}</p>
        <span>{anchor.prompt.cue}</span>
      </div>

      {isBlocked ? (
        <div className="unsupported-detail">
          <h3>No conclusion supported</h3>
          <p>{anchor.prompt.unsupportedInference}</p>
          <dl>
            <div>
              <dt>Fixture state</dt>
              <dd>{anchor.state}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>{anchor.sourceRefs.join(", ")}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <>
          <RadioGroup
            className="status-group"
            value={draftStatus}
            onChange={(value) => {
              const nextStatus = value as CheckinStatus;
              onDraftChange(anchor.id, nextStatus, draftText);
              setValidationError("");
            }}
            aria-label="Manual check-in status"
            isDisabled={Boolean(editBlockReason)}
          >
            <Label>Manual check-in</Label>
            <p className="field-help">No GPS or arrival inference is used.</p>
            <div className="radio-options">
              {options.map((option) => (
                <Radio key={option.value} value={option.value} className="status-option">
                  {({ isSelected }) => (
                    <>
                      <span className="radio-control" aria-hidden="true">
                        {isSelected && <span />}
                      </span>
                      <span>
                        <strong>{option.label}</strong>
                        <small>{option.help}</small>
                      </span>
                    </>
                  )}
                </Radio>
              ))}
            </div>
          </RadioGroup>

          <TextField className="note-field">
            <Label>Field note <span>optional</span></Label>
            <TextArea
              value={draftText}
              onChange={(event) => {
                const nextText = event.currentTarget.value;
                onDraftChange(anchor.id, draftStatus, nextText);
              }}
              placeholder="Write only what you directly noticed or decided."
              rows={7}
              maxLength={4000}
              disabled={Boolean(editBlockReason)}
            />
            <p className="field-help">
              Do not include names, contact details, or descriptions that identify other people.
            </p>
            <p className={`character-count ${overLimit ? "character-count-over" : ""}`}>{draftLength} of 800 characters for commit</p>
          </TextField>

          {editBlockReason && (
            <div className="inline-error" role="alert">{editBlockReason}</div>
          )}

          {blockedByHistory && (
            <div className="inline-error" role="alert">The 30-change local history limit is reached. Undo one committed change before saving another. Stop, export, and delete remain available.</div>
          )}

          {overLimit && (
            <div className="inline-error" role="alert">The full draft is retained, but it cannot be committed until it is 800 characters or fewer.</div>
          )}

          {validationError && (
            <div className="inline-error" role="alert" tabIndex={-1} ref={errorRef}>
              {validationError}
            </div>
          )}

          {saveState === "error" && (
            <div className="save-error" role="alert">
              <Warning size={22} weight="bold" aria-hidden="true" />
              <div>
                <strong>Not saved to browser storage</strong>
                <p>{saveMessage} Your current on-screen text is still available.</p>
                <div className="inline-actions">
                  <Button className="button button-secondary" onPress={onRetry}>
                    Retry save
                  </Button>
                  <Button className="button button-quiet" onPress={() => void copyDraft()}>
                    <Copy size={18} aria-hidden="true" /> Copy note
                  </Button>
                </div>
                <p className="clipboard-boundary">
                  Copy uses the system clipboard. Other apps or device sync may retain it, and this demo cannot delete it.
                </p>
              </div>
            </div>
          )}

          <div className="prompt-actions">
            <Button className="button button-primary" isDisabled={Boolean(editBlockReason) || blockedByHistory || overLimit || saveState === "saving"} onPress={handleSave}>
              <FloppyDisk size={20} weight="bold" aria-hidden="true" />
              {status ? "Save correction" : "Save observation"}
            </Button>
            <span className="save-status" aria-live="polite">
              {saveState === "saving" && "Saving locally"}
              {saveState === "saved" && saveMessage}
            </span>
          </div>
        </>
      )}
    </section>
  );
}
