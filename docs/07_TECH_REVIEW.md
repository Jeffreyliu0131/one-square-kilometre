---
artifact: independent-technical-review
project: One Square Kilometre
created: 2026-08-29
status: passed-assumption-bound-field-not-run
gate: G6
review_scope: docs-05-and-06
reviewer_role: independent-did-not-author-initial-architecture
new_p0_open: 0
initial_p1: 7
documentation_p0_open: 0
documentation_p1_open: 0
known_field_p0_open: 8
g6_verdict: pass-documentation-only
project_verdict: validate-first
prd_threshold: not-met
---

# G6｜Independent Technical Review

## 0. 结论

**G6 = BLOCKED — REWORK REQUIRED。**

本轮没有发现新的文档级 P0；发现 **7 个 OPEN P1、1 个 P2、1 个 P3**。7 个 P1 会使实验实际暴露、研究分母、手动 anchor 语义、claim 依赖、并发 lifecycle blocker、副本 lineage 或人工成本无法被独立重建，因此 `ADR-G5-001` 不能接受，G6 不能通过。

G5 已公开的 8 个 field P0 仍全部 OPEN，但不重复计作“架构作者遗漏”。它们是实际 owner、组件、存储、许可、演练和 route/access 证据尚未产生的预期 field blockers。本文新增 findings 针对的是：即使未来取得这些现场证据，当前 05/06 的 contract 仍无法完整表达或验证若干关键状态。

**项目裁决：Validate first。未达到 PRD 门槛。** 当前仍不授权招募、真实数据采集、C2 真实数据、C3 code spike、AI、部署或产品开发。

## 1. 评审范围与分级

### 1.1 完整读取范围

- `AGENTS.md`、`PRODUCT_BRIEF.md`、`STATUS.md`、`ASSUMPTIONS.md`、`DECISIONS.md`、`RISKS.md`
- `docs/00_SOURCE_OF_TRUTH.md` 至 `docs/06_ARCHITECTURE.md`
- `docs/REVIEW_SUMMARY.md`

主评对象是 [05 Technical Feasibility](./05_TECHNICAL_FEASIBILITY.md) 与 [06 Architecture](./06_ARCHITECTURE.md)。事实边界仍服从项目 source-of-truth；本评审是架构分析，不把 council/agent 文本提升为外部事实。

### 1.2 Severity

| 等级 | 本评审含义 |
|---|---|
| P0 | 当前合同会允许严重安全/权利事件、不可逆数据破坏或虚假通过关键门，必须立即停止；本轮新增 0 |
| P1 | 在接受 ADR 或运行有效 field test 前必须修正；未关闭即 G6 不通过 |
| P2 | 不阻断当前受限 C1 文档方向，但在对应 deferred path 激活前必须修正 |
| P3 | 状态/文字卫生问题，不改变当前安全边界 |

“P0=0”不等于 field 可运行；8 个既有 field P0 仍是独立的硬阻断。

## 2. Findings 总表

| ID | Sev | Finding | 类型 | 状态 |
|---|---:|---|---|---|
| G6-01 | P1 | `dose_id` 不能表达 estimand、study condition 与实际暴露；C1-text 也未与 G2/G4 的 media/GPS 条款建立版本桥 | Documentation blocker | OPEN |
| G6-02 | P1 | 架构声称可产出 V1/V2/JVAP，却没有可重算这些结果的 research evaluation schema | Documentation blocker | OPEN |
| G6-03 | P1 | Manual anchor 的状态词表、rebind lineage 与“真源”语义不闭合 | Documentation blocker | OPEN |
| G6-04 | P1 | Claim/abstention 只有叙述规则，没有 typed dependency model；有 ref 不等于 ref 支持该 claim | Documentation blocker | OPEN |
| G6-05 | P1 | 单值 `start_eligibility`/`active_session_action` 无法安全表达并发 blocker 与独立解封 | Documentation blocker | OPEN |
| G6-06 | P1 | Copy/rights lineage 被要求存在，但 schema 无法表示 derivation/custody graph | Documentation blocker | OPEN |
| G6-07 | P1 | Work log 漏记大量研究必需工时，也不能分开 research-only 与可迁移运营成本 | Documentation blocker | OPEN |
| G6-08 | P2 | C2 “synthetic audit” 没有 fixture/data classification 与 vendor evidence snapshot contract | Deferred-path blocker | OPEN |
| G6-09 | P3 | 05 的 gate 状态文字残留“待最终复验”，与 front matter/revision/G5 disposition 不一致 | Editorial | OPEN |

