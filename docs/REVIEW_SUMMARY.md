---
artifact: public-review-summary
project: One Square Kilometre
updated: 2026-08-30
status: public-baseline-committed-local
project_verdict: validate-first
prd_status: validation-ready-draft-not-approved
---

# Public review summary

## Scope

This is the public, durable summary of the project's staged product, technical, implementation, and release reviews. It replaces raw council working memos in the public repository. Those memos were analysis inputs, not factual evidence.

The repository is an independent synthetic prototype. It is not affiliated with or endorsed by the National University of Singapore (NUS), is not navigation, and is not approved for real participants, private data, field use, or production deployment.

## Documentation gates

| Gate | Public disposition | What remains blocked |
|---|---|---|
| G0 Source of truth | PASS | No product evidence is created by documentation |
| G1 Insight | CONDITIONAL PASS | Persona, area, theme, and residual job remain unvalidated |
| G2 Validation | PLAN READY / NOT RUN | No target-user behavioural evidence |
| G3 BRD | ASSUMPTION-BOUND DRAFT | Sponsor, value, evidence, and approval |
| G4 Solution decision | ASSUMPTION-BOUND | M2+C1 is a validation configuration, not a selected product |
| G5 Technical feasibility | CONTRACT ONLY | Eight field P0, owners, drills, and real components |
| G6 Technical review | DOCUMENTATION ONLY | Field feasibility and proposed ADR remain blocked |
| G7 PRD | VALIDATION-READY / NOT APPROVED | Product evidence, business approval, field P0, and build authority |
| G8 Execution plan | CONDITIONAL ROADMAP | Only EP-00 human authority may begin |

The ten source documents are [G0](./00_SOURCE_OF_TRUTH.md), [G1](./01_INSIGHTS.md), [G2](./02_VALIDATION_PLAN.md), [G3](./03_BRD.md), [G4](./04_SOLUTION_OPTIONS.md), [G5](./05_TECHNICAL_FEASIBILITY.md), [G6 architecture](./06_ARCHITECTURE.md), [G6 review](./07_TECH_REVIEW.md), [G7 PRD](./08_PRD.md), and [G8 plan](./09_EXECUTION_PLAN.md).

## Local implementation review

The local synthetic candidate passed independent product/interaction, architecture/privacy, and adversarial QA rereviews with no unresolved local-scope P0 or P1. Significant closed counterexamples included:

- completion denominator drift between four active anchors and two blocked examples;
- draft versus committed evidence ambiguity;
- correction and stopped-session lifecycle ambiguity;
- fixture identity, release/provenance, and unknown-field validation;
- incompatible-storage overwrite, empty/corrupt recovery, and multi-tab conflicts;
- exact-text, revision identity, history order, and unrelated-draft Undo loss;
- expiry-time writes, open-recap refresh, and click-time export regeneration;
- mobile sticky-action clipping, contrast, keyboard flow, and error-state accessibility.

The current implementation contracts are [architecture](../implementation/ARCHITECTURE.md), [privacy](../implementation/PRIVACY.md), [limitations](../implementation/KNOWN_LIMITATIONS.md), [fixture/licence mapping](../implementation/FIXTURES_AND_LICENSES.md), [test evidence](../implementation/TEST_EVIDENCE.md), and the [experience acceptance guide](../implementation/EXPERIENCE_ACCEPTANCE.md).

## Public baseline review

D-020 authorises publication of a curated source repository and supersedes the prior no-publication/no-Git constraint only for repository source and selected public materials. It does not authorise application hosting, a field pack, recruiting, real data, NUS branding, or production permissions.

Public baseline controls:

- MIT for code, tests, scripts, configuration, documentation, and selected screenshots;
- CC0-1.0 only for the two declared synthetic fixture JSON files;
- generated builds, dependencies, reports, traces, raw council memos, caches, and unselected screenshots excluded;
- no personal filesystem paths, internal skill paths, credentials, key files, or files larger than 1 MiB in the staged set;
- GitHub Actions uses Node 22.23.1, pnpm 11.19.0, Chromium plus system dependencies, one CI worker, and the full `pnpm verify` gate.

Final local public-baseline gate:

- clean frozen install and 415-entry lockfile supply-chain policy check: PASS;
- fixture release `synthetic-marshline-commons-r2`, fingerprint `fnv1a32:0dbad542`;
- lint and typecheck: PASS;
- unit/integration: 38/38;
- desktop/mobile Chromium E2E: 62/62 total, 31 per project;
- accessibility subset: 16/16;
- production warm-offline: 2/2;
- bundle: 146,358 gzip bytes total;
- production licence inventory: 18 packages, no unknown or unlicensed group.

The GitHub-hosted workflow has not run yet because remote creation and push are intentionally delegated to the parent task. Commit identity is reported at handoff rather than self-referenced in this commit.

Final staged release audit:

- 94 files in the explicit public allowlist;
- four selected synthetic screenshots; all other generated screenshots ignored;
- zero personal filesystem paths, internal skill paths, high-confidence secrets, email addresses, sensitive credential filenames, symlinks, or files over 1 MiB;
- no Git or tarball dependency source in `pnpm-lock.yaml`;
- `git diff --cached --check` clean;
- 106 staged relative Markdown links checked with zero missing targets;
- commit metadata uses a project-level GitHub noreply identity; the user's global personal email is not used.

## Final decision boundary

Project verdict: **Validate first**.

The PRD threshold is not met. Eight field P0 remain open. A green repository build can demonstrate only that this local synthetic implementation satisfies its current engineering and experience contract.
