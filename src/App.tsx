import {
  ArrowCounterClockwise,
  Database,
  Moon,
  StopCircle,
  Sun,
  Warning,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Button } from "react-aria-components";
import areaFixture from "./fixtures/area-manifest.json";
import provenanceFixture from "./fixtures/provenance-manifest.json";
import { DataDialog, StopDialog } from "./components/AppDialogs";
import { FieldMap } from "./components/FieldMap";
import { OverviewView } from "./components/OverviewView";
import { PromptPanel, type SaveState } from "./components/PromptPanel";
import { RecapView } from "./components/RecapView";
import { deterministicRecapAdapter } from "./domain/recap";
import {
  areaManifestSchema,
  provenanceManifestSchema,
  validateFixturePair,
  type AreaManifest,
  type ProvenanceManifest,
} from "./domain/schema";
import { validatePersistedSessionForManifest } from "./domain/invariants";
import {
  areRouteAnchorsTemporallyUsable,
  deriveManifestTemporalEligibility,
  isAnchorTemporallyUsable,
} from "./domain/eligibility";
import {
  initialSessionState,
  sessionReducer,
  toPersistedSession,
  type CheckinStatus,
  type PersistedSession,
} from "./domain/session";
import {
  createPrototypeExport,
  createRawRecoveryExport,
  createSessionRecoveryExport,
  downloadJson,
  downloadRecoveryJson,
} from "./lib/export";
import { deleteSession, inspectSession, preflightStorage, saveSession, STORAGE_KEY } from "./lib/storage";

type PackState = "loading" | "ready" | "empty" | "error";
type DeleteState = "idle" | "deleting" | "error" | "deleted";
type Theme = "light" | "dark";
type PreflightStatus = "pending" | "ok" | "error";
type RecoveryState =
  | { kind: "valid"; session: PersistedSession; message: string }
  | { kind: "corrupt"; raw: string; message: string }
  | null;

const THEME_KEY = "osk.theme.v1";
const ALLOWED_DEMO_MODES = new Set([
  "list-only",
  "offline",
  "offline-first",
  "pack-error",
  "fixture-parse-error",
  "provenance-parse-error",
  "empty",
  "stale-pack",
  "storage-preflight-error",
  "storage-error",
  "delete-error",
]);

function getInitialTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // A storage preference failure must not block the core protocol.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function AppHeader({
  showStop,
  theme,
  onToggleTheme,
  onOpenData,
  onOpenStop,
}: {
  showStop: boolean;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenData: () => void;
  onOpenStop: () => void;
}) {
  return (
    <header className="app-header">
      <a className="brand" href="#main-content" aria-label="One Square Kilometre, skip to main content">
        <span className="brand-mark" aria-hidden="true">1</span>
        <span><strong>One Square Kilometre</strong><small>Local synthetic prototype</small></span>
      </a>
      <nav aria-label="Prototype controls">
        {showStop && (
          <Button className="header-action header-stop" aria-label="Stop and exit" onPress={onOpenStop}>
            <StopCircle size={19} aria-hidden="true" /> <span>Stop and exit</span>
          </Button>
        )}
        <Button className="header-action" aria-label="Data" onPress={onOpenData}>
          <Database size={19} aria-hidden="true" /> <span>Data</span>
        </Button>
        <Button className="icon-button" aria-label={`Use ${theme === "light" ? "dark" : "light"} theme`} onPress={onToggleTheme}>
          {theme === "light" ? <Moon size={20} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
        </Button>
      </nav>
    </header>
  );
}

function LoadingView() {
  return (
    <div className="loading-screen" aria-busy="true" aria-label="Loading local synthetic pack">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-copy" />
      <div className="skeleton skeleton-map" />
      <p>Loading local synthetic pack</p>
    </div>
  );
}

function PackProblem({
  state,
  onRetry,
  onOpenData,
}: {
  state: "empty" | "error";
  onRetry: () => void;
  onOpenData: () => void;
}) {
  return (
    <section className="problem-screen" aria-labelledby="screen-title">
      <Warning size={34} weight="bold" aria-hidden="true" />
      <h1 id="screen-title" tabIndex={-1}>{state === "empty" ? "No prompts are available" : "The synthetic pack could not be read"}</h1>
      <p>
        {state === "empty"
          ? "This demo will not show an empty map or invent anchors."
          : "No old or partial pack is treated as current. Local data controls remain available."}
      </p>
      <div className="problem-actions">
        <Button className="button button-secondary" onPress={onRetry}>Retry bundled fixture</Button>
        <Button className="button button-quiet" onPress={onOpenData}>Open data and recovery</Button>
      </div>
    </section>
  );
}

export function App() {
  const demoModes = useMemo(() => {
    if (!import.meta.env.DEV && import.meta.env.VITE_ENABLE_FAULT_LAB !== "1") return new Set<string>();
    const raw = new URLSearchParams(window.location.search).get("demo") ?? "";
    return new Set(raw.split(",").filter((mode) => ALLOWED_DEMO_MODES.has(mode)));
  }, []);
  const [manifest, setManifest] = useState<AreaManifest | null>(null);
  const [provenance, setProvenance] = useState<ProvenanceManifest | null>(null);
  const [packState, setPackState] = useState<PackState>("loading");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [session, dispatch] = useReducer(sessionReducer, initialSessionState);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isDataOpen, setDataOpen] = useState(false);
  const [isStopOpen, setStopOpen] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("clean");
  const [saveMessage, setSaveMessage] = useState("");
  const [deleteState, setDeleteState] = useState<DeleteState>("idle");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [exportMessage, setExportMessage] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [storagePreflightError, setStoragePreflightError] = useState("");
  const [preflightStatus, setPreflightStatus] = useState<PreflightStatus>("pending");
  const [storageConflict, setStorageConflict] = useState(false);
  const [recoveryState, setRecoveryState] = useState<RecoveryState>(null);
  const [temporalBoundaryReached, setTemporalBoundaryReached] = useState(false);
  const [clockNow, setClockNow] = useState(() => new Date());
  const storageTokenRef = useRef<string | null>(null);

  const offlineFirst = demoModes.has("offline-first");
  const offline = offlineFirst || demoModes.has("offline") || !isOnline;
  const listOnly = demoModes.has("list-only");
  const stalePack = demoModes.has("stale-pack");
  const currentPhase = session.current.phase;
  const hasSession = Boolean(
    session.current.startedAt ||
      Object.keys(session.current.checkins).length ||
      Object.keys(session.current.notes).length ||
      Object.keys(session.current.drafts).length ||
      session.past.length,
  );
  const storageRecoveryMessage = recoveryState?.message ?? "";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Theme persistence is optional and separate from session integrity.
    }
  }, [theme]);

  useEffect(() => {
    const update = (event: Event) => setIsOnline(event.type === "online");
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  useEffect(() => {
    const refreshClock = () => setClockNow(new Date());
    window.addEventListener("focus", refreshClock);
    document.addEventListener("visibilitychange", refreshClock);
    return () => {
      window.removeEventListener("focus", refreshClock);
      document.removeEventListener("visibilitychange", refreshClock);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const localResult = inspectSession();
      let parsedArea: AreaManifest | null = null;
      let parsedProvenance: ProvenanceManifest | null = null;
      try {
        if (demoModes.has("fixture-parse-error")) throw new Error("Injected fixture parse failure");
        parsedArea = areaManifestSchema.parse(areaFixture);
        if (demoModes.has("provenance-parse-error")) throw new Error("Injected provenance parse failure");
        parsedProvenance = provenanceManifestSchema.parse(provenanceFixture);
        const fixturePairIssues = validateFixturePair(parsedArea, parsedProvenance);
        if (fixturePairIssues.length > 0) throw new Error(fixturePairIssues[0]);
        setManifest(parsedArea);
        setProvenance(parsedProvenance);
        if (demoModes.has("pack-error") && loadAttempt === 0) setPackState("error");
        else if (demoModes.has("empty") && loadAttempt === 0) setPackState("empty");
        else setPackState("ready");
      } catch {
        setManifest(null);
        setProvenance(null);
        setPackState("error");
      }

      if (demoModes.has("storage-preflight-error")) {
        setStoragePreflightError("The storage-preflight-error demo mode blocked the write check.");
        setPreflightStatus("error");
      } else {
        const storageResult = preflightStorage();
        setStoragePreflightError(storageResult.ok ? "" : storageResult.message);
        setPreflightStatus(storageResult.ok ? "ok" : "error");
      }

      if (localResult.kind === "valid") {
        storageTokenRef.current = localResult.raw;
        const temporalState = parsedArea
          ? deriveManifestTemporalEligibility(parsedArea, new Date())
          : null;
        if (
          parsedArea &&
          parsedProvenance &&
          localResult.session.areaReleaseId === parsedArea.releaseId &&
          temporalState !== "expired" &&
          temporalState !== "not-yet-valid"
        ) {
          const issues = validatePersistedSessionForManifest(localResult.session, parsedArea);
          if (issues.length === 0) {
            dispatch({ type: "RESTORE", session: localResult.session });
            setRecoveryState(null);
          } else {
            setRecoveryState({
              kind: "valid",
              session: localResult.session,
              message: `The local session failed manifest integrity checks: ${issues[0]}.`,
            });
          }
        } else {
          setRecoveryState({
            kind: "valid",
            session: localResult.session,
            message: parsedArea
              ? temporalState === "expired" || temporalState === "not-yet-valid"
                ? `The current fixture is ${temporalState}; the existing session is read-only recovery data.`
                : `A local session belongs to release ${localResult.session.areaReleaseId}, not ${parsedArea.releaseId}.`
              : "The local session is valid, but the current fixture dependency is unavailable.",
          });
        }
      } else if (localResult.kind === "corrupt") {
        storageTokenRef.current = localResult.raw;
        setRecoveryState({ kind: "corrupt", raw: localResult.raw, message: localResult.message });
      } else {
        storageTokenRef.current = null;
        setRecoveryState(null);
      }
    }, 360);
    return () => window.clearTimeout(timer);
  }, [demoModes, loadAttempt]);

  useEffect(() => {
    if (!manifest) return;
    const now = Date.now();
    const futureBoundaries = [
      Date.parse(manifest.validity.verifiedAt),
      Date.parse(manifest.validity.reviewDueAt),
      Date.parse(manifest.validity.expiresAt),
      ...manifest.anchors.flatMap((anchor) => [
        Date.parse(anchor.verifiedAt),
        Date.parse(anchor.expiresAt),
      ]),
    ].filter((boundary) => Number.isFinite(boundary) && boundary > now);
    if (futureBoundaries.length === 0) return;
    const nextBoundary = Math.min(...futureBoundaries);
    const delay = Math.min(Math.max(nextBoundary - now + 1, 1), 2_147_483_647);
    const timer = window.setTimeout(() => setClockNow(new Date()), delay);
    return () => window.clearTimeout(timer);
  }, [clockNow, manifest]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue !== event.oldValue) {
        setStorageConflict(true);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (packState !== "ready" || currentPhase === "field") return;
    const heading = document.getElementById("screen-title");
    requestAnimationFrame(() => heading?.focus());
  }, [currentPhase, packState]);

  const selectedAnchor = manifest?.anchors.find((anchor) => anchor.id === session.current.selectedAnchorId) ?? manifest?.anchors[0];
  const actionableAnchors = manifest
    ? manifest.route.anchorIds.flatMap((anchorId) => {
        const anchor = manifest.anchors.find((candidate) => candidate.id === anchorId);
        return anchor ? [anchor] : [];
      })
    : [];
  const recordedCount = actionableAnchors.filter((anchor) => session.current.checkins[anchor.id]).length;
  const allAccounted = actionableAnchors.length > 0 && recordedCount === actionableAnchors.length;
  const temporalEligibility = manifest
    ? deriveManifestTemporalEligibility(manifest, clockNow)
    : "not-yet-valid";
  const temporalBlocked = temporalEligibility === "expired" || temporalEligibility === "not-yet-valid";
  const routeTemporalBlocked = manifest
    ? !areRouteAnchorsTemporallyUsable(manifest, clockNow)
    : true;
  const effectiveStalePack =
    stalePack || temporalBlocked || temporalBoundaryReached || routeTemporalBlocked;
  const temporallyExpiredAnchorIds = new Set(
    manifest?.anchors
      .filter((anchor) => !isAnchorTemporallyUsable(anchor, clockNow))
      .map((anchor) => anchor.id) ?? [],
  );
  const historyLimitReached = session.past.length >= 30;
  const recap = manifest
    ? deterministicRecapAdapter.generate(manifest, session.current, clockNow)
    : null;
  const hasLocalData = hasSession || Boolean(storageRecoveryMessage);
  const editBlockReason = storageConflict
    ? "Editing is paused because another tab changed this session. Load that version before continuing."
    : recoveryState
      ? "Editing is paused because browser storage is in recovery. Export or delete that data before starting another writable session."
      : "";

  function retrySave() {
    if (!manifest) return;
    if (editBlockReason) {
      setSaveState("error");
      setSaveMessage(editBlockReason);
      return;
    }
    if (demoModes.has("storage-error")) {
      setSaveState("error");
      setSaveMessage("The storage-error demo mode still blocks the write.");
      return;
    }
    const result = saveSession(
      toPersistedSession(session, manifest.releaseId, manifest.contentFingerprint),
      storageTokenRef.current,
    );
    if (result.ok) storageTokenRef.current = result.raw;
    else if (result.conflict) setStorageConflict(true);
    setSaveState(result.ok ? "saved" : "error");
    setSaveMessage(
      result.ok
        ? Object.keys(session.current.drafts).length > 0
          ? "Draft saved in this browser. It is not part of the recap until you save the observation."
          : "Saved in this browser on this device."
        : result.message,
    );
  }

  function startSession() {
    const first = actionableAnchors[0];
    if (manifest) {
      const currentTemporal = deriveManifestTemporalEligibility(manifest, new Date());
      if (currentTemporal === "expired" || currentTemporal === "not-yet-valid") {
        setTemporalBoundaryReached(true);
        return;
      }
    }
    if (
      !first ||
      offlineFirst ||
      effectiveStalePack ||
      preflightStatus !== "ok" ||
      !manifest ||
      storageRecoveryMessage ||
      storageConflict
    ) return;
    const latest = inspectSession();
    if (latest.kind === "valid") {
      storageTokenRef.current = latest.raw;
      setStorageConflict(true);
      return;
    }
    if (latest.kind === "corrupt") {
      setRecoveryState({ kind: "corrupt", raw: latest.raw, message: latest.message });
      return;
    }
    const action = { type: "START" as const, firstAnchorId: first.id, now: new Date().toISOString() };
    const candidate = sessionReducer(session, action);
    const result = saveSession(
      toPersistedSession(candidate, manifest.releaseId, manifest.contentFingerprint),
      storageTokenRef.current,
    );
    if (!result.ok) {
      if (result.conflict) setStorageConflict(true);
      else {
        setStoragePreflightError(result.message);
        setPreflightStatus("error");
      }
      return;
    }
    storageTokenRef.current = result.raw;
    dispatch(action);
    setDeleteState("idle");
    setDeleteMessage("");
    setExportMessage("");
    setSaveState("clean");
    setSaveMessage("");
  }

  function commitObservation(anchorId: string, status: CheckinStatus, text: string) {
    if (!manifest) return;
    if (editBlockReason) {
      setSaveState("error");
      setSaveMessage(editBlockReason);
      return;
    }
    const anchor = manifest.anchors.find((candidate) => candidate.id === anchorId);
    if (!anchor || !isAnchorTemporallyUsable(anchor, new Date())) {
      setSaveState("error");
      setSaveMessage("This anchor is outside its verified fixture window. Existing text remains available for recovery export or delete.");
      return;
    }
    const action = {
      type: "COMMIT_OBSERVATION" as const,
      anchorId,
      status,
      text,
      now: new Date().toISOString(),
    };
    const candidate = sessionReducer(session, action);
    if (candidate.lastAction === "Local change limit reached" || candidate.lastAction?.startsWith("Note is over")) {
      dispatch(action);
      setSaveState("error");
      setSaveMessage(candidate.lastAction);
      return;
    }
    setSaveState("saving");
    if (demoModes.has("storage-error")) {
      setSaveState("error");
      setSaveMessage("The storage-error demo mode blocked the commit. The earlier committed record is unchanged.");
      return;
    }
    const result = saveSession(
      toPersistedSession(candidate, manifest.releaseId, manifest.contentFingerprint),
      storageTokenRef.current,
    );
    if (!result.ok) {
      if (result.conflict) setStorageConflict(true);
      setSaveState("error");
      setSaveMessage(result.message);
      return;
    }
    storageTokenRef.current = result.raw;
    dispatch(action);
    setExportMessage("");
    setSaveState("saved");
    const savedRevision = candidate.current.notes[anchorId]?.revision;
    setSaveMessage(
      savedRevision
        ? `Observation saved in this browser, revision ${savedRevision}.`
        : "Observation status saved in this browser. No written note was added.",
    );
  }

  function updateDraft(anchorId: string, status: CheckinStatus | null, text: string) {
    if (!manifest) return;
    if (editBlockReason) {
      setSaveState("error");
      setSaveMessage(editBlockReason);
      return;
    }
    const anchor = manifest.anchors.find((candidate) => candidate.id === anchorId);
    if (!anchor || !isAnchorTemporallyUsable(anchor, new Date())) {
      setSaveState("error");
      setSaveMessage("This anchor expired before the draft could be updated. Existing local text remains available for recovery export or delete.");
      return;
    }
    const action = {
      type: "UPDATE_DRAFT" as const,
      anchorId,
      status,
      text,
      now: new Date().toISOString(),
    };
    const candidate = sessionReducer(session, action);
    setSaveState("saving");
    setExportMessage("");
    if (demoModes.has("storage-error")) {
      dispatch(action);
      setSaveState("error");
      setSaveMessage("The storage-error demo mode blocked the draft write. The text remains in this tab.");
      return;
    }
    const result = saveSession(
      toPersistedSession(candidate, manifest.releaseId, manifest.contentFingerprint),
      storageTokenRef.current,
    );
    dispatch(action);
    if (result.ok) {
      storageTokenRef.current = result.raw;
      setSaveState("saved");
      setSaveMessage(
        "Draft saved in this browser. It is not part of the recap until you save the observation.",
      );
    } else {
      if (result.conflict) setStorageConflict(true);
      setSaveState("error");
      setSaveMessage(`${result.message} The text remains in this tab.`);
    }
  }

  function reloadConflictingSession() {
    const latest = inspectSession();
    if (latest.kind === "valid" && manifest && latest.session.areaReleaseId === manifest.releaseId) {
      const issues = validatePersistedSessionForManifest(latest.session, manifest);
      if (issues.length > 0) {
        const message = `The newer local session failed manifest integrity checks: ${issues[0]}.`;
        setRecoveryState({
          kind: "valid",
          session: latest.session,
          message,
        });
        setStorageConflict(false);
        setSaveState("error");
        setSaveMessage(`${message} Editing remains read-only.`);
        return;
      }
      dispatch({ type: "RESTORE", session: latest.session });
      storageTokenRef.current = latest.raw;
      setRecoveryState(null);
      setStorageConflict(false);
      setSaveState("saved");
      setSaveMessage("Loaded the newer local version from browser storage.");
    } else if (latest.kind === "valid") {
      storageTokenRef.current = latest.raw;
      setRecoveryState({
        kind: "valid",
        session: latest.session,
        message: manifest
          ? `The newer session belongs to release ${latest.session.areaReleaseId}, not ${manifest.releaseId}.`
          : "The newer local session is valid, but its fixture dependency is unavailable.",
      });
      setStorageConflict(false);
      setSaveState("error");
      setSaveMessage("The newer local value belongs to recovery data. Editing remains read-only.");
    } else if (latest.kind === "corrupt") {
      storageTokenRef.current = latest.raw;
      setRecoveryState({ kind: "corrupt", raw: latest.raw, message: latest.message });
      setStorageConflict(false);
      setSaveState("error");
      setSaveMessage("The newer local value is corrupt recovery data. Editing remains read-only.");
    } else {
      dispatch({ type: "HARD_DELETE" });
      storageTokenRef.current = null;
      setRecoveryState(null);
      setStorageConflict(false);
      setSaveState("clean");
      setSaveMessage("The other tab removed the local session.");
    }
  }

  function openRecap() {
    setClockNow(new Date());
    dispatch({ type: "OPEN_RECAP" });
  }

  function correctRecord(anchorId: string) {
    setClockNow(new Date());
    dispatch({ type: "CORRECT_RECORD", anchorId });
  }

  function returnToRecap() {
    dispatch({ type: "RETURN_TO_RECAP" });
  }

  function returnFromRecap() {
    dispatch({ type: session.current.stoppedAt ? "RETURN_TO_STOPPED" : "RETURN_TO_FIELD" });
  }

  function undoLastChange() {
    if (!manifest) return;
    if (editBlockReason) {
      setSaveState("error");
      setSaveMessage(editBlockReason);
      return;
    }
    const undoNow = new Date();
    const packEligibility = deriveManifestTemporalEligibility(manifest, undoNow);
    if (packEligibility === "expired" || packEligibility === "not-yet-valid") {
      setClockNow(undoNow);
      setSaveState("error");
      setSaveMessage("Undo is unavailable because this fixture pack is outside its valid window.");
      return;
    }
    const action = { type: "UNDO" as const };
    const candidate = sessionReducer(session, action);
    const changedAnchorIds = manifest.anchors
      .filter((anchor) => {
        const id = anchor.id;
        return (
          session.current.checkins[id] !== candidate.current.checkins[id] ||
          JSON.stringify(session.current.notes[id] ?? null) !==
            JSON.stringify(candidate.current.notes[id] ?? null)
        );
      })
      .map((anchor) => anchor.id);
    const expiredChangedAnchor = manifest.anchors.find(
      (anchor) =>
        changedAnchorIds.includes(anchor.id) &&
        !isAnchorTemporallyUsable(anchor, undoNow),
    );
    if (expiredChangedAnchor) {
      setClockNow(undoNow);
      setSaveState("error");
      setSaveMessage(
        `Undo is unavailable because ${expiredChangedAnchor.name} is outside its fixture window.`,
      );
      return;
    }
    setSaveState("saving");
    setExportMessage("");
    const result = saveSession(
      toPersistedSession(candidate, manifest.releaseId, manifest.contentFingerprint),
      storageTokenRef.current,
    );
    if (!result.ok) {
      if (result.conflict) setStorageConflict(true);
      setSaveState("error");
      setSaveMessage(result.message);
      return;
    }
    storageTokenRef.current = result.raw;
    dispatch(action);
    setSaveState("saved");
    setSaveMessage("Undo saved in this browser on this device.");
  }

  function stopSession() {
    const action = {
      type: "STOP" as const,
      reason: "Participant chose stop and exit",
      now: new Date().toISOString(),
    };
    const candidate = sessionReducer(session, action);
    setSaveState("saving");
    const result = manifest && !demoModes.has("storage-error") && !editBlockReason
      ? saveSession(
          toPersistedSession(candidate, manifest.releaseId, manifest.contentFingerprint),
          storageTokenRef.current,
        )
      : { ok: false as const, conflict: false as const, message: "The stopped state could not be saved locally." };
    dispatch(action);
    if (result.ok) {
      storageTokenRef.current = result.raw;
      setSaveState("saved");
      setSaveMessage("Stopped state saved in this browser on this device.");
    } else {
      if (result.conflict) setStorageConflict(true);
      setSaveState("error");
      setSaveMessage(`${result.message} The session is stopped in this tab only.`);
    }
    setStopOpen(false);
  }

  function exportRecord() {
    const exportNow = new Date();
    setClockNow(exportNow);
    if (recoveryState) {
      try {
        const recoveryExport = recoveryState.kind === "valid"
          ? createSessionRecoveryExport(recoveryState.session)
          : createRawRecoveryExport(recoveryState.raw);
        downloadRecoveryJson(recoveryExport);
        setExportMessage("Recovery export created without current fixture metadata or recap.");
      } catch {
        setExportMessage("Recovery export was not created. The stored local value is unchanged.");
      }
      return;
    }
    if (manifest) {
      const currentTemporal = deriveManifestTemporalEligibility(manifest, exportNow);
      if (currentTemporal === "expired" || currentTemporal === "not-yet-valid") {
        try {
          downloadRecoveryJson(
            createSessionRecoveryExport(
              toPersistedSession(session, manifest.releaseId, manifest.contentFingerprint),
            ),
          );
          setExportMessage("Temporal recovery export created without expired fixture metadata or recap.");
        } catch {
          setExportMessage("Temporal recovery export was not created. The local session is unchanged.");
        }
        return;
      }
    }
    if (!manifest || !hasSession) return;
    if (saveState === "error") {
      try {
        downloadRecoveryJson(
          createSessionRecoveryExport(
            toPersistedSession(session, manifest.releaseId, manifest.contentFingerprint),
          ),
        );
        setExportMessage("Non-durable recovery export created without current fixture metadata or recap.");
      } catch {
        setExportMessage("Recovery export was not created. The in-memory session is unchanged.");
      }
      return;
    }
    if (saveState === "saving") {
      setExportMessage("Export was not created because the latest local write is not durable.");
      return;
    }
    if (!provenance) return;
    try {
      const persisted = toPersistedSession(session, manifest.releaseId, manifest.contentFingerprint);
      const issues = validatePersistedSessionForManifest(persisted, manifest);
      if (issues.length > 0) {
        setExportMessage(`Export was not created because session integrity failed: ${issues[0]}.`);
        return;
      }
      const exportRecap = deterministicRecapAdapter.generate(
        manifest,
        session.current,
        exportNow,
      );
      const payload = createPrototypeExport(
        manifest,
        provenance,
        persisted,
        exportRecap,
      );
      downloadJson(payload);
      setExportMessage("Export created. Downloads are outside this demo's control.");
    } catch {
      setExportMessage("Export was not created. Your local session is unchanged.");
    }
  }

  function hardDelete() {
    setDeleteState("deleting");
    setDeleteMessage("");
    if (demoModes.has("delete-error")) {
      setDeleteState("error");
      setDeleteMessage("Deletion was not completed. The delete-error demo mode retained the full session.");
      return;
    }
    const result = deleteSession();
    if (!result.ok) {
      setDeleteState("error");
      setDeleteMessage(`Deletion was not completed. ${result.message}`);
      return;
    }
    dispatch({ type: "HARD_DELETE" });
    storageTokenRef.current = null;
    setRecoveryState(null);
    setStorageConflict(false);
    setSaveState("clean");
    setDeleteState("deleted");
    setDeleteMessage("Local session deleted after storage verification. Downloaded files were not changed.");
  }

  const phase = currentPhase;

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <AppHeader
        showStop={phase === "field" || (phase === "correction" && !session.current.stoppedAt)}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
        onOpenData={() => setDataOpen(true)}
        onOpenStop={() => setStopOpen(true)}
      />

      {offline && !offlineFirst && (
        <div className="offline-banner" role="status">
          Offline. This loaded pack and your notes stay on this device. Nothing will sync.
        </div>
      )}

      {storageConflict && (
        <div className="conflict-banner" role="alert">
          <span>Another tab changed this local session. Editing is paused to prevent an overwrite.</span>
          <Button className="button button-quiet" onPress={reloadConflictingSession}>Load newer version</Button>
        </div>
      )}

      <main id="main-content" className="main-content">
        {packState === "loading" && <LoadingView />}
        {(packState === "empty" || packState === "error") && (
          <PackProblem
            state={packState}
            onOpenData={() => setDataOpen(true)}
            onRetry={() => {
              setPackState("loading");
              setPreflightStatus("pending");
              setStoragePreflightError("");
              setLoadAttempt((value) => value + 1);
            }}
          />
        )}
        {packState === "ready" && manifest && phase === "overview" && (
          <OverviewView
            manifest={manifest}
            canStart={!offlineFirst && !effectiveStalePack && preflightStatus === "ok" && !storageRecoveryMessage && !storageConflict}
            offlineFirst={offlineFirst}
            stalePack={effectiveStalePack}
            storageError={storagePreflightError || storageRecoveryMessage}
            storagePending={preflightStatus === "pending"}
            reviewDue={temporalEligibility === "review-due"}
            onStart={startSession}
            onOpenData={() => setDataOpen(true)}
          />
        )}
        {packState === "ready" && manifest && phase === "field" && selectedAnchor && (
          <div className="field-screen">
            <header className="field-screen-heading">
              <div>
                <p className="boundary-line">Synthetic place · Manual check-in · No live location</p>
                <h1 id="screen-title" tabIndex={-1}>Observe the pause conditions</h1>
              </div>
              <div className="progress-readout" aria-live="polite">
                <strong>{recordedCount} of {actionableAnchors.length}</strong>
                <span>actionable anchors recorded</span>
              </div>
            </header>

            <div className="field-layout">
              <FieldMap
                manifest={manifest}
                checkins={session.current.checkins}
                selectedAnchorId={selectedAnchor.id}
                listOnly={listOnly}
                temporallyExpiredAnchorIds={temporallyExpiredAnchorIds}
                onSelect={(anchorId) => {
                  setClockNow(new Date());
                  dispatch({ type: "SELECT_ANCHOR", anchorId });
                }}
              />
              <PromptPanel
                anchor={selectedAnchor}
                status={session.current.checkins[selectedAnchor.id]}
                note={session.current.notes[selectedAnchor.id]}
                draft={session.current.drafts[selectedAnchor.id]}
                editBlockReason={editBlockReason}
                blockedByHistory={historyLimitReached}
                temporallyExpired={temporallyExpiredAnchorIds.has(selectedAnchor.id)}
                saveState={saveState}
                saveMessage={saveMessage}
                onCommit={commitObservation}
                onDraftChange={updateDraft}
                onRetry={retrySave}
              />
            </div>

            <div className="action-tray" aria-label="Session actions">
              <Button
                className="button button-quiet"
                aria-label="Undo last change"
                isDisabled={session.past.length === 0}
                onPress={undoLastChange}
              >
                <ArrowCounterClockwise size={19} aria-hidden="true" />
                <span className="action-label-long">Undo last change</span>
                <span className="action-label-short">Undo</span>
              </Button>
              {saveState === "error" ? (
                <span className="tray-status tray-error" role="alert">{saveMessage}</span>
              ) : (
                <span className="tray-status" role="status">{session.lastAction}</span>
              )}
              <Button
                className="button button-primary"
                aria-label={allAccounted ? "Review complete record" : "Review partial record"}
                isDisabled={!allAccounted && recordedCount === 0}
                onPress={openRecap}
              >
                <span className="action-label-long">Review record</span>
                <span className="action-label-short">Review</span>
              </Button>
              <Button
                className="button button-danger button-stop-mobile"
                aria-label="Stop and exit"
                onPress={() => setStopOpen(true)}
              >
                <StopCircle size={19} aria-hidden="true" />
                <span className="action-label-long">Stop and exit</span>
                <span className="action-label-short">Stop</span>
              </Button>
            </div>
          </div>
        )}
        {packState === "ready" && manifest && phase === "correction" && selectedAnchor && (
          <section className="correction-screen" aria-labelledby="screen-title">
            <header className="correction-heading">
              <p className="boundary-line">
                Correction mode · Lifecycle unchanged · Exact record retained
              </p>
              <h1 id="screen-title" tabIndex={-1}>Correct a saved record</h1>
              <p>
                Saving creates a new revision. {session.current.stoppedAt
                  ? "The stopped session stays stopped and cannot resume."
                  : "Return to the recap when the correction is complete."}
              </p>
            </header>
            <PromptPanel
              anchor={selectedAnchor}
              status={session.current.checkins[selectedAnchor.id]}
              note={session.current.notes[selectedAnchor.id]}
              draft={session.current.drafts[selectedAnchor.id]}
              editBlockReason={editBlockReason}
              blockedByHistory={historyLimitReached}
              temporallyExpired={temporallyExpiredAnchorIds.has(selectedAnchor.id)}
              saveState={saveState}
              saveMessage={saveMessage}
              onCommit={commitObservation}
              onDraftChange={updateDraft}
              onRetry={retrySave}
            />
            <div className="correction-actions">
              <Button
                className="button button-quiet"
                isDisabled={session.past.length === 0}
                onPress={undoLastChange}
              >
                <ArrowCounterClockwise size={18} aria-hidden="true" /> Undo last change
              </Button>
              <Button className="button button-secondary" onPress={returnToRecap}>
                Return to recap
              </Button>
              {!session.current.stoppedAt && (
                <Button
                  className="button button-danger correction-stop-mobile"
                  onPress={() => setStopOpen(true)}
                >
                  Stop and exit
                </Button>
              )}
            </div>
          </section>
        )}
        {packState === "ready" && manifest && phase === "stopped" && (
          <section className="stopped-screen" aria-labelledby="screen-title">
            <StopCircle size={38} weight="bold" aria-hidden="true" />
            <p className="boundary-line">
              {saveState === "error" ? "Session stopped in this tab · Local save failed" : "Session stopped · Partial record kept locally"}
            </p>
            <h1 id="screen-title" tabIndex={-1}>You stopped this session</h1>
            <p>It cannot resume in this tab. You can review the partial record, export it, or delete local storage.</p>
            {saveState === "error" && (
              <div className="save-error" role="alert">
                <Warning size={22} weight="bold" aria-hidden="true" />
                <div>
                  <strong>Stop was not saved locally</strong>
                  <p>{saveMessage} Reloading may restore the earlier active session. Use recovery export before closing if you need this in-memory state.</p>
                </div>
              </div>
            )}
            <div className="overview-actions">
              <Button className="button button-primary" onPress={openRecap}>Review partial record</Button>
              <Button className="button button-secondary" onPress={exportRecord}>Export JSON</Button>
              <Button className="button button-quiet" onPress={() => setDataOpen(true)}>Data and deletion</Button>
            </div>
          </section>
        )}
        {packState === "ready" && manifest && phase === "recap" && recap && (
          <RecapView
            manifest={manifest}
            session={session.current}
            recap={recap}
            onCorrect={correctRecord}
            onReturn={returnFromRecap}
            onExport={exportRecord}
            onOpenData={() => setDataOpen(true)}
            exportMessage={exportMessage}
          />
        )}
      </main>

      <DataDialog
          isOpen={isDataOpen}
          hasSession={hasSession || Boolean(recoveryState)}
          hasLocalData={hasLocalData}
          manifest={manifest}
          provenance={provenance}
          offline={offline}
          listOnly={listOnly}
          deleteState={deleteState}
          deleteMessage={deleteMessage}
          exportMessage={exportMessage}
          recoveryMessage={storageRecoveryMessage}
          onOpenChange={setDataOpen}
          onExport={exportRecord}
          onDelete={hardDelete}
        />
      <StopDialog
        isOpen={isStopOpen}
        onOpenChange={setStopOpen}
        onConfirm={stopSession}
      />
    </div>
  );
}