**合计：P0 = 0；P1 = 7；P2 = 1；P3 = 1。**

## 3. Detailed findings

### G6-01｜P1｜`dose_id` 无法表达 estimand、条件与实际暴露

**证据**

- `05:37` 把 session 固定为 `release_id + release_digest + dose_id`，但没有定义 `dose_id` 是 protocol family、condition-specific stimulus 还是一次实际 exposure。
- `06:137–169` 只有 `dose_ids[]`；没有 estimand、study stage、arm、shared components、condition-specific components、共同表单、completion definition 或 access/media rule。
- `06:203–207` 的 `Session/ChoiceOutcome` 没有 assignment、actual exposure、condition 或 protocol version。
- G2 `02:191–216` 要求 V2a 锁定 shared dose 并只让 treatment 多 prompts；`02:274–278` 又定义 pragmatic package vs usual-practice；`02:317–323` 要求 V2d 复用 confirmatory 同一 dose。
- G2 `02:208, 214–215, 360–362` 和 G4 `04:39, 160, 222` 仍允许两组共同的语音/照片入口及可选 GPS suggestion；05/06 则将唯一候选冻结为 text-only/manual-only（`05:22, 40–41, 59`；`06:34–35, 214, 269–275`）。这是合理的最小化方向，但当前没有 formal amendment 或 estimand-equivalence decision。

**影响**

同一个 `dose_id` 可能同时指共享 protocol、treatment 实际刺激和 pragmatic control 的比较参照。无法证明两组只差预注册因素，也无法判断 text-only/access variant 属同一 estimand、独立 estimand 还是新 dose。结果即使显示“同版本”，也可能因实际 exposure 不同而不可归因。

**Required fix**

增加并版本化：

- `StudyProtocolVersion`、`EstimandVersion`、`StudyCondition`；
- `DoseDefinition`：shared components、condition-specific components、表单、completion、duration、media/access rule；
- `AssignmentRecord` 与 `ExposureRecord`；
- control 即使没有 project pack，也保存 comparison protocol/dose ref 与 actual usual-practice exposure；
- 明确 C1-text 对 02/04 的处理：要么正式替代首轮 field dose 并同步研究计划，要么作为新 variant/estimand，不能依赖一句“owner 以后确认”。

**Verification for closure**

用 V2a control/treatment、V2b usual-practice control、V2c、V2d 未开始/部分完成/access variant fixtures 验证 validator 能拒绝：prompt 泄漏、共同表单版本不一致、assignment 与 exposure 不一致、未经判定的 text-only/access 变体及 dose 缩短。由 research owner 与独立 reviewer 共同签署。

### G6-02｜P1｜缺少可重算 V1/V2/JVAP 的 research evaluation schema

**证据**

- `06:86–88` 宣称 evaluation 可产生 `V1/V2/JVAP result`。
- `06:199–214` 的 minimal entities 缺少 recruitment funnel、eligibility denominator、assignment concealment、arm、follow-up window、contamination、missingness、invalid measurement、burden、coder/adjudication、revealed-choice roster/invitation 与 analysis batch。
- `05:215–225` 的人工 ledgers 是 operational observability，不是研究数据字典。
- G2 `02:381–389` 已要求 10 类运行表；`02:224–234, 241–268, 284–297, 314–336` 的 coder agreement、ITT、失访、撤回、RAP/JVAP 分母都依赖这些字段。

**影响**

拒绝、no-show、未开始、退出、普通失访、撤回、`cannot_rate`、measurement failure、版本无效与 operational failure 无法稳定进入正确分母；也无法从原始行独立重算 `iURCS-48`、RAP、JVAP，或证明盲化/随机化未被破坏。D1–D3 即使成功，也不能证明研究证据可用。

**Required fix**

把 G2 数据字典正式纳入 architecture contract，至少增加：

