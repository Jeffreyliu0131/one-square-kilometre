---
artifact: architecture-and-proposed-adr
project: One Square Kilometre
created: 2026-08-29
status: proposed-independently-reviewed-field-blocked
gate: G5-G6
adr_status: proposed
field_feasibility: blocked-not-run-open-p0
architecture_scope: c1-text-validation-only
product_architecture_selected: false
c3_code_authorized: false
ai_scope: excluded
---

# G5 Architecture｜Carrier-independent contract + C1-text validation candidate

## ADR-G5-001｜C1-text as the sole validation field architecture

### Status

**Proposed** — 2026-08-29。只有 G6 独立 reviewer 无未解决 P0/P1、8 个 field P0 有原始关闭证据、研究/数据/场地/field/access owners 签署后，才可改为 `Accepted for validation only`。

### Context

产品 evidence 未运行，产品 carrier 未选择。当前技术问题不是“用什么框架”，而是一个真实 C1 组件能否把 exact release、短时 start authorization、最小文本证据、权利 lineage、48h 后回顾、export/delete 与 incident recovery 端到端闭环。媒体、GPS、hosted 和 AI 都会扩大未知，却不帮助识别 M2 核心增量。

### Decision

我们提出 `C1-text` 作为首个 validation field 的唯一 base architecture：

1. immutable `AreaPackRelease + release_digest + dose_id`；
2. `release_state + dose_locked_at + append-only LifecycleBlocker + ActiveSessionDecision` 正交；`start_allowed` 只派生；
3. 每次运行具名、短时 `SessionAuthorization`；
4. manual-only anchor；不读/存 GPS；
5. text-only evidence；无媒体、账户、hosted provider、第三方 telemetry 或 AI；
6. identity/evidence/blinded/audit 分区，实际 storage/custody 写入 register；
7. 48h outcome 封存后才显示固定、source-linked review；无 pattern generation；
8. participant-scoped export/delete 覆盖所有 controlled copies，并独立核验；
9. incident/rights hard freeze fail closed；planned expiry 只控制新启动；
10. 全部人工运营、过期、无变化复核、rights 与 retirement 进入成本模型。

该决定不授权 field、C2、C3、AI、公开 pack 或产品开发。

### Consequences

**Positive**

- 数据与副本面降到回答 protocol increment 的最小候选。
- 把旧 pack/freeze、paper custody、删除和 accessibility 失败在小规模先暴露。
- 保持 C2/C3 为后置 build-null；C1 麻烦不能自动推导自研。

**Negative**

- 纸本/文本处理增加 custody、转录、双人核验与 correction 工时。
- 某些 access accommodations 会改变 stimulus/contact/data-flow，需要独立 variant。
- 没有媒体/GPS 可能暴露 anchor 表达失败，但这应作为证据而不是 feature trigger。
- 固定回顾能力弱；无法支持的 pattern 只能 abstain。

**Neutral**

- C1-text 不是未来产品基线，只是验证数据面。

### Alternatives considered

- Flexible C1 with media/GPS：未选；rights surface 扩大且同时改变 dose。
- C2 hosted：deferred；server copies、stale preload、delete/access 仍需 synthetic audit。
- C3 custom：not justified；无 reusable-system、第二 curator/area、software blocker 或 sponsor contract。
- AI/transcription/translation：excluded；基础机制未验证且没有数据授权。

## 1. Logical architecture

```text
Authoring & governance
  source/rights ledger → field/access verification → immutable release
  → issue/copy ledger → review/expiry/hard-freeze/retire

Participant validation
  SessionAuthorization → exact C1-text pack
  → manual anchor → text evidence → sealed immediate outcome
  → sealed 48h outcome → fixed review → correction/export/delete

Rights & operations
  consent + identity vault → copy lineage
  → rights request / incident → disposal proof / non-content tombstone

Evaluation
  blinded extract + manual allowlist ledgers + work minutes
  → V1/V2/JVAP result, bad cases, cost/freshness/reuse
```

