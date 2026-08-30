---
artifact: independent-code-security-review
project: One Square Kilometre
review_date: 2026-08-30
review_scope: local-portfolio-prototype-only
reviewer_independence: did-not-author-initial-implementation
review_round: 1
status: fail-p1-open
p0_open: 0
p1_open: 5
evidence_effect: none
field_p0_effect: none
verdict: validate-first
---

# Independent code and security review

## 1. Verdict

本轮首审结论为 **FAIL, 0 P0 / 5 P1 open**。现有实现已经证明 happy path、deterministic recap、stale/unsupported 单项阻断、hard delete、Chromium a11y 基线、no-WebGL、no-external-request 和 warm-offline 演示可以运行；但这些通过项没有覆盖 local-data recovery、第二标签页覆盖、stop durability 和 same-release envelope 完整性。

严重度只针对 D-017 授权的 synthetic local portfolio prototype。本文没有把真实 field P0/P1 混入代码 finding，也不改变 `Validate first`、PRD 未批准和禁止外部 field use 的状态。

在 5 个 P1 关闭或通过移除对应能力关闭前，不应把 implementation state 写成 complete，也不应宣称 local data rights、multi-tab protection、terminal stop persistence 或 recovery 已完整实现。

## 2. Review inputs and independent checks

已只读检查：

- `src/`、`public/sw.js`、`index.html`、build/test 配置和全部 fixtures；
- unit/integration、desktop/mobile E2E、axe、offline 和 bundle-budget tests；
- `README.md`、`implementation/ARCHITECTURE.md`、`PRIVACY.md`、`KNOWN_LIMITATIONS.md`、`FIXTURES_AND_LICENSES.md`、`TEST_EVIDENCE.md`；
- D-017、STATUS 和 implementation council 三份 memo 及 disposition。

独立运行证据：

| Check | Result | Reviewer note |
|---|---|---|
| ESLint | PASS | `--max-warnings 0` |
| TypeScript | PASS | project references compiled |
| Vitest | PASS, 18 tests at last reviewer run | source was still changing during review; final count must be rerun after closure |
| Production build | PASS | no source map; current generated asset names recorded by Vite |
| Desktop/mobile Chromium E2E | PASS, 30 tests | 15 per project on the reviewed pre-closure slice |
| Production warm offline | PASS, 2 tests | desktop and mobile exact warm-load sequence |
| Coverage | PASS as a measurement, not a gate | reviewer-observed domain/lib coverage was 73.42% statements, 59.78% branches, 92% functions, 73.52% lines before final closure edits |

The first aggregate `pnpm verify` attempt stopped only because the review sandbox could not bind `127.0.0.1:4317`; the same browser suites passed when the local test server was authorised. This is not logged as a product failure. The final aggregate gate still needs one clean post-fix run.

## 3. P0 findings

None in the authorised local synthetic scope.

## 4. P1 findings

### P1-01: Valid old-release data cannot be exported, and a real fixture boot failure removes the data-control surface

**Evidence**

- `src/App.tsx:187-195` recognises a valid release mismatch but retains only a message; it does not retain the parsed old envelope for recovery export.
- `src/App.tsx:343-356` exports only the current in-memory session and requires `hasSession`; a mismatched session is never restored into that state.
- `src/components/AppDialogs.tsx:116-118` disables export when `hasSession` is false.
- `src/App.tsx:511-528` renders `DataDialog` only when the current area manifest parsed successfully.
- `src/App.tsx:119` parses provenance during render, outside the area-fixture error boundary. Invalid provenance can throw before any recovery UI appears.
- `src/App.tsx:98-107` promises that local data controls remain available on a pack error, but the actual `manifest === null` path cannot fulfil that promise. The `?demo=pack-error` test is not equivalent because it first parses and stores a valid manifest.

**Impact**

A valid synthetic note from release R0 is protected from overwrite but can only be deleted, not exported. If a future local edit makes the bundled area or provenance invalid, a user with a valid local envelope can lose UI access to both export and deletion. This breaks the prototype's explicit data-rights boundary even though no real data is authorised.

**Minimum fix**

