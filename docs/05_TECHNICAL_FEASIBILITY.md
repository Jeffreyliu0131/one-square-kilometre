---
artifact: technical-feasibility
project: One Square Kilometre
created: 2026-08-29
status: passed-assumption-bound-technical-contract-g6-reviewed
gate: G5
documentation_gate: pass
field_feasibility: blocked-not-run-open-p0
product_evidence_gate: not-run
validation_field_candidate: c1-text-only-not-authorized
c2_real_data: prohibited
c3_code_spikes_authorized: 0
ai_scope: excluded-deny-all
---

# G5｜Technical Feasibility

## 0. 技术裁决

**Validate first。架构合同可被审查，field capability 尚未成立。**

当前唯一基础候选是 `C1-text`：许可清楚的静态/文本材料、每 session 短时人工授权、manual anchor、pseudonymous text-only evidence、身份/证据分离、48h outcome 封存后才显示的固定回顾、人工 rights/incident/work ledger。没有账户、hosted form/provider、照片、语音、GPS、自动 telemetry 或 AI。

该选择只减少数据面，不证明路线、任务、accessibility、存储、删除或研究有效性。8 个 field P0 仍 OPEN；在原始关闭证据产生前，不招募、不采真实数据、不运行 C2/C3/AI。

## 1. 技术候选与当前状态

| Candidate | 当前结论 | 可以回答 | 不能回答 |
|---|---|---|---|
| C1-text | 唯一 validation field candidate；未授权运行 | 最小版本/权利/文本记录合同能否闭环 | 需求、产品价值、媒体/GPS/数字 carrier 必要性 |
| C2 hosted | Deferred build-null；真实数据 No-go | product evidence 后，现成平台能否降低 carrier burden | 不能先于价值；平台功能不证明治理/删除/access 合格 |
| C3 purpose-built | Not justified；0 code spikes | 未来单一 software blocker 的条件性可行性 | 不解决 demand、策展、许可、路线或 sponsor |
| AI/model | Excluded / no data path | 无 | 不设计 recap、转写、翻译、OCR、moderation 或 fallback |

## 2. Carrier-independent 技术不变量

1. 每个 session 固定 `StudyProtocolVersion + EstimandVersion + StudyCondition + DoseDefinition + release/digest`；assignment 与 actual exposure 分开，participant-visible 变化产生新版本，旧结果不混算。
2. `release_state`、`dose_locked_at`、append-only `LifecycleBlocker[]` 与 `ActiveSessionDecision` 正交；`start_allowed` 只派生，不再用单一 `frozen/eligibility` 覆盖并发原因。
3. 每次运行有具名、短时 `SessionAuthorization`；没有 day-of access/weather/incident/route check 就不开始。
4. Manual anchor 是 participant assertion 的 canonical record，不是 verified presence；首轮不读取或保存 GPS。`found/unsure/skipped`、独立 stop event 与 participant-confirmed rebind 都保留。
5. 首轮只持久化文字；无媒体、账户、hosted provider、第三方 telemetry 或 AI。
6. 身份、证据、盲化材料和 rights/incident audit 分区；`AssetVersion/ControlledCopy/DerivationEdge/CustodyEvent/RightsBasis` 构成可遍历 lineage。
7. 48h unaided outcome 封存前不向参与者显示封存 notes、recap 或 pattern。
8. 当前 review 只列 typed participant statement/choice 与 still-valid metadata；typed dependency 不匹配或删除/过期/rights suspension 时 abstain；无 pattern generation。
9. Scheduled review/expiry/supersession 通常拒绝新启动；hard incident/safety/access/rights freeze 由人类 owner 决定 stop-and-exit。离线即时撤销不作虚假承诺。
10. 旧 pack 失效后，既有 evidence 仍保留 correction/export/delete 路径；不静默迁移到新 anchor/release。
11. Source 与 license 分开；rights `unknown` 的素材不进入 pack，链接/deep-link 也需条款允许。
12. 人工策展、完整研究链、无变化复核、支持、纠正、rights request、incident 与 retirement 全部按 work context/分母计时；软件不能让成本消失。

## 3. Field feasibility 的 8 个 P0

