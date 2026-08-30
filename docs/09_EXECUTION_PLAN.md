---
artifact: execution-plan-and-roadmap
project: One Square Kilometre
created: 2026-08-29
status: passed-conditional-roadmap-not-authorized
documentation_gate: pass
gate: G8
project_verdict: validate-first
field_feasibility: blocked-not-run-8-open-p0
prd_status: validation-ready-draft-not-approved
build_authorization: none
committed_dates: none
---

# G8｜Execution Plan：先关闭 field P0，再按证据解锁条件分支

## 0. 执行裁决

这不是功能路线图，也不是交付日期承诺。当前只有 **field readiness + validation** 是可计划工作；design、technical spike、MVP、eval、dogfood、external validation 均是前门通过后的条件分支。

**当前 verdict：Validate first。** 任何 No-go 取消后续分支；不会为了路线图看起来完整而保留开发承诺。

## 1. Strategy context

- 用户问题、route、protocol effect、JVAP、sponsor/value/cost 均未验证。
- G0–G7 文档门已建立可审查合同，但不产生 field capability。
- 8 个 field P0 全 OPEN；ADR Proposed；C1-text 未授权；C2 real data prohibited；C3 code=0；AI excluded。
- 唯一 R1 是 voluntary adoption + durable decision articulation/package increment 是否足以抵偿全部负担；actual location follow-through 单列。
- 所有重要结果必须回链原始 event/outcome/dose/exposure/rights/cost；agent 文本不作事实来源。

## 2. Now / Next / Later roadmap

| Stage | Initiative | Outcome | Metric / gate | Commitment |
|---|---|---|---|---|
| NOW | EP-00 human authority/determinations | Establish named accountability or stop | signed RACI/determinations | Only active work |
| NEXT | EP-01 area/rights/access → EP-02 C1 components/D1–D3 | Close 8 field P0 or stop | 8 valid P0ClosureRecords | Conditional on EP-00 |
| NEXT | EP-03 V1 → EP-04 V2a → EP-05 V2b | Residual-job/component/package signal | G2 state machine + guards | Conditional on EP-00–EP-02 |
| NEXT | EP-06 V2c confirmatory → EP-07 V2d 2 cohorts | Confirmatory package effect + repeated JVAP | pre-registered MDE; 2× cohort bars | Conditional on prior signal |
| LATER | EP-08 value/branch decision → EP-09 reuse probe | Stop / one-time / reusable candidate | actual-use rule + second curator/area | Not committed |
| LATER | EP-10 design + C1/C2 build-null | Select carrier only if value exists | G4 carrier gates | Not committed |
| LATER | EP-11 C3 spike | Answer one software blocker | complete Spike Authorization Record | Default 0 / not authorised |
| LATER | EP-12 unreleased MVP candidate → EP-13 eval | Build only after new authorisation; verify before any use | approved PRD/ADR + eval P0/P1=0 | Not planned |
| LATER | EP-14 dogfood → EP-15 external validation | Bounded internal then external replication | separate approvals/evidence | Not planned |

## 3. Dependency chain

```text
EP-00 Human authority
→ EP-01 Area/rights/access pack
→ EP-02 Actual C1 data-flow + D1/D2/D3
→ ADR accepted for validation only
→ EP-03 V1 residual job
→ EP-04 V2a component
→ EP-05 V2b pragmatic package
→ EP-06 V2c confirmatory
→ EP-07 V2d repeated JVAP
→ EP-08 value/branch decision
├─ Stop / archive
├─ One-time activity → separate activity authorisation
└─ Reuse candidacy → EP-09 second curator + second area/theme probe
   → if passed: Reusable content system
   → EP-10 carrier design/build-null
   ├─ C1 sufficient: stop build
   ├─ C2 sufficient: configure/buy, stop C3
   └─ repeated software blocker + sponsor → EP-11 single C3 spike
      → if pass and separately approved → EP-12 unreleased MVP candidate
      → EP-13 eval → EP-14 dogfood → EP-15 external validation
```

## 4. Milestone plan

### G2 experiment state machine（EP-04–EP-07 inherit; no merged meanings）