没有中心后端、账户、同步、交互地图或数据库的必选结论。C1 可先用纸本/受控文本；C2/C3 必须实现同一 contract，不得成为新的事实真源。

## 2. Release / dose / start model

### 2.1 Orthogonal state

```yaml
release_state: draft | approved | superseded | retired
dose_locked_at: timestamp | null
start_allowed: <derived boolean; never set manually>
open_lifecycle_blocker_ids: []
active_session_decision_id: <record|null>
```

- `approved` 只表示 release 审核完成，不表示今天可运行。
- `dose_locked_at` 防止 participant stimulus 原地更改，不使用 `frozen` 一词。
- `start_allowed` 只在 release/dose/authorization 有效且 open blocker 数为 0 时派生为 true。
- `LifecycleBlocker` 分别保存 time/review/incident/rights/access/data 等并发原因；关闭一个 blocker 不会清掉其它原因。
- `ActiveSessionDecision` 由全部 trigger refs 与优先级生成；planned expiry 与 hard freeze 不混用。

### 2.1.1 Lifecycle entities

| Entity | Required fields |
|---|---|
| `LifecycleBlocker` | blocker ID/type/scope、opened_at、evidence_ref、owner、status open/resolved、resolution_ref、resolved_by/at |
| `ActiveSessionDecision` | session、all trigger refs、priority result、action allow/stop/contact、decider、communicated_at、acknowledged_at、residual-risk ref |

优先级：safety/access/rights hard stop > data-flow stop-new-capture > owner-contact-required > planned allow-to-finish。任何未确认 communicated/acknowledged 的离线 hard freeze 保留为 residual risk，不冒充 fail-closed 已实现。

### 2.2 `SessionAuthorization`

| 字段 | 作用 |
|---|---|
| `authorization_id` | 不可变运行授权 |
| `release_id/release_digest/dose_id` | exact materials |
| `authorized_from/until` | 只覆盖该次 session |
| `day_of_check_refs[]` | access/weather/anchor/incident 人工核对 |
| `authorized_by/backup_owner` | 具名 field owner/替补 |
| `route_variant/material_copy_id` | 实际发放副本 |
| `fallback_exit/stop_contact` | 条件变化/失联的唯一动作 |
| `started_at/closed_at/unused_copy_disposition` | 使用与收回/作废 |

可由签字 run sheet 实现；不是自动安全判断。

`authorized_until` 必须不晚于预计 dose 结束边界、`review_due_at`、`expires_at` 三者最早值；书面 exception 也不得跨 open hard blocker。授权前 owner 必须显式接受离线无法即时传播 hard freeze 的 residual risk。

### 2.3 Trigger actions

| Trigger | New start | Active | Existing evidence |
|---|---|---|---|
| review due / planned expiry / superseded | deny after deadline | 授权窗口内可完成，无 hard trigger 时不自动升级 | as-of read-only, correct/export/delete |
| safety/access incident | deny | owner stop-and-exit；失联升级 | isolate; rights remain; evidence validity separate |
| rights/licence suspension | deny | rights owner 决定；默认停止新复制/上传 | isolate, export/delete as allowed |
| data-flow/delete failure | deny | stop capture/transfer | data steward disposal path |

即时撤销离线 session 不可保证；若业务要求这一点，C1/C2 offline 应判 infeasible。

## 3. Manifest contract

```yaml
schema_version: required
area_id: stable-id
manifest_version: semver-label
release_id: immutable-id
release_digest: canonical-hash
release_state: draft|approved|superseded|retired
dose_locked_at: timestamp|null
supersedes_release_id: optional
created_at: timestamp
published_at: timestamp|null
review_due_at: timestamp
expires_at: timestamp
owners:
  curator_id: role-ref
  field_owner_id: role-ref
  data_steward_id: role-ref
  accessibility_reviewer_ids: []
source_records: []
license_records: []
field_verifications: []
valid_conditions: []
known_failures: []
route_variants: []
anchors: []
prompt_pack: {}
dose_ids: []
accessibility_claims: []
data_flow_version: required
consent_version: required
stop_rule_version: required
operational_ceiling_contract_ref: required-before-classification
release_notes: []
```