Introduce a boot result that independently holds `area`, `provenance`, and `storedEnvelope` as typed success/error values. Render a manifest-independent Data/Recovery shell on every boot state. For a schema-valid release mismatch, offer a `RecoveryExport` containing the old `areaReleaseId`, current/history/drafts/stop fields, `recovery=true`, and `recapUnavailable`; do not attach current fixture metadata or remap anchor IDs. Keep corrupt raw data unrendered and deletable; an opt-in raw text recovery download is optional.

**Closure test**

Inject separately: invalid area, invalid provenance, valid same-release storage, valid wrong-release storage, and corrupt storage. In every case Data/Delete remains keyboard reachable. Wrong-release export parses as a recovery schema, contains exact old text, contains no current recap metadata, and leaves the storage key byte-identical until explicit delete.

### P1-02: Idle tabs and `?demo=fresh` can silently overwrite an existing local session

**Evidence**

- `src/App.tsx:204-212` raises a storage conflict only when the receiving tab already has `hasSession === true`.
- `src/App.tsx:265-278` starts by writing a new envelope without re-reading the current storage key or checking an expected revision.
- Two tabs opened while the key is missing both have `hasSession === false`; after tab A starts or records, tab B ignores the storage event and can overwrite A on Start.
- `src/App.tsx:187` treats `demo=fresh` as permission to skip storage inspection, while Start still writes the production session key.
- `README.md:77` exposes a URL containing `fresh`, so this is not confined to an isolated test context.
- `implementation/KNOWN_LIMITATIONS.md:15` describes only a narrow simultaneous-write race; the idle-tab and `fresh` overwrite paths are deterministic and wider than that disclosure.

**Impact**

The newest writer silently replaces an earlier synthetic draft, committed note and correction history. Existing tests create fresh pages and therefore systematically avoid the conflict they need to prove. The current “editing is paused to prevent an overwrite” claim is not true for an idle second tab.

**Minimum fix**

Remove `fresh` from runtime behaviour; test setup should clear an isolated browser context explicitly. Listen for every session-key change, including while local state is empty. Before Start and every durable write, compare a persisted `writeRevision` or opaque envelope token captured at load. A mismatch must enter read-only conflict before writing. For this prototype, a documented single-writer lease plus explicit `Load newer version` is sufficient; do not imply atomic CAS.

**Closure test**

Use two pages in one browser context. Open both with no key, save text in A, then attempt Start in B. Assert B becomes read-only and the key still contains A's exact text. Repeat with both tabs restored, near-simultaneous commits, deletion in A while B is open, and an attempted `?demo=fresh`; no path may overwrite without an explicit takeover action and warning.

### P1-03: Stop is terminal only in memory and can be reported as locally kept when it was not saved

**Evidence**

- `src/App.tsx:529-535` confirms stop by dispatching `STOP` only.
- `src/App.tsx:214-232` relies on a 120 ms debounced background effect for persistence; `storage-error` deliberately prevents that write.
- `src/App.tsx:484-493` immediately says `Partial record kept locally` and offers review/export without displaying `saveState === error`.
- `tests/e2e/failure-states.spec.ts:48-58` checks only in-memory terminal navigation. It neither reloads after stop nor injects a stop-write failure.

**Impact**

Closing or reloading quickly can reopen the prior active field session. Under `storage-error`, the failure is deterministic: the current tab stops, but storage still says `field`; the stopped screen makes a false durability claim and hides the failure. Stop must never be blocked, but its persistence status must be truthful.

**Minimum fix**

Build the stopped candidate and attempt an immediate save in the confirm handler, while always moving the current tab out of the task. On success, publish the durable stopped projection. On failure, still show the stopped screen but replace the durability claim with a persistent alert such as `Stopped in this tab, but the stop state was not saved locally`; keep copy/export/delete recovery available with explicit in-memory semantics.

**Closure test**

For a normal write, confirm Stop then reload immediately and assert the stopped session remains terminal. For injected quota/write failure, assert the field UI disappears immediately, the stopped screen shows the non-durable warning, no false `kept locally` text appears, and recovery/export/delete semantics are explicit. Stop must still work at the 30-change cap.

### P1-04: A same-release envelope is validated only by shape, not against the active manifest

**Evidence**

