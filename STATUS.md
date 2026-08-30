---
project: One Square Kilometre
updated: 2026-08-30
current_gate: local-portfolio-prototype complete
overall_status: local-experience-acceptance-candidate-ready-validation-still-required
verdict: validate-first
prd_status: validation-ready-draft-not-approved
implementation_authorization: local-portfolio-prototype
implementation_state: complete-local-prototype-experience-acceptance-ready
experience_acceptance_candidate: ready-local-only
production_release: not-authorized
external_research: not-authorized
public_source_repository: local-main-baseline-committed
baseline_commit: this-commit-see-git-history
github_remote: pending-parent-thread
---

# 项目状态

## 当前结论

项目仍只有产品概念信号，没有用户行为、现场核验或真实数据/field/production 技术验证证据。当前新增的是 local synthetic build 的工程与体验验收证据，不能支持产品判断。当前唯一诚实结论是 **Validate first**；不得开始完整产品开发。

## 2026-08-30 本地实现授权

用户已明确授权 `implementation_authorization = local-portfolio-prototype`。本轮可跳过外部产品验证，直接实现本地、非导航、非现场部署的 portfolio/learning prototype。

该授权不改变任何历史 evidence verdict、gate、field P0/P1 或 PRD approval 状态，也不构成需求获证、approved product、production release、外部研究、NUS 官方服务或真实现场能力。D-020 后，公开源码仓库与 Git 操作成为窄例外；应用部署、现场材料发布、招募、真实私人数据和生产权限变更仍禁止。

## 2026-08-30 公开源码授权

用户已明确授权把当前项目整理为公开 GitHub source repository，并授权 Git 初始化、baseline commit、remote 与 push。当前子任务只负责本地 `main` baseline；remote/push 由父线程在 GitHub CLI 重新授权完成后执行。

公开源码不改变 **Validate first**、synthetic、not navigation、not affiliated with NUS、local-only evidence 与 PRD not approved。许可证采用 MIT + CC0-1.0 混合边界；公开 allowlist 与扫描结果记录在 README、license/notices、review summary 和最终 commit 中。

本地 Git 状态：`main` baseline 即本提交；项目级 commit identity 使用 noreply 地址；remote 创建与 push 仍等待父线程。

## Gate 状态

| Gate | 状态 | 通过依据 / 阻塞 |
|---|---|---|
| G0 Source of truth | PASS | 已完成目录盘点、证据分级、真源规则与治理文件；不代表产品假设获证 |
| G1 Insight | CONDITIONAL PASS | 只通过研究收敛；已冻结 G2 测试配置，用户需求与区域可行性仍未获证 |
| G2 Validation | PASS — PLAN READY | 唯一 R1、V0–V2d、样本/对照/JVAP 主指标/护栏/No-go 已经三方复验；field/evidence 未运行 |
| G3 BRD | PASS — ASSUMPTION-BOUND DRAFT | 0 个未解决 P0/P1；business sponsor/evidence/approval 均未就绪，不授权 build |
| G4 Solution decision | PASS — ASSUMPTION-BOUND | M0–M3 价值机制与 C1–C3 carrier 分层；M2+C1 仅验证，产品方案/custom/AI 未授权 |
| G5 Technical feasibility | PASS — CONTRACT ONLY | C1-text proposed contract 可审；field 仍 BLOCKED/NOT RUN/8 P0，ADR Proposed，0 code spikes |
| G6 Technical review | PASS — DOCUMENTATION ONLY | 独立 reviewer 复验后 documentation P0/P1=0；8 field P0 仍 OPEN，ADR Proposed，field blocked |
| G7 PRD | PASS — VALIDATION-READY / NOT APPROVED | 产品/研究/架构复验 P0/P1=0；8 field P0/ADR/evidence/business/build 仍阻塞 |
| G8 Execution plan | PASS — CONDITIONAL ROADMAP | EP-00–EP-15 依赖/DoD/风险/停建完整；只允许 EP-00，后续全部 blocked/not committed |

## 已确认的项目事实

- 项目根目录在 2026-08-29 盘点时仅有 `PRODUCT_BRIEF.md`；无代码、研究原始数据、设计稿或测试记录。（E2：本地文件系统检查）
- 2026-08-29 初始盘点时本目录不是 Git 仓库；D-020 已授权并要求建立公开 `main` baseline。该历史基线不再描述当前 Git 状态。（E2：当时的 `git status` 结果 + 当前用户授权）
- `PRODUCT_BRIEF.md` 自报状态为 `pre-validation`、`prd_status: not-ready`、`evidence_level: concept-signal-only`。（E1：概念 brief）

## 当前阻塞

- 没有可用于通过 G2 的目标用户行为证据。
- persona 与改写后的主题未获用户验证；UTown 候选非住宅核心未完成人工现场核验。
- 尚无招募渠道、研究同意流程、参与者可用性或 area manifest。
- 尚未取得 2026 NUS ISO Trail Experience 原始任务包；不能伪造官方对照。
- G2 field execution 仍缺人类 owner、正式伦理/年龄/场地 determination、route/access review、tabletop、删除演练、随机表/codebook 与 preregistration lock。
- 8 个 field P0 均为 OPEN；没有有效 P0ClosureRecord。
- 所有 EP milestone 的具名 A/R/independent approver 目前 UNASSIGNED；build authorization=none。