| Priority | State | Meaning | Next action |
|---:|---|---|---|
| 1 | STOP-SAFETY/RIGHTS | hard people/rights event | freeze version; protect people/data; root-cause review; no downstream |
| 2 | INVALID | design/exposure/measurement/version deviation makes result uninterpretable | no positive/negative product evidence; at most one preregistered repair; old batch remains |
| 3 | NO-GO | valid data fails mechanism/demand/burden rule | stop current M2 branch; no feature/carrier rescue |
| 4 | EXPLORATORY/CONFIRMATORY SIGNAL | all stated outcome + guardrails pass | only the named next stage unlocks |
| 5 | INCONCLUSIVE | valid but below signal and above No-go | no downstream build; repeat only if preregistered reason/rule allows |

Version drift/assignment mismatch is `INVALID`, not `NO-GO`; a hard event is `STOP`, not ordinary attrition. Every milestone report must name exactly one state.

### Field P0 closure registry（EP-02 cannot pass by writing “8/8”）

Every row requires a `P0ClosureRecord`:

```yaml
p0_id: required
accountable_owner: named-person
closure_evidence_refs_and_hashes: []
independent_reviewer: named-person
decision: closed | rejected | reopened
valid_from: timestamp
valid_until_or_review_due: timestamp
reopen_triggers: []
closed_at: timestamp
supersedes_closure_id: optional
```

| P0 | Accountable role (name required) | Raw closure evidence | Independent approval | Validity / automatic reopen |
|---|---|---|---|---|
| Authority/RACI | Sponsor | signed roles, backups, ethics/age/campus/filming/privacy determinations | institutional/privacy reviewer | owner/scope/policy change |
| Manifest/session | Curator + field owner | immutable manifest/digest/copy registry/SessionAuthorization + D1 | independent technical/field reviewer | new release/route/source/incident |
| Data-flow/storage | Data steward | actual component/location/access/key/backup/lost-device register + D2 | privacy/security reviewer | component/provider/location/backup change |
| Rights lineage | Data steward | copy graph + virtual export/correct/withdraw/delete proof | independent rights reviewer | new copy/derivation/retention/consent version |
| Asset licence | Rights authority | per-asset licence/terms/attribution evidence; unknown removed | independent rights holder/legal check | terms/source/asset/distribution change |
| Text/manual sign-off | Research owner | protocol/estimand/condition/dose amendment, assignment/exposure fixtures | independent research reviewer | modality/carrier/access stimulus/dose change |
| Incident/reliability | Incident commander | D3 tabletop, ledgers, STOP/INVALID/reopen and owner-response proof | tech/privacy/field reviewer | runbook/owner/route/component change or incident |
| Accessibility/estimand | Accessibility + research owners | route/task/carrier evidence, matched/unsupported inclusion decision | independent access + ethics reviewer | route/task/carrier/population/accommodation change |

`start_allowed=true` only when all eight latest records are `closed`, within validity, and have no reopen trigger. Any stale/reopened record immediately returns field status to BLOCKED; closure history remains append-only.

### EP-00｜Human authority and formal determinations

| Field | Contract |
|---|---|
| Objective | Give real people—not documents or AI—authority for research, data, field, access, rights and incidents. |
| Required owners | Sponsor, product, research, data/privacy, ethics/age, campus access, filming/photo, field safety, accessibility, curator, coder/adjudicator, incident commander; each with backup. |
| DoD | Signed RACI/contact matrix; ethics/age/data/campus/filming determinations; recruitment authority; consent/data roles; incident/notification escalation. |
| Dependencies | None; project cannot execute without it. |
| Main risks | No institution will own liability/data/field; one “liaison” falsely claims all authority. |
| Stop condition | Any required authority absent or refuses scope → archive documents / Don't build yet. |
| Earliest duration | Unknown; external decision latency, not safe to estimate. |

### EP-01｜Area, route, rights and accessibility readiness

| Field | Contract |
|---|---|
| Objective | Produce one legal, current, bounded UTown C1-text pack candidate without copying unauthorised content. |
| DoD | Immutable manifest/digest; asset rights ledger; original/allowed anchor cues; two route walkthroughs; route/task/carrier access matrix; day-of/expiry/hard-freeze rules; 2026 ISO Trail material or dated gap log. |
| Dependencies | EP-00 owners/permissions. |
| Main risks | Route not meaningful/accessible; NUS/map assets unusable; prompt not location-specific; review ceiling exceeded. |
| Stop condition | No safe/rights-cleared meaningful route; unknown assets required; theme cannot preserve estimand across included access needs. |
| Timebox | 5–10 workdays after permissions; exceed timebox → cost review, not silent extension. |