- `src/domain/session.ts:25-44` accepts arbitrary record keys and arbitrary non-empty `anchorId` values. It does not require a note/draft's record key to equal its own `anchorId`.
- The persisted envelope contains only `areaReleaseId`; it has no content fingerprint or manifest identity beyond the author-provided release string.
- `src/lib/storage.ts:39-47` returns every shape-valid envelope as `valid` without manifest cross-validation.
- `src/App.tsx:188-190` restores a same-release envelope directly, and `src/App.tsx:222` can later write the parsed projection back.
- `src/domain/schema.ts` and the current unit tests validate fixture cross-references, but no equivalent validator covers `selectedAnchorId`, check-in keys, note keys, draft keys, or 30 retained snapshots against the manifest.

**Impact**

A stale or manually damaged same-release envelope can contain unknown anchors or mismatched note bindings. The UI may ignore those records while export retains them, or restoration can silently normalise unknown fields. The app calls this data valid instead of entering recovery, so corruption detection is incomplete.

**Minimum fix**

Add a pure `validateSessionAgainstManifest(envelope, manifest)` boundary. Require every selected/check-in/note/draft key in current and history to exist in the referenced manifest; require each embedded `anchorId` to match its record key; validate stopped/started invariants; store and compare the manifest content fingerprint. Make persisted Zod objects strict so unexpected forward fields do not get silently stripped and rewritten.

**Closure test**

Fixtures must include unknown selected ID, unknown check-in key, note key/anchor mismatch, draft mismatch, invalid retained snapshot, changed content fingerprint, extra forward field, and a fully valid envelope. Every invalid case enters recovery, leaves the raw key byte-identical, and cannot reach recap or normal export.

### P1-05: Actual fixture expiry is not part of eligibility; only authored state or a query flag can fail closed

**Evidence**

- `src/domain/schema.ts:30-31` and `58-62` validate timestamp syntax but not ordering or current-time eligibility.
- `src/App.tsx:140` defines `stalePack` only from `?demo=stale-pack`.
- `src/App.tsx:265-267` and `422-429` block Start on that query flag, not on `manifest.validity.expiresAt`.
- `src/components/PromptPanel.tsx:78-89` blocks an anchor only when its authored `state` is already `stale` or `unsupported`; a `current` anchor whose `expiresAt` has passed remains writable.
- `tests/e2e/failure-states.spec.ts:13-21` proves the authored stale example, not clock-derived expiry.

**Impact**

After 2026-09-30, the bundled R1 pack still starts by default and its four route anchors still accept new check-ins. The data are synthetic and create no real route-safety exposure, but the prototype would falsely demonstrate a working `verified_at / expiry` contract, one of the explicit technical review targets.

**Minimum fix**

Create one pure, injected-clock eligibility function. Validate `verifiedAt <= reviewDueAt <= expiresAt`; derive pack expired from `validity.expiresAt`; derive each anchor unusable when its expiry passed regardless of the authored label. A review-due warning may remain non-blocking, but expiry must disable new Start/check-in/note while keeping recovery export/delete.

**Closure test**

With a fixed clock one millisecond before and at/after pack and anchor expiry, assert the correct warning/block transitions. An already-open session crossing expiry must prevent a new anchor commit and retain existing text for export/delete. Query flags may remain a dev fault fixture but cannot be the eligibility source of truth.

## 5. P2 findings

### P2-01: Production-like builds still enable query-string fault injection

`src/App.tsx:113-117` accepts all `?demo=` modes without an `import.meta.env.DEV` or explicit fault-lab build gate. `README.md:63-79` calls them development-only, but `pnpm preview` behaves the same. After P1-02 removes `fresh`, gate the remaining allowlisted fault lab at build time or describe it truthfully as part of every local build. Closure: default production build ignores fault queries; a dedicated review build exercises them.

### P2-02: Offline readiness and cache versioning are weaker than the implementation narrative

`public/sw.js:1-34` precaches only `/` and the web manifest, then runtime-caches same-origin GET responses under a static `osk-shell-v1`. JS/CSS become available offline only after a controlled online reload, and there is no app-visible cache-complete state. `implementation/ARCHITECTURE.md:81` says the first online load fills the cache, which is stronger than the actual sequence in `tests/offline/warm-offline.spec.ts:3-20`. Use a build-versioned asset list or generated precache, report readiness truthfully, and test update/old-cache cleanup. Also search cached response bodies for a sentinel note, not only request URLs.

### P2-03: CSP permits arbitrary WebSocket origins

