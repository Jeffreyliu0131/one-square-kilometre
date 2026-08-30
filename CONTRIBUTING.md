# Contributing

Thank you for helping improve One Square Kilometre. This repository is a pre-validation, local synthetic prototype. Contributions must preserve that boundary.

## Before opening a change

- Use an issue first for changes that alter the product mechanism, data contract, fixture schema, licence boundary, or verification gate.
- Do not submit real locations, routes, people, private data, NUS-owned content or branding, credentials, API keys, production configuration, or copied map/media assets.
- Reproduce bugs with synthetic text and sanitised logs only.
- Do not turn the prototype into navigation, a safety/access/opening authority, a hosted data service, or an AI inference product without a new documented decision and explicit authorisation.

## Local setup

Requirements: Node `>=22.19` (baseline `22.23.1`) and pnpm `11.19.0`.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Before submitting:

```bash
pnpm verify
```

The full gate includes fixture/provenance validation, lint, typecheck, unit/integration tests, production build, bundle budgets, desktop/mobile Chromium E2E, accessibility cases, and warm-offline tests.

## Evidence and documentation discipline

- Distinguish facts, inferences, gaps, and test fixtures.
- Do not cite generated prose as external evidence.
- Update `DECISIONS.md` for a material decision, `RISKS.md` for a risk change, `ASSUMPTIONS.md` for an assumption-state change, and `STATUS.md` for current state.
- Preserve `PRODUCT_BRIEF.md` as the concept starting point.
- Keep the project verdict **Validate first** unless new primary evidence satisfies the documented gate.

## Licensing contributions

Contributions are licensed according to their target path:

- code, tests, scripts, configuration, documentation, and selected screenshots: MIT;
- `src/fixtures/area-manifest.json` and `src/fixtures/provenance-manifest.json`: CC0-1.0.

By contributing to a fixture JSON file, you confirm that you own or control the contribution and intentionally dedicate it under CC0-1.0. Do not contribute real-place or third-party fixture material.

Dependencies retain their own licences. If you add or update one, refresh provenance, the lockfile, `THIRD_PARTY_NOTICES.md`, bundle evidence, and licence checks.

## Pull requests

Keep changes small and reviewable. A pull request should state:

- the user or engineering problem;
- scope and explicit non-goals;
- tests run and bad cases covered;
- documentation, decision, risk, privacy, and licence impact;
- whether generated artifacts were intentionally excluded;
- confirmation that no secret, private, real-location, or unauthorised asset was added.

Maintainers may decline changes that are technically valid but expand unvalidated product scope or operational responsibility.
