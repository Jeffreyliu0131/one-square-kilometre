import {
  ArrowSquareOut,
  Database,
  DownloadSimple,
  Prohibit,
  StopCircle,
  Trash,
  Warning,
  X,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Button, Dialog, Modal, ModalOverlay } from "react-aria-components";
import type { AreaManifest, ProvenanceManifest } from "../domain/schema";

interface DataDialogProps {
  isOpen: boolean;
  hasSession: boolean;
  hasLocalData: boolean;
  manifest: AreaManifest | null;
  provenance: ProvenanceManifest | null;
  offline: boolean;
  listOnly: boolean;
  deleteState: "idle" | "deleting" | "error" | "deleted";
  deleteMessage: string;
  exportMessage: string;
  recoveryMessage: string;
  onOpenChange: (open: boolean) => void;
  onExport: () => void;
  onDelete: () => void;
}

export function DataDialog({
  isOpen,
  hasSession,
  hasLocalData,
  manifest,
  provenance,
  offline,
  listOnly,
  deleteState,
  deleteMessage,
  exportMessage,
  recoveryMessage,
  onOpenChange,
  onExport,
  onDelete,
}: DataDialogProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (confirmDelete) requestAnimationFrame(() => cancelRef.current?.focus());
  }, [confirmDelete]);

  function handleOpenChange(open: boolean) {
    if (!open) setConfirmDelete(false);
    onOpenChange(open);
  }

  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={handleOpenChange} isDismissable className="modal-overlay">
      <Modal className="modal-shell">
        <Dialog aria-label="Data, provenance, and prototype limits" className="dialog-content">
          <div className="dialog-header">
            <div>
              <p className="context-label">Local prototype controls</p>
              <h2>Data and limits</h2>
            </div>
            <Button className="icon-button" aria-label="Close data and limits" onPress={() => handleOpenChange(false)}>
              <X size={22} aria-hidden="true" />
            </Button>
          </div>

          <section className="dialog-section" aria-labelledby="storage-heading">
            <h3 id="storage-heading"><Database size={20} aria-hidden="true" /> This browser only</h3>
            <p>
              Saved observations remain in this browser profile on this device. There is no account, server, sync, analytics, camera, microphone, or location permission.
            </p>
            {recoveryMessage && (
              <div className="save-error" role="alert">
                <Warning size={22} weight="bold" aria-hidden="true" />
                <div><strong>Local data needs recovery</strong><p>{recoveryMessage} It will not be overwritten. Recovery export and delete remain available.</p></div>
              </div>
            )}
            <dl className="capability-list">
              <div><dt>Connection</dt><dd>{offline ? "Offline, local flow available" : "Online, no remote service used"}</dd></div>
              <div><dt>Map renderer</dt><dd>{listOnly ? "List-only fallback" : "SVG and DOM, no WebGL"}</dd></div>
              <div><dt>Recap</dt><dd>Deterministic template, model adapter unavailable</dd></div>
              <div><dt>Release</dt><dd>{manifest?.releaseId ?? "Current fixture unavailable"}</dd></div>
            </dl>
          </section>

          <section className="dialog-section" aria-labelledby="provenance-heading">
            <h3 id="provenance-heading"><ArrowSquareOut size={20} aria-hidden="true" /> Fixture provenance</h3>
            {manifest && provenance ? (
              <>
                <p>{provenance.authoring}. This pack contains no real places, personal data, or third-party media.</p>
                <dl className="capability-list">
                  <div><dt>Fixture rights</dt><dd>{manifest.rights.fixtureLicense}</dd></div>
                  <div><dt>Geometry</dt><dd>{manifest.rights.mapGeometry}</dd></div>
                  <div><dt>Source check</dt><dd>{manifest.sources[0]?.checkedAt.slice(0, 10)}</dd></div>
                </dl>
              </>
            ) : (
              <p>Current fixture provenance is unavailable. Recovery export will not add fixture metadata or a recap.</p>
            )}
          </section>

          <section className="dialog-section limitation-section" aria-labelledby="limits-heading">
            <h3 id="limits-heading"><Prohibit size={20} aria-hidden="true" /> Cannot be claimed</h3>
            <ul>
              <li>Demand, user value, or a validated product</li>
              <li>Navigation, current opening, safety, or accessibility</li>
              <li>A real NUS location, route, or official service</li>
              <li>AI insight, location verification, or offline sync</li>
            </ul>
          </section>

          <section className="dialog-section" aria-labelledby="rights-heading">
            <h3 id="rights-heading"><DownloadSimple size={20} aria-hidden="true" /> Export and delete</h3>
            <p>Export creates a JSON download. Downloads are outside this prototype's control.</p>
            <Button className="button button-secondary" isDisabled={!hasSession} onPress={onExport}>
              Export local record
            </Button>
            <span className="save-status" aria-live="polite">{exportMessage}</span>

            <div className="danger-zone">
              {!confirmDelete ? (
                <>
                  <h4>Delete local session</h4>
                  <p>Removes the current session, revisions, and recap inputs from this app namespace. It cannot remove downloaded files.</p>
                  <Button className="button button-danger" isDisabled={!hasLocalData} onPress={() => setConfirmDelete(true)}>
                    <Trash size={18} aria-hidden="true" /> Review deletion
                  </Button>
                </>
              ) : (
                <div className="delete-confirm" role="group" aria-labelledby="delete-heading">
                  <Warning size={24} weight="bold" aria-hidden="true" />
                  <div>
                    <h4 id="delete-heading">Delete all local session data?</h4>
                    <p>This action is not undoable. Export first if you need a copy.</p>
                    <div className="inline-actions">
                      <Button className="button button-danger" isDisabled={deleteState === "deleting"} onPress={onDelete}>
                        {deleteState === "deleting" ? "Deleting" : "Delete local data"}
                      </Button>
                      <Button className="button button-quiet" ref={cancelRef} onPress={() => setConfirmDelete(false)}>Cancel</Button>
                    </div>
                  </div>
                </div>
              )}
              {deleteState === "error" && <p className="inline-error" role="alert">{deleteMessage}</p>}
              {deleteState === "deleted" && <p className="success-message" role="status">{deleteMessage}</p>}
            </div>
          </section>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

interface StopDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function StopDialog({ isOpen, onOpenChange, onConfirm }: StopDialogProps) {
  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} isDismissable className="modal-overlay">
      <Modal className="modal-shell modal-narrow">
        <Dialog aria-label="Stop and exit" className="dialog-content">
          <div className="dialog-header">
            <div>
              <p className="context-label">You are in control</p>
              <h2>Stop and exit</h2>
            </div>
            <Button className="icon-button" aria-label="Close stop dialog" onPress={() => onOpenChange(false)}>
              <X size={22} aria-hidden="true" />
            </Button>
          </div>
          <div className="stop-message">
            <StopCircle size={28} weight="bold" aria-hidden="true" />
            <div>
              <p>Stopping is allowed and has no penalty. The prototype will attempt to save your partial record and will show any failure.</p>
              <p>This prototype cannot see your surroundings or identify a safe exit. Stop using the screen and use a route or trusted help you already know if needed.</p>
            </div>
          </div>
          <div className="dialog-actions">
            <Button className="button button-danger" onPress={onConfirm}>Stop this session</Button>
            <Button className="button button-secondary" onPress={() => onOpenChange(false)}>Return to task</Button>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
