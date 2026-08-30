---
artifact: solution-options-and-decision
project: One Square Kilometre
created: 2026-08-29
status: passed-assumption-bound-documentation
documentation_gate: pass
gate: G4
product_evidence_gate: not-run
business_approval: blocked
selected_value_mechanism_for_validation: m2-self-guided-evidence-protocol
selected_validation_carrier: c1-controlled-no-code-kit
product_solution_selected: none
custom_build: not-justified
ai_scope: excluded
---

# G4｜Solution Options & Conditional Decision

## 0. 决策摘要

**当前只冻结一组验证假设：价值机制 M2（self-guided evidence protocol）+ 研究载体 C1（controlled no-code kit）。** M2 是为了检验原始核心机制，C1 是为了执行 G2；二者都不是产品批准。G2 同时用普通地图/自由探索作现实对照，若 M2 不胜出，默认转向 M0（现有工具/不新建）。

**默认不自研。** M1（peer/human-led activity）与 M3（direct stayability guide）是实质不同的价值机制，不是 M2 的“功能版本”；它们只在原始研究指向相应 job 时另立假设。若 M2 的 product evidence 通过，载体才进入 C1 no-code / C2 hosted / C3 purpose-built 的 build-null。AI 当前不是任何机制或载体的组成部分。

## 1. One-page Solution Brief

### Problem Recap

新到 NUS、已经能到达 UTown 建筑的国际学生是否仍需要一种方法，为具体停留情境形成自己的地点—条件—用途判断，尚未验证。NUS 官方 onboarding/trail、普通地图、朋友和自然熟悉都是强替代；软件能力不是当前瓶颈。

### Proposed Validation Mechanism and Carrier (not product selection)

交付一个版本化、具有效期、人工走查的 UTown 非住宅核心 field kit：参与者先看时长/条件/数据边界，按探索建议到 4–6 个 anchor，回答第一人称、地点特异问题，可跳过或停止，留下最小个人证据，最后用确定性表单形成可纠正的个人判断。它不导航、不判断安全、不宣称街区事实、不生成 AI 总结。

### Essential Capabilities

1. **Versioned area/prompt pack：** 明确来源、`field_verified_at`、适用条件、known failures、许可、review due/expiry。
2. **Low-friction field protocol：** 封存 treatment dose、4–6 anchors、地点特异 prompts、skip/stop、无需持续 GPS。
3. **Text-only evidence capture：** 首轮只收参与者文字；无照片、语音、GPS 或媒体权限，任何 modality 变化是新 dose/estimand。
4. **Deterministic evidence review：** 区分用户观察、verified metadata 与人工/系统推断；逐条回链、可纠正。
5. **Rights and failure controls：** 离线/弱网、过期、导出/删除、incident freeze 与人工 owner。

### Success Metrics

不另造方案 vanity metrics。采用 [G2](./02_VALIDATION_PLAN.md) 的 V1→V2d 链：component signal、package-vs-usual-practice confirmatory effect、两个独立 cohort 的 `JVAP-7/48`，以及 burden/rights/safety/research integrity AND gates。

### Trade-offs

| 不做 | 原因 |
|---|---|
| 交互地图优先 | 还没有静态/list 无法完成的行为证据；地图复杂度不是价值 |
| 持续 GPS/动态路线 | 隐私、误差、离线和导航责任增加；路线只作探索建议 |
| AI 回顾 | 基础 protocol 尚未验证；确定性回顾是强零假设 |
| 全球/多区域/UGC | 人工策展、过期、许可和低复用尚未过门 |
| 精修 demo | 会提高完成感但污染需求与载体判断 |

## 2. 价值机制方案（先决定为何有价值）

### M0｜Official/usual tools / no new solution

不创建新体验；使用 NUS ISO trail/FOP/buddy、地图、朋友与自然熟悉。它几乎没有新增项目责任，且官方/同伴可能同时提供地点与社交价值。若 residual job 或 M2 package/JVAP 不成立，M0 是正确裁决。

### M1｜Peer-led / human-facilitated observation walk

由受训学生/curator 小组带走，现场以对话、同伴经验和即时调整帮助参与者理解停留空间。