### EP-02｜Actual C1-text components and D1–D3 readiness drills

| Field | Contract |
|---|---|
| Objective | Decide field feasibility for the actual paper/text/storage/custody path. |
| D1 DoD | Exact issue/return/copy/dose/session authorization; planned expiry and hard-freeze fixtures; stale/unreturned copies accounted. |
| D2 DoD | Approved storage/data-flow/copy graph; virtual participant export/correct/withdraw/delete covers identity/evidence/coder/export/backup/audit; independent proof. |
| D3 DoD | 48h-only review/typed abstention; safety/exit, lost/corrupt/delete/access/owner-unavailable tabletop has one action; all research batches recalculable. |
| Dependencies | EP-00 + EP-01 + actual component selection. |
| Main risks | Checklist theater; paper lost; hidden transcription/backup; consent/dose circularity; inaccessible input. |
| Stop condition | Any silent loss/stale start/unclosed copy/near miss/unsupported access; 8 field P0 not all closed. |
| Timebox | 3–5 workdays; at most one authorised repair per drill; failures remain visible. |

**EP-02 exit:** only after 8/8 valid P0ClosureRecords and independent proof may ADR become `Accepted for validation only`, preregistration lock and field execution be considered.

### EP-03｜V1 residual-job study

| Field | Contract |
|---|---|
| Objective | Determine whether a recent, consequential, unresolved job exists in a neutral N=16 sample. |
| DoD | Fixed 16; three non-homogeneous channels; open timeline script; actual alternatives reproduced; two blind event coders + adjudication; participant roll-up; full refusal/no-show denominator. |
| Decision | Signal: qualifying ≥8/16 AND unresolved ≥6/16. No-go: qualifying ≤4/16 OR unresolved ≤3/16. Else inconclusive/stop current combination. |
| Dependencies | EP-02 field-ready + preregistration + recruitment roster. |
| Risks | Interview prompts manufacture events; high research self-selection; official trail content missing. |
| Stop-build | No-go/inconclusive → no V2, no design/build; pivot only with new persona/JTBD version. |
| Duration | 1–2 weeks once recruitment authorised. |

### EP-04｜V2a component pilot

| Field | Contract |
|---|---|
| Objective | Test prompt-pack component vs same map/route/record opportunity. |
| DoD | Independent 16, 8/arm; concealed assignment; condition-specific doses; actual exposure records; text/manual only; 48h blind scoring; all guardrails and work logs. |
| Decision | Exploratory signal only: treatment iURCS ≥6/8, control ≤3/8, delta≥3; all guards. |
| Dependencies | EP-03 signal. |
| Risks | Prompt leakage, researcher coaching, attrition, proxy mistaken for use. |
| Stop-build | STOP freezes; INVALID blocks progression and permits at most one authorised repair; NO-GO stops M2; INCONCLUSIVE has no downstream. No C2/C3/AI rescue. |
| Duration | ~2 weeks + 48h follow-up. |

### EP-05｜V2b pragmatic package pilot

| Field | Contract |
|---|---|
| Objective | Compare full M2+C1-text treatment dose with ordinary map/free exploration usual-practice control. |
| DoD | New N=16/8-per-arm; same comparison set but condition-specific doses; ITT; actual tools/exposure; common forms; all burden/access/rights guards. |
| Decision | Same large-effect exploratory bar; calibrates V2c only. |
| Dependencies | EP-04 signal; treatment dose frozen. |
| Risks | Heterogeneous usual-practice control; different exposure; social/help contamination. |
| Stop-build | Apply shared state machine: STOP/INVALID do not become product No-go evidence; valid NO-GO stops M2; INCONCLUSIVE has no downstream. Platform cannot rescue. |
| Duration | ~2 weeks + 48h. |

### EP-06｜V2c confirmatory package comparison

| Field | Contract |
|---|---|
| Objective | Independently confirm the package effect. |
| DoD | New sample; N/MDE/power or chosen method locked from conservative baseline; same treatment dose/comparison set; missing/withdrawal/exact intervals/burden margins fixed; independent analysis. |
| Dependencies | EP-05 signal and stable dose. |
| Risks | Pilot winner effect inflates N assumptions; source/route changes force new dose; recruitment infeasible. |
| Stop-build | Effect below MDE with valid data = NO-GO; version/exposure/measurement drift = INVALID; hard guard = STOP; any non-signal state blocks V2d/build. |
| Duration | Recalculate from real eligible traffic; no date until N/channel known. |

