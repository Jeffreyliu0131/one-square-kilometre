import { z } from "zod";

export const checkinStatusSchema = z.enum(["found", "unsure", "skipped"]);
export type CheckinStatus = z.infer<typeof checkinStatusSchema>;

const committedTextSchema = z.string().refine(
  (value) => Array.from(value).length <= 800,
  "Committed text must be 800 Unicode characters or fewer",
);

export const noteSchema = z.object({
  id: z.string().min(1),
  anchorId: z.string().min(1),
  text: committedTextSchema,
  updatedAt: z.string().datetime(),
  revision: z.number().int().min(1),
}).strict();

export type FieldNote = z.infer<typeof noteSchema>;

export const draftSchema = z.object({
  anchorId: z.string().min(1),
  text: z.string().max(4000),
  status: checkinStatusSchema.nullable(),
  updatedAt: z.string().datetime(),
}).strict();

export type ObservationDraft = z.infer<typeof draftSchema>;

export const sessionSnapshotSchema = z.object({
  phase: z.enum(["overview", "field", "correction", "recap", "stopped"]),
  selectedAnchorId: z.string().nullable(),
  checkins: z.record(z.string(), checkinStatusSchema),
  notes: z.record(z.string(), noteSchema),
  drafts: z.record(z.string(), draftSchema).default({}),
  startedAt: z.string().datetime().nullable(),
  stoppedAt: z.string().datetime().nullable(),
  stopReason: z.string().nullable(),
}).strict();

export type SessionSnapshot = z.infer<typeof sessionSnapshotSchema>;

export const persistedSessionSchema = z.object({
  schemaVersion: z.literal("1.0.0"),
  areaReleaseId: z.string().min(1),
  contentFingerprint: z.string().min(1),
  savedAt: z.string().datetime(),
  current: sessionSnapshotSchema,
  past: z.array(sessionSnapshotSchema).max(30),
}).strict();

export type PersistedSession = z.infer<typeof persistedSessionSchema>;

export interface SessionState {
  current: SessionSnapshot;
  past: SessionSnapshot[];
  lastAction: string | null;
}

export type SessionAction =
  | { type: "START"; firstAnchorId: string; now?: string }
  | { type: "SELECT_ANCHOR"; anchorId: string }
  | {
      type: "UPDATE_DRAFT";
      anchorId: string;
      status: CheckinStatus | null;
      text: string;
      now?: string;
    }
  | {
      type: "COMMIT_OBSERVATION";
      anchorId: string;
      status: CheckinStatus;
      text: string;
      now?: string;
    }
  | { type: "STOP"; reason: string; now?: string }
  | { type: "OPEN_RECAP" }
  | { type: "CORRECT_RECORD"; anchorId: string }
  | { type: "RETURN_TO_RECAP" }
  | { type: "RETURN_TO_FIELD" }
  | { type: "RETURN_TO_STOPPED" }
  | { type: "UNDO" }
  | { type: "RESTORE"; session: PersistedSession }
  | { type: "HARD_DELETE" };

export const initialSnapshot: SessionSnapshot = {
  phase: "overview",
  selectedAnchorId: null,
  checkins: {},
  notes: {},
  drafts: {},
  startedAt: null,
  stoppedAt: null,
  stopReason: null,
};

export const initialSessionState: SessionState = {
  current: initialSnapshot,
  past: [],
  lastAction: null,
};

function cloneSnapshot(snapshot: SessionSnapshot): SessionSnapshot {
  return structuredClone(snapshot);
}

function commit(
  state: SessionState,
  next: SessionSnapshot,
  label: string,
): SessionState {
  if (state.past.length >= 30) {
    return { ...state, lastAction: "Local change limit reached" };
  }
  return {
    current: next,
    past: [...state.past, cloneSnapshot(state.current)],
    lastAction: label,
  };
}

function nextNoteRevision(state: SessionState, anchorId: string): number {
  const revisions = [state.current, ...state.past]
    .map((snapshot) => snapshot.notes[anchorId]?.revision ?? 0);
  return Math.max(0, ...revisions) + 1;
}