### Supporting records

- `SourceRecord`：publisher/title/ref、checked_at、claim IDs、时效、引用/快照方式。
- `LicenseRecord`：view/link/deep-link/copy/modify/print/offline/distribute/open-source 分别 `permitted/prohibited/unknown`，evidence/attribution/recheck。
- `FieldVerification`：reviewer、时段/天气/人流、route、障碍与每个 access dimension 的 `not-assessed/audited/user-tested/unsupported`。
- `RouteVariant`：ordered anchors、共同/不同 stimulus、退出/避难点、unresolved obstacles、comparability group；不是导航。
- `Anchor`：stable ID、原创/许可识别线索、ambiguity、skip/stop、verification ref。
- `Prompt`：ID/version、anchor、visible text、modality、forbidden inference、curator rationale；participant-visible change 生成新 dose。

### Validator contract

所有 refs/owners/rights/verification 存在；当前时间/状态允许；open blockers=0；access claims 不高于 evidence；dose 唯一指向完整 stimulus；每个纸/PDF/platform copy 有 copy ID/digest；rights/export/delete/readiness drills 在有效期。任一失败 `start_allowed=false`，并保留全部 blocker IDs。

## 4. Study protocol, estimand, dose and exposure contract

### 4.1 Versioned study definitions

| Entity | Required fields / invariant |
|---|---|
| `StudyProtocolVersion` | protocol ID/version、`protocol_family_id`、mechanism M2、G2 source revision、stages V1/V2a/V2b/V2c/V2d、owner；immutable |
| `EstimandVersion` | estimand ID/version、`comparison_set_id`、target population、contrast、outcome、time horizon、analysis set、access/modality boundary、approval ref |
| `StudyCondition` | condition ID、comparison set、stage/arm/carrier、shared component refs、condition-only refs、usual-practice allowance、common form refs |
| `DoseDefinition` | condition-specific dose ID、protocol/estimand/condition refs、content release、manifest/route/anchors/prompts/forms、35-min rule、completion、text-only/manual-only/access variant |
| `AssignmentRecord` | assignment ID、participant/session/cohort/stage/condition/dose FKs、randomisation table/version、assigned_at、concealed_by/revealed_at；append-only |
| `ExposureRecord` | exposure ID、participant/session/cohort/stage/condition/dose FKs、assignment_ref、actual material copy/digest、components shown、start/end、partial/completed、deviation/help、access variant、actual usual-practice tools |

`protocol_family_id/comparison_set_id` 表示跨 arm/stage 共享的比较合同；`dose_id` 只表示某个 condition/carrier 的完整 participant-visible stimulus。V2b/V2c/V2d 复用的是 exact **treatment dose**；每个 control 有自己的 condition-specific dose。Pragmatic usual-practice control 记录 comparison protocol 和 actual exposure，而非假装“无 dose”。C1→C2 carrier 变化生成新 condition/dose，即使 content release 相同。

### 4.2 C1-text formal amendment

首轮 G2/G4 配置已正式同步为 text-only/manual-only：共同空白记录与 treatment prompts 仅收文字，不采媒体/GPS。任何照片、语音、GPS、不同 researcher contact、不同 sensory stimulus 或 hosted path 都必须：

1. 新建 `EstimandVersion` 与 `DoseDefinition`；
2. 由 research/ethics/access/data owners 判断等价或独立 estimand；
3. 重做 rights/data-flow/access review；
4. 不与旧 dose 混算。

### 4.3 Validator fixtures

用 V2a control/treatment、V2b usual-practice、V2c confirmatory、V2d invited-not-started/partial/completed、access variant fixtures，validator 必须拒绝 prompt 泄漏、共同表单不一致、assignment/exposure mismatch、未批准 modality variant、dose 缩短与 version drift。

## 5. Research evaluation schema