### EP-07｜V2d repeated revealed choice

| Field | Contract |
|---|---|
| Objective | Observe the same person voluntarily use exact treatment dose and retain a new/revised decision articulation. |
| DoD | Two independent 24-invite cohorts; 3 channels×8; pre-enumerated deterministic roster; one neutral invite; zero walk-linked compensation; same treatment dose; full RAP/JVAP/follow-through/missingness. |
| Decision | Each cohort RAP≥8/24 & JVAP≥6/24; pooled RAP≥16/48 & JVAP≥12/48; every channel contributes JVAP; actual location follow-through reported separately. |
| Dependencies | EP-06 confirmatory win. |
| Risks | Research-context novelty; roster eligibility not knowable without screening; actual use remains weak. |
| Stop-build | Any cohort RAP≤3 or JVAP≤2, inconsistent cohorts, one-channel-only adoption, rights/safety/burden failure. |
| Duration | 2 cohorts × 7–14 days, sequential and independent. |

### EP-08｜Value-type and branch decision

| Field | Contract |
|---|---|
| Objective | Choose Stop, one-time reflective/learning activity, or a reuse candidacy that must still pass EP-09; no custom candidate yet. |
| DoD | Sponsor/value/budget/capacity/lifecycle contract; total validation vs portable operating cost; actual follow-through shown separately; owner/recipient; `ActualUseDecisionRule` locked before V2d results or default restrictive rule applied. |
| Value-type rule | If actual follow-through is absent/opposite/unknown, do not claim place-use utility and do not enter reuse/custom; at most a one-time reflective activity with separate validation/authorisation. Reuse candidacy requires pre-registered actual-use evidence beyond articulation. |
| Branch DoD | One-time: activity owner/access/recruit/photo/data/safety/expiry contract. Reuse candidacy: proceed only to EP-09, not reusable classification yet. |
| Dependencies | EP-07 signal for any continue branch. EP-07 No-go stops M2; one-time activity then requires a new commissioned-activity hypothesis/validation, not this branch. |
| Risks | Calling research pack a product; calling public-good intent a sponsor; hiding unpaid curation. |
| Stop-build | No sponsor/cost ceiling/owner; only one area; C1 already sufficient. |
| Duration | 3–5 workdays after full evidence/cost package. |

### EP-09｜Reuse probe: second curator + second area/theme（conditional）

| Field | Contract |
|---|---|
| Objective | Test whether the content contract is reusable rather than a one-area handcrafted activity. |
| DoD | Independent second curator creates a second rights/field/access-cleared area/theme without inheriting old verification; work/help/rework logged; real bounded sessions and actual-use evidence; sponsor ceilings pass. |
| Dependencies | EP-08 reuse candidacy + new area/field/rights approvals. |
| Risks | Original curator silently rescues; old licence/route copied; generated pack mistaken for user value. |
| Stop-build | No real sessions/actual use, cost ceiling exceeded, first curator dependency high, or any inherited stale/rights/access claim → classify one-time/stop, no C3/MVP. |
| Duration | Capacity-dependent; no estimate until second curator/area/throughput exist. |

### EP-10｜Design and carrier build-null（conditional）

| Field | Contract |
|---|---|
| Objective | Design only the selected value mechanism; audit C1 vs C2 carrier governance/burden under the same content/comparison contract while using a new carrier-specific dose. This is not a user-value retest. |
| DoD | Mechanism-specific journey/IA/access/error states; C1 component audit; C2 5-day synthetic audit with new carrier-specific dose, no extra stimuli, delete/export/offline/access/burden non-regression; report states no value transfer. If C2 remains a candidate for real use, create a separate carrier-specific validation plan before any participant/external session. |
| Dependencies | EP-08 authorised one-time activity or EP-09 passed reusable system; not Stop. |
| Risks | Hosted features/new carrier contaminate value; vendor terms/data/partial accessibility; design polish hides failure. |
| Stop-build | C1 sufficient → retain it. C2 fails or governance unknown → no C2/C3. |
| Duration | Design 5 workdays; C2 audit max 5 workdays if separately authorised. |