export function sessionReducer(
  state: SessionState,
  action: SessionAction,
): SessionState {
  const now = "now" in action && action.now ? action.now : new Date().toISOString();

  switch (action.type) {
    case "START":
      if (state.current.startedAt || state.current.stoppedAt) return state;
      return {
        ...state,
        current: {
          ...state.current,
          phase: "field",
          selectedAnchorId: action.firstAnchorId,
          startedAt: now,
          stoppedAt: null,
          stopReason: null,
        },
        lastAction: "Started the synthetic field session",
      };
    case "SELECT_ANCHOR":
      return {
        ...state,
        current: { ...state.current, selectedAnchorId: action.anchorId },
        lastAction: null,
      };
    case "UPDATE_DRAFT":
      if (
        state.current.phase !== "field" &&
        state.current.phase !== "correction"
      ) return state;
      if (state.current.stoppedAt && state.current.phase !== "correction") return state;
      return {
        ...state,
        current: {
          ...state.current,
          drafts: {
            ...state.current.drafts,
            [action.anchorId]: {
              anchorId: action.anchorId,
              status: action.status,
              text: action.text,
              updatedAt: now,
            },
          },
        },
        lastAction: null,
      };
    case "COMMIT_OBSERVATION": {
      if (
        state.current.phase !== "field" &&
        state.current.phase !== "correction"
      ) return state;
      if (state.current.stoppedAt && state.current.phase !== "correction") return state;
      if (Array.from(action.text).length > 800) {
        return { ...state, lastAction: "Note is over the 800-character commit limit" };
      }
      const existing = state.current.notes[action.anchorId];
      const exactText = action.text;
      if (
        state.current.checkins[action.anchorId] === action.status &&
        (existing?.text ?? "") === exactText &&
        !state.current.drafts[action.anchorId]
      ) {
        return { ...state, lastAction: "No new changes to save" };
      }
      const notes = { ...state.current.notes };
      const drafts = { ...state.current.drafts };
      const text = exactText;

      if (text.trim()) {
        notes[action.anchorId] = {
          id: existing?.id ?? `note-${action.anchorId}`,
          anchorId: action.anchorId,
          text,
          updatedAt: now,
          revision: nextNoteRevision(state, action.anchorId),
        };
      } else {
        delete notes[action.anchorId];
      }
      delete drafts[action.anchorId];
      const undoDrafts = { ...state.current.drafts };
      delete undoDrafts[action.anchorId];

      return commit(
        {
          ...state,
          current: { ...state.current, drafts: undoDrafts },
        },
        {
          ...state.current,
          selectedAnchorId: action.anchorId,
          checkins: { ...state.current.checkins, [action.anchorId]: action.status },
          notes,
          drafts,
        },
        existing ? "Observation corrected" : "Observation saved locally",
      );
    }
    case "STOP":
      if (
        (state.current.phase !== "field" && state.current.phase !== "correction") ||
        state.current.stoppedAt
      ) return state;
      return {
        ...state,
        current: {
          ...state.current,
          phase: "stopped",
          stoppedAt: now,
          stopReason: action.reason,
        },
        lastAction: "Session stopped",
      };
    case "OPEN_RECAP":
      if (state.current.phase !== "field" && state.current.phase !== "stopped") return state;
      return {
        ...state,
        current: { ...state.current, phase: "recap" },
        lastAction: "Recap opened",
      };
    case "CORRECT_RECORD":
      if (state.current.phase !== "recap") return state;
      return {
        ...state,
        current: {
          ...state.current,
          phase: "correction",
          selectedAnchorId: action.anchorId,
        },
        lastAction: null,
      };
    case "RETURN_TO_RECAP":
      if (state.current.phase !== "correction") return state;
      return {
        ...state,
        current: { ...state.current, phase: "recap" },
        lastAction: "Recap reopened",
      };
    case "RETURN_TO_FIELD":
      if (state.current.stoppedAt) return state;
      return {
        ...state,
        current: { ...state.current, phase: "field" },
        lastAction: null,
      };
    case "RETURN_TO_STOPPED":
      if (!state.current.stoppedAt) return state;
      return {
        ...state,
        current: { ...state.current, phase: "stopped" },
        lastAction: null,
      };
    case "UNDO": {
      const previous = state.past.at(-1);
      if (!previous) return state;
      return {
        current: {
          ...state.current,
          checkins: previous.checkins,
          notes: previous.notes,
          drafts: state.current.drafts,
        },
        past: state.past.slice(0, -1),
        lastAction: "Last change undone",
      };
    }
    case "RESTORE":
      return {
        current: action.session.current,
        past: action.session.past,
        lastAction: "Local session restored",
      };
    case "HARD_DELETE":
      return {
        current: cloneSnapshot(initialSnapshot),
        past: [],
        lastAction: "Local session deleted",
      };
    default:
      return state;
  }
}

export function toPersistedSession(
  state: SessionState,
  areaReleaseId: string,
  contentFingerprint: string,
  now = new Date().toISOString(),
): PersistedSession {
  return {
    schemaVersion: "1.0.0",
    areaReleaseId,
    contentFingerprint,
    savedAt: now,
    current: state.current,
    past: state.past,
  };
}
