---
artifact: prd
project: One Square Kilometre
created: 2026-08-29
status: validation-ready-draft-not-approved
gate: G7
documentation_gate: pass
prd_scope: m2-c1-text-validation-experience
product_evidence_gate: not-run
field_feasibility: blocked-not-run-8-open-p0
business_approval: blocked
product_solution_selected: false
adr_status: proposed
ai_scope: excluded-deny-all
build_authorization: none
---

# G7 PRD｜One Square Kilometre Validation Experience（M2 + C1-text）

## 0. PRD 状态与裁决

这是 **validation-ready, assumption-bound draft**，不是已批准产品 PRD。它只规格化如何验证 M2 self-guided evidence protocol；不批准 field execution、软件、hosted provider、媒体、GPS、AI、公开 pack 或规模化。

当前唯一诚实 verdict：**Validate first。** 需求、persona、area、route、protocol effect、JVAP、sponsor/value/cost 均未获得行为证据。8 个 field P0 全 OPEN；`ADR-G5-001` 仍 Proposed。

## 1. Overview

### 1.1 Problem Statement（待验证）

当前学期新到 NUS、已能到达 UTown 建筑的国际学生，可能仍无法为独处、等人、短时学习或会合，根据自己的现场证据选择停留空间。NUS 官方 trail/onboarding、地图、同伴和自然熟悉是否已充分解决，以及额外 35 分钟是否值得，仍是 R1。

### 1.2 Evidence