- `StudyCohort` / `RecruitmentEvent` / `EligibilityDecision`；
- `Assignment` / `ExposureRecord`；
- `Followup48h` / `BurdenObservation`；
- `CoderAssessment` / `Adjudication`；
- `RevealedChoiceInvitation` / `AnalysisBatch`；
- derived score 必须回链 immutable raw response、codebook、coder、adjudication 和 analysis version；撤回后的删除与分析边界继续服从 rights contract。

如果这些对象由外部 research system 承担，06 必须明确 system boundary、canonical owner、ID mapping、copy lineage 和 import/export contract，不能只在逻辑图中写“Evaluation”。

**Verification for closure**

用 synthetic 16 人 pilot 和两个 24 人 cohort，由未参与 schema 编写的 reviewer 仅凭 raw rows 重算全部分母、2×2、失访边界、RAP/JVAP。fixtures 必须覆盖拒绝、no-show、未开始、超窗、withdrawal、cannot-rate、measurement failure、operational cancellation、blinding failure 与版本 invalid；结果逐项匹配预期。

### G6-03｜P1｜Manual anchor 的状态、rebind 与真源语义不闭合

**证据**

- `05:40` 将 manual anchor confirmation 称为“唯一真源”；`05:98–103` 使用 `found/unsure/skip/stop/rebind`，并要求原绑定留作 revision。
- `06:205` 的实体却写成 `manual/uncertain/skip/rebind`：缺 `found`、缺 `stop`，新增含义不清的 `manual`。
- `06:271–275` 又回到 `found/unsure/skip/stop/rebind`，但实体没有 prior binding、new binding、reason、actor、sequence 或 participant confirmation。

**影响**

“manual 是唯一真源”容易被实现或分析误读为“参与者确实身处该 anchor”。实际它最多是 participant-reported binding，不是 verified physical presence。状态不闭合还会导致 stop 被当缺失、rebind 覆盖原始错绑、researcher 事后替参与者修正，从而丢失错点、correction burden、route failure 和 outcome validity。

**Required fix**

- 将 truth boundary 改为：manual selection 是 **participant assertion 的 canonical record**，不是地点事实或到达证明。
- 统一 `confirmation_status = found | unsure | skipped`；`SessionStopEvent` 独立记录 stop。
- `AnchorBindingRevision` 保存 asserted anchor、resolved/rebound anchor、prior revision、reason、actor、sequence、cue/release version 与 `participant_confirmed`；`rebind` 是动作，不是终态。
- 明确 researcher 不得把 unsure/skip 改成 found，也不得用 cue、GPS 或口头导航补成“已到达”。

**Verification for closure**

覆盖相似 anchor cue、猜选、found、unsure、skip、stop、一次/多次 rebind 和 researcher suggestion fixtures。验证原始 assertion 不被覆盖、stop 不被编码成错误/普通缺失且按预注册 product/operational denominator 处理、rebind 工时进入 burden，并确认下游 claim/score 不把 manual binding 当 verified location。

### G6-04｜P1｜Claim/abstention 缺少可执行依赖模型

**证据**

- `05:181–185` 与 `06:242–244` 要求 `user_observation/user_choice/verified_metadata` 分层，并规定 0 supporting refs 时 abstain。
- `06:209` 的 `ReviewItem` 只有 evidence/source ref、template、as-of、abstain；没有 claim type、required evidence set、dependency validity、limitations 或 invalidation reason。
- `06:206` 的 `FieldNote` 只有 participant text/revision；没有 G2 `02:383–384` 要求的 `source_type` 与 `unsupported_inference_flag`。
- `06:179` 虽在 `Prompt` 记录 `forbidden_inference`，却没有从 participant note/choice 到 review claim 的 enforcement state。

**影响**

“有 ref”不等于该 ref 支持该 claim。原始文字本身可证明“参与者写过这句话”，不能证明其关于安全、人群、身份、动机或街区规律的内容为真。当前模型可能把自指 note 或泛化 source 变成貌似有依据的 review item；source expiry、field verification supersession、rights suspension、correction/rebind 也未必可靠传播。错误街区推断因此无法被机器可审计地拦截。

**Required fix**

定义 typed `Claim` 与 dependency policy：