| Entity | Minimum fields |
|---|---|
| `StudyCohort` | cohort/stage、sampling frame/channels/caps、protocol/estimand versions、planned N、status |
| `RecruitmentEvent` | candidate/channel、invite delivered、eligible/refused/scheduled/no-show/completed/withdrawn、time/order |
| `EligibilityDecision` | criteria version、raw answers refs、decision/reason、decider/time |
| `RecentEvent` | participant、raw timeline ref、purpose/time/context、behavior consequence、candidate classifications；one participant may have many |
| `AlternativeReproduction` | event、steps/artifact refs、alternative type、succeeded/failed/unknown、stable-reuse evidence |
| `V1ParticipantRollup` | participant、all event refs、rule version、qualifying yes/no、unresolved yes/no、negative classifications preserved |
| `Followup48h` | window/actual time、raw response ref、contamination flags、missing/withdrawal/cannot-rate status |
| `BurdenObservation` | time/help/correction/stop/access/incident、observer/source、per-participant values |
| `CoderAssessment` | `assessment_target_type/id`（event/outcome/claim）、blinded material version、codebook version、component scores/classification、condition guess、coder/time |
| `Adjudication` | target ref、assessment refs、rule/reason、adjudicator/time、final classification/components |
| `RevealedChoiceInvitation` | roster/selection version、channel、delivery、dose、start/complete/48h、RAP/JVAP component status |
| `AnalysisBatch` | immutable included raw IDs、analysis version、missing/invalid/withdrawal rule、2×2/interval outputs、created_by/time |

V1 roll-up 必须从 event-level 双编码/裁决计算，不能覆盖 `alternative_succeeded/no_event/wrong_job` 反例。Derived V1/iURCS/RAP/JVAP rows must link immutable raw response/event, codebook, coder/adjudication, dose/exposure and analysis batch. Withdrawal/deletion can invalidate derived rows; batch keeps only the allowed non-content boundary and recomputation note.

If an external research system owns these entities, its boundary must specify canonical owner, ID mapping, copy graph and import/export/delete contract; the architecture cannot simply say “Evaluation plane”.

### 5.1 Recalculation fixture

Before acceptance, an independent reviewer receives separate synthetic raw batches for V1 N=16、V2a N=16、V2b N=16、V2c recalculated-N and V2d 2×24，plus any repair rerun kept as a separate failed/invalid batch. Fixtures include multi-event V1 participants with coder disagreement/adjudication, refusal/no-show/not-started/partial/late/withdrawal/cannot-rate/measurement-invalid/operational-cancel/blinding-failure. Reviewer must recompute V1 `qualifying/unresolved` participant numerators、all denominators、2×2、iURCS、RAP、JVAP and missingness bounds exactly.

## 6. C1-text data zones and entities

### 6.1 Zones

| Zone | 内容 | Access | 禁止 |
|---|---|---|---|
| Reference pack | current manifest/prompts/sources/stop | participant/team | participant data、unknown rights assets |
| Identity vault | contact/eligibility/consent/random ID map | research owner；steward disposal only | notes/scores/anchor chain |
| Evidence vault | pseudonymous text/choices/revisions | authorized research; coders only extract | names/contact/raw location/device ID |
| Blinded extract | deconditioned scoring material | coders/adjudicator | identity/channel-identifying details |
| Rights/incident audit | request/incident states + minimal proof | steward/privacy/incident owner | deleted payload |

Actual paper/digital medium, storage location, encryption/locks, keys, backup and lost-device/lost-paper contract must be selected and approved; `research-controlled` is not a storage design.

### 6.2 Minimal entities

