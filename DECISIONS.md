---
project: One Square Kilometre
updated: 2026-08-30
---

# 决策日志

## D-001｜采用阶段门推进，验证前不进行完整开发

- 日期：2026-08-29
- 状态：ACCEPTED
- 决策：按 G0–G8 顺序推进；允许最小、可丢弃、明确标注的技术 spike，但不把 demo 当能力或需求证据。
- 依据：用户任务约束；`PRODUCT_BRIEF.md` 自报 pre-validation / not-ready。（任务约束 + E1）
- 反例/代价：提前做可交互 demo 可能提高招募和理解，但也会造成沉没成本、实现偏见和虚假完成感。
- 裁决理由：当前最大不确定性是用户行为价值，不是界面或工程实现。
- 影响：G2 前禁止技术选型和产品脚手架；G5 只允许回答关键可行性问题的 spike。

## D-002｜保留 `PRODUCT_BRIEF.md` 为不可覆盖的概念起点

- 日期：2026-08-29
- 状态：ACCEPTED
- 决策：原文件不删除、不覆盖；结论变化进入本日志和对应 gate 文档。
- 依据：用户明确要求。（任务约束）
- 影响：后续文档可以反驳 brief，但必须说明证据与理由。

## D-003｜采用显式证据等级与真源层级

- 日期：2026-08-29
- 状态：ACCEPTED
- 决策：使用 E0–E4；原始行为证据和当前一手来源高于分析文档，agent 生成稿不能作为事实来源。
- 依据：用户任务约束；当前唯一材料是 concept brief。（任务约束 + E2 文件盘点）
- 影响：persona、需求、指标基线与商业数字在得到证据前均标“假设/未知”。

## D-004｜当前工作结论为 Validate first

- 日期：2026-08-29
- 状态：PROVISIONAL
- 决策：在 G2 行为验证前不作 Build small 决策。
- 依据：仅有 E1 概念信号，没有完成、观察改变、回忆、复用或 AI 增量行为证据。
- 反例/代价：纸面协议本身需要少量制作工作；这属于验证资产，不是产品开发。
- 重新审视条件：G2 完成预注册现场对照并取得 E3/E4 证据。

## D-005｜冻结 G2 的 persona + area + theme 测试配置，不升级为产品事实

- 日期：2026-08-29
- 状态：ACCEPTED FOR VALIDATION
- 决策：persona 为当前学期新到 NUS、正在建立校园日常使用模式的国际学生；area 为官方 UTown 语义边界内待走查的非住宅公共核心；参与者主题为“我会在哪里停下来，哪些可直接观察且无需猜测他人的空间条件影响我的选择”。
- 依据：产品 council 独立初稿和交叉评审；NUS 一手资料证明 cohort、官方供给与 UTown 可研究性存在（E2），但没有需求证据。
- 争议与裁决：“国际学生”只作招募聚焦，不当因果变量；不把具体到校周数写成人格事实；“人们在哪里停留”降为内部启发，避免旁观者和错误街区推断；不承诺严格 1 km²。
- 影响：G2 开始收集数据后不得为提高结果任意换 persona/area/theme；改动需新版本并记录当前版本失败。

## D-006｜G1 仅作 research-convergence conditional pass

- 日期：2026-08-29
- 状态：ACCEPTED
- 决策：G1 只通过研究对象、强替代、bad cases 与证据缺口的收敛，允许进入 G2 计划；G3 保持 BLOCKED。
- 依据：三方 council 交叉评审一致；E2 桌面资料不能产生 E3 用户行为证据。
- 反例/代价：若把 `PASS` 简写为用户洞察已验证，会造成错误授权。因此状态必须保留完整限定语。

## D-007｜把三个零假设顺序拆开

- 日期：2026-08-29
- 状态：ACCEPTED
- 决策：NUS trail/onboarding 检验 residual demand；普通地图/惯常自由探索检验 protocol increment；PDF/Actionbound 检验 build necessity。不得在 8 人样本中拆成四臂混答。
- 依据：NUS 2026 官方支持与 Actionbound 当前一手资料（E2）；产品 council 交叉评审。
- 影响：G2 先做替代史/真实事件复现，再做 map vs no-AI protocol；只有机制有增量才测试载体和 AI。

## D-008｜G2 锁定唯一 R1 与唯一 demand primary

