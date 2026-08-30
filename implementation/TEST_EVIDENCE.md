# Test evidence

Evidence date: 2026-08-30. Environment: Node 22.23.1, pnpm 11.19.0, Playwright 1.62.1, Chrome for Testing 151.0.7922.34 on macOS arm64.

## Automated results

| Gate | Result | What it covers |
|---|---|---|
| `pnpm fixtures:validate` | PASS, 5 notices + `synthetic-marshline-commons-r2` / `fnv1a32:0dbad542` | direct runtime dependency name/version/licence reconciliation, fixture fingerprint, release/provenance pairing, declared asset existence |
| `pnpm lint` | PASS | ESLint, React Hooks, jsx-a11y, TypeScript rules |
| `pnpm typecheck` | PASS | strict TypeScript build graph |
| `pnpm test` | PASS, 38 tests across 6 files | strict/fingerprinted manifests, route/clock eligibility, restore/history/revision invariants, exact text, raw length, draft/commit, idempotency, draft-safe undo, stopped correction, runtime-validated storage, hard delete, recovery, recap, export, integration states |
| `pnpm test:coverage` | PASS | domain/lib: 79.79% statements, 75.50% branches, 85.41% functions, 82.65% lines; E2E supplies additional browser side-effect coverage |
| `pnpm build` | PASS | production Vite bundle, no source maps |
| `pnpm bundle:check` | PASS | 139,296-byte JS gzip, 5,836-byte CSS gzip, 146,358-byte complete shell gzip |
| Desktop Chromium E2E | PASS, 31 tests | four-anchor path, correction/stopped correction, idempotency, exact evidence, recovery, incompatible multi-tab write block/delete, expiry refresh/export/Undo, unrelated draft preservation, fault states, a11y, no-WebGL, exact-origin request deny, performance, screenshot geometry |
| Mobile Chromium E2E | PASS, 31 tests | same matrix under mobile emulation plus 390×844 sticky-action bounding boxes and fixed-size screenshot assets |
| `pnpm test:a11y` subset | PASS, 16 tests | axe A/AA across normal, recovery, save/delete errors, blocked, stopped, destructive and light/dark states; split keyboard record/data and Stop activation chains; reduced motion; 320px overflow |
| Production warm offline | PASS, 2 tests | desktop and mobile build/preview, fault queries disabled, service worker active, network cut, local note/recap complete, cached response bodies contain no note sentinel |
| `pnpm verify` | **PASS, exit 0** | fixtures/fingerprint, lint, typecheck, 38 unit/integration, build, bundle, 62 desktop/mobile E2E, and 2 production offline tests in one public-baseline run |

## Public-release checks

- `pnpm install --frozen-lockfile`: PASS after a clean `node_modules` recreation; lockfile supply-chain policy check passed for 415 entries.
- `pnpm licenses list --prod --json`: PASS; 18 production packages grouped as Apache-2.0 (8), MIT (9), and 0BSD (1), matching `THIRD_PARTY_NOTICES.md`.
- Full development inventory: 378 package entries across 0BSD, Apache-2.0, BlueOak-1.0.0, BSD-2-Clause, BSD-3-Clause, CC-BY-4.0, CC0-1.0, ISC, MIT, MIT-0, MPL-2.0, and Python-2.0; no unknown or unlicensed group.
- GitHub Actions workflow is syntax-checked locally but has not yet run on GitHub because the remote is intentionally pending.

Independent review result: prior `PASS_LOCAL_PROTOTYPE` plus post-fix experience, architecture/privacy and adversarial QA rereviews with `0` unresolved P0 and `0` unresolved P1. The initial failed code review remains in `implementation/council/independent-code-security-review.md`; the experience-candidate dispositions remain in `implementation/council/experience-acceptance-council.md`.

## In-app browser review

The Codex in-app browser was used in addition to Playwright test code.

- Desktop first screen: four active prompts plus two blocked examples, synthetic and non-navigation boundary, and storage-preflight start are visible.
- Field/recap: participant assertions, exact note, synthetic metadata, abstention, `Unrecorded 0`, and the 48-hour/not-field-evidence boundary are visible.
- Stopped record: `Correct record` opens the separate correction phase; copy states that the stopped lifecycle cannot resume; there is no active Stop action.
- 390px automation and assets: horizontal overflow `0`; Save, Undo, Review and Stop bounding boxes remain fully visible; stale/unsupported expose no text field.
- Browser console: no warning or error entries.

## Screenshot review

- The local E2E run generated and reviewed 22 fixed-viewport assets at desktop 1280×720 and mobile 390×844 CSS pixels.
- The public Git baseline retains four representative synthetic screenshots; their index is in `implementation/EXPERIENCE_ACCEPTANCE.md`.

Review conclusion: the implementation reads as a modern field notebook with precise synthetic cartography, not a tourism app or marketing page. Map, prompt, local note, source state, and abstention keep distinct visual roles. Desktop uses one 7/5 work surface; mobile remains single-column with a reachable sticky action tray. The screenshots contain no map tile, location dot, route arrow, photo card, rating, AI glow, or dashboard treatment.

## Not tested or not proven

Manual VoiceOver, Safari, Firefox, real devices, real private data, production hosting, NUS field use, real location safety/access/opening, product demand, and user outcome change are not tested.