| Entity | 关键字段/contract |
|---|---|
| `ParticipantLink` | random ID、contact、consent version、withdrawal；separate vault |
| `Session` | release/dose/authorization/route、state、coarse times、outcome；no trace |
| `AnchorAssertion` | asserted anchor、`confirmation_status=found|unsure|skipped`、participant-confirmed、cue/release version；这是 participant assertion，不是 verified presence |
| `AnchorBindingRevision` | assertion/prior revision、resolved/rebound anchor、reason、actor、sequence、participant_confirmed；rebind 是动作不是终态 |
| `SessionStopEvent` | reason/category、initiated_by、time/order、operational-vs-participant classification；stop 不伪装 missing/failure |
| `FieldNote` | note、anchor assertion/revision ref、relative sequence、participant text、`source_type`、`epistemic_status`、`unsupported_inference_flag`、revision state |
| `ChoiceOutcome` | pre/immediate/48h originals separate from score |
| `Revision` | parent/reason/action；delete old payload on request |
| `Claim` | typed claim/dependencies/template/as-of/limitations/epistemic/status/invalidation reason；见 §7.3 |
| `RightsRequest` | scope/states/copy inventory/proof |
| `Incident` | severity/type/release/session/containment/owner/reopen；no payload copy |
| `OperationalWorkLog` | activity/role/person-minutes/trigger/items/rework/output refs |
| `AssetVersion/ControlledCopy/DerivationEdge/CustodyEvent/RightsBasis` | 组成 copy/rights lineage graph；见 §7.4 |

当前没有 `ModelRun`、embedding、AI prompt/output、GPS fix 或 media entity。

## 7. Paper/copy custody and evidence lifecycle

### 7.1 Pack custody

```text
canonical master
→ numbered copy issued
→ in-use
→ returned/sealed OR unreturned incident
→ transcribed only if approved
→ scored
→ participant export / deletion-pending
→ disposed with proof
```

每个 physical/electronic copy 有 ID、位置、owner、created/returned/destroyed；master hash 不证明 photocopy 已收回。

### 7.1.1 Copy / rights graph

| Entity | Required fields |
|---|---|
| `AssetVersion` | asset/content class、hash/identifier、source/right basis、release/pack memberships |
| `ControlledCopy` | asset version、parent copy、controller、location class、content class、created/issued/returned/destroyed、retention/disposal status |
| `DerivationEdge` | parent→child、operation transcription/blind/export/backup/review、operator/time/tool、rights basis |
| `CustodyEvent` | copy、issued/transferred/accessed/returned/lost/destroyed、actor/location/time、proof/incident ref |
| `RightsBasis` | consent/license/purpose/version、scope、validity/withdrawal/suspension refs |

Participant-owned received export 标 `non-controlled`；项目不承诺远端删除，但必须删除自己的 staging/sent controlled copies。Source/licence suspension、participant withdrawal、correction 或 note deletion 通过 graph 枚举所有 pack/claim/copy dependencies。

### 7.2 Review timing

```text
field text sealed
→ immediate choice sealed
→ 48h unaided outcome completed and locked
→ only then fixed participant-facing review
```

允许：原文按 anchor/sequence、pre/immediate/48h 对照、still-valid metadata（source + field/as-of + limitation）、correction/rebind/delete。禁止：pattern generation、自由文本补写、AI/自动转写/翻译、街区/人群/安全推断。

`participant_statement/user_choice` 由 evidence refs 支持；`verified_metadata` 必须有 current source + field verification。0 supporting refs = abstain。删除 supporting ref 后 review invalidates。

### 7.3 Typed claim dependency model

```yaml
claim_type: participant_statement | user_choice | verified_metadata
epistemic_status: direct_observation | participant_inference | unsupported | withdrawn
template_slot: required
required_dependencies:
  evidence_refs: []
  source_refs: []
  field_verification_refs: []
dependency_versions: []
as_of: timestamp
limitations: []
status: active | abstained | invalidated
status_reason: required-when-not-active
```

- Participant inference 只能明确归因显示“参与者当时写/推断…”，不能升级为 verified metadata 或驱动安全/人群/身份/动机/街区判断。
- Dependency type 必须匹配 claim type；自指 note 只能证明 statement existed，不证明 statement 的外部事实。
- Correction/rebind、source expiry、field verification supersession、rights suspension 或 deletion 自动重新评估所有 dependent claims；缺任一 required dependency 即 `unknown/abstain`。
- 不从自由文本自动生成新 claim；当前固定模板只显示已存在的 participant text/choice/current metadata。

