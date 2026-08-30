import {
  persistedSessionSchema,
  type PersistedSession,
} from "../domain/session";

export const STORAGE_KEY = "osk.synthetic-session.v1";
const PREFLIGHT_KEY_PREFIX = "osk.storage-preflight.v1";

export type StorageResult =
  | { ok: true }
  | { ok: false; message: string };

export type LoadSessionResult =
  | { kind: "missing" }
  | { kind: "valid"; session: PersistedSession; raw: string }
  | { kind: "corrupt"; raw: string; message: string };

export type SaveResult =
  | { ok: true; raw: string }
  | { ok: false; message: string; conflict?: boolean };

export function preflightStorage(): StorageResult {
  const preflightKey = `${PREFLIGHT_KEY_PREFIX}.${crypto.randomUUID()}`;
  try {
    const token = `check-${Date.now()}`;
    window.localStorage.setItem(preflightKey, token);
    if (window.localStorage.getItem(preflightKey) !== token) {
      return { ok: false, message: "Browser storage did not return the preflight value." };
    }
    window.localStorage.removeItem(preflightKey);
    if (window.localStorage.getItem(preflightKey) !== null) {
      return { ok: false, message: "Browser storage did not clear the preflight value." };
    }
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Browser storage is unavailable.",
    };
  } finally {
    try {
      window.localStorage.removeItem(preflightKey);
    } catch {
      // The returned failure remains authoritative. This is only a best-effort cleanup.
    }
  }
}

export function inspectSession(): LoadSessionResult {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return { kind: "missing" };
    const parsed = persistedSessionSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      return { kind: "corrupt", raw, message: "The stored session does not match this prototype schema." };
    }
    return { kind: "valid", session: parsed.data, raw };
  } catch (error) {
    return {
      kind: "corrupt",
      raw: (() => {
        try {
          return window.localStorage.getItem(STORAGE_KEY) ?? "";
        } catch {
          return "";
        }
      })(),
      message: error instanceof Error ? error.message : "The stored session could not be read.",
    };
  }
}

export function loadSession(): PersistedSession | null {
  const result = inspectSession();
  return result.kind === "valid" ? result.session : null;
}

export function saveSession(
  session: PersistedSession,
  expectedRaw?: string | null,
): SaveResult {
  try {
    const validated = persistedSessionSchema.safeParse(session);
    if (!validated.success) {
      return {
        ok: false,
        message: "The candidate session failed runtime schema validation and was not saved.",
      };
    }
    if (expectedRaw !== undefined && window.localStorage.getItem(STORAGE_KEY) !== expectedRaw) {
      return {
        ok: false,
        conflict: true,
        message: "Another tab changed the local session before this write.",
      };
    }
    const raw = JSON.stringify(validated.data);
    window.localStorage.setItem(STORAGE_KEY, raw);
    if (window.localStorage.getItem(STORAGE_KEY) !== raw) {
      return { ok: false, message: "Browser storage did not return the saved session." };
    }
    return { ok: true, raw };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "The local session could not be saved.",
    };
  }
}

export function deleteSession(): StorageResult {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    if (window.localStorage.getItem(STORAGE_KEY) !== null) {
      return {
        ok: false,
        message: "The local session is still present after deletion.",
      };
    }
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "The local session could not be deleted.",
    };
  }
}