- 日期：2026-08-29
- 状态：ACCEPTED FOR VALIDATION
- 决策：唯一 R1 为目标用户不会在真实机会成本下选择并完成协议，或协议不能产生可持续、足以抵偿总负担的增量。唯一 demand primary 为 `JVAP-7/48`：同一被直接邀请者自愿完成与 confirmatory 同一 dose，且 48 小时仍有相对 baseline 新增/修订认识。
- 依据：G2 产品/研究/对抗三轮评审；初版 `URCS-48` 可奖励口头答题且没有 revealed choice。
- 影响：V1/V2a/V2b 只产生 residual-job/机制/package signal；V2c confirmatory 与 V2d 两个直接邀请 cohort、全部护栏共同通过前，不得声称 demand 获证。

## D-009｜分开 G2 documentation gate 与 product evidence gate

- 日期：2026-08-29
- 状态：ACCEPTED
- 决策：验证计划在 0 个未解决 P0/P1 后可标 `PASS — VALIDATION PLAN READY`；真实证据状态仍为 `NOT RUN`。后续文档只可 assumption-bound，不授权 field execution 或 build。
- 依据：用户要求先完成可审查文档闭环，同时明确未验证 PRD 只能是 validation-ready draft。
- 反例/代价：继续写下游草案可能被误读为已批准；因此所有下游 front matter、状态和结论必须保留 evidence gate 未运行。

## D-010｜BRD 只通过 assumption-bound documentation gate

- 日期：2026-08-29
- 状态：ACCEPTED
- 决策：G3 BRD 的问题、范围、业务规则、分类门、责任和依赖可供下游审查，但 business approval/build authorization 继续 blocked。
- 依据：三方评审关闭所有 P0/P1；用户需求、sponsor/value/budget/capacity 和现场证据仍未产生。
- 关键边界：一次性活动也需要 owner/budget/access/data/safety/expiry contract；没有 sponsor 不能借“开源公共品”或“不是产品”绕过授权。
- 影响：G4 只能比较方案并给出条件性选择，不能批准载体或开发。

## D-011｜G4 分开价值机制与 carrier，默认不自研

- 日期：2026-08-29
- 状态：ACCEPTED
- 决策：M2 self-guided evidence protocol + C1 controlled no-code kit 只作为验证配置；M0 是 No-go 默认；M1 human-led 与 M3 direct guide 需独立假设。产品 carrier 未选择，C2 仅条件性 build-null，C3 not justified，AI excluded。
- 依据：产品/研究/对抗评审关闭所有 P0/P1；首稿把载体误当价值方案，已纠正。
- Spike 边界：C3 先要求 Reusable content system、第二 curator + 第二 area/theme、重复软件 blocker、C1/C2 处置失败、sponsor/budget 和完整授权表。一次性活动永不因工具不便进入 custom spike。
- 影响：G5 可评估可行性和条件性架构，不得写代码或把技术“能做”变成产品“该做”。

## D-012｜提出 C1-text validation architecture，保留 8 个 field P0

- 日期：2026-08-29
- 状态：PROPOSED / INDEPENDENTLY REVIEWED / FIELD BLOCKED
- 决策：首轮唯一 candidate 为 C1-text：静态/文本材料、manual anchor、text evidence、无 hosted/media/GPS/telemetry/AI；采用 carrier-independent manifest/data/rights contract。
- 依据：架构与 data/rights 两名 council 成员独立初稿、交叉回应和最终复验；多模态/hosted 不帮助识别核心机制却显著扩大权利面。
- 未关闭：8 个 field P0；ADR-G5-001 仍 Proposed；当前 authorized code spikes=0。
- 影响：G6 可独立审查合同；不能招募、运行、采购、部署或把 C1-text 写成已实现能力。

## D-013｜将首轮 G2 dose 正式收窄为 C1-text/manual-only

- 日期：2026-08-29
- 状态：ACCEPTED FOR VALIDATION DESIGN
- 决策：V2 的共同记录与 treatment prompts 均只收文字，manual anchor only；无照片、语音、GPS、hosted provider 或 AI。任何 modality/carrier/access stimulus 变化生成新 EstimandVersion/condition-specific dose，并重新过门。
- 依据：G5 data/rights council 认为媒体/GPS 不增加 M2 机制识别，却显著扩大旁观者、EXIF、lineage、跨境和 access surface；G6 要求研究与架构 dose 语义一致。
- 影响：这是研究配置收窄，不是用户偏好证据；若 text-only 无法保持 estimand，正确动作是 blocked/pivot，不是临时恢复媒体。

## D-014｜G6 只通过独立技术 documentation review