- `claim_type = participant_statement | user_choice | verified_metadata`；
- `epistemic_status = direct_observation | participant_inference | unsupported | withdrawn`；
- statement/template slot、required typed refs、source/field versions、as-of、limitations；
- `status = active | abstained | invalidated` 与 reason；
- participant inference 只能明确归因展示，不能升格为 verified metadata 或用于街区/安全判断；禁止自由文本自动推导。

**Verification for closure**

fixtures 覆盖零 ref、错类型 ref、自指 ref、unsafe/people inference、删除 note、rebind、source 过期、field verification superseded、rights suspension。只有仍受支持且类型匹配的 participant statement/choice 可按原文显示；verified metadata 缺任一必要依赖必须 `unknown/abstain`。

### G6-05｜P1｜Lifecycle 单值状态无法表达并发 blocker

**证据**

- `05:69–74`、`06:97–107` 把 `start_eligibility` 写成单值枚举，同时称其为多项前置的 AND 结果。
- `05:78–84`、`06:126–131` 明确 review、expiry、rights、incident、access 与 data-flow blocker 可同时存在。
- `active_session_action` 同样是单值，trigger 同时发生时没有 priority/merge rule。
- `SessionAuthorization` (`06:109–122`) 有授权窗口，但没有约束其不得跨 `review_due_at/expires_at`，也没有定义 hard-freeze 已知/未知于离线 session 时的 residual-risk boundary。文档诚实承认 instant offline revocation 不可保证（`05:92`；`06:133`），但没有把限制转成可验证授权条件。

**影响**

若 rights suspension 与 access incident 同时发生，只保留一个拒绝原因；关闭其中一个后可能错误恢复 `allowed`。多 owner 的独立关闭证据与 audit history 也会丢失。授权跨越 expiry 或离线 hard freeze 时，planned stale use 与不可传播的 stop action 没有确定性处置。

**Required fix**

- 增加 append-only `LifecycleBlocker`：type、scope、opened_at、evidence_ref、owner、status、resolution_ref、resolved_by/at。
- `start_allowed` 只能是派生值：release/dose/session 前置有效且 open blockers 数为 0；不得手工写入。
- `ActiveSessionDecision` 记录全部 trigger refs、优先级、最终 action、decider、communicated/acknowledged state。
- 明确 `authorized_until ≤ min(dose duration boundary, review/expiry boundary)` 的规则或书面 exception；把 offline 无即时传播作为 residual risk，由 owner 在授权前接受，不能称为已实现 fail-closed。

**Verification for closure**

同时开启 rights + incident blocker，先关闭一个必须继续 deny；第二个有合格 resolution 后才可恢复。再覆盖 scheduled expiry + hard freeze、freeze 在 start 前/中/离线时发生、owner unavailable、重复/迟到 resolution 和 authorization 跨 deadline；每次只能得到一个可审计且符合优先级的动作。

### G6-06｜P1｜Copy/rights lineage 没有可表达的 graph

**证据**

- `05:42, 127, 147–164` 要求枚举 paper/local、transcription、coder/adjudicator、export staging、backup/vendor 等 controlled copies，并独立证明 disposal。
- `06:216–231, 246–265` 描述 custody 与 rights lifecycle。
- 但 `06:199–214` 没有 `AssetVersion`、`ControlledCopy`、`DerivationEdge` 或 `CustodyEvent`；`RightsRequest` 只有笼统的 `copy inventory/proof`。
- `SourceRecord/LicenseRecord` (`06:172–179`) 也没有 pack membership、derived copy 与 review claim dependency edge。

这不是重复“actual storage/delete drill 尚未运行”的 field P0。field P0 要求真实 register 与演练；本 finding 指出当前 proposed schema 本身无法表示演练所需的 fan-out/fan-in 关系。

**影响**

无法可靠枚举 master→paper copy→transcription→blinded packet→export→backup 的派生链。参与者删除、许可暂停、source expiry 或 correction 发生时，不能确定所有下游 copies、packs 和 claims 均被隔离、失效或处置；也无法区分 project-controlled 与 participant-owned copy。

**Required fix**

增加：

- `AssetVersion`、`ControlledCopy`、`DerivationEdge`、`CustodyEvent`、`RightsBasis`；
- pack membership、review/claim dependency links；
- 每个 copy 的 parent、controller、location class、content class、created/issued/returned/destroyed、retention/disposal、rights basis；
- participant-owned received export 标为 non-controlled，项目不得承诺远端删除，但须删除 staging/sent controlled copies。