| Evidence | Level | What it supports | What it does not support |
|---|---|---|---|
| 项目只有 concept brief，无用户/现场/技术实证 | E2 workspace fact | 当前必须 validation-first | 不证明需求不存在 |
| [NUS 2026 ISO](https://osa.nus.edu.sg/experience-communities/international-student-experience/orientation/) 有 Trail Experience、Buddy/Peer；另有 [map](https://map.nus.edu.sg/) / [tours](https://uci.nus.edu.sg/campus-tour/) | E2 official supply | 强替代存在 | 用户使用/结果未知 |
| [UTown official page](https://uci.nus.edu.sg/campus-life/campus-services/utown/) / [2024 map](https://map.nus.edu.sg/download/University-Town-Map.pdf) 可桌面界定 | E2 | 可作为研究候选 area | 不证明路线可走、可达、开放或相关 |
| G2/G5/G6 文档评审闭环 | 分析/治理 | 测试与技术合同可审查 | 不产生用户或 field capability 证据 |

### 1.3 Solution Summary（验证配置）

用一个 exact-version、text-only、manual-anchor、无 hosted/GPS/media/AI 的 C1 validation kit，执行 M2 self-guided field protocol。参与者在具名当日授权后领取当前材料，按探索建议访问 4–6 anchors，可 unsure/skip/stop，留下 pseudonymous 文字 assertion；48h 无提示 outcome 封存后，才可看固定、source-linked review，并可纠正、导出、撤回或删除。

### 1.4 Target research segment

当前学期首次进入 NUS、正在建立校园日常使用模式、已能用惯常工具到达 UTown 指定建筑的国际学生。国际身份是招募聚焦，不是已证明因果变量；无近期问题/已有充分替代者保留为负面分母。

### 1.5 JTBD hypothesis

> 当我开始规律使用 UTown、已能到达目的地，但要决定在哪里短暂停留时，我想基于少量现场观察形成对几个空间“何时适合我”的可回溯判断，以便下一次更有把握地做出选择，而不只是记地标或照抄推荐。

这是待验证的真实 job outcome；当前 JVAP/iURCS 只测自愿采用与 48h decision articulation。只有 actual location follow-through 证据才能支持“做出选择”的行为结论。

## 2. Goals, success metrics and non-goals

### 2.1 Goals

1. 证伪或支持 residual job、M2 component、完整 package 与 direct-invitation demand。
2. 让所有结果可回链 exact protocol/estimand/condition/dose/exposure/raw evidence。
3. 在最小数据面验证版本、rights、48h、成本和 failure cases，而不引入不必要技术。
4. 产生明确的 Stop / activity / reusable-system / future-spike 分类证据。

### 2.2 Success metrics

| Metric | Baseline | Target | Authority |
|---|---|---|---|
| V1 residual-job | unknown | `qualifying ≥8/16 AND unresolved ≥6/16` | G2 fixed decision bar |
| V2a component signal | unknown | treatment iURCS ≥6/8, control ≤3/8, delta ≥3, all guardrails | exploratory only |
| V2b package pilot | unknown | 独立 N=16/8-per-arm；ITT denominator=all assigned；普通 48h missing=fail、withdrawal按删除边界；treatment iURCS ≥6/8, control ≤3/8, delta≥3 + all guards | Exploratory signal only；invalid/attrition/inconclusive 按 G2 state machine，不单独解锁 |
| V2c confirmatory | unknown | pre-registered MDE/N + all guardrails | required before V2d |
| `JVAP-7/48` | unknown | each cohort RAP ≥8/24 & JVAP ≥6/24; pooled RAP ≥16/48 & JVAP ≥12/48 | only demand primary |
| Actual location follow-through | unknown | 7 天真实地点使用/拒绝逐人报告；无预设 Go target | Secondary；若不支持，只能写 uptake + decision articulation，不得写改变现实行为 |
| Field P0 closure | 0/8 closed | 8/8 with original evidence | required before any field run |

`JVAP-7/48` 的“持久”仅指同一人自愿完成 protocol 且 48h 后仍能表达新增/修订的地点—条件—用途判断；它不等于之后实际使用该地点。任何结论必须与 7 天 actual follow-through 并列，不能把 proxy 改写成现实行为。

### 2.3 Non-goals

- 不是导航、安全、无障碍保证、开放/实时 POI 或权威街区分析。
- 不做全球/多区、动态路线、UGC/feed、评分/推荐、3D/AR、leaderboard/gamification。
- 不收照片、语音、GPS/轨迹、账户、公开 profile 或第三方 analytics。
- 不使用 hosted provider、Actionbound real data、C3 code、MapLibre/PMTiles 或 AI。
- 不验证收费、市场规模、订阅、增长或高频留存。
- 不把成功研究配置当未来 product/carrier。

## 3. End-to-end experience

### 3.1 Validation participant journey

```text
中性招募与 eligibility
→ teach-back consent + participant ID
→ pre-choice / condition assignment（适用时）
→ field owner 的 SessionAuthorization
→ 领取 exact release/dose 的编号 C1-text pack
→ manual anchor assertion：found / unsure / skipped；可 stop/rebind
→ text-only field notes
→ common immediate choice sealed
→ pack/evidence custody + 48h unaided outcome
→ fixed review only after outcome locked
→ correction / export / withdraw / delete
```

### 3.2 Content/pack lifecycle

```text
source/right clearance
→ field/access review
→ StudyProtocol + Estimand + Conditions + condition-specific Doses
→ immutable release/digest + numbered copies
→ day-of blockers + authorization
→ issue/return/unreturned incident
→ review due / planned expiry / hard freeze / retire
→ existing evidence rights remain
```

### 3.3 Failure/rights journey

```text
weather/access/incident/rights/data/custody issue
→ open LifecycleBlocker
→ derive start_allowed=false
→ ActiveSessionDecision by human owner
→ contain / protect people / minimal incident record
→ invalidate or preserve research evidence per independent rule
→ resolve with proof or retire; never silent reopen
```

## 4. User stories

| ID | User story | Priority |
|---|---|---:|
| US-01 | As a participant, I want to know whether the experience is valid for me now so I can decline without penalty. | P0 |
| US-02 | As a participant, I want to identify or skip an anchor without GPS so uncertainty is not turned into a false location claim. | P0 |
| US-03 | As a participant, I want to record only text and stop at any time so I do not have to expose media or location. | P0 |
| US-04 | As a participant, I want my original statement and corrections separated from verified metadata so I can see what is mine vs externally checked. | P0 |
| US-05 | As a participant, I want export/withdraw/delete to cover every project-controlled copy so my rights are real. | P0 |
| US-06 | As a field owner, I want exact release/copy and concurrent blockers so stale or unsafe sessions cannot start. | P0 |
| US-07 | As a researcher, I want assignment and actual exposure separated so treatment/control results remain attributable. | P0 |
| US-08 | As an independent reviewer, I want raw event/outcome/coder/batch lineage so I can recompute V1/iURCS/RAP/JVAP. | P0 |
| US-09 | As a curator, I want source/licence/field/access/expiry per asset and anchor so outdated or unauthorised claims fail closed. | P0 |
| US-10 | As a sponsor, I want total validation and portable operating costs separated so research burden is not hidden as product economics. | P1 |
| US-11 | As an activity owner, I want external-operation authority, budget, access/recruitment/photography, data/safety and expiry/retirement contracts before any one-time activity is offered. | P0 |
| US-12 | As a participant, I want safety and exit assistance to override experimental blinding so I am never asked to continue for data quality. | P0 |
| US-13 | As a decision reviewer, I want JVAP/48h articulation separated from actual location follow-through so the report cannot claim real-world behaviour it did not observe. | P0 |

## 5. Functional requirements

### 5.1 Study and dose control

| ID | Requirement |
|---|---|
| FR-001 | The system of record shall version `StudyProtocolVersion`, `EstimandVersion`, `StudyCondition`, `DoseDefinition`, assignment and actual exposure separately. |
| FR-002 | `protocol_family_id/comparison_set_id` shall represent shared comparison; each arm/carrier shall have its own condition-specific `dose_id`. |
| FR-003 | Any change to visible content, modality, carrier, route, access stimulus, form, duration or completion shall create the required new version/dose and shall never be merged with prior results. |
| FR-004 | C1→C2 or text→media/GPS shall be a new condition/dose/rights review even if content release is unchanged. |

### 5.2 Release and session authorization

| ID | Requirement |
|---|---|
| FR-010 | Every pack shall have immutable release ID/digest, copy ID, dose ID, review/expiry, owners and full source/licence/access refs. |
| FR-011 | `start_allowed` shall be derived from valid release/dose/authorization and zero open `LifecycleBlocker`s; it shall never be manually overwritten. |
| FR-012 | A `SessionAuthorization` shall identify exact copy/dose, authorized window, day-of checks, field owner/backup, fallback exit and unused-copy disposition. |
| FR-013 | Scheduled expiry/supersession shall deny new starts; hard safety/access/rights freeze shall produce an auditable active-session decision. |
| FR-014 | Closing one blocker shall not clear other blockers; every resolution shall have evidence and owner. |
| FR-015 | Before consent, participant-facing material shall identify the responsible research organisation/owners, state that the experience is not an official NUS service unless formally authorised, and provide contact/complaint/withdrawal paths. |
| FR-016 | Before randomisation/start, route × task × carrier/access variant shall be matched to the participant’s declared arrangement needs; unsupported/non-matched candidates shall remain in the screening denominator and shall not be pressured to proceed. |

### 5.3 Participant field flow

| ID | Requirement |
|---|---|
| FR-020 | Core completion shall use manual anchor assertions and text only; no GPS, media, account, hosted form or AI path shall exist. |
| FR-021 | Anchor status shall be `found/unsure/skipped`; stop shall be a separate event; rebind shall preserve prior assertion and participant confirmation. |
| FR-022 | Manual assertion shall be labeled participant-reported and shall never be displayed/analysed as verified physical presence. |
| FR-023 | Participant shall be able to unsure/skip/stop/rebind without researcher navigation answer or completion penalty. |
| FR-024 | Field records shall be keyed by pseudonymous ID and linked to exact release/dose/session/anchor assertion/revision; prompts shall prohibit names/contact/third-party details, and a manual PII check shall quarantine/redact authorised copies before coder/review use. Pseudonymous keying shall not be claimed to make free text anonymous. |

### 5.4 Outcome and review

| ID | Requirement |
|---|---|
| FR-030 | Field text and immediate choice shall be sealed; no notes/recap shall be shown before 48h outcome is completed and locked. |
| FR-031 | Review shall only display participant statements/choices and still-valid verified metadata through fixed templates. |
| FR-032 | Every review claim shall use typed dependencies and epistemic status; a participant inference shall never become verified metadata. |
| FR-033 | Missing/wrong/deleted/expired/suspended dependencies shall invalidate or abstain deterministically. |
| FR-034 | Pattern generation, free-text summarisation, automatic transcription/translation and AI shall not exist. |

### 5.5 Research evaluation

| ID | Requirement |
|---|---|
| FR-040 | V1 shall retain participant→multiple RecentEvents→AlternativeReproduction→two coders→adjudication→participant roll-up, preserving negative events. |
| FR-041 | Recruitment/refusal/no-show/eligibility/assignment/exposure/follow-up/missing/withdrawal/burden/coder/adjudication/revealed invitation and analysis batch shall be canonical research entities or have a documented external-system contract. |
| FR-042 | Derived V1/iURCS/RAP/JVAP shall link immutable raw/event/outcome, dose/exposure, codebook, coder/adjudication and analysis version. |
| FR-043 | Repair reruns and invalid/failed batches shall remain separate and visible; they shall not be merged into later success. |
| FR-044 | Actual 7-day location follow-through shall be stored/reported separately from JVAP and shall not be imputed from 48h decision articulation or intention. |

### 5.6 Rights, copies and incidents

| ID | Requirement |
|---|---|
| FR-050 | Every project-controlled asset/copy shall be represented through AssetVersion, ControlledCopy, DerivationEdge, CustodyEvent and RightsBasis. |
| FR-051 | Export/correction/withdraw/delete shall graph-traverse identity, paper/local, transcription, coder/adjudicator, export staging, backup/log and vendor copies. |
| FR-052 | Participant-owned received exports shall be non-controlled; project staging/sent copies shall still be deleted. |
| FR-053 | A request shall remain pending until every controlled copy is disposed/expired with independent proof; UI deletion shall not count. |
| FR-054 | Serious incident/near miss shall freeze the release; no post-hoc “handled” state shall erase exposure. |
| FR-055 | Consent/teach-back shall be versioned and modality/purpose specific; it shall record comprehension, optional permissions, withdrawal effects, responsible owner and data-flow version. |
| FR-056 | Safety/exit/access assistance shall always override experimental blinding. If assistance changes exposure, the session shall stop or be classified by the preregistered deviation rule; researchers shall never withhold emergency/exit help to preserve data. |
| FR-057 | Consent shall be staged without circular dependency: an approved minimal `RecruitmentScreeningRecord`/notice covers contact, eligibility and refusal; a `PreAssignmentConsentRecord` binds the protocol family/comparison set, all permitted conditions/doses and data-flow before randomisation; after assignment, an exact `ConsentDoseBinding` is required before any exposure, SessionAuthorization or field data. |
| FR-058 | Post-assignment refusal to bind the exact dose shall result in no exposure/collection, shall remain in the preregistered assignment denominator, and shall never be pressured or silently replaced. Withdrawal/revocation shall open a rights blocker and initiate lineage actions. |

### 5.7 Cost and lifecycle

| ID | Requirement |
|---|---|
| FR-060 | Work logging shall include all research/operations/governance/reuse tasks, active/waiting time, role/skill, shared allocation, failure/no-change and external cost evidence. |
| FR-061 | Validation cost and portable operating cost shall be reported separately across invite/start/session/valid-completion/release/retired-pack denominators. |
| FR-062 | No carrier, scale or reuse claim shall pass if sponsor curation/review/support/lifecycle ceilings are unknown or exceeded. |
| FR-063 | A successful research pack shall not be offered as a one-time external activity until a named activity owner, budget, campus/access/recruitment/photography authority, data/safety owner, expiry/retirement plan and support contact are all approved. Missing one shall force “archive research materials only”. |
| FR-064 | Reusable-system or custom-product classification shall require the G3 classification gate; a single UTown pack or successful validation dose shall never auto-upgrade. |

## 6. Acceptance criteria（Given / When / Then）

### AC-01｜Invalid pack cannot start

**Given** a copy is expired, superseded, digest-mismatched, unreviewed, or has any open lifecycle blocker

**When** a new session is requested

**Then** `start_allowed=false`, every blocker is shown to the authorised owner, and no participant data is collected.

### AC-02｜Concurrent blockers do not clear each other

**Given** rights and access blockers are both open

**When** the rights blocker is resolved

**Then** start remains denied until the access blocker has its own qualified resolution proof.

### AC-03｜Manual assertion is not location fact

**Given** a participant selects an anchor as found

**When** the record and review are created

**Then** it is stored/displayed as participant assertion, with no verified-presence claim or GPS fields.

### AC-04｜Uncertainty and rebind preserve lineage

**Given** a participant is unsure, skips, stops, or later rebinds an anchor

**When** the session is reviewed

**Then** the original state, separate stop event, rebind reason/actor/order and burden remain visible; researcher cannot convert it to found.

### AC-05｜48h leakage is blocked

**Given** immediate choice is sealed and 48h outcome is incomplete

**When** anyone attempts to show notes or review

**Then** access is denied and the attempt is audited without exposing content.

### AC-06｜Unsupported claim abstains

**Given** a claim has no dependency, wrong dependency type, deleted note, expired source, superseded field check or rights suspension

**When** review is generated

**Then** the claim is `abstained/invalidated` with a reason; no free-text or AI fallback runs.

### AC-07｜V1 remains event-recomputable

**Given** one participant has qualifying, alternative-succeeded and wrong-job events with coder disagreement

**When** V1 roll-up is computed

**Then** each event/coder/adjudication is retained, negatives are not overwritten, and participant qualifying/unresolved values recompute by the locked rule.

### AC-08｜Assignment/exposure mismatch invalidates

**Given** a control assignment receives a treatment prompt or the actual carrier/dose differs from assignment

**When** exposure validation runs

**Then** the session/batch is invalid per preregistration, is not silently reassigned, and its original rows remain auditable.

### AC-09｜Withdrawal traverses copies

**Given** a participant withdraws after scoring and an export staging copy plus two coder packets exist

**When** deletion is processed

**Then** every controlled node is enumerated/disposed or remains pending with proof; participant-owned export is not falsely claimed deleted.

### AC-10｜Hard freeze stops, planned expiry does not lie

**Given** an active authorised session encounters a safety/rights hard freeze

**When** the field owner receives the trigger

**Then** stop-and-exit is recorded with communication/acknowledgement; offline non-delivery remains residual risk. Planned expiry without a hard trigger only denies later starts.

### AC-11｜No-hidden-work accounting

**Given** a cancelled participant, failed release, no-change review and shared licence task

**When** cost is reported

**Then** all minutes/costs have work context and allocation, appear in relevant denominators, and zero valid completions never erase cost.

### AC-12｜Text-only contract cannot silently expand

**Given** someone proposes photo, voice, GPS, hosted form or new access stimulus

**When** the current dose is active

**Then** the change is rejected until a new estimand/condition/dose plus rights/access/data approvals exist; old/new data never mix.

### AC-13｜Safety help overrides blinding

**Given** a participant is lost, unsafe, distressed, needs an exit or requests accessibility/emergency help

**When** the researcher becomes aware

**Then** the researcher provides or obtains immediate safe-exit/emergency assistance, stops the task when needed, records the exposure deviation/operational outcome, and never withholds help to preserve allocation or measurement.

### AC-14｜Consent is versioned and understood

**Given** a candidate lacks the approved recruitment notice/screening record, pre-assignment teach-back consent covering all allowed conditions, or post-assignment exact ConsentDoseBinding

**When** eligibility, randomisation or data collection is attempted

**Then** the next dependent step does not occur: no randomisation without pre-assignment consent, and no exposure/session/data collection without exact binding; refusal/non-comprehension remains in the appropriate denominator without penalty or replacement.

### AC-15｜Access match occurs before randomisation

**Given** route, task or carrier has an unsupported or unmatched access dimension for a candidate

**When** randomisation/start is requested

**Then** the candidate is not asked to proceed, the negative/unsupported denominator is retained, and no claim of accessibility is made.

### AC-16｜Research success cannot bypass activity authorisation

**Given** G2 evidence is positive but any activity owner/budget/campus/recruitment/photography/data/safety/expiry contract is missing

**When** someone attempts to release the pack externally

**Then** release is denied and materials remain archived research-only; it is not re-labelled “pilot event” to bypass the gate.

### AC-17｜Proxy reporting cannot become actual-use claim

**Given** JVAP/iURCS is positive but 7-day actual location follow-through is absent, missing or opposite

**When** results, BRD/PRD status or a recommendation are written

**Then** the conclusion is limited to “voluntary protocol uptake + durable decision articulation”; it shall not state “changed real-world location use”, and the actual follow-through rows/missingness are shown separately.

### AC-18｜Free-text identifiers are contained before reuse

**Given** participant text contains their own direct identifier, contact detail or third-party personal information

**When** the record is collected or prepared for coding/review

**Then** it is isolated from coder/review copies, the participant is involved in authorised minimisation/correction where appropriate, third-party data is removed, and the incident/rights path is used if unauthorised data escaped containment.

### 6.17 Story → requirement → acceptance → evidence traceability

| Stories | Requirements | Acceptance | Closure evidence / owner |
|---|---|---|---|
| US-01, US-06 | FR-010–016 | AC-01, 02, 10, 14, 15 | D1 + owner/RACI + route/access determination |
| US-02 | FR-020–023 | AC-03, 04, 13 | D3 fixtures + field owner/research owner |
| US-03 | FR-020, 024, 055–058 | AC-12–15, 18 | text/manual sign-off + staged consent/PII check version |
| US-04 | FR-030–034 | AC-05, 06 | deterministic review fixtures + G6 claim schema |
| US-05 | FR-050–053, 055 | AC-09, 14 | D2 copy graph drill + data steward proof |
| US-07 | FR-001–004, 041–043 | AC-08 | all-stage synthetic recalculation fixture |
| US-08 | FR-040–043 | AC-07, 08 | independent reviewer recomputation |
| US-09 | FR-010–014, 050, 054 | AC-01, 02, 10 | asset ledger + manifest/incident drill |
| US-10 | FR-060–062 | AC-11 | independent timesheet vs WorkLog reconciliation |
| US-11 | FR-063–064 | AC-16 | signed activity/business contract; owner/budget authority |
| US-12 | FR-056 | AC-13 | safety/exit tabletop + field owner sign-off |
| US-13 | FR-044 | AC-17 | analysis/report template + independent reviewer sign-off |

“Closure evidence” 尚未产生的行均保持 blocked；表格不是验收证明。

## 7. Data contract

### 7.1 Allowed participant data

- Random participant ID, separate contact map, minimal RecruitmentScreeningRecord, PreAssignmentConsentRecord and exact ConsentDoseBinding with teach-back/withdrawal/data-flow refs.
- Exact protocol/estimand/condition/dose/release/session/authorization refs.
- Manual anchor assertions/revisions/stop events.
- Participant-authored text, pre/immediate/48h responses, burden/operational states.
- Coder/adjudication/analysis lineage.

### 7.2 Prohibited data/path

- Photos, audio, video, EXIF, raw/approximate GPS, heading/speed/trajectory.
- Account/profile, contact list, ad IDs, public links, personal email/cloud/messaging.
- Third-party analytics/session replay/crash payload.
- LLM/model/transcription/translation/OCR/moderation/embedding/AI coding telemetry with real material.

### 7.3 Retention and rights

Use G2 contract candidate: identity mapping ≤30 days after final follow-up; deidentified text/score/cost ≤90 days after gate decision; export/delete request ≤7 days; backups/derivatives ≤30 days. These are project contract candidates subject to human authority sign-off, not claimed legal deadlines. No actual collection until storage/copy lineage drill proves them.

## 8. AI contract

**Current state: DENY ALL.**

- No model/provider endpoint, SDK, key, schema, retention, prompt log or fallback.
- No AI recap, prompt generation, transcription, translation, OCR, moderation, face/voice detection, embedding or safety/access judgment.
- Deterministic review failure returns raw text/unknown/abstain.
- AI requires a separate future gate after product evidence, build-null, exact corpus/first-output preregistration and new consent/data review. It is not a deferred PRD feature.

## 9. Non-functional requirements

| ID | Requirement |
|---|---|
| NFR-01 | No field run until all 8 field P0 have original closure evidence; 0/100% drill targets are acceptance rules, not production SLO claims. |
| NFR-02 | Accessibility shall be reported separately for route/task/carrier and mobility/vision/hearing/cognitive/language/fatigue/sensory; untested = unknown, not supported. |
| NFR-03 | Every issued copy shall be current, numbered and accounted for; unreturned copy opens an incident. |
| NFR-04 | Every unsupported/expired/deleted claim shall fail closed; source links alone shall not upgrade participant inference. |
| NFR-05 | No silent loss/overwrite/merge; uncertain custody/save makes measurement invalid and preserves incident evidence. |
| NFR-06 | All rights requests, hard freezes and blocker resolutions shall be owner-attributed and independently verifiable. |
| NFR-07 | No latency or scale promise without target component/device/network baseline and sponsor ceiling. |
| NFR-08 | No participant-controlled content shall be included in public/open-source packs by default. |
| NFR-09 | No candidate shall be randomised into a route/task/carrier combination that is unsupported or unmatched for the declared arrangement need; exclusions remain visible in the recruitment denominator. |

## 10. Edge cases and error states

| ID | Scenario | Expected behavior | Priority |
|---|---|---|---:|
| EC-01 | Pack copy missing/illegible/old | Do not start; issue current accessible copy or reschedule; no on-site handwritten patch using old dose | P0 |
| EC-02 | Review due during authorised window | Authorization must already end before boundary; if misconfigured, invalidate start and open blocker | P0 |
| EC-03 | Hard freeze while offline | Human stop plan/check-in-out used; lack of acknowledgement recorded as residual-risk incident | P0 |
| EC-04 | Two blockers, one resolved | Keep denied until all open blockers resolved independently | P0 |
| EC-05 | Participant cannot identify anchor | For task continuation: unsure/skip/stop, no location answer. For safety/exit/access: researcher must help; session stops or records exposure deviation. Safety outranks blinding | P0 |
| EC-06 | Participant writes unsafe/people inference | Preserve as attributed statement if permitted; flag unsupported; never verified metadata/decision claim | P0 |
| EC-07 | Third-party name/message appears in text | Stop collection; isolate/remove with participant; incident/right review if retained | P0 |
| EC-08 | Paper lost before transcription | Contain; incident; do not reconstruct from memory; measurement invalid; assess notification | P0 |
| EC-09 | Transcription differs from paper | Paper original controls while retained; correction/reconciliation logged; scorer receives corrected blinded version | P0 |
| EC-10 | Coder packet maps to wrong participant | Invalidate affected batch; enumerate/dispose copies; incident review | P0 |
| EC-11 | Withdrawal before/after 48h/scoring | Stop contact/processing; graph-traverse copies; recompute allowed aggregates/bounds | P0 |
| EC-12 | Participant asks delete after receiving export | Delete project-controlled copies/staging; explain participant-owned export is outside project control | P0 |
| EC-13 | Backup purge pending | Request remains pending; no “complete” status; no new collection if contract breached | P0 |
| EC-14 | Licence/field verification expires | Deny new starts; invalidate dependent verified metadata; existing text rights remain | P0 |
| EC-15 | Access accommodation changes stimulus | New variant/estimand/dose; do not pool until equivalence decision | P0 |
| EC-16 | Researcher coaches treatment | Exposure deviation; invalidate by preregistered rule; retain failed batch | P0 |
| EC-17 | V2d invite not delivered | Not in delivered denominator per locked delivery rule; failure reason auditable | P1 |
| EC-18 | Zero valid completions | All cost remains; no divide-by-zero “cost per completion” or value claim | P0 |
| EC-19 | Owner unavailable | No start; active session follows fallback/stop; project cannot substitute AI/system authority | P0 |
| EC-20 | Someone proposes C2/C3/AI | Reject: not in PRD; require upstream evidence/classification/authorization and new spec | P0 |
| EC-21 | Participant writes their own name/contact or sensitive self-detail | Treat as participant personal data under consent, isolate/minimise with participant, retain only if necessary/authorised; do not copy into coder/review material | P1 |
| EC-22 | Start material could imply NUS endorsement | Show responsible organisation/owner and “not an official NUS service” unless written authority says otherwise; do not start if responsibility is unclear | P0 |
| EC-23 | Participant consents to randomisation but refuses exact assigned dose | No exposure/data; keep assigned-denominator refusal per preregistration; do not replace or persuade; initiate no further session processing | P0 |

### User-facing/error copy

| State | Message |
|---|---|
| Invalid/expired pack | “This version cannot be used now. Do not begin this walk.” |
| Responsibility | “This research experience is run by [responsible organisation/owner]. It is not an official NUS service unless stated with written authorisation.” |
| Consent incomplete | “We cannot begin until you understand and agree to this exact research and data-use version. You may decline without penalty.” |
| Anchor unsure | “If you are not sure, choose ‘Unsure’ or skip. This is not a navigation check.” |
| Stop | “Stop here. Your choice to stop will not count against you.” |
| Safety/exit help | “Your safety comes first. We will stop the research task and help you exit or get assistance.” |
| Hard freeze | “This session must stop now. Follow the field owner’s exit instructions; do not continue collecting.” |
| Unsupported claim | “Your records do not support a conclusion here. Your original note is unchanged.” |
| Data request pending | “Your request is still being completed across controlled copies. We will not mark it complete until verified.” |
| Withdrawal complete | “Your withdrawal request has been completed for all project-controlled copies listed in the confirmation. Copies you control are not claimed deleted.” |
| Data incident | “We found a data-handling problem and stopped processing. [Responsible owner] will explain what was affected and the next steps.” |
| Access unsupported | “This version has not been validated for this need. We will not ask you to proceed.” |

## 11. Metrics and instrumentation

No third-party analytics. Use four manual allowlist ledgers plus canonical research entities:

1. release/copy issue-return-destruction;
2. evidence copy/access/transcription/coder;
3. rights request/incident/blocker/action;
4. work-minute/failure/cost;
5. V1/V2/JVAP research rows and immutable analysis batches.

Prohibited in ops logs: note text, contact, raw location, device fingerprint, diagnosis, participant+anchor+exact-time chain. Exact research times stay only where required and are coarsened/removed after analysis per policy.

## 12. Release, rollout and rollback

### 12.1 No field release yet

Current release state is `draft/proposed`; `start_allowed=false`. Documentation completion does not change it.

### 12.2 Required sequence

```text
G7 documentation review
→ owners/determinations
→ actual C1 components + storage/rights/access contracts
→ D1 release/session drill
→ D2 storage/rights drill
→ D3 review/incident/access drill
→ all 8 field P0 closed
→ ADR may become Accepted for validation only
→ research preregistration locked
→ limited field execution
```

#### 12.2.1 Field P0 release checklist

| P0 | Required artifact | Source contract |
|---|---|---|
| Authority/RACI | named owners/backups + ethics/age/campus/filming/privacy determinations | [05 Technical Feasibility §3](./05_TECHNICAL_FEASIBILITY.md) |
| Manifest/session | real manifest/digest/copies/SessionAuthorization + D1 | [06 Architecture §§2–3](./06_ARCHITECTURE.md) |
| Data-flow/storage | approved actual C1 component/storage/custody/key/backup register | [06 Architecture §6](./06_ARCHITECTURE.md) |
| Rights lineage | virtual participant export/withdraw/delete graph drill + independent proof | [06 Architecture §§7–8](./06_ARCHITECTURE.md) |
| Asset licence | per-asset rights ledger, unknown removed | [05 Technical Feasibility §6](./05_TECHNICAL_FEASIBILITY.md) |
| Text/manual sign-off | exact G2 dose/estimand amendment signed; no hidden media/GPS/provider | [02 Validation Plan §6](./02_VALIDATION_PLAN.md) |
| Incident/reliability | D3 tabletop/ledgers/STOP-INVALID-reopen/owner response | [05 Technical Feasibility §§8–10](./05_TECHNICAL_FEASIBILITY.md) |
| Accessibility/estimand | route/task/carrier review and matched/unsupported inclusion decision | [05 Technical Feasibility §9](./05_TECHNICAL_FEASIBILITY.md) |

Any missing row means `start_allowed=false`.

### 12.3 Rollback/freeze

- Planned expiry/supersession: deny new starts; authorised in-window session may finish absent hard trigger.
- Safety/access/rights/data hard freeze: no new starts; human owner decides stop-and-exit; record communication/acknowledgement/residual risk.
- Rollback never rewrites old dose or evidence. New release supersedes; old evidence stays pinned and retains rights path.
- Any P0 regression returns field status to BLOCKED; no automatic fallback to hosted/custom/AI.

### 12.4 External one-time activity release（separate from research field run）

Positive research results do not authorise an activity. Before any external activity, FR-063/AC-16 must pass with named owner, budget, access/recruitment/photography, data/safety, support and expiry/retirement contracts. If not, archive the pack; do not publish, distribute or run it.

## 13. Dependencies and risks

| Dependency | Current | Accountable owner | Resolution evidence | Impact |
|---|---|---|---|---|
| Human owners + ethics/age/campus/filming/privacy determinations | Missing | Project sponsor must appoint; institutional authorities decide | signed RACI/determinations/contact+backup | No field |
| Real UTown manifest/route/access review | Missing | Curator + field/access owners | immutable release + verification/limitations | No pack/session |
| Actual C1 storage/custody/data-flow | Missing | Data steward | approved register + D2 proof | No real data |
| Complete asset licence ledger | Missing | Rights holder liaison/curator | per-asset evidence; unknown removed | No participant/public pack |
| D1–D3 drills | Not run | Drill owners + independent reviewer | signed fixtures/tabletop/closure report | ADR remains Proposed |
| Sponsor/value/budget/capacity | Missing | Business/activity sponsor | signed value/cost/lifecycle contract | No activity/product classification |
| NUS ISO Trail original material | Missing | Research owner/requesting liaison | obtained authorised material or dated refusal/no-response log | Cannot claim superiority |

Primary risks remain R1 demand, manual curation/freshness/low reuse, route/accessibility, rights lineage, paper custody, false neighbourhood inference and scope creep to hosted/custom/AI.

## 14. Open questions

| Open question | Decision owner | Resolution contract / due gate |
|---|---|---|
| Who are institutional owners and what determinations apply? | Sponsor + relevant institutional authorities | Signed before any recruitment; G7 field P0 |
| Which actual C1 storage/custody path meets deletion and access? | Data steward + access reviewer | D2 approved before field |
| Can non-visual/access variants preserve the estimand? | Research/ethics/access owners | EstimandVersion decision before randomisation |
| What pack assets are allowed without unauthorised NUS maps/text/deep-links? | Curator + rights holder authority | Per-asset ledger before release |
| What cost ceilings make activity/reusable system viable? | Business/activity sponsor | Signed before any external activity/classification |
| Will V1/V2/JVAP produce positive evidence? | Research owner + independent analysis reviewer | Only after preregistered execution; no document answer |

## 15. Current first-party sources

All accessed **2026-08-29**; recheck before any field/publication.

- [NUS OSA Orientation](https://osa.nus.edu.sg/experience-communities/international-student-experience/orientation/) — 2026 ISO Trail/Buddy/Peer supply; not outcome evidence.
- [NUS Campus Map](https://map.nus.edu.sg/) · [UTown](https://uci.nus.edu.sg/campus-life/campus-services/utown/) · [2024 UTown map](https://map.nus.edu.sg/download/University-Town-Map.pdf) — candidate area context; not route/access proof.
- [NUS Campus Tours](https://uci.nus.edu.sg/campus-tour/) · [Filming and Photography](https://news.nus.edu.sg/filming-and-photography-on-nus-campuses/) · [Accessibility support](https://osa.nus.edu.sg/services-support/accessibility-support/accessible-transport-housing-and-guided-orientation/) — access/photography/accessibility constraints; not project permission.
- [NUS Legal Information](https://www.nus.edu.sg/legal-information-notices) — content/link/brand boundaries; per-asset permission still required.
- [PDPC Data Protection Obligations](https://www.pdpc.gov.sg/data-protection-obligations) — engineering baseline; applicability/roles remain human determination.

## 16. Related documents

- [Source of Truth](./00_SOURCE_OF_TRUTH.md)
- [Insights](./01_INSIGHTS.md)
- [Validation Plan](./02_VALIDATION_PLAN.md)
- [BRD](./03_BRD.md)
- [Solution Options](./04_SOLUTION_OPTIONS.md)
- [Technical Feasibility](./05_TECHNICAL_FEASIBILITY.md)
- [Architecture](./06_ARCHITECTURE.md)
- [Independent Technical Review](./07_TECH_REVIEW.md)

## 17. Revision history

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1 | 2026-08-29 | council-review | Initial validation-ready PRD with FR/AC/data/AI/NFR/edge/release contracts |
| 0.2 | 2026-08-29 | PASS — validation-ready draft, not approved | Safety-over-blinding、actual-use proxy boundary、activity gate、staged consent/access/PII contracts、source ledger、traceability 与 field P0 release checklist；最终产品/研究/架构复验 P0/P1=0 |