`index.html:7-9` sets `connect-src 'self' ws:`. `ws:` is a scheme source, not a same-origin restriction. The app currently emits no such request and the network-deny E2E passes, so this is hardening rather than an active exfiltration. Restrict production preview to `connect-src 'self'`; if Vite HMR needs a WebSocket source, provide a dev-only policy. Closure: CSP smoke test plus external HTTP/WebSocket denial.

### P2-04: Provenance notices are not mechanically reconciled with direct runtime dependencies

`src/fixtures/provenance-manifest.json:24-28` omits Zod even though `package.json:27-32` lists it as a runtime dependency, and includes Vite, which is a development dependency. `implementation/FIXTURES_AND_LICENSES.md:16-25` has a different, more accurate table. Add versions and generate or validate the notice set against `package.json`/lockfile; retain actual upstream licence notices when the artifact is distributed. Closure: build check fails on a missing, extra, or mismatched direct dependency notice.

### P2-05: Accessibility evidence does not scan the required failure and terminal states

`tests/e2e/accessibility.spec.ts:10-22` runs axe on overview, field, recap and the data dialog. It does not axe loading, empty, pack error, storage error, stale, unsupported, stopped, delete confirmation/error, conflict, or offline banners. The keyboard test covers anchor selection and dialog focus return, but not the radio/note/save/undo/stop/export/delete chain. Expand the matrix after P1 closure; automated axe is still not a WCAG claim.

### P2-06: The durable test-evidence document is already stale

At review time `implementation/TEST_EVIDENCE.md:11-14` reported 14 unit tests and 66.9% statements / 84% functions, while the latest independent run observed 18 tests and an earlier coverage run observed 73.42% statements / 92% functions. Generated bundle bytes also changed during review. Update this document only from the final post-fix commands and record the exact final run once, rather than hand-maintaining intermediate counts.

## 6. P3 findings

### P3-01: Delete/export success messages outlive the action they describe

`deleteState`, `deleteMessage`, and `exportMessage` are not reset when a new session starts or its content changes (`src/App.tsx:128-130`, `265-312`). After deleting, closing the dialog and creating a new session, reopening Data can still show the old deletion success beside new local data. Reset action receipts on the next relevant mutation or add a timestamp and past-tense scope.

### P3-02: Unused reducer actions bypass the invariants enforced by the live UI

`src/domain/session.ts:71-81` retains `CHECK_IN`, `UPDATE_NOTE`, `DELETE_NOTE`, `RESET` and direct navigation actions that the current UI does not need. Their reducers do not consistently enforce phase, manifest eligibility, 800-code-point checks or terminal-stop invariants. Remove dead actions or route every action through shared guards before another component reuses them.

### P3-03: One recap branch is unreachable

`src/domain/recap.ts:63-74` filters fixture metadata to `anchor.state === "current"` and then checks whether the same anchor is stale. That branch can never execute. Remove it or make dependency status explicit so future changes do not accidentally present expired metadata as supported.

## 7. Controls that held under review

- The runtime has no model SDK, API key, remote font, map tile, analytics, GPS, camera, microphone, Canvas or WebGL dependency.
- Manual `found` is labelled as a participant report, not verified arrival.
- The enabled recap is deterministic and separates exact user text, eligible synthetic metadata and unavailable inference.
- The stale and unsupported demonstration anchors expose no check-in or note editor.
- A normal observation commit is saved before the committed React projection is published; the storage-error path keeps the prior committed projection.
- Hard delete removes and reads back the one session key before clearing in-memory current/history/drafts; downloaded files and the separate theme preference are disclosed as outside scope.
- The tested desktop/mobile Chromium views had no external requests, no automated WCAG A/AA violations in the scanned states, no horizontal overflow at 320 px, and no required WebGL path.
- Service-worker cache entries are same-origin app responses; runtime notes are held in localStorage and no code sends them through fetch.

These controls are real local engineering evidence. They do not establish field safety, product value, real-data privacy, production readiness or an approved PRD.

## 8. Required disposition

For every P1, the implementation owner must record one of: `fixed`, `feature removed`, or `accepted only after severity is independently re-evaluated with new evidence`. A code change without its closure test remains open. After fixes, this reviewer must re-read the changed paths and rerun the relevant unit, two-page E2E, desktop/mobile E2E, axe, build, bundle and production-offline checks.

```yaml
review_status: FAIL_P1_OPEN
p0_open: 0
p1_open: 5
p2_open: 6
p3_open: 3
implementation_complete: false
production_or_field_claim_authorized: false
evidence_verdict: Validate first
prd_threshold_met: false
```