- 日期：2026-08-29
- 状态：ACCEPTED
- 决策：G6 findings 经独立 reviewer 两轮复验全部 CLOSED，documentation P0/P1=0；允许编写 validation-ready PRD。
- 不变边界：8 field P0 OPEN、ADR Proposed、field feasibility BLOCKED、C1-text 未授权、C2 real data prohibited、C3 code=0、AI excluded。
- 影响：G7 不得把 proposed contract 写成已实现功能；所有 field P0 必须成为发布/运行前硬阻断。

## D-015｜G7 PRD 仅为 validation-ready draft

- 日期：2026-08-29
- 状态：ACCEPTED DOCUMENTATION / NOT APPROVED
- 决策：PRD 覆盖 M2+C1-text 验证体验、testable requirements、Given/When/Then、data/AI/NFR/edge/release contract；允许进入执行规划，不允许开发。
- 关键处置：安全协助优先盲化；JVAP 不等于实际地点使用；一次性活动也需完整授权；staged consent 消除 dose/assignment 循环；free text 不因 pseudonymous ID 自动匿名。
- 不变：product evidence 未运行、8 field P0 OPEN、ADR Proposed、field/build blocked、C2/C3/AI 不在 scope。

## D-016｜G8 路线图通过，但只允许 EP-00

- 日期：2026-08-29
- 状态：ACCEPTED DOCUMENTATION / EXECUTION BLOCKED
- 决策：执行计划采用 EP-00–EP-15；只有 EP-00 human authority 可开始。8 field P0 用具名 owner、原始 evidence、独立 reviewer、validity/reopen 的 closure record 逐项关闭，不能一句“8/8”代替。
- 关键顺序：readiness → V1→V2d → actual-use/value branch → second-curator/second-area reuse probe → carrier build-null → optional spike → unreleased candidate → eval → dogfood → external validation。
- No-go：任何早期失败取消后续分支；commissioned activity、custom、AI 均需新 gate，不能救场。
- 影响：G0–G8 文档闭环完成；项目仍 Validate first，execution/build/field blocked。

## D-017｜授权本地 portfolio/learning prototype 实现

- 日期：2026-08-30
- 状态：ACCEPTED FOR LOCAL IMPLEMENTATION
- 授权：`implementation_authorization = local-portfolio-prototype`。
- 决策：允许跳过外部产品验证，直接实现一个本地、非导航、非现场部署的高质量 vertical slice；只使用 synthetic、自有或许可清楚 fixtures，并建立 provenance manifest。
- 不改变：evidence verdict 仍为 `Validate first`；G0–G8 历史、8 个 field P0、ADR Proposed、PRD `validation-ready draft / not approved` 均保持。该授权不是需求获证、approved product、production release、外部研究或 NUS 官方授权。
- 禁止：部署、公开发布、招募参与者、上传真实私人数据、git commit/push、生产权限变更、真实安全/开放/无障碍承诺。
- 实现边界：无 AI、UGC、全球地图、动态路线、AR/3D、真实 NUS 导览；核心 demo 无 API key 完整运行，模型只能是可拔除 adapter。
- 验收：真实浏览器桌面/移动测试、a11y、错误/离线/无 WebGL、lint/typecheck/unit/integration/E2E、独立代码与安全 review；P0/P1 必须修复或移除功能关闭。

## D-018｜接受本地 synthetic prototype 交付，不改变产品证据门

- 日期：2026-08-30
- 状态：ACCEPTED FOR LOCAL PORTFOLIO SCOPE ONLY
- 决策：接受 D-017 的窄纵向切片为本地 portfolio/learning implementation complete；最终方案为 6 个 synthetic anchors，其中 4 个组成可执行观察序列，stale 与 unsupported 两项只可检查、不可 check-in/write。
- 评审：独立 code/security reviewer 保留首轮失败记录，关闭 recovery、multi-tab overwrite、Stop durability、manifest-bound restore、clock expiry 与 rapid cross-anchor commit 共 6 个 P1；最终 remaining P0/P1/P2/P3 = `0/0/0/0`，裁决 `PASS_LOCAL_PROTOTYPE`。
- 证据：aggregate `pnpm verify` exit 0；unit/integration 28、desktop Chromium 22、mobile Chromium 22、production warm-offline 2；in-app browser 手动审查 desktop/390px、stale/unsupported、focus、recap 与 console。
- 不改变：evidence verdict 仍为 `Validate first`；PRD 仍 `validation-ready draft / not approved`；8 个 field P0、真实 persona/area/theme/value/demand、NUS/场地/伦理/数据/安全/无障碍授权均未关闭。
- 禁止不变：不部署、不公开发布、不招募、不上传真实私人数据、不 git commit/push、不声称 navigation、现场安全/开放/可达、NUS 官方、AI insight、approved product 或 production ready。