**Verification for closure**

构造多分支 lineage：master→两份 paper→一次 transcription→两个 coder packets→participant export→backup。分别执行 participant withdrawal、单一 license suspension、lost paper 与 correction；独立 reviewer 必须从图中枚举所有受影响节点，不能漏 controlled copy，也不能误报已删除 participant-owned export。

### G6-07｜P1｜人工成本与低复用会被当前 WorkLog 系统性误报

**证据**

- `05:211–213`、`06:212, 304–310` 记录 source/license、walkthrough、custody、support、rights 等工时。
- 但缺少招募/筛选、排期、consent/teach-back、randomisation、48h interview、deconditioning/blinding、coder calibration、双人编码、adjudication、data QC、preregistration/analysis 与 owner sign-off；这些都是 G2 `02:193–199, 230–234, 274–280, 294–297` 的必需工作。
- `OperationalWorkLog` 也缺少 `work_context`、area/release/dose/cohort/session attribution、shared allocation rule、failed/aborted outcome 和 staff skill level。

**影响**

C1 可能因漏掉 follow-up、coding、rights reconciliation 而显得便宜；也可能把 research-only 成本错误外推成未来运营成本。共享许可工作、失败 release、取消 session、无有效 completion 和无变化复核若没有明确归属/分母，会把 initial curation、per-completion cost 与 second-area reuse ratio 系统性压低，掩盖低复用与隐藏工时。

**Required fix**

- 扩展完整 work taxonomy，并加入 `work_context = research-only | value-delivery | recurring-operations | governance | transfer-reuse`。
- 每条记录包含 area/release/dose/stage/cohort/session refs、direct/shared allocation rule、active/waiting time、role/skill level、outcome（including failed/aborted/no-change）、external cost ref。
- 同时报告 total validation cost 与可迁移 operating cost；不得共用一个不透明分母。
- per-valid-completion 之外同时报告 per-invite、per-start、per-all-session、per-released/retired pack，并在 0 valid completions 时保留全部成本而不是产生空指标。

**Verification for closure**

完成一次 end-to-end dry run 后，将独立 timesheet 与 WorkLog 对账；所有分钟和外部成本必须 100% 有归属。synthetic ledger 要包含失败 release、no-show、cancelled/withdrawn/invalid sessions、shared licence work、无变化 review、incident 与 retirement；独立重算 total validation cost、portable operating cost、per-denominator cost 与 second-area effort ratio。

### G6-08｜P2｜C2 synthetic audit 的 fixture 与 evidence snapshot 未成合同

**证据**

- `05:143, 233, 248` 与 `06:314–316, 329` 正确禁止 C2 真实参与者数据，并列出 controller/intermediary、region/subprocessors、retention、export/delete、backup、breach、preload/version、access 与 exit 审计项。
- 但“synthetic data/content”没有 data classification、禁止映射到真实 participant/anchor/source asset 的规则，也没有 vendor plan/terms/subprocessor/accessibility snapshot 的 evidence version 与 recheck date。

**影响**

当前不影响 C1，因为 C2 deferred 且真实数据 prohibited。未来 synthetic audit 若直接复用真实地点内容、联系人、账户 telemetry 或许可不清素材，仍可能扩大权利面；若不固化供应商版本/地区/条款，5 日 audit 结果也不可复核。

**Required fix**

在 C2 激活前定义 synthetic fixture classification、禁止真实映射规则、test account/telemetry inventory，以及 vendor evidence snapshot（plan、region、terms、DPA、subprocessors、accessibility statement、checked_at/recheck_due_at）。

**Verification for closure**

独立 reviewer 检查 fixture 不含真实 participant/contact、真实研究 notes、未经许可 source asset 或生产 identifier；审计报告必须能从 versioned snapshot 重放 export/delete/preload/exit 结果。该 finding 不授权 C2。

### G6-09｜P3｜05 的 gate 状态文字不一致

**证据**

- `05:5–8` 已写 `passed-assumption-bound-ready-for-g6` / `documentation_gate: pass`。
- `05:258` 仍写“待 council 最终复验后可 PASS”。
- `05:294` 与 `G5_COUNCIL_DISPOSITION.md` 已记录最终复验后 PASS/ready for G6。