### EP-11｜Technical spike（default 0; conditional only）

| Field | Contract |
|---|---|
| Objective | Answer one repeated software blocker after reusable-system classification. |
| Entry | EP-09 Reusable content system passed; C1 remediation + C2 audit; repeated blocker with denominator; sponsor/budget; complete C3 Spike Authorization Record. |
| DoD | One yes/no result on durability, revocation/expiry or idempotent import; synthetic data; independent review; full failures; default disposal. |
| Dependencies | EP-09 reusable classification + EP-10 blocker evidence. |
| Risks | App shell scope creep; technical success interpreted as product value. |
| Stop-build | Time/cost ceiling, new P0/P1, blocker unsolved, or only aesthetic improvement. At most one authorised repair. |
| Duration | Written by budget owner; default `0/not run`. |

### EP-12｜Unreleased MVP candidate（not planned; conditional）

| Field | Contract |
|---|---|
| Objective | Implement—not release—the smallest approved carrier for a validated reusable job. |
| Entry | EP-11 pass if custom; approved business/PRD/ADR; 8 P0 closed for actual carrier; no open technical P0/P1; rollback/owners/support funded. |
| DoD | Build-complete candidate only; approved requirements, tests and traceability; no AI/GPS/media unless separately validated; no hidden migration from spike. It cannot be dogfooded or externally used before EP-13. |
| Dependencies | EP-08–EP-11 and new build authorisation. |
| Risks | “MVP” used to bypass validation; maintenance/expiry/rights overwhelm value. |
| Stop-build | Any demand/rights/access/cost regression or sponsor/lifecycle withdrawal. |
| Duration | Unknown until a solution and team are actually authorised. |

### EP-13｜Eval suite（before any MVP use）

| Field | Contract |
|---|---|
| Objective | Prove requirements and bad-case recovery for actual carrier. |
| DoD | Version/expiry/blockers, save/custody/recovery, typed claims, copy graph, delete/export, access, incident, vendor exit, cost and device/network matrix; independent results, all P0/P1 closed. |
| Dependencies | EP-12 unreleased candidate or authorised C1/C2 operational configuration. |
| Stop-build | Any silent loss, stale start, false claim, unclosed copy, near miss or unreproducible recovery. |

### EP-14｜Dogfood（conditional, non-participant data first）

| Field | Contract |
|---|---|
| Objective | Exercise operations with synthetic/staff data without claiming user value. |
| DoD | Staff/internal scenarios cover issue/expiry/freeze/rights/access/support/retirement; dogfood data segregated and excluded from product evidence. |
| Dependencies | EP-13 pass + institutional dogfood permission. |
| Stop-build | Staff convenience hides participant access/rights; real participant data introduced early. |

### EP-15｜Limited external validation（conditional）

| Field | Contract |
|---|---|
| Objective | Replicate bounded value/reliability with authorised external participants/second setting. |
| DoD | New preregistration, second curator/area, current rights/route/access, real denominators, independent review, support/expiry/incident owner. |
| Dependencies | EP-13/EP-14 pass, sponsor and field approval. |
| Stop-build | No replication, cost/review ceilings exceeded, route/rights/access failure, user value only in original curated context. |

## 5. Milestone DoD summary

| Milestone | Required gate | Output status if passed | Failure verdict |
|---|---|---|---|
| EP-00–EP-02 | 8 field P0 | Conditional feasible for G2 validation only | Don't build yet / blocked |
| EP-03 | V1 | Residual-job signal | Pivot/stop current combo |
| EP-04 | V2a | Component signal | Stop M2 |
| EP-05 | V2b | Pragmatic package signal | Stop M2 |
| EP-06 | V2c | Confirmatory package win | Validate first / stop |
| EP-07 | V2d | Repeated JVAP signal | Stop M2; any commissioned activity requires new hypothesis |
| EP-08 | Value/branch decision | Stop / one-time / reuse candidacy | Archive/stop |
| EP-09 | Reuse probe | Reusable content system or one-time/stop | No C3/MVP |
| EP-10 | Carrier build-null | C1 or C2 decision | No custom |
| EP-11 | Spike | One blocker answered | Dispose/stop |
| EP-12–EP-15 | New approvals | Unreleased candidate→eval→dogfood→external | Rollback/retire |