Closure fixtures 覆盖 zero/wrong/self refs、unsafe/people inference、deleted note、rebind、source expiry、superseded verification 与 rights suspension。

## 8. Rights lifecycle

```text
request received
→ minimum identity verification
→ scope confirmed
→ block new processing/contact
→ enumerate copies
→ act on primary/derived/blinded/export/backup/vendor copies
→ independent verification
→ participant confirmation
→ non-content tombstone
```

- `complete` 前要覆盖 identity、paper/local、transcription、coder/adjudicator, export staging、backup/logs。
- Withdrawal 不能以 ITT 自动拒绝删除。
- Export participant-scoped、可打开、列缺失；避免 machine-readable 偏好制造副本。
- Participant-owned originals/received exports 与 project-controlled copies 分开；不承诺删除个人设备内容。
- Pending backup purge = request pending，不是假完成。
- Pseudonymisation 不等于 irreversible anonymisation。

## 9. Manual check-in / offline / fallback

### 9.1 Manual only

```text
show anchor cue
→ participant asserts found / unsure / skipped
→ found creates AnchorAssertion (not verified presence)
→ optional participant-confirmed AnchorBindingRevision
→ stop creates separate SessionStopEvent
```

不请求位置、不存 GPS quality/coordinates/trajectory。研究者不得把 unsure/skip 改成 found，也不得用 cue、口头导航或事后推断补成“已到达”。原始 assertion 不覆盖；rebind 工时进入 burden。未来 GPS 必须另立“是否应读取位置”的 gate。

### 9.2 Fallback matrix

| Failure | Default | Forbidden |
|---|---|---|
| no network | 已授权 text pack 可继续；条件变化且 owner unavailable 则停止 | 临时 cloud/tiles |
| anchor unclear | unsure/skip/stop/rebind | GPS/研究者给答案 |
| pack invalid | deny/stop per trigger; old evidence rights remain | 旧包继续声称当前 |
| storage/custody uncertain | 不补写；measurement invalid + incident | 凭记忆重建 |
| review unsupported | raw text/unknown/abstain | pattern/AI fill |
| export/delete unverified | pending + stop new collection | oral assurance |
| access mismatch | stop/exit; operational failure | participant blame |

## 10. Threat model / observability

### Key threats

旧/未回收 pack；lost paper/device；public form/link；identity+anchor+time re-identification；consent mismatch；silent loss/transcription error；wrong coder/export packet；deletion residue；unauthorised source asset；hidden telemetry/provider; owner unavailable；access mismatch。

### C1 manual ledgers

1. release/copy issue-return-destruction；
2. evidence copy/access/transcription/coder；
3. rights request/incident；
4. operational work-minute/failure。

不记录 note payload、coordinates、device fingerprint、diagnosis 或 participant+anchor+exact time。`0 silent loss / all current-version starts / all synthetic deletion paths` 是 readiness drill hard targets，不是 production reliability claims。

## 11. Cost / freshness / reuse

`OperationalWorkLog` 必须覆盖全部研究与运营，而不只技术/策展：source/license、walkthrough/access、prompt/QA/release、paper custody/digitisation、招募/筛选、排期、consent/teach-back、randomisation、field support、48h interview、deconditioning/blinding、coder calibration、双人编码、adjudication、data QC、preregistration/analysis、owner sign-off、correction、rights/incident/vendor/retirement 和 no-change review。

每条记录至少有：

```yaml
work_context: research-only | value-delivery | recurring-operations | governance | transfer-reuse
area_id: optional
release_id: optional
dose_id: optional
stage_cohort_session_refs: []
activity_type: required
role_and_skill_level: required
active_minutes: required
waiting_minutes: required
direct_or_shared: direct | shared
allocation_rule: required-if-shared
outcome: completed | failed | aborted | no-change
items_examined_changed_retired: {}
rework_minutes: 0
external_cost_ref: invoice-or-quote-or-unknown
```

所有分钟/成本 100% 有归属；失败 release、no-show、cancelled/withdrawn/invalid session 和 0 valid completions 仍保留成本。