- **价值假设：** 人际信任、讨论与情境回答比独自 prompts 更有价值。
- **优势：** 能适应语言、兴趣、疲劳和部分 access needs；与 onboarding 场景自然。
- **代价/反例：** facilitator 与社交效应混入内容；招募/培训/排班/一致性成本高；不自动解决 accessibility、许可或隐私；可能只是现有 buddy/trail 的重复。
- **进入条件：** 原始访谈/对照显示结果主要来自同行讨论或用户明确选择 human-led；需另立假设和 activity contract，不能用 M2 结果证明。

### M2｜Self-guided evidence protocol（当前验证假设）

参与者按地点特异 prompts 自主观察，留下最小个人证据，用确定性回顾形成可纠正的地点—条件—用途判断。

- **价值假设：** 结构化注意 + 自有证据能在没有主持的情况下胜过 ordinary map/free exploration。
- **优势：** 可以低代码、同一 protocol family/comparison contract、可丢弃地验证；每个 arm 仍有 condition-specific dose。
- **代价/反例：** 可能像作业、只教会回答测试、伤害自由探索；策展/过期/许可仍高；低 uptake 时不应产品化。
- **当前裁决：** 只为回答 G2 选择，不代表最佳市场方案。

### M3｜Direct stayability guide / curated answers

直接给出“何时适合独处/等待/短时学习/会合”的人工核验指南或 checklist，而非让用户自己观察。

- **价值假设：** 真实 job 是快速获得实用答案，不是训练观察或形成个人证据。
- **优势：** 认知负担低、结果直接；可能更符合赶时间的用户。
- **代价/反例：** 容易退化为 POI/设施数据库；开放、噪声、座位、access 与时段高度易过期；需要更高权威性并可能与官方/地图重叠。
- **进入条件：** V1 原始事件反复指向快速实用答案且 M2 机制失败；必须注册新 R1，不得事后用 M3 解释 M2 成功。

### 价值机制比较

| 决策问题 | M0 Existing | M1 Human-led | M2 Self-guided | M3 Direct guide |
|---|---|---|---|---|
| 可检验原始“自助观察”机制 | 否 | 被人际效应混杂 | **是** | 否，机制已改变 |
| 同时提供社交价值 | 可能 | 强假设 | 弱/非目标 | 弱 |
| 用户认知负担 | 最低 | 中 | 高风险 | 低 |
| Access adaptability（未验证） | 取决于现有供给 | 人工可调整但一致性风险高 | 需多模态/route 分层 | 信息必须逐维核验，过期风险高 |
| Facilitator/curation burden | 现有体系承担 | 最高 | 中高 | 高且时效敏感 |
| 过期/许可责任消失 | 否 | 否 | 否 | 否，可能更高 |
| 当前证据支持选择 | M0 是 No-go 默认 | 无 | 只支持作为验证对象 | 无；仅 pivot candidate |

所有机制都必须使用 BRD 的逐维 accessibility contract；“有人带”或“有数字界面”均不等于可达。任何 `unsupported/unknown` 必须在纳入范围与文案中显式限制，不能被方案评分抵消。

## 3. Carrier 方案（只在价值机制过门后）

### C1｜Controlled no-code kit（当前研究载体）

纸卡/PDF/消息与受控表单的组合。不能把这些混成天然 local/offline/private：执行前必须逐组件登记 storage、network、delete/export、version、license 与 accessibility；只有纸质核心可离线不代表在线表单离线。

### C2｜Configured hosted platform（Actionbound 或等价）