## 6. Stop-work rules

Stop immediately when:

- any safety/access/rights/data hard freeze or near miss occurs;
- owner/backup, consent version, route, asset right, storage or deletion proof becomes invalid;
- a stage hits No-go or inconclusive-at-cap;
- protocol/carrier/estimand changes without new version;
- a later feature is proposed to “rescue” a failed earlier mechanism;
- cost ceiling, review SLA or sponsor/lifecycle commitment is missing/exceeded;
- someone attempts C2 real data, C3 code, AI, media or GPS without its gate.

Stopping preserves correction/export/delete and retains failed/invalid batch/cost evidence. It does not mean deleting inconvenient findings.

## 7. RACI before execution

Every milestone needs a signed start record with `milestone_id`, named accountable person, named responsible lead(s), independent approver, dependencies/evidence refs, capacity/timebox, allowed data/scope and start/expiry timestamps. A role label or team alias is not a name; `UNASSIGNED` means the milestone cannot start.

| Milestone | Accountable role | Responsible role(s) | Independent approver | Current |
|---|---|---|---|---|
| EP-00 | Sponsor | Project coordinator | Governance/institutional reviewer | UNASSIGNED |
| EP-01 | Field/curation owner | Curator + access/rights reviewers | Independent field/rights reviewer | UNASSIGNED |
| EP-02 | Research/data owner | Data steward + drill leads | Independent tech/privacy reviewer | UNASSIGNED |
| EP-03–EP-07 | Research owner | Interview/field/coder/analysis leads | Independent analysis + safety/rights reviewers | UNASSIGNED |
| EP-08 | Business sponsor | Product + operations/finance | Adversarial/business reviewer | UNASSIGNED |
| EP-09 | Reuse sponsor/curation owner | Second curator + second field team | Independent product/research/rights reviewer | UNASSIGNED |
| EP-10 | Product/business owner | Design + carrier audit leads | Accessibility/data reviewer | UNASSIGNED |
| EP-11 | Engineering owner | Spike implementer | Independent technical reviewer | UNASSIGNED / not authorised |
| EP-12 | Product + engineering owner | Delivery team | Technical/security/privacy reviewers | UNASSIGNED / not authorised |
| EP-13 | Eval owner | QA/evaluation team | Independent tech/access reviewer | UNASSIGNED / not authorised |
| EP-14 | Dogfood owner | Internal ops | Privacy/access reviewer | UNASSIGNED / not authorised |
| EP-15 | Sponsor + research owner | External validation team | Independent product/tech/ethics reviewers | UNASSIGNED / not authorised |

### Cross-cutting responsibility map

| Workstream | Accountable | Responsible | Independent check | Current |
|---|---|---|---|---|
| Product/gates | Product owner | PM/research coordinator | Adversarial reviewer | role only |
| Ethics/consent/data roles | Institutional authority | Research owner/data steward | Privacy/ethics reviewer | missing |
| Field/access/safety | Field owner | Curator/facilitator | Accessibility reviewer | missing |
| Rights/licence | Rights holder authority | Curator | Independent rights check | missing |
| Research design/analysis | Research owner | Interviewers/coders | Independent analysis reviewer | missing |
| Incident | Incident commander | Field/data owners | Privacy/campus authority | missing |
| Business/cost/classification | Sponsor | Product/ops | Finance/independent reviewer | missing |
| Technical spike/MVP | Engineering owner | Engineer(s) | Independent tech reviewer | not authorised |

No row may use “AI” or an unowned team alias as Accountable.

## 8. Work, capacity and duration accounting

- Every EP-00–EP-15 task uses the G6 `OperationalWorkLog`, including paid, unpaid, volunteer and institutional time; active and waiting time; research-only/value-delivery/operations/governance/reuse context; failed/aborted/no-change outcomes; shared allocation rule and skill level.
- Recruitment, coordination, owner sign-off, consent, coding, adjudication, rework, no-show, incident, retirement and “nothing changed” review are not overhead to omit.
- A milestone DoD requires independent timesheet/ledger reconciliation with 100% of known minutes/costs assigned. Missing labour means milestone remains incomplete and cost classification unknown.
- Durations in this roadmap are **planning envelopes, not dates**. Before start, the named owner must replace each with a capacity-based estimate using eligible-channel throughput, available FTE/volunteer hours, review latency and predecessor completion. If that evidence is unavailable, duration remains `unknown`.
- Waiting on authority, recruitment or rights cannot be hidden by parallel downstream work; the project remains blocked.