## 9. Round 2 closure disposition

Review date: 2026-08-30. This section appends the final disposition and does not rewrite the Round 1 findings or its failed status at the time.

### 9.1 P1 disposition

| Finding | Final state | Closure evidence |
|---|---|---|
| P1-01 recovery/export and boot-error data controls | **CLOSED** | Boot now parses area, provenance and stored data as independent results; `DataDialog` renders without a current manifest; schema-valid incompatible sessions receive a fixture-free recovery export; corrupt raw storage is wrapped without interpretation. Desktop/mobile recovery E2E proves exact old text, no current recap, and byte-identical storage before explicit delete. |
| P1-02 idle-tab and `fresh` overwrite | **CLOSED** | Runtime no longer gives `fresh` any storage-bypass meaning. Every session-key event pauses the receiving tab; Start re-inspects storage; every draft, commit, undo and stop write compares the last opaque raw envelope before replacement. Two-page desktop/mobile E2E proves an idle tab cannot overwrite, can load the exact newer note, and observes explicit deletion. The remaining non-atomic simultaneous-write window is accurately retained as a synthetic-only P2 limitation. |
| P1-03 stop durability and truth | **CLOSED** | Confirm Stop constructs and synchronously attempts to persist the stopped candidate before publishing it; the tab exits the task regardless. Success survives immediate reload. Injected failure shows a persistent tab-only/non-durable warning, removes the false local-save claim, and permits recovery export. Stop still works with 30 retained changes. |
| P1-04 same-release envelope integrity | **CLOSED** | Persisted and nested objects are strict and carry a content fingerprint. The manifest validator covers selected/check-in/note/draft keys, embedded anchor bindings, current and retained snapshots, lifecycle timestamp/stop pairs and ordering. It also enforces current overview with empty history, field-only retained snapshots and one shared session start. Crafted invalid stopped and recap-history envelopes enter recovery, expose no Undo path and leave raw storage byte-identical. |
| P1-05 time-derived expiry | **CLOSED** | One injected-clock eligibility module validates manifest ordering and derives not-yet-valid/review-due/expired. Start, draft and commit recheck time at the action boundary. Recap receives an explicit clock, preserves exact user text, excludes expired fixture metadata and emits abstention. Expired/not-yet-valid export is recovery-only. E2E covers crossing expiry without reload and a recorded session crossing expiry before recap/export. |

### 9.2 New P1 found during final verification

The first Round 2 aggregate run found one new P1 before approval:

#### P1-06: Cross-anchor timed commit lock silently dropped rapid observations

The first final `pnpm verify` run failed the same happy-path test on desktop and mobile: only Lantern Steps and Canal Screen reached committed state, leaving progress at `2 of 4`. `PromptPanel` kept a component-level 350 ms commit lock across anchor changes, while the E2E helper incorrectly accepted an old global `Saved in this browser` message as proof of the next save.

**Disposition: CLOSED.** The timed/cross-anchor lock was removed. The reducer now treats a truly identical repeat commit as an idempotent no-op, preserving revision and history without blocking a different anchor. The helper now waits for the selected anchor row's expected `Participant reported found`, `Unsure` or `Skipped` projection. The final desktop/mobile run completed four rapid consecutive anchors and reached `4 of 4`; the reducer unit test proves an identical repeated commit remains revision 1 with one history entry.

### 9.3 P2/P3 disposition

