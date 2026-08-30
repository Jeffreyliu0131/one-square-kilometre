# Actual implementation architecture

Status: local portfolio prototype only. This document describes code that exists; it does not select a production architecture or close any field P0/P1.

## Runtime shape

```text
Bundled synthetic JSON
  -> Zod structure and cross-reference validation
  -> React projection
       -> SVG and DOM map + canonical anchor list
       -> reducer session state
       -> localStorage repository
       -> deterministic recap adapter
       -> JSON export and verified hard delete

Service worker
  -> same-origin HTML, JS, CSS and manifest cache only

External API, model, tile, GPS, media, analytics and account
  -> absent
```

The application is a client-only React 19, TypeScript, and Vite SPA. React Aria Components supplies accessible button, radio, field, modal, and focus behaviour. Phosphor is the only icon family. CSS variables provide one light and one dark theme.

## Source and manifest boundary

`src/fixtures/area-manifest.json` and `src/fixtures/provenance-manifest.json` are project-authored synthetic fixtures. `src/domain/schema.ts` uses deep strict objects and validates:

- 4 to 6 total anchors and 4 to 6 route references;
- unique anchor, source, and route IDs;
- existing route and source references;
- route anchors cannot be stale or unsupported;
- non-authoritative and CC0 fixture declarations.
- a canonical content fingerprint, exact `fixtureSet`/release pairing, and declared asset existence.

The build runs the same fingerprint/provenance check before compilation. The fingerprint establishes bundled content identity, not truth, authorisation, or tamper-proof security.

The active route contains four usable anchors. Two additional anchors demonstrate stale and unsupported states without making them executable route steps.

## State and persistence

`src/domain/session.ts` keeps one bounded session:

- `overview | field | correction | recap | stopped` phase;
- participant-reported `found | unsure | skipped` values;
- current notes, recoverable drafts, and at most 30 committed observation snapshots;
- a separate stop timestamp and reason.

Draft edits do not enter recap or undo history. A committed observation is constructed first, saved successfully to `localStorage`, and only then published to the current reducer projection. A failed commit retains the draft and prior committed projection. A note commit is limited to 800 Unicode characters; an oversize draft remains visible and is not silently truncated.

Correction is a separate phase. It never resumes a stopped session; active correction retains an immediate Stop path. Non-empty note text is preserved exactly. Note identity/revision is monotonic across retained snapshots, and restore rejects reused or backwards source lineage.

`osk.synthetic-session.v1` is the only session key. Start is blocked until a write, read, remove preflight succeeds. Persisted objects are strict, carry release plus content fingerprint, and are cross-validated against every current and retained anchor reference. Malformed, mismatched, empty-string, or dependency-blocked data enters a manifest-independent recovery surface with recovery export and hard delete. Recovery globally blocks draft, commit, retry and undo writes, so an incompatible external value cannot be overwritten by older in-memory state.

Every durable write compares an opaque copy of the last observed storage envelope before replacing it. Any session-key event, including one received by an idle tab, places that tab into a read-only conflict state. This is best-effort single-writer protection, not atomic multi-tab concurrency.

Undo restores the prior committed observation snapshot. The 30-change cap rejects another committed mutation without evicting earlier text. Stop, export, and delete remain available at the cap.

## Recap contract

`src/domain/recap.ts` exposes a removable adapter seam:

- `deterministicRecapAdapter` is the only enabled adapter;
- `unavailableModelAdapter` is explicitly disabled and never receives input;
- current user text is copied exactly and linked to note ID and revision;
- only current synthetic fixture metadata is displayed as metadata;
- unsure, low-confidence, stale, and unsupported dependencies produce abstention.

The UI labels the result an immediate synthetic portfolio preview and explicitly says it is not the 48-hour research outcome or field evidence.

## Export and delete

Export creates an in-memory JSON Blob containing the area identity, provenance, current session, retained snapshots, recap, and exclusions. The object URL is revoked immediately after the browser receives the download action.

Hard delete:

1. enters a deleting state, causing pending persistence work to be cancelled;
2. removes `osk.synthetic-session.v1`;
3. reads the key back and requires `null`;
4. clears current notes, drafts, check-ins, and retained snapshots;
5. reports that downloaded files are outside app control.

A delete failure keeps the complete in-memory and stored record and never displays success.

Stop is a safety exception: confirmation always removes the current tab from the field task, while synchronously attempting to persist the stopped candidate. Success survives immediate reload. Failure shows a persistent tab-only warning and offers a non-durable recovery export instead of claiming the stop was saved.

## Offline and no-WebGL

`public/sw.js` handles same-origin GET app assets only. One successful online load installs the worker; a controlled online reload fills the current versioned shell cache. Cold-start offline is unsupported. Production-preview tests then cut network access and complete start, note, recap, and cache inspection on desktop and mobile.

Runtime text remains in `localStorage`; it is never written to Cache Storage. The map is SVG and DOM, so disabling WebGL makes no behavioural change. `?demo=list-only` removes the SVG presentation while leaving the full protocol available through the anchor list.

One injected-clock eligibility function derives not-yet-valid, review-due, and expired states. Start requires the pack and every active route anchor to be temporally usable. Draft, commit and Undo recheck the action boundary; selection/review/correction refresh the clock; a boundary timer re-evaluates an open recap. Export captures one current time and regenerates recap. Existing local records remain recoverable, exportable, and deletable.

## Verification boundaries

Automated verification covers Chromium desktop and mobile emulation, the full keyboard activation chain, axe WCAG A/AA rules, reduced motion, 320px overflow, 390px sticky-action geometry, recovery/error paths, export, hard delete, exact-origin network denial, no WebGL, bundle budgets, fixed-size screenshot assets, and warm offline. The in-app browser was also used for manual desktop and 390px operation.

Manual VoiceOver, Safari, Firefox, real assistive-technology users, real devices, production hosting, and real private data are not verified.