Derived metrics 分开报告：total validation cost vs portable operating cost；per-invite、per-start、per-all-session、per-valid-completion、per-released/retired pack；initial curation per anchor + total minutes；maintenance per active release；review compliance/missed count；stale starts；reuse unchanged/modified/rejected；second-area effort ratio。Sponsor ceilings unknown means cost not proven controllable。

Reusable system requires second curator + second area/theme with work logs, no inherited field verification/licence, and real sessions; file copy is not reuse evidence.

## 12. Vendor/model boundaries

- C2 canonical IDs/manifest/rights stay outside vendor; use synthetic data until evidence + authority + vendor audit.
- Audit controller/intermediary, fields/telemetry, region/subprocessors, training/retention, export/delete/backup, breach, preload/version, access and exit.
- Actionbound public materials expose server results, stale preload and partial accessibility; not enough for real data approval.
- Current AI deny-all includes LLM, transcription, translation, OCR/moderation, face/voice detection, embedding/search and AI analytics. Deterministic failure returns unknown, never model fallback.

### 12.1 C2 synthetic fixture and vendor snapshot contract

- Fixture classification = synthetic-only；不得映射真实 participant/contact、真实研究 note、真实 anchor/source asset、生产 identifier 或未经许可内容。
- Test account inventory 记录账号/role、设备、IP/telemetry/log、generated data 与 cleanup owner。
- `VendorEvidenceSnapshot` 固定 plan、region、terms/privacy/DPA、subprocessors、retention/training、accessibility statement、API/app version、checked_at 与 recheck_due_at。
- Audit result 必须回链 snapshot 与 fixture version；条款/plan/region/version 变化自动使结论过期。
- 独立 reviewer 用 versioned snapshot 重放 preload/version/export/delete/backup/exit；该合同不授权 C2 或真实数据。

## 13. Readiness drills and conditional spikes

### Required non-code drills before field

| Drill | Question | Evidence |
|---|---|---|
| D1 Release/session | issue/return/supersede/planned expiry/hard freeze exact dose? | signed run sheet, digest/copy inventory, stale/unreturned cases |
| D2 Storage/rights | actual storage covers identity/evidence/blinded/export/backup/delete? | approved flow/register, virtual participant, independent proof |
| D3 Review/incident/access | 48h-only review, abstention, lost/corrupt/delete/access bad cases have one action? | fixtures/tabletop, RACI, reopen rule |

Current authorised code spikes: **0**. C2 synthetic audit is deferred. C3 future max 3 (durability, revocation/expiry, idempotent import) only after G4 authorization record, reusable-system, sponsor/budget and synthetic-only/timeboxed/default-discard rules. No GPS/media/reuse/AI spike.

## 14. Field P0 and proposed ADR disposition

The same 8 P0 from [Technical Feasibility](./05_TECHNICAL_FEASIBILITY.md#3-field-feasibility-的-8-个-p0) remain OPEN. This ADR cannot close them.

### Acceptance condition

`ADR-G5-001` stays Proposed until:

- G6 has no unresolved P0/P1;
- all 8 P0 have original closure evidence;
- actual C1 components and storage/copy lineage pass D1–D3;
- research/data/privacy/field/campus/access owners sign;
- research owner confirms dose/estimand remain valid.

Then, and only then, status may become `Accepted for validation only`.

## 15. References

- [Technical Feasibility](./05_TECHNICAL_FEASIBILITY.md)
- [G4 Solution Options](./04_SOLUTION_OPTIONS.md)
- [Public review summary](./REVIEW_SUMMARY.md)

## 16. Revision history

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1 | 2026-08-29 | Proposed / G6 review | C1-text ADR, orthogonal lifecycle, session authorization, manifest/data/rights/offline/threat/cost/drills |
| 0.2 | 2026-08-29 | Proposed / G6 documentation passed | 处置 G6-01–09：study/evaluation schemas、manual assertion/rebind、typed claims、concurrent blockers、copy graph、work taxonomy、vendor snapshot；field P0仍OPEN |