| Finding | Final state | Note |
|---|---|---|
| P2-01 production fault query | **CLOSED** | Fault modes require dev or an explicit fault-lab build flag; production offline test proves `?demo=pack-error` is ignored. |
| P2-02 offline/cache truth | **CLOSED for local scope** | Cache name is versioned, the required controlled online reload is documented, and production tests inspect cached response bodies for a unique note sentinel. Cold-start and production update/rollback remain explicitly unsupported. |
| P2-03 CSP WebSocket scope | **CLOSED** | Connect policy is restricted to self plus loopback Vite HMR; runtime external-request E2E remains empty. |
| P2-04 dependency provenance drift | **CLOSED** | Five direct runtime dependency notices include name/version/licence and `fixtures:validate` mechanically reconciles them with `package.json`. |
| P2-05 accessibility state coverage | **CLOSED for automated baseline** | Axe now covers overview, field, recap, data dialog, pack error, empty, stale, unsupported, Stop dialog, stopped screen, delete confirmation and light/dark contrast; keyboard focus, reduced motion and 320 px overflow also pass. Manual AT and full WCAG conformance remain explicitly unclaimed. |
| P2-06 stale test-evidence document | **OPEN documentation follow-up** | `implementation/TEST_EVIDENCE.md` must be updated from the final figures below after this disposition. This is not a code P0/P1, but delivery should not quote its old counts. |
| P3-01 stale action receipts | **CLOSED** | New start/mutation resets relevant prior receipts. |
| P3-02 unused unsafe reducer actions | **CLOSED** | Dead mutation actions were removed and remaining transitions have lifecycle guards. |
| P3-03 unreachable recap branch | **CLOSED** | Recap now uses explicit temporal eligibility and no dead stale branch. |

## 10. Final independent verification evidence

The first aggregate closure attempt correctly failed `2/44` browser cases and produced P1-06; it is retained as evidence that the review did not rubber-stamp a green subset. After the fix, the reviewer ran one clean final `pnpm verify` against the resulting snapshot:

| Gate | Final result |
|---|---|
| Fixture/provenance reconciliation | PASS, 5 direct runtime notices |
| ESLint | PASS, zero warnings |
| TypeScript | PASS |
| Unit/integration | PASS, 28/28 across 6 files |
| Production build | PASS, no source maps |
| Bundle budget | PASS, 144,391 gzip bytes total; JS 137,500; CSS 5,667 |
| Desktop Chromium E2E | PASS, 22/22 |
| Mobile Chromium E2E | PASS, 22/22 |
| Axe/keyboard/reduced-motion subset | PASS, 10/10 across both browser projects |
| Production warm offline | PASS, 2/2 desktop/mobile, including response-body note sentinel absence |
| Aggregate `pnpm verify` | **PASS, exit 0** |

An additional final coverage run passed 28/28 tests and measured domain/lib code at 75.75% statements, 72.54% branches, 80.55% functions and 78.36% lines. Coverage is diagnostic, not a product-quality or privacy claim; browser side-effect paths are additionally exercised by E2E.

## 11. Final ruling

**PASS for the authorised local synthetic portfolio prototype: 0 unresolved P0, 0 unresolved P1.** The implementation can be marked complete only for D-017's local portfolio/learning scope after `TEST_EVIDENCE.md` is synchronised with the final run. The remaining non-atomic Web Storage race, Chromium-only automation, cold-start offline limitation, no secure erase/encryption and no manual assistive-technology validation stay as explicit limitations, not hidden production claims.

This ruling does not approve a product, production release, external study, real private data, NUS route, navigation, safety/access/opening claim or field use. It closes no historical field P0/P1. The evidence verdict remains **Validate first**, and the PRD threshold remains not met.

```yaml
final_review_status: PASS_LOCAL_PROTOTYPE
round_1_p1_closed: 5
new_round_2_p1_found_and_closed: 1
p0_open: 0
p1_open: 0
p2_open: 1
p3_open: 0
aggregate_verify: PASS
implementation_complete_scope: local-portfolio-prototype-only
production_or_field_claim_authorized: false
evidence_verdict: Validate first
prd_threshold_met: false
```

## 12. Postscript: test-evidence synchronisation

Read-only recheck confirms `implementation/TEST_EVIDENCE.md` matches the final independent run: 5 provenance notices, 28 unit/integration tests, 75.75/72.54/80.55/78.36 coverage, 144,391 total gzip bytes, 22 desktop and 22 mobile E2E cases, 10 accessibility cases, 2 production offline cases, and aggregate `pnpm verify` exit 0. The document also preserves the tested/not-proven boundary and links back to this review.

`P2-06` is **CLOSED**. Final remaining review counts are `P0=0`, `P1=0`, `P2=0`, `P3=0` for the authorised local prototype scope. Historical findings and the evidence verdict remain unchanged.

## 13. Later experience-acceptance audit

D-019 added a later local-experience acceptance pass without rewriting this review. The current frozen-snapshot counts and three-reviewer disposition are in `implementation/TEST_EVIDENCE.md` and `implementation/council/experience-acceptance-council.md`. The 28/44/10 counts above remain the historical D-018 snapshot, not the current test totals.