| P0 | 当前 | 关闭证据 |
|---|---|---|
| Authority/RACI | OPEN | 具名 research/data/privacy/ethics/campus/filming/incident/access owners、替补与书面 determination |
| Manifest/session authorization | OPEN | 真实候选 manifest、digest、状态/授权、发行/回收、expiry/hard-freeze 演练 |
| Actual data-flow/storage | OPEN | 选定 C1-text 组件、数据位置、paper/device custody、key/access/backup/lost-device contract |
| Export/correct/withdraw/delete lineage | OPEN | 虚拟参与者 drill 覆盖 identity/evidence/blinded/export/backup/audit copies，独立 proof |
| Asset/licence | OPEN | 逐资产 ledger；NUS/OSM/原创/participant/curator rights 清楚；unknown 移除 |
| Media/location minimisation | OPEN SIGN-OFF | 正式冻结 text-only/manual-only；任何偏离重新过门 |
| Incident/reliability | OPEN | tabletop、人工 allowlist ledger、STOP/INVALID/reopen、owner response evidence |
| Accessibility/estimand | OPEN | route/task/carrier 分层；非视觉/输入 variant 或明确 unsupported/inclusion decision |

G5 documentation PASS 不能关闭这些 P0。全部关闭后的最高状态也只是 `CONDITIONAL FEASIBLE FOR G2 VALIDATION ONLY`。

### 3.1 Research dose / evaluation feasibility

架构必须正式拥有 G2 的研究分母，而不是只保存 notes：`StudyProtocolVersion`、`EstimandVersion`、`StudyCondition`、`DoseDefinition`、`AssignmentRecord`、`ExposureRecord`，以及 cohort/recruitment/eligibility/followup/burden/coder/adjudication/revealed-choice/analysis entities。Derived iURCS/RAP/JVAP 必须回链 raw response、dose/exposure、codebook、coder/adjudication 和 analysis version。

C1-text 已同步成为首轮正式 dose amendment：两组共同记录与 treatment prompts 均 text-only/manual-only。任何媒体、GPS、hosted 或不同 access stimulus 生成新 estimand/dose，并由 research/ethics/access/data owners 重新裁定。

关闭验证：独立 reviewer 仅凭分开的 synthetic raw batches——V1 N=16、V2a N=16、V2b N=16、V2c 重算 N、V2d 2×24，以及独立保留的 repair/failed batches——重算 V1 qualifying/unresolved、全部分母、missing/withdrawal/invalid、iURCS/RAP/JVAP，并能拒绝 prompt leakage、assignment/exposure mismatch、dose shortening 与未经批准 variant。

## 4. Area manifest / freshness / offline feasibility

### 4.1 正交状态

| 维度 | 值 | 作用 |
|---|---|---|
| `release_state` | draft / approved / superseded / retired | 内容发行生命周期；approved 不等于今天可运行 |
| `dose_locked_at` | timestamp/null | 研究刺激是否锁定；participant-visible change 生成新 dose |
| `LifecycleBlocker[]` | type/scope/open/evidence/owner/resolution | review/incident/rights/access/data 等并发 blocker 分开，append-only |
| `start_allowed` | derived boolean | release/dose/authorization 有效且 open blockers=0 才为 true；不得手写 |
| `ActiveSessionDecision` | trigger refs/priority/action/decider/communicated/acknowledged | 汇总并发 trigger；保留离线未传播 residual risk |

`SessionAuthorization.authorized_until` 不晚于预计 dose 结束、review_due、expires_at 的最早值；关闭一个 blocker 后其它 blocker 仍阻止启动。

### 4.2 Trigger matrix

| Trigger | New session | Active session | Existing evidence |
|---|---|---|---|
| review due | deny after deadline until reviewed | authorization window 内可完成 | correction/export/delete |
| planned expiry / superseded | deny | 无 hard trigger 且仍在授权窗口可完成 | as-of read-only + rights |
| safety/access incident freeze | deny | owner 尽快 stop-and-exit | isolate + rights; evidence validity separate |
| rights/license suspension | deny | rights owner 决定；默认不继续复制/上传 | isolate; export/delete as allowed |
| data-flow/delete failure | deny | stop new capture/transfer | data steward disposal path |