## 9. Artifact outputs per milestone

| Milestone | Required artifacts |
|---|---|
| EP-00 | Signed RACI/determinations/contact tree |
| EP-01 | Manifest/release, rights ledger, route/access records, ISO material gap log |
| EP-02 | Storage register, copy graph, D1–D3 reports, P0 closure registry, signed ADR decision |
| EP-03–EP-07 | Preregistration versions, raw registries, immutable batches, coder/adjudication, cost/incident/rights logs, decision report |
| EP-08 | Sponsor/value/cost contract + value-type/branch decision |
| EP-09 | Second-curator/second-area release, work logs, real session/use and reuse classification decision |
| EP-10 | Mechanism-specific design rationale + carrier build-null report |
| EP-11 | Spike authorization + spike summary + independent review + disposal record |
| EP-12 | Approved PRD/ADR, unreleased implementation/rollback package |
| EP-13–EP-15 | Eval/dogfood/external validation reports and updated risks/decisions/status |

## 10. Risks and dependencies

| Risk/dependency | Leading signal | Mitigation | Stop threshold |
|---|---|---|---|
| R1 demand | low qualifying/JVAP/package delta | execute sequence, retain negatives | G2 No-go |
| Curation/expiry/low reuse | rising person-minutes/missed reviews/second-curator help | sponsor ceilings, retire, no custom | ceiling/review fail |
| Route/access | skip/stop/near miss/unsupported variant | human review, stop, separate estimand | any hard event |
| Rights/licence | unknown asset/deep-link/participant PII | remove, original assets, signed rights | unknown required asset |
| Copy/data | lost copy/pending delete/mismatch | graph, D2, stop collection | unclosed lineage |
| Research integrity | exposure mismatch/leakage/attrition | validators/blinding/ITT | invalid batch/no repair path |
| Hosted vendor | stale preload/delete/access unknown | synthetic C2 audit | any unresolved hard item |
| Custom/AI scope | spike/app/model suggested early | authorization record + deny-all | any unauthorised work |

## 11. Decision cadence and STATUS updates

- One gate/stage at a time; no parallel downstream build.
- At every milestone exit update `STATUS.md`, `DECISIONS.md`, `ASSUMPTIONS.md`, `RISKS.md` and affected artifact revision.
- Every failure records root cause, version, denominator, cost and whether the hypothesis/implementation/operation failed.
- Any major new evidence triggers cross-document sync audit before resuming.
- No milestone is complete because its document exists; only its DoD evidence closes it.

## 12. Current human decisions required

These are needed before execution, not before completing this document set:

1. Identify sponsor and all EP-00 accountable owners/backups.
2. Confirm institutional ethics/age/data/campus/filming/recruitment determinations.
3. Choose actual C1-text storage/custody components and cost ceilings.
4. Decide whether the project can access neutral NUS international student recruitment channels.
5. Confirm a field/accessibility team can perform UTown walkthroughs.

Without these, the plan remains blocked; no reasonable technical assumption can substitute.

## 13. Related documents

- [STATUS](../STATUS.md)
- [G2 Validation Plan](./02_VALIDATION_PLAN.md)
- [G3 BRD](./03_BRD.md)
- [G4 Solution Options](./04_SOLUTION_OPTIONS.md)
- [G5 Technical Feasibility](./05_TECHNICAL_FEASIBILITY.md)
- [G6 Architecture](./06_ARCHITECTURE.md)
- [G6 Independent Review](./07_TECH_REVIEW.md)
- [G7 PRD](./08_PRD.md)

## 14. Revision history

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1 | 2026-08-29 | council-review | Now/Next/Later roadmap, initial milestone IDs, DoD/dependencies/risks/stop-build/RACI/artifacts |
| 0.2 | 2026-08-29 | PASS — conditional roadmap / only EP-00 active | Execution IDs EP-00–EP-15、field P0 closure registry、G2 state machine、reuse probe、actual-use branch、carrier audit/no value transfer、unreleased MVP-before-eval、milestone owners 与 full labour/capacity accounting；最终评审 P0/P1=0 |
