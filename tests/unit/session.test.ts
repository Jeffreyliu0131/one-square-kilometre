import { describe, expect, it } from "vitest";
import {
  initialSessionState,
  persistedSessionSchema,
  sessionReducer,
  toPersistedSession,
  type SessionState,
} from "../../src/domain/session";

const now = "2026-08-30T10:00:00.000Z";

describe("session reducer", () => {
  it("keeps autosaved drafts separate from committed notes and undo history", () => {
    let state = sessionReducer(initialSessionState, {
      type: "START",
      firstAnchorId: "lantern-steps",
      now,
    });
    state = sessionReducer(state, {
      type: "UPDATE_DRAFT",
      anchorId: "lantern-steps",
      status: "found",
      text: "The lower edge has a broad ledge.",
      now,
    });

    expect(state.current.drafts["lantern-steps"]?.text).toContain("lower edge");
    expect(state.current.notes["lantern-steps"]).toBeUndefined();
    expect(state.current.checkins["lantern-steps"]).toBeUndefined();
    expect(state.past).toHaveLength(0);

    state = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "found",
      text: "The lower edge has a broad ledge.",
      now,
    });

    expect(state.current.drafts["lantern-steps"]).toBeUndefined();
    expect(state.current.notes["lantern-steps"]?.revision).toBe(1);
    expect(state.current.checkins["lantern-steps"]).toBe("found");
    expect(state.past).toHaveLength(1);
  });

  it("creates a correction revision and restores the prior committed snapshot on undo", () => {
    let state = sessionReducer(initialSessionState, { type: "START", firstAnchorId: "lantern-steps", now });
    state = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "found",
      text: "First note",
      now,
    });
    state = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "unsure",
      text: "Corrected note",
      now: "2026-08-30T10:01:00.000Z",
    });

    expect(state.current.notes["lantern-steps"]?.revision).toBe(2);
    expect(state.current.checkins["lantern-steps"]).toBe("unsure");

    state = sessionReducer(state, { type: "UNDO" });
    expect(state.current.notes["lantern-steps"]?.text).toBe("First note");
    expect(state.current.notes["lantern-steps"]?.revision).toBe(1);
    expect(state.current.checkins["lantern-steps"]).toBe("found");
  });

  it("undoes only committed evidence and preserves unrelated durable drafts", () => {
    let state = sessionReducer(initialSessionState, { type: "START", firstAnchorId: "lantern-steps", now });
    state = sessionReducer(state, {
      type: "UPDATE_DRAFT",
      anchorId: "rainline-court",
      status: "unsure",
      text: "Old B draft",
      now,
    });
    state = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "found",
      text: "Committed A",
      now,
    });
    state = sessionReducer(state, {
      type: "UPDATE_DRAFT",
      anchorId: "rainline-court",
      status: "unsure",
      text: "New B draft",
      now: "2026-08-30T10:01:00.000Z",
    });
    state = sessionReducer(state, { type: "UNDO" });

    expect(state.current.checkins["lantern-steps"]).toBeUndefined();
    expect(state.current.notes["lantern-steps"]).toBeUndefined();
    expect(state.current.drafts["rainline-court"]?.text).toBe("New B draft");
  });

  it("preserves exact non-empty text and never reuses a note source revision after clearing", () => {
    let state = sessionReducer(initialSessionState, { type: "START", firstAnchorId: "lantern-steps", now });
    state = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "found",
      text: "  first line\nsecond line  ",
      now,
    });
    expect(state.current.notes["lantern-steps"]?.text).toBe("  first line\nsecond line  ");
    expect(state.current.notes["lantern-steps"]?.revision).toBe(1);

    state = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "found",
      text: "   ",
      now: "2026-08-30T10:01:00.000Z",
    });
    expect(state.current.notes["lantern-steps"]).toBeUndefined();

    state = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "unsure",
      text: "replacement",
      now: "2026-08-30T10:02:00.000Z",
    });
    expect(state.current.notes["lantern-steps"]?.revision).toBe(2);
    expect(state.current.notes["lantern-steps"]?.id).toBe("note-lantern-steps");
  });

  it("treats an identical repeated commit as idempotent", () => {
    let state = sessionReducer(initialSessionState, { type: "START", firstAnchorId: "lantern-steps", now });
    const action = {
      type: "COMMIT_OBSERVATION" as const,
      anchorId: "lantern-steps",
      status: "found" as const,
      text: "Exact note",
      now,
    };
    state = sessionReducer(state, action);
    const repeated = sessionReducer(state, action);
    expect(repeated.current.notes["lantern-steps"]?.revision).toBe(1);
    expect(repeated.past).toHaveLength(1);
    expect(repeated.lastAction).toBe("No new changes to save");
  });

  it("hard deletion clears current text, drafts, and retained snapshots", () => {
    let state = sessionReducer(initialSessionState, { type: "START", firstAnchorId: "lantern-steps", now });
    state = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "found",
      text: "Synthetic note",
      now,
    });
    state = sessionReducer(state, { type: "HARD_DELETE" });

    expect(state.current.notes).toEqual({});
    expect(state.current.drafts).toEqual({});
    expect(state.current.checkins).toEqual({});
    expect(state.current.startedAt).toBeNull();
    expect(state.past).toEqual([]);
  });

  it("blocks a new committed mutation at the 30-change lineage cap without dropping history", () => {
    const fullState: SessionState = {
      ...initialSessionState,
      current: { ...structuredClone(initialSessionState.current), phase: "field", startedAt: now },
      past: Array.from({ length: 30 }, () => structuredClone(initialSessionState.current)),
    };
    const next = sessionReducer(fullState, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "found",
      text: "Blocked note",
      now,
    });

    expect(next.past).toHaveLength(30);
    expect(next.current.notes["lantern-steps"]).toBeUndefined();
    expect(next.lastAction).toBe("Local change limit reached");

    const stopped = sessionReducer(fullState, { type: "STOP", reason: "Participant stopped", now });
    expect(stopped.current.phase).toBe("stopped");
    expect(stopped.past).toHaveLength(30);
  });

  it("retains an oversize draft without silently committing or truncating it", () => {
    const oversize = "○".repeat(801);
    let state = sessionReducer(initialSessionState, { type: "START", firstAnchorId: "lantern-steps", now });
    state = sessionReducer(state, {
      type: "UPDATE_DRAFT",
      anchorId: "lantern-steps",
      status: "found",
      text: oversize,
      now,
    });
    expect(Array.from(state.current.drafts["lantern-steps"]?.text ?? "")).toHaveLength(801);

    const blocked = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "found",
      text: oversize,
      now,
    });
    expect(blocked.current.notes["lantern-steps"]).toBeUndefined();
    expect(blocked.current.drafts["lantern-steps"]?.text).toBe(oversize);
    expect(blocked.lastAction).toMatch(/over the 800-character/);
  });

  it("counts exact leading and trailing whitespace in the 800-character commit limit", () => {
    const exactOversize = `${"x".repeat(800)} `;
    let state = sessionReducer(initialSessionState, {
      type: "START",
      firstAnchorId: "lantern-steps",
      now,
    });
    state = sessionReducer(state, {
      type: "UPDATE_DRAFT",
      anchorId: "lantern-steps",
      status: "found",
      text: exactOversize,
      now,
    });
    const blocked = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "found",
      text: exactOversize,
      now,
    });

    expect(blocked.current.notes["lantern-steps"]).toBeUndefined();
    expect(blocked.lastAction).toMatch(/over the 800-character/);
    expect(
      persistedSessionSchema.safeParse(
        toPersistedSession(blocked, "synthetic-release", "fnv1a32:00000000", now),
      ).success,
    ).toBe(true);
  });

  it("keeps a stopped session terminal under direct reducer actions", () => {
    let state = sessionReducer(initialSessionState, { type: "START", firstAnchorId: "lantern-steps", now });
    state = sessionReducer(state, { type: "STOP", reason: "Participant stopped", now });
    const returned = sessionReducer(state, { type: "RETURN_TO_FIELD" });
    const mutated = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "found",
      text: "Should not be committed",
      now,
    });

    expect(returned).toBe(state);
    expect(mutated).toBe(state);
    expect(state.current.phase).toBe("stopped");
    expect(state.current.notes).toEqual({});
  });

  it("allows correction without resuming a stopped session", () => {
    let state = sessionReducer(initialSessionState, { type: "START", firstAnchorId: "lantern-steps", now });
    state = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "found",
      text: "Before stop",
      now,
    });
    state = sessionReducer(state, { type: "STOP", reason: "Participant stopped", now });
    state = sessionReducer(state, { type: "OPEN_RECAP" });
    state = sessionReducer(state, { type: "CORRECT_RECORD", anchorId: "lantern-steps" });
    state = sessionReducer(state, {
      type: "COMMIT_OBSERVATION",
      anchorId: "lantern-steps",
      status: "unsure",
      text: "Corrected after stop",
      now: "2026-08-30T10:03:00.000Z",
    });

    expect(state.current.phase).toBe("correction");
    expect(state.current.stoppedAt).toBe(now);
    expect(state.current.notes["lantern-steps"]?.revision).toBe(2);
    state = sessionReducer(state, { type: "RETURN_TO_RECAP" });
    expect(state.current.phase).toBe("recap");
    expect(state.current.stoppedAt).toBe(now);
    expect(sessionReducer(state, { type: "RETURN_TO_FIELD" })).toBe(state);
  });
});