### 4.3 离线结论

- C1 纸/静态文本是 network-independent representation，不等于整个数据流 offline/可靠。
- Service Worker 的 Cache 不会自动更新或过期，作者必须显式 version/delete；因此 future web carrier 必须把 cache 与 release lifecycle 绑定。[W3C Service Workers](https://www.w3.org/TR/service-workers/)
- 浏览器持久存储依赖权限、quota 与用户代理；`persist()`/`estimate()` 是候选接口，不是可靠性保证。[WHATWG Storage](https://storage.spec.whatwg.org/)
- IndexedDB 可提供事务性结构化本地存储，但 durability、quota、设备丢失、备份和删除仍需目标设备演练。[W3C IndexedDB](https://www.w3.org/TR/IndexedDB/)
- 离线 self-guided 无法诚实保证 instant freeze propagation；若业务要求即时撤销所有离线 session，当前 offline 方案应判 infeasible。

## 5. Check-in 与位置

### Current C1-text

```text
anchor 的原创/许可清楚识别线索
→ participant asserts found / unsure / skipped
→ found creates AnchorAssertion（不是到达事实）
→ participant-confirmed AnchorBindingRevision 可改绑
→ stop 另建 SessionStopEvent
```

- `rebind` 是动作不是终态；原 assertion/revision 不覆盖，删除时整链清除。研究者不得把 unsure/skip 改为 found 或用口头导航补成到达。
- 不请求 location permission，不持久化坐标/accuracy/heading/speed/轨迹。
- 不让研究者导航 rescue；找不到是内容/表示/route evidence。
- 位置 failure 不变成 interactive-map 或 GPS 自动 trigger。

### Future GPS boundary（parked）

W3C Geolocation 规范提供 coordinates 与 accuracy，但测量仍有不确定性；它不能证明到达、安全或 accessibility。[W3C Geolocation](https://www.w3.org/TR/geolocation/)

只有重复、非安全、归因为表示方式的 blocker，在 static remediation、G2 evidence、business contract 和 C1/C2 gate 全通过后，才可新立“是否应读取一次位置”的问题；当前不保留 GPS spike。

## 6. 最小数据、privacy、rights 与许可

### 6.1 C1-text data zones

```text
Reference pack (no participant data)
  → pseudonymous text-only field sheet
    → approved evidence vault

Identity/contact vault ─ controlled join by research owner
Evidence vault ────────→ blinded coder extract

Rights request → copy inventory → disposal actions → independent proof
```

禁止个人邮件/云盘、WhatsApp/Telegram、公开链接表单、共享相册或第三方 analytics。若没有机构批准的加密存储/备份策略，可保留锁闭纸本并延后数字化；纸本同样要 custody/lost-paper/deletion contract。

### 6.2 Licence layers

- NUS 网页/地图/文字/标识的查看与复制/公开/deep-link/品牌权利分别判断；内部研究引用不自动允许 field/open pack。[NUS Legal Information](https://www.nus.edu.sg/legal-information-notices)
- OSM 数据受 ODbL/attribution；OSMF Standard raster/vector tile services 的 bulk/offline policy 与数据许可分开。[OSM Copyright](https://www.openstreetmap.org/copyright) · [Standard tiles](https://operations.osmfoundation.org/policies/tiles/)
- Google/NUS/OSM 官网截图不拼进 pack；普通地图 control 不授予项目复制 place/review/photo 的权利。
- 开源只可能发布权利清楚的 schema/code、原创 text/assets 和合规数据产物；participant/research/NUS/vendor 内容不随仓库发布。

### 6.3 Hosted/provider

C2 对真实 participant data 保持 No-go。Actionbound 官方资料表明结果/媒体会进入服务器、旧预载版本不会自动更新，并自报部分 accessibility；公开材料不足以证明单条删除、备份清除、Singapore transfer 与 access non-regression。[Results](https://en.actionbound.com/help/article/results) · [Preload](https://en.actionbound.com/help/article/preloading-bounds) · [Accessibility](https://en.actionbound.com/barrierefreiheit)

未来 synthetic vendor audit 要核实 controller/intermediary、region/subprocessors、retention/training、DPA、export/delete/backups、breach、offline/version 与 exit；外包不消除组织责任。[PDPC data intermediaries](https://www.pdpc.gov.sg/the-distinction-between-organisations-and-data-intermediaries-and-why-it-matters)

Audit fixture 必须标 synthetic-only，禁止真实 participant/contact/note/anchor/source asset/production ID；记录 test account/role/device/IP/telemetry inventory。`VendorEvidenceSnapshot` 固定 plan、region、terms/privacy/DPA、subprocessors、retention/training、accessibility、app/API version、checked_at/recheck_due_at。版本/条款变化使结论过期；该 contract 不授权 C2。

## 7. Export / correction / withdrawal / deletion

```text
request-received
→ identity verified with minimum data
→ scope confirmed
→ new processing/contact blocked
→ copies enumerated
→ primary + derived + blinded + export + backup/vendor actions
→ independent verification
→ participant confirmation
→ non-content tombstone
```

- copy inventory 覆盖 paper/local、working transcription、coder/adjudicator pack、export staging、backup、logs 与未来 vendor copies。
- 撤回且不允许继续使用时，ITT 不能保留可识别/可链接 payload。
- export 要 participant-scoped、可打开并列缺失；不强制 machine-readable 以免制造额外副本。
- 交付后的 participant-controlled export 不属于项目可删除副本；项目仍删除 staging/sent copies。默认不经 email/message 发送。
- `complete` 只在所有 controlled copies 已删除/到期并有 proof 后写；backup pending 时保持 pending。
- Pseudonymisation 不等于 irreversible anonymisation。

Rights drill 所需 schema 必须是 graph，而非一个 copy list 字段：`AssetVersion`、`ControlledCopy`、`DerivationEdge`、`CustodyEvent`、`RightsBasis` 表达 master→paper→transcription→blind packet→export→backup 的 fan-out/fan-in。Withdrawal、licence suspension、correction 或 deletion 从 graph 枚举所有 controlled copies/pack memberships/claim dependencies；participant-owned export 标 non-controlled，项目只删除 staging/sent copies。

当前 G2 的 7 日请求与 30/90 日 retention 是项目合同候选，不冒充法定期限；适用义务由人类 authority 判断。[PDPC obligations](https://www.pdpc.gov.sg/data-protection-obligations)

## 8. Deterministic review / fallback / abstention

### 8.1 Timing contract

```text
field text sealed
→ immediate choice sealed
→ 48h unaided outcome completed and locked
→ only then participant-facing fixed review may be shown
```

### 8.2 Allowed output

- Participant 原文按 anchor/relative sequence 列出；`user_observation/user_choice` 由 `evidence_ref` 支持。
- Still-valid verified metadata 附 source + `field_verified_at/as_of` + limitations。
- 无 pattern aggregation、自由文本补写、自动转写/翻译或 AI。
- Missing/deleted/expired/unsupported 时返回原文/unknown/abstain；0 supporting refs = 0 claim。
- 更正建立 revision；删除 supporting ref 后相关 review 自动失效。

每个 `Claim` 必须有 `claim_type=participant_statement|user_choice|verified_metadata`、`epistemic_status`、typed required dependencies、dependency versions、as-of/limitations、`active|abstained|invalidated` 与 reason。有 ref 不等于 ref 支持：participant note 只能证明 participant statement existed，不能证明其安全/人群/身份/动机/街区内容。Source expiry、field supersession、rights suspension、rebind/correction/delete 均传播 invalidation。

### 8.3 Fallback

| Failure | 唯一默认动作 |
|---|---|
| no network | 已授权 C1-text 可继续；条件变化且无法联系 owner 则停止 |
| anchor unclear | unsure / skip / stop / rebind；无 GPS/导航 rescue |
| storage/custody uncertain | 不补写；session measurement invalid；启动 incident |
| pack invalid | deny/stop per trigger matrix；旧 evidence 保留 rights path |
| review unsupported | raw text / unknown / abstain |
| export/delete unverified | case 保持 pending，停止新采集 |
| access mismatch | 停止/退出，记运营失败，不记参与者失败 |

## 9. Accessibility

三层独立：physical route、task/estimand、carrier/content。`text-only` 不等于 accessible；视觉主题可能本身排除部分用户。

首轮 C1 要求结构化 accessible text/HTML 或 large print 等适用形式，不发 image-only PDF；非颜色唯一提示、清晰语言、可放大/键盘/读屏、语音有文本等价、skip/stop/help 不只靠 QR。任何 screen reader、scribe、Braille、language 或不同 sensory stimulus accommodation 都需判断是否保持同 estimand；不同 contact/data-flow 形成独立 variant。无法等价则标 `unsupported`，由 research/ethics/access owner 决定纳入，不得临时启用未知 AI/翻译/媒体。

参考 [WCAG 2.2](https://www.w3.org/TR/WCAG22/) 与 [WCAG2ICT](https://www.w3.org/WAI/standards-guidelines/wcag/non-web-ict/)，但 conformance 不替代真实辅助技术/用户测试，也不证明物理路线可达。

## 10. Cost、latency、observability 与 evaluation

### 10.1 Operating cost

`OperationalWorkLog` 必须记录整个研究/运营链：source/licence、walkthrough/access、prompt/QA/release、paper custody/digitisation、招募/筛选/排期、consent/teach-back、randomisation、field support、48h interview、deconditioning/blinding、coder calibration/双人编码/adjudication、data QC、preregistration/analysis/sign-off、correction、rights/incident/vendor/retirement 与无变化复核。

字段含 `work_context=research-only|value-delivery|recurring-operations|governance|transfer-reuse`、area/release/dose/stage/cohort/session refs、role/skill、active/waiting minutes、direct/shared + allocation rule、outcome completed/failed/aborted/no-change、items/rework/external cost ref。失败/no-show/withdrawn/invalid/zero-completion 仍留成本。

分开报告 total validation cost 与 portable operating cost，以及 per-invite/per-start/per-session/per-valid-completion/per-released-or-retired-pack。再计算 curation、maintenance、review compliance、stale starts、reuse yield 与 second-area effort。所有 sponsor ceiling 当前 unknown；未签不能判“可控”。

### 10.2 Observability

C1 首轮只用四张人工 allowlist ledger：pack issue/return/destruction、copy/access/transcription/coder、rights/incident、work-minute/failure。禁止 note payload、坐标、个人诊断、device fingerprint 或 participant+anchor+exact-time 行为链。

`0 silent loss`、`100% current-version starts`、`100% synthetic deletion paths` 是枚举演练的 hard acceptance target，不是已经证明的 production SLO。

### 10.3 Latency/evaluation

不先编造 ms/s。C1 测 pack issue/handoff、人工处理、follow-up、export/delete 和 support minutes；C2 才测 preload/sync/vendor backlog；C3 才测 durable commit/reload/quota。每个被授权测试先封存设备/网络、N、percentile/最大值、baseline、owner ceiling、failure action。

Bad cases 至少覆盖 stale copy、scheduled expiry、hard freeze、lost paper/device、corrupt export、failed deletion、wrong coder packet、withdraw before/after score、unsupported inference、access mismatch 与 owner unavailable。

## 11. Build-vs-buy 与 spike

### 11.1 Decision rule

1. Product evidence 未运行/失败 → C1-text only / Validate first。
2. M2 value positive、一次性 activity 由 C1 足够 → 保留 C1，不自研。
3. 只有 business/activity contract 后才运行 C2 五工作日 synthetic build-null；真实数据继续禁止。
4. C2 通过 → buy/configure，停止 C3。
5. C2 失败先归因；需求/内容/route/licence/terms/cost failure 不支持 C3。
6. 只有 `Reusable content system` + 第二 curator/area + repeated software blocker + C1 remediation + C2 audit + sponsor/budget/lifecycle + spike record → 才申请 C3。

### 11.2 当前代码 spike

**0。** 当前先做三项 non-code readiness drills；它们使用实际拟投入 C1 组件和 synthetic participant/content：

| Drill | 问题 | Closure evidence |
|---|---|---|
| D1 Manifest/session authorization | issue/return/supersede/scheduled expiry/hard freeze 是否保持 exact dose 与旧 evidence rights？ | signed run sheet、digest/copy inventory、stale/unreturned cases |
| D2 Storage/rights lifecycle | actual C1-text storage 是否覆盖 identity/evidence/blinded/export/backup/delete？ | approved data-flow/storage register、virtual participant drill、independent proof |
| D3 Review/incident/access | 48h-after-only review、unsupported abstention、lost/corrupt/failed-delete/access mismatch 是否有唯一动作？ | fixtures/tabletop、RACI、reopen rule |

C2 synthetic audit 后置。C3 未来最多保留 durability、revocation/expiry、idempotent offline import 三个单问题 spike；必须满足完整 authorization，用 synthetic data、time/cost ceiling、独立 reviewer、最多一次修复、默认丢弃。GPS/media/reuse/AI 不保留为当前 spike。

## 12. 最大未知与最终结论

**最大技术未知：** 选定真实 C1-text 组件后，exact version/start authorization、paper/device custody、source-linked text、export/delete 与 incident recovery 能否在一条可枚举 copy lineage 中端到端闭环，而不依赖口头保证或产生过量人工 reconciliation。

**最大总体可行性风险：** 人工策展、许可、走查、无变化复核、过期、支持、纠正、incident 和 retirement 在第二 curator + 第二 area/theme 后仍可能低复用、高成本。软件不会让旧核验自动变新。

### Gate 状态

- G5 documentation：`PASS — ASSUMPTION-BOUND TECHNICAL CONTRACT`；G6 独立 review/复验已关闭全部 documentation P0/P1。Field 仍因 8 个 OPEN P0 blocked/not run。
- Field feasibility：`BLOCKED — NOT RUN / 8 OPEN P0`。
- C1-text：唯一 candidate，未授权运行。
- C2：deferred，真实数据 prohibited。
- C3：not justified，0 code spikes。
- AI：excluded/deny-all。
- PRD evidence threshold：未达到。

## 13. 一手来源（访问日 2026-08-29）

- [W3C Geolocation](https://www.w3.org/TR/geolocation/)
- [W3C Service Workers](https://www.w3.org/TR/service-workers/)
- [WHATWG Storage Standard](https://storage.spec.whatwg.org/)
- [W3C IndexedDB](https://www.w3.org/TR/IndexedDB/)
- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) · [WCAG2ICT](https://www.w3.org/WAI/standards-guidelines/wcag/non-web-ict/)
- [PDPC Data Protection Obligations](https://www.pdpc.gov.sg/data-protection-obligations) · [Data Intermediaries](https://www.pdpc.gov.sg/the-distinction-between-organisations-and-data-intermediaries-and-why-it-matters)
- [NUS Legal Information](https://www.nus.edu.sg/legal-information-notices) · [Filming and Photography](https://news.nus.edu.sg/filming-and-photography-on-nus-campuses/) · [Campus Tours](https://uci.nus.edu.sg/campus-tour/)
- [OSM Copyright](https://www.openstreetmap.org/copyright) · [OSMF Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/)
- [Actionbound Results](https://en.actionbound.com/help/article/results) · [Preload](https://en.actionbound.com/help/article/preloading-bounds) · [Accessibility](https://en.actionbound.com/barrierefreiheit)
- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) · [PMTiles integration example](https://maplibre.org/maplibre-gl-js/docs/examples/pmtiles/)

MapLibre/PMTiles 只证明未来交互地图可实现候选，不构成需求、许可、offline 或 C3 授权。

## 14. Review record

G5/G6 的公开 disposition、争议处置和最终限制见 [Public review summary](./REVIEW_SUMMARY.md)。原始 council 工作稿未公开，也不作为外部事实来源。

## 15. 修订记录

| 版本 | 日期 | 状态 | 变化 |
|---|---|---|---|
| 0.1 | 2026-08-29 | PASS — ready for G6 | C1-text 条件性可行性、8 P0、版本/数据/权利/offline/check-in/review/cost/eval/build-vs-buy/drills；技术 council 最终复验新 P0/P1=0 |
| 0.2 | 2026-08-29 | G6 reviewed / documentation P0-P1=0 | 增补 dose/estimand/exposure、研究评测分母、manual assertion、typed claims、并发 blockers、copy graph、全人工成本与 C2 snapshot |