现成平台可配置地点任务、媒体、预载与结果。根据 [Actionbound 产品页](https://en.actionbound.com/)、[FAQ](https://en.actionbound.com/faq)、[Preload](https://en.actionbound.com/help/article/preloading-bounds) 与 [Results](https://en.actionbound.com/help/article/results)（访问日 2026-08-29），玩家通过 app 参与，creator 侧使用平台建立/管理内容并受适用许可与数据流程约束；具体注册、价格、存储和删除边界运行前逐项重查。比较时必须**关闭** points/rewards/countdown/leaderboard/social/媒体采集等额外刺激，不得“等量化”；复用同 content release/protocol family/comparison set，但 carrier 改变生成新的 condition-specific dose。

### C3｜Purpose-built digital carrier（技术未选，当前未授权）

只描述能力缺口，不预选 PWA/native/interactive map：版本/过期、非持续 GPS 完成、local-first 候选、恢复、导出/删除与 source contract。数字 accessibility 与物理路线/accessibility 分开评审；技术控制不会让路线自动可达。

### Carrier evidence matrix

`Known` 仅来自已演练/官方资料；`Assumed` 是设计意图；`Unknown` 必须实测。没有 ✓ 代表已实现。

| 条件 | C1 No-code | C2 Hosted | C3 Purpose-built |
|---|---|---|---|
| 可丢弃/低沉没成本 | Known | Assumed | Unknown/高风险 |
| 离线核心完成 | 纸质 Known；数字组件 Unknown | 官方支持预载，具体同步 Unknown | Unknown，需 spike |
| 最小数据/删除/导出 | Unknown，需逐组件演练 | Unknown，受平台条款/流程约束 | Unknown，需实现/演练 |
| 同 comparison contract / condition-specific dose / 无额外刺激 | 可人工控制 | 需配置并审计 | 可设计，未实现 |
| Visual / screen-reader / contrast | 纸/PDF/表单分别 Unknown | Unknown；需平台审计 | Unknown；需实现/审计 |
| Hearing / modality equivalence | 纸/表单 Unknown | Unknown | Unknown |
| Cognitive / language / interruption recovery | Unknown | Unknown；平台刺激须关闭 | Unknown |
| Mobility / physical route | 所有 carrier 都不解决 | 不解决 | 不解决 |
| Fatigue / device/attention burden | Unknown，需计时 | Unknown，安装/屏幕负担风险 | Unknown，技术不能假定更低 |
| Version/expiry | Assumed，需人工演练 | Unknown/平台配置 | Assumed，需 spike |
| Curator/support cost | Unknown，必须计时 | Unknown，不能转嫁给用户 | Unknown + software maintenance |

### Carrier 选择与 timebox

1. **G2 研究使用 C1**，但只有 data/delete/version/offline 演练过的具体组件可以进入 session。
2. **C2 build-null** 只在 M2 evidence 与 business/activity contract 通过后运行；固定 5 个工作日配置/审计 timebox、同 comparison contract、新 carrier-specific dose、关闭额外刺激。至少 7/8 能完成安装/预载/离线恢复，8/8 的测试数据能按合同导出/删除，median support+setup 不比 C1 多 5 分钟；BRD accessibility 每一纳入维度均不得出现 C1 没有的 access blocker，且 completion/burden 不退化；没有未解决第三方权利/数据问题。任一失败则不用 C2。阈值是 carrier investment bar，不是用户事实。
3. **C3 默认不进入。** 只有 G3 已分类为 `Reusable content system`（第二 curator + 第二经核验 area/theme 复用成功）、C1/C2 同一软件可解 blocker 重复出现、C2 失败不是内容/需求/条款不可接受、sponsor/cost contract 通过，才允许一个问题一个 timeboxed spike。One-time curated activity 永远不能因载体不便进入 C3。

### 跨 carrier hard gate

任何 C1/C2/C3 都必须记录 initial curation、review/expiry、per-completion support、correction、license 与 incident 工时；超过 [BRD sponsor contract](./03_BRD.md#32-业务-sponsorvaluecapacity-contract批准前硬门) 的任一 ceiling、错过 review due、或无替补 owner，即退役/不扩区。平台或 custom software 不会降低这条门。

### 当前双层裁决

1. **价值机制：M2 只作为验证对象；M0 是 No-go 默认；M1/M3 需新证据/新假设。**
2. **研究载体：C1；产品 carrier 尚未选择。**
3. **C2：evidence positive 后的条件性 build-null。**
4. **C3：not justified；不预选技术。**

## 4. M2 Validation Journey（研究配置，不是共同产品要求）

| Stage | 用户目标 | 体验/信息 | 失败与恢复 | Evidence/owner |
|---|---|---|---|---|
| 1. Decide | 判断现在是否值得走 | persona/theme、35min dose、area、valid conditions、expiry、数据边界、不是导航 | 不适用/过期/天气不允许 → 不开始 | Manifest + human field owner |
| 2. Prepare | 知道起点、退出和替代 | 静态 overview、anchor list、audited route candidate、正式避难/退出说明 | 无网 → 已下载 pack；access need 不支持 → 不承诺/不开始 | Curator/access reviewer |
| 3. Explore | 到现场并形成自己的注意 | 地点特异 prompt；可跳过；非 GPS 确认可用 | 找不到/不舒服/关闭 → 跳过、改道或停止，不算参与者失败 | Participant + manifest |
| 4. Capture | 留最小证据 | 首轮仅参与者文字；明确 anchor assertion 与相对顺序 | 第三方信息 → 不收；错绑 → 以 participant-confirmed revision 改绑 | Participant owns statement |
| 5. Review | 看清自己记录了什么 | 按 anchor/时间列原文和选择；verified metadata 分层 | 无依据 pattern → 不生成；错误 → 纠正/删除 | Deterministic system + participant |
| 6. Retain/exit | 决定保留、导出、删除 | 本地/研究受控状态、导出格式、expiry | 删除/撤回覆盖派生物；无法验证 → 不运行 | Data steward |
| 7. Reuse | 决定是否再走/换主题 | 只有真实可用 pack；不推高频 | 无自愿行为 → 接受一次性分类 | Business/activity owner |

M1/M3 不继承这条 journey。若后续 evidence 指向其它机制，必须重新设计和验证。

### Mechanism-neutral capability journey（只作 G4/G7 边界）

```text
用户知道一个体验/指南是否适合当前 job
→ 看清条件、来源日期、时间/负担、权利与退出
→ 获取或形成一个地点—条件—用途判断
→ 能区分个人观察、人工核验信息与未知
→ 能纠正、导出、删除或结束
→ 过期内容停止新使用；不把单次结果外推
```

该边界不规定 35 分钟、static map、anchor、媒体、deterministic recap 或研究存储。

## 5. M2 Validation Information Contract

以下 IA 只服务 M2/G2 validation；不是 M1/M3 或未来产品的共同导航。C1 可用页/卡表达，C2/C3 才可能映射为 screens。

```text
Area Pack
├── Overview
│   ├── Who / job / theme
│   ├── Duration / valid conditions / expiry
│   ├── Not navigation / stop rules / data rights
│   └── Source & license summary
├── Explore
│   ├── Static overview / anchor list
│   ├── Route suggestion + audited variant status
│   └── Anchor 1…N
│       ├── How to identify without GPS
│       ├── Location-specific prompt
│       ├── Skip / stop / report issue
│       └── Note: text only (current dose)
├── My Evidence
│   ├── Chronology / anchors
│   ├── User observation
│   ├── Verified metadata
│   └── Correction / rebind / delete
├── Review
│   ├── Deterministic recap
│   ├── Claim → source links
│   └── Unknown / abstention
└── Data & Help
    ├── Local/third-party status
    ├── Export / delete / withdraw
    ├── Incident / access issue
    └── Version / changelog / owner
```

## 6. 关键交互规则

| Interaction | Required behavior | Forbidden behavior |
|---|---|---|
| Start | 显示 version/expiry、当前适用条件、时长、退出、data scope | 用“安全路线”或“已验证无障碍”作未获证承诺 |
| Anchor confirm | 必须有非 GPS 确认；允许不确定/跳过/改绑 | GPS/geofence 自动成为事实真源 |
| Route | 清楚写“探索建议”；支持停止/返回/求助 | turn-by-turn 导航、动态安全路线 |
| Capture | 首轮只用文字；不收第三方个人信息 | camera/mic/location 或媒体成为当前路径 |
| Offline | 先显示本地保存与版本；恢复时不覆盖旧记录 | `tile.openstreetmap.org` Standard raster tiles 批量离线预取、静默丢数据；其它来源也须按条款 |
| Review | 原文优先，metadata/source/inference 分层，逐条纠正 | 流畅总结覆盖原始证据或补街区事实 |
| Expiry | 过期 pack 不能开始新 session；已有记录仍可导出 | 离线旧版继续宣称当前有效 |
| Delete/export | 可见状态、范围、完成审计；派生物同步处置 | 只删 UI、不删缩略图/转写/供应商副本 |

## 7. AI / Deterministic / Human 责任边界

| 责任 | Participant | Deterministic system | Human curator/owner | AI（当前） |
|---|---|---|---|---|
| 个人观察与选择 | 产生、纠正、拥有 | 保存/显示/回链 | 不替用户改写事实 | **不使用** |
| 地点/开放/access metadata | 可报告异常 | 显示 source、verified_at、expiry | 选择来源、现场核验、到期/退役 | 禁止补写 |
| Route / safety | 自主停止 | 显示建议/退出/警示，不判断 | 人类 field owner 当日决定运行/停止 | 禁止判断 |
| Prompt | 回答/跳过 | 按版本显示 | 人工策展、地点特异审查 | 当前不生成 |
| Review | 确认/纠正/删除 | 确定性排序、模板、引用、unknown | 审查协议/incident，不替参与者总结 | 当前不总结 |
| Third-party/bystander data | 不记录/删除 | 文本字段与 incident 状态 | 规则、incident 处置 | 不做人脸/身份/群体推断 |
| Data rights | 请求导出/删除/撤回 | 执行状态机/审计 | Data steward 验证 | 不接收数据 |

AI 仅保留为 parked open question；本 gate 不设计 AI schema、retention 或 UI。若未来 product evidence、build-null 与独立 AI preregistration 都通过，再新开方案版本；当前任何文档或 spike 不得接收用户数据做 AI 处理。

## 8. Static vs Interactive Map 决策

**默认：static overview + anchor list。** 交互地图不是最低能力。

Static representation 的失败率、分母和 attribution 在 V2 pilot 后预注册；当前不把 `3/16` 等 E0 数字当 build threshold。以下只能触发调查，不能独立触发 G5：

- 多名独立参与者在不同运行条件下，因**表示方式本身**而到错点/需要导航 rescue；关闭、signage、天气、路线设计、researcher instruction 与 access mismatch 必须另归因；
- 物理层级/室内外转换无法被任何更好的静态/文字/照片说明表达，并造成非安全性的完成失败；
- 弱网/离线下 list/static 无法恢复到正确 anchor，而某个具体交互能力有可离线验证的解决路径。

任何 safety/near miss/accessibility failure 立即冻结 manifest，绝不能作为“所以需要交互地图”的容忍样本。即使表示失败重复，也必须先通过 G2 product evidence、BRD sponsor/cost contract 和 C1/C2 build-null，再比较更好的静态图、照片/文字说明和列表顺序；只有其 confirmatory failure 才可 timeboxed spike。交互地图不得引入动态路线、实时 POI、AI 安全判断，亦不得批量离线预取 `tile.openstreetmap.org` Standard raster tiles；其它 OSM-derived 数据/服务按各自许可和政策审查。

## 9. Build-vs-buy / Spike Entry Contract

| 问题 | C1 No-code | C2 Hosted | C3 Purpose-built spike entry |
|---|---|---|---|
| Value proven? | 必须先用 M2+C1 回答 | M2 evidence 后才评估 | V2c/V2d + business contract 均通过 |
| Repeated blocker? | 记录支持/错点/恢复 | 同 comparison contract、新 dose、关闭刺激验证能否消除 | C1/C2 都有同一软件可解阻塞 |
| Rights/data | 研究受控 | 供应商逐项审计 | threat/data-flow/deletion 可证明 |
| Offline | 纸/PDF baseline | preload/sync 实测 | browser/device matrix spike |
| Cost | curator/support minutes | license + support + governance | build + maintenance + curation + incident |
| Decision | 足够则停止 | 足够则 buy/configure | 只有净价值为正且 owner/budget 签署才 spike |

### C3 Spike Authorization Record（全部填写才可进入 G5）

| 字段 | 必填内容 / 默认 No-go |
|---|---|
| Delivery classification | 必须是 `Reusable content system`；附第二 curator + 第二 area/theme replication 证据。One-time activity = No-go |
| Blocker ID / definition | 单一、软件可解、不是需求/内容/许可/路线问题 |
| Frequency / denominator | 在固定版本、confirmatory 样本中的次数和全部分母；不能只列成功案例 |
| C1 remediation tried | 静态/内容/流程修订及结果 |
| C2 audit tried | 同 comparison contract、新 carrier dose、关闭刺激、权利/access/burden 结果及失败根因 |
| Spike question | 只能一个 yes/no 技术问题；禁止“搭 MVP 看看” |
| Max time/cost | 由 budget owner 写死；默认 0/不运行 |
| Owner / reviewer | 实施者与独立 reviewer 具名 |
| Pass | 可复现地解决 blocker，且不新增 rights/access/offline/delete failure |
| No-go | blocker 未解决、只换外观、成本越界或引入新 hard risk |
| Inconclusive | 不得扩 scope；最多一次经批准的修复性重跑 |
| Disposal rule | 默认丢弃；只有 G5/G6 另行批准才可成为候选基础 |

最小 spike 必须回答一个问题并可丢弃，例如“浏览器本地保存合成文本、重载恢复、导出/删除能否在目标设备可靠完成”或“静态表达失败是否真由某种交互能力解决”。不得先搭完整 app shell。

## 10. Carrier 风险与处置

| Risk | M0 Existing | C1 No-code | C2 Hosted | C3 Purpose-built |
|---|---|---|---|---|
| R1 demand | 接受现有解法 | 最便宜证伪 | 不应先用 | 不能解决 |
| 人工策展/过期 | 官方自担 | 显性计时 | 仍存在 + 平台配置 | 仍存在 + 软件维护 |
| 低复用 | 不扩展 | 诚实分类活动 | 平台不能创造复用 | 最高沉没成本 |
| 位置/媒体隐私 | 无新增 | 最小/受控 | 第三方风险 | 实现风险 |
| 不可达路线 | 官方/自然选择 | 走查/冻结 | 仍需走查 | 仍需走查；地图不解决 |
| AI 非必要/错误推断 | 无 | 无 | 关闭 AI 功能 | 不实现 AI |

## 11. Gate 与下一步

### G4 documentation pass 条件

- 至少 3 个方案 + null 已比较，承认强替代和人工成本。
- 选择 M2+C1 只用于验证；M1/M3 需新假设；C3 明确未获授权。
- 用户旅程、IA、关键交互、职责边界和 static/interactive trigger 完整。
- 方案选择不改变 G2 persona/area/theme 或已封存 content contract；carrier 变化必须生成新 condition-specific dose，且 C1 的 value evidence 不自动转移到 C2/C3。Carrier audit 只回答治理/负担；真实使用新 carrier 前另行验证。不把 AI 偷渡回 scope。
- 产品/研究/对抗评审无未处置 P0/P1。

### 下一步

若 G4 文档门通过，可进入 G5 技术可行性，但技术 council 只能评估 M2/C1 的数据/版本合同、C2 的条件性 build-null 与 C3 的**条件性** spike candidates；不得把技术可行性当 build approval。

## 12. 相关文档与来源

- [G1 Insight](./01_INSIGHTS.md)
- [G2 Validation Plan](./02_VALIDATION_PLAN.md)
- [G3 BRD](./03_BRD.md)
- [Actionbound official product](https://en.actionbound.com/) · [preload](https://en.actionbound.com/help/article/preloading-bounds) · [results](https://en.actionbound.com/help/article/results)
- [NUS Campus Map](https://map.nus.edu.sg/) · [Campus Tours](https://uci.nus.edu.sg/campus-tour/)
- [OpenStreetMap Copyright / ODbL attribution](https://www.openstreetmap.org/copyright) · [`tile.openstreetmap.org` Standard raster Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/)

## 13. 修订记录

| 版本 | 日期 | 状态 | 变化 |
|---|---|---|---|
| 0.1 | 2026-08-29 | council-review | 方案 0/A/B/C、条件性选择、user journey、IA、interaction、responsibility、map trigger 与 spike contract |
| 0.2 | 2026-08-29 | council-rereview | 将价值机制 M0/M1/M2/M3 与 carrier C1/C2/C3 分层；加入 human-led/direct-guide、公平 carrier evidence、accessibility/cost hard gates、M2-only journey/IA、map gate 修订 |
| 0.3 | 2026-08-29 | final-rereview | 关闭 C2 刺激/burden/access 口径、Actionbound/OSM 一手边界、逐维 carrier accessibility 与 C3 reusable-system spike authorization |