## 下一步

1. **EP-00 only：** 识别 sponsor，具名 research/data/privacy/ethics/campus/filming/field/access/incident owners 与 backups。
2. 取得书面 ethics/age/data/campus/filming/recruitment determinations；任一缺失则归档/停止。
3. 只有 EP-00 DoD 完成后，才可启动 EP-01 area/rights/access；不得并行开发。

以上仍适用于真实 field/external research。本地 synthetic prototype 已完成；后续若要推进真实产品，只能回到 G2/EP-00 条件与外部验证，不得用本 prototype 绕过。

## 本地 prototype 实现状态

- State：**READY FOR DIRECT LOCAL EXPERIENCE ACCEPTANCE ONLY**；D-017 code/security review 与本轮 product/interaction、architecture/privacy、adversarial QA post-fix rereview均为本地 scope `P0=0 / P1=0`。
- Scope：deep-strict、fingerprint-checked synthetic manifest、6 anchors/prompts（4 个 active route + 2 个 fail-closed examples）、SVG/DOM 2D map、manual check-in、draft/commit 分层、独立 correction/stopped correction、deterministic evidence-linked recap、stale/unsupported/clock-expiry/offline/recovery/delete/export states。
- Data：只使用 synthetic、自有或许可清楚 fixtures；不收真实私人数据。
- AI：核心流程不依赖模型；唯一 enabled adapter 为 deterministic template，model adapter 明确 unavailable，无 SDK/key/provider/fallback。
- Runtime：Node `>=22`、pnpm `11.19.0`；无 API key；默认端口 `127.0.0.1:4317`。
- Verification：fixture notices `5` + r2 fingerprint `fnv1a32:0dbad542`；unit/integration `38/38`；desktop Chromium `31/31`；mobile Chromium `31/31`；a11y subset `16/16`；production warm-offline `2/2`；aggregate `pnpm verify` exit `0`。
- Bundle：JS gzip `139,296` bytes；CSS gzip `5,836` bytes；complete shell gzip `146,358` bytes。
- Acceptance delivery：`implementation/EXPERIENCE_ACCEPTANCE.md` 提供非技术验收顺序、预期/失败标准、reset/data boundary/cannot-claim；本地测试生成并复核 22 张定帧资产，公开 baseline 只保留 4 张精选 synthetic 截图。

运行：

```bash
pnpm install --frozen-lockfile
pnpm dev
# open http://127.0.0.1:4317
```

完整复验：

```bash
pnpm verify
```

本地 prototype 的 remaining limitations 不是隐藏 backlog：Chromium-only automation、未做 manual VoiceOver/Safari/Firefox/real device、cold-start offline 不支持、Web Storage 非原子并发且未加密、无 secure erase。详见 `implementation/KNOWN_LIMITATIONS.md`。

## 需要的人类决策

要执行而不只是保留文档，当前必须有人类决定并具名承担：业务 sponsor/outcome owner；研究与数据责任主体；伦理/年龄/跨境/保留判断；NUS 场地/拍摄/素材 authority；可触达的中性招募渠道；field/accessibility/safety/incident team；可接受的 curation/review/support/lifecycle cost ceilings。没有这些，本项目应保持 Validate first / execution blocked。

## Artifact map

- `docs/00_SOURCE_OF_TRUTH.md` — G0 真源与证据等级
- `docs/01_INSIGHTS.md` — G1 洞察、persona/area/theme 与替代
- `docs/02_VALIDATION_PLAN.md` — G2 唯一 R1 与 V0–V2d
- `docs/03_BRD.md` — G3 assumption-bound BRD
- `docs/04_SOLUTION_OPTIONS.md` — G4 价值机制 / carrier 决策
- `docs/05_TECHNICAL_FEASIBILITY.md` — G5 技术可行性与 field P0
- `docs/06_ARCHITECTURE.md` — Proposed ADR / architecture contract
- `docs/07_TECH_REVIEW.md` — G6 独立技术评审与 closure
- `docs/08_PRD.md` — G7 validation-ready PRD / not approved
- `docs/09_EXECUTION_PLAN.md` — G8 EP-00–EP-15 条件性路线图
- `docs/REVIEW_SUMMARY.md` — 公开版 G0-G8、实现与 release review summary
- `README.md` — 本地运行、验证命令与实现入口
- `implementation/ARCHITECTURE.md` — 已实现架构与 runtime 边界
- `implementation/PRIVACY.md` — local data、export/delete 与非保证
- `implementation/KNOWN_LIMITATIONS.md` — 不可宣称事项与未验证边界
- `implementation/FIXTURES_AND_LICENSES.md` — synthetic provenance 与依赖许可
- `implementation/TEST_EVIDENCE.md` — 最终自动/浏览器/视觉证据
- `implementation/EXPERIENCE_ACCEPTANCE.md` — 中文非技术体验验收指南与截图索引
- `implementation/council/independent-code-security-review.md` — 独立首审、修复处置与最终 PASS
- `implementation/council/experience-acceptance-council.md` — 本轮体验/架构/QA pre-fix 与 post-fix disposition
- `artifacts/screenshots/` — 公开精选 desktop/mobile synthetic 视觉证据