**影响**

不会解锁 field 或改变 ADR，但会让读者误判 G5 是否仍等待 council。

**Required fix / verification**

将 `05:258` 改为已发生的 G5 documentation 状态，同时保留 field blocked、ADR Proposed 与 0 code spikes；与 `STATUS.md`、`DECISIONS.md`、G5 disposition 做一次文本一致性检查。

## 4. 已公开的 8 个 field P0：不重复计为遗漏

| Field P0 | 本评审判断 | 为什么不计入新增 finding |
|---|---|---|
| Authority/RACI | EXPECTED FIELD BLOCKER | `05:54`、`06:337–343` 已显式阻断；需人类具名与书面 determination |
| Manifest/session authorization | EXPECTED FIELD BLOCKER | `05:55`、D1、`06:109–133` 已要求真实 release/copy/run sheet 演练 |
| Actual data-flow/storage | EXPECTED FIELD BLOCKER | `05:56`、`06:197` 明说 `research-controlled` 不是 storage design |
| Export/correct/withdraw/delete lineage drill | EXPECTED FIELD BLOCKER | `05:57`、D2 与 rights flow 已要求虚拟参与者和独立 proof；G6-06 是 schema 先决缺口，不重复计算 field drill |
| Asset/licence | EXPECTED FIELD BLOCKER | `05:58, 132–143` 与 manifest `LicenseRecord` 已明确 unknown 不进入 pack |
| Text/manual sign-off | EXPECTED FIELD BLOCKER | `05:59` 正确保留；G6-01/G6-03 处理的是跨 gate 与状态语义，不把 sign-off 未发生归咎作者 |
| Incident/reliability tabletop | EXPECTED FIELD BLOCKER | `05:60`、D3、fallback 已列 bad cases；G6-05 处理的是并发 blocker 表达能力 |
| Accessibility/estimand | EXPECTED FIELD BLOCKER | `05:61, 199–205` 明确 text-only 不等于 accessible；需要 route/task/carrier 原始审查与 inclusion decision |

即使 7 个 documentation P1 全部关闭，field feasibility 仍保持 `BLOCKED — NOT RUN / 8 OPEN P0`，直到每项都有原始 closure evidence。

## 5. 重点攻击面的审查结果

| 攻击面 | 结果 |
|---|---|
| 人工策展/隐藏工时 | 有明确计时方向，但 G6-07 使 research-only、失败与共享工时仍可漏记；P1 |
| 地点过期/离线旧版 | planned expiry、hard freeze、stale copy 与离线不能即时撤销已诚实暴露；并发 blocker/authorization precedence 由 G6-05 阻断 |
| 低复用 | 第二 curator + 第二 area/theme + real session 门正确；成本归属不足由 G6-07 阻断 |
| AI 非必要性/偷渡 | **通过本轮攻击。** 当前 deny-all 覆盖 LLM、转写、翻译、OCR/moderation、embedding/search/analytics；无 `ModelRun`，0 AI spike |
| 不可达路线/accessibility | 没有虚假承诺；route/task/carrier 分层正确，仍为预期 field P0，不新增作者遗漏 |
| 错误街区推断 | 叙述护栏正确，但 typed dependency 不足；G6-04 P1 |
| Manual check-in/GPS | manual-only/no GPS 方向正确；状态、rebind 与 truth semantics 由 G6-03 P1 阻断 |
| Paper/copy custody | 风险和流程已公开；lineage graph 不可表达，G6-06 P1；actual medium/storage 仍为 field P0 |
| Actual storage/data-flow | 明确未选，未伪装成能力；预期 field P0 |
| Export/correct/withdraw/delete | request state、backup pending、participant-owned export 边界方向正确；copy graph 由 G6-06 P1 阻断 |
| Incident/freeze | STOP/INVALID/fallback 方向正确；并发 blocker 与 offline authorization 边界由 G6-05 P1 阻断 |
| Hosted vendor/许可 | 真实数据 No-go、逐资产/供应商审计方向正确；C2 synthetic evidence contract 为 G6-08 P2 |
| Fallback/abstention | raw/unknown/stop 默认正确；claim dependency enforcement 由 G6-04 P1 阻断 |
| Cost/latency/observability/eval | 不伪造 latency/SLO 值是正确的；evaluation schema 与全成本归属分别由 G6-02/G6-07 P1 阻断 |
| C3 spike 授权 | **通过本轮攻击。** 当前 authorized code spikes=0；Reusable system、第二 curator/area、重复 software blocker、C1/C2、sponsor/budget 和 default-discard 门未被绕过 |

