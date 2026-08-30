---
artifact: experience-acceptance-implementation-council
project: One Square Kilometre
updated: 2026-08-30
scope: local-synthetic-experience-candidate-only
status: ready-local-experience-candidate
evidence_effect: none
project_verdict: validate-first
prd_threshold: not-met
---

# Experience acceptance implementation council

## 1. Scope and shared inputs

This council reviews whether D-017's local synthetic prototype can be handed to a non-technical person for experience acceptance. It does not review or authorise field use, production, real data, NUS claims, product evidence, or the PRD.

All reviewers were instructed to read the same source set: `AGENTS.md`, `STATUS.md`, D-017/D-018, `PRODUCT_BRIEF.md`, G4/G7/G8 documents, implementation architecture/privacy/limitations/evidence, prior implementation council records, and current `src/`/`tests/`.

Roles:

- Product/interaction reviewer: independent pre-fix experience audit.
- Architecture/privacy reviewer: independent pre-fix trust-boundary audit.
- Adversarial QA reviewer: independent bad-case and test-coverage audit.
- Root product-engineering lead: disposition and implementation owner; not an independent reviewer.

Reviewer memos and this disposition are design/governance inputs, not product evidence.

## 2. Pre-fix findings and root disposition

| Area | Pre-fix counterexample | Severity | Implemented disposition |
|---|---|---:|---|
| Completion denominator | Field showed 4/4 while recap counted all six and showed `Untouched 2` | P1 | Recap counts only `route.anchorIds`, renames the fourth state `Unrecorded`, and separately explains two inspection-only fail-closed examples; E2E asserts 0 after 4/4 |
| Error recovery discoverability | Pack-error body promised data controls but mobile hid the `Data` text in the header | P1 | Pack/empty problem body now includes `Open data and recovery` |
| Correction lifecycle | `Correct record` returned to normal field UI and stopped records could not be corrected | P1 | Added explicit `correction` phase; correction does not resume stopped lifecycle; stopped correction is supported; active correction retains one-action Stop; Return goes to recap |
| Draft versus evidence | Autosaved radio/text displayed a generic saved message that looked committed | P1 | Draft copy now states it is not in recap; commit copy names observation/status and revision; Start begins with clean field status |
| Fixture identity | Unknown fixture fields were stripped; fingerprint was a static label; provenance release was not bound | P1 | Deep strict Zod objects; canonical content fingerprint validated at runtime/build; provenance fixture set bound to release; asset paths validated; mutation/unknown/mismatch tests added |
| Recovery overwrite | Incompatible external storage could clear conflict then be overwritten by stale in-memory state | P1 | Any recovery state globally blocks draft/commit/retry/undo writes; Stop exits the task but becomes explicitly tab-only; two-page incompatible-release E2E proves raw bytes unchanged |
| Corrupt empty value | Empty-string localStorage was treated as missing and overwriteable | P1 | Only `null` means missing; empty string enters corrupt recovery; byte-preservation unit test added |
| Exact user record | Commit and recap trimmed non-empty text | P1 | Trim is used only to classify blank notes; non-empty text is preserved exactly through session and recap tests |
| Exact length follow-up | Reducer counted trimmed text but saved raw text, allowing 800 content characters plus whitespace | P1 | Commit counts raw Unicode characters; note schema repeats the same limit; unit covers 800 + trailing space and candidate parse |
| Note source identity | Clear then re-enter could reuse the same note ID + revision | P1 | Next revision derives from current plus retained snapshots; invariant rejects reused identity/backwards/skipped revision; clear/re-enter test added |
| Expiry mutation | Undo ignored pack/anchor expiry; recap/export could keep render-time metadata | P1 | Undo shares temporal guards; select/review/correct refresh clock; boundary timer re-evaluates open recap; export captures one current clock and regenerates recap |
| History integrity | Shape-valid history could move from future revision to older current revision | P1 | Restore invariant validates note identity, stable anchor binding and monotonic timeline; invalid histories stay recovery-only |
| Undo draft isolation follow-up | Full-snapshot Undo could silently restore an older unrelated anchor draft | P1 | Undo now reverts only committed check-ins/notes while retaining current drafts, phase, lifecycle and selection; unit plus desktop/mobile E2E preserve the newer draft exactly |
| Route readiness | Pack could start when one active anchor had expired earlier | P2 | Start now requires every route anchor temporally usable; pure eligibility test covers early anchor expiry |
| Clipboard boundary | Copy recovery could leave app control without disclosure | P2 | Inline copy disclosure and privacy document boundary added |
| Storage sentinel | Failed preflight could leave its sentinel | P2 | Best-effort `finally` cleanup added; failure remains authoritative |
| Storage write boundary | Repository trusted a TypeScript value without runtime validation | P2 | `saveSession` now runs `persistedSessionSchema.safeParse` before serialisation; invalid candidates never touch the key |
| Cross-tab delete memory | Another open tab can retain an in-memory copy after the storage key is deleted | P2 | Privacy doc now states the tab can explicitly recovery-export until it loads deletion/closes; no cross-tab secure-erase claim |
| Network allowlist | Test accepted any localhost port and CSP allowed arbitrary loopback WebSocket ports | P2 | Exact dev origin network allowlist; CSP WebSocket narrowed to the dev port |
| Mobile visual obstruction | Character count overlapped privacy hint; three-action tray clipped content/buttons | P1 | Removed negative count margin; compact three-action mobile tray; removed mobile negative bottom margin; 390px bounding-box assertions cover Save/Undo/Review/Stop |
| Acceptance evidence | 6000-8000px full-page images duplicated sticky elements and omitted rights/correction details | P2 | Added fixed 1280×720 and 390×844 CSS-pixel assets for overview, map, prompt, fail-closed, recap summary/detail, data summary/rights, correction summary/actions, and Stop |
| A11y coverage | Keyboard test did not cover the end-to-end interaction chain; axe omitted recovery/action errors | P1 | Keyboard activation covers record→review→correct→undo→data/delete confirm→Stop on desktop/mobile; axe adds corrupt recovery, save error, delete error, dark and blocked states |