## D-019｜本地体验验收候选 Ready，不改变 Validate first

- 日期：2026-08-30
- 状态：ACCEPTED FOR DIRECT LOCAL EXPERIENCE ACCEPTANCE ONLY
- 决策：当前 synthetic prototype 可直接交给非技术人员，按 `implementation/EXPERIENCE_ACCEPTANCE.md` 做本地纯体验验收；本地候选状态为 `Ready`。
- 关闭依据：product/interaction、architecture/privacy、adversarial QA 三方 post-fix rereview均为本地 scope `P0=0 / P1=0`；最终冻结 snapshot 的 `pnpm verify` exit 0，包含 fixture/fingerprint、lint、typecheck、unit/integration `38/38`、desktop/mobile Chromium `60/60`、a11y `14/14`、production warm-offline `2/2`；22 张 fixed-viewport screenshot 已视觉复核。
- 关键处置：统一 4-anchor 完成分母；增加显式 recovery 入口；draft/commit 分层；独立 correction 与 stopped correction；strict/fingerprinted manifest；recovery 全局只读；exact text/revision/history/Undo-draft invariants；expiry timer/Undo/export fail closed；390px sticky/bounding gate；runtime storage schema validation。
- 证据边界：以上是当前本地 synthetic build 的工程与体验可审查性证据，不是目标用户行为、真实地点、field feasibility、真实数据隐私、无障碍合规、生产或产品价值证据。
- 不改变：项目唯一 verdict 仍为 **Validate first**；PRD 仍 `validation-ready draft / not approved`；8 个 field P0、EP-00、真实 persona/area/theme/value/demand/NUS/伦理/数据/安全/access 权限均未关闭。
- 禁止不变：不部署、不公开发布、不招募、不输入真实私人数据、不 git commit/push，不把 `Ready` 脱离 `local experience acceptance candidate` 使用。

## D-020｜授权公开 GitHub 源码基线，不授权产品或现场发布

- 日期：2026-08-30
- 状态：ACCEPTED FOR PUBLIC SOURCE REPOSITORY
- 决策：允许将当前 One Square Kilometre 整理为公开 GitHub 仓库；允许 `git init`、`main` baseline commit、创建 remote 与 push。当前子任务只完成本地 release prep 和 baseline commit；remote 创建与 push 由父线程统一执行。
- Supersedes：D-017/D-018/D-019 中“不公开发布、不 git commit/push”的限制，仅对**本仓库源码与已筛选公开材料**作窄例外。应用部署、GitHub Pages/hosting、真实 field pack 发布、招募、生产权限、真实私人数据和 NUS 官方使用仍未授权。
- 公开范围：源码、测试、G0-G8 十份主文档、根治理文档、implementation 核心文档、公开版最终 review summary、体验验收指南、社区治理文件与少量精选 synthetic 截图；不提交原始 council 中间稿、缓存、依赖、build、coverage、Playwright reports/traces 或 raw test results。
- 许可：除明确列出的 synthetic fixture JSON 外，仓库代码、文档和精选截图采用 MIT；`src/fixtures/area-manifest.json` 与 `src/fixtures/provenance-manifest.json` 采用 CC0-1.0；第三方依赖保留各自许可。
- 证据与品牌边界：公开仓库必须显著声明 independent、not affiliated with NUS、synthetic、not navigation、local-only evidence、not validated product、not production/field ready。
- Release evidence：public r2 fixture `fnv1a32:0dbad542`；clean frozen install 与 415-entry supply-chain policy PASS；unit/integration `38/38`；desktop/mobile Chromium `62/62`；a11y `16/16`；production warm-offline `2/2`；bundle gzip `146,358` bytes；production licence inventory 18 个且无 unknown/unlicensed group。
- 不改变：项目唯一 verdict 仍为 **Validate first**；PRD 仍 `validation-ready draft / not approved`；8 个 field P0 与 EP-00 阻塞不变。

## 待决策

- EP-00：业务 sponsor、研究/数据/伦理/场地/拍摄/field/access/incident owners 与 backups。
- 8 个 field P0 的逐项 closure evidence 与有效期/reopen trigger。
- V1–V2d 的实际执行结果，以及 R1 是否成立。
- Actual-use/value-type 与 Stop / one-time / reuse classification。
- ADR-G5-001 是否在 field evidence 后接受为 `validation only`。