## 6. G6 closure contract

G6 只有在以下条件全部成立后才可复验：

1. 主负责人逐条 disposition G6-01–G6-09；不得把“field 尚未运行”当作关闭 documentation P1 的理由。
2. 修订 05/06 及必要的上游接口，使 7 个 P1 的 schema/semantics 可执行且跨文档一致。
3. 独立 reviewer 使用各 finding 指定的 synthetic fixtures 复验；不能只做文本搜索或作者自证。
4. 复验时 P0/P1 均为 0，才可把 G6 documentation 标为 PASS。
5. G6 documentation PASS 仍不关闭 8 个 field P0，也不使 ADR 自动 Accepted；ADR 只能在原始 field closure evidence 与 owner signatures 齐全后成为 `Accepted for validation only`。

### 初审状态（已由 §7 最终复验取代）

- **G6 初审：BLOCKED — 0 P0 / 7 P1 unresolved。**
- **ADR-G5-001：Proposed。**
- **Field feasibility：BLOCKED — NOT RUN / 8 OPEN P0。**
- **C1-text：未授权运行。**
- **C2 real data：prohibited。**
- **C3 code spikes：0 authorized。**
- **AI：excluded / deny-all。**
- **项目结论：Validate first。**
- **PRD 门槛：未达到。**

## 7. Disposition 与最终独立复验

### 7.1 逐条处置

| Finding | 修订 | 最终状态 |
|---|---|---|
| G6-01 dose/estimand/exposure | 增 `protocol_family/comparison_set`、condition-specific dose、Assignment/Exposure FKs；02/04 同步 treatment/control/carrier 语义 | CLOSED |
| G6-02 research evaluation | 增 V1 RecentEvent/AlternativeReproduction/event coding/adjudication/participant roll-up；V1/V2a/V2b/V2c/V2d 独立 batches | CLOSED |
| G6-03 manual anchor | Manual 是 participant assertion，不是 verified presence；found/unsure/skipped、stop 与 rebind lineage 分开 | CLOSED |
| G6-04 claim dependencies | Typed claim/epistemic/dependencies/invalidation；wrong/self/deleted/expired refs fail closed | CLOSED |
| G6-05 concurrent blockers | Append-only LifecycleBlocker、derived start_allowed、ActiveSessionDecision 与 offline residual risk | CLOSED |
| G6-06 copy lineage | AssetVersion/ControlledCopy/DerivationEdge/CustodyEvent/RightsBasis graph | CLOSED |
| G6-07 hidden work | 全研究/运营 taxonomy、work_context、shared allocation、失败/no-show/zero-completion 成本 | CLOSED |
| G6-08 C2 snapshot | Synthetic-only classification、test account telemetry inventory、versioned VendorEvidenceSnapshot | CLOSED |
| G6-09 status wording | 05/STATUS/G5 disposition 一致：G5 pass、G6 review、field blocked | CLOSED |

### 7.2 复验记录

公开仓库保留 [Public review summary](./REVIEW_SUMMARY.md) 与本文件中的最终 closure；逐轮 council 工作稿未公开。最终复验关闭 G6-01–09，documentation P0/P1 = 0/0，未新增 P0/P1。

独立 reviewer 用 condition/exposure、V1 多事件与全阶段 batch fixtures 验证 contract 可表达并拒绝反例；没有声称真实 drill 已运行。

### 7.3 最终裁决

**G6 documentation = PASS — ASSUMPTION-BOUND TECHNICAL REVIEW COMPLETE / FIELD NOT RUN。**

不变的硬边界：8 个 field P0 全 OPEN；ADR-G5-001 Proposed；field feasibility BLOCKED/NOT RUN；C1-text candidate only；C2 real data prohibited；C3 authorised code spikes=0；AI excluded。项目 verdict 仍为 Validate first，PRD evidence threshold 未达到。