## 3. Current acceptance contract

The candidate can be marked `Ready` only if, on one final snapshot:

1. `pnpm verify` passes fixtures, lint, typecheck, unit/integration, build, bundle, desktop/mobile E2E, a11y and production warm-offline.
2. Curated screenshots pass visual review at desktop 1280×720 and mobile 390×844; 320px overflow smoke remains green.
3. Product/interaction, architecture/privacy and adversarial QA final rereviews report zero unresolved local-scope P0/P1.
4. `implementation/EXPERIENCE_ACCEPTANCE.md`, test evidence, privacy, limitations, README, STATUS and decisions describe the same boundaries.

## 4. Boundaries that remain unchanged

- Project verdict: **Validate first**.
- PRD: `validation-ready draft / not approved`.
- External research, field use, production, deployment and real private data: not authorised.
- Eight historical field P0: unchanged and open.
- AI: deny-all; deterministic recap remains the only enabled path.
- Automation: Chromium only; manual VoiceOver, Safari, Firefox and real devices remain unverified.
- LocalStorage: best-effort single-writer, unencrypted, non-atomic, no secure erase.

## 5. Final disposition

Final review date: 2026-08-30. The pre-fix record above is retained.

| Reviewer | Final local-scope result | Ruling |
|---|---:|---|
| Product/interaction | P0=0, P1=0 | Ready |
| Architecture/privacy | P0=0, P1=0 | Ready |
| Adversarial QA | P0=0, P1=0 | Ready |
| Root final quality gate | `pnpm verify` exit 0 | Ready |

Final frozen-snapshot evidence:

- D-019 local-review snapshot: fixture/provenance notices `5`, r1 fingerprint validated;
- lint and typecheck PASS;
- unit/integration `38/38` across 6 files;
- production build PASS;
- bundle `146,305` gzip bytes total (`139,244` JS, `5,834` CSS);
- desktop/mobile Chromium E2E `60/60` total (`30` each), including 14 a11y cases and screenshot geometry;
- production warm-offline `2/2`;
- 22 fixed-viewport screenshot assets generated and reviewed; four representative synthetic images retained in the public baseline;
- aggregate `pnpm verify` **PASS, exit 0**.

Root ruling: **Ready for direct local experience acceptance only.** This means a non-technical reviewer can follow `implementation/EXPERIENCE_ACCEPTANCE.md` against the current local synthetic build. It does not mean product, field, production, real-data, NUS, safety/access, deployment or PRD readiness.

Project verdict remains **Validate first**. The PRD threshold is not met; eight field P0 remain open.

## 6. D-020 public baseline addendum

D-020 supersedes the repository-distribution restriction only. The public baseline versions the rights/distribution metadata as `synthetic-marshline-commons-r2`; its new fingerprint and verification counts are recorded in `implementation/TEST_EVIDENCE.md` and `docs/REVIEW_SUMMARY.md`. The local experience ruling and all product/field boundaries remain unchanged.
