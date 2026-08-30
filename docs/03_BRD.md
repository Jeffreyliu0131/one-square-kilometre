---
artifact: business-requirements-document
project: One Square Kilometre
created: 2026-08-29
status: passed-validation-ready-draft-assumption-bound
gate: G3
product_evidence_gate: not-run
documentation_gate: pass
business_approval: blocked-no-sponsor-or-evidence
ai_scope: excluded
---

# G3｜Business Requirements Document

## 0. 文档裁决

本 BRD 是供提前审查的 **assumption-bound draft**，不是投资批准。它把业务问题、价值、范围、流程、责任和成功门写清，但用户需求、区域可行性、protocol 增量、revealed demand、产品形态和商业模式均未验证。

**当前 verdict：Validate first。** 只有 [G2 validation plan](./02_VALIDATION_PLAN.md) 的 product evidence gate 实际通过后，才能重新评估 Build small。文档完整度不能替代用户证据。

## 1. Problem Statement

### 1.1 问题摘要（待验证）

> 当前学期新到 NUS、正在建立 UTown 日常使用模式的国际学生，可能已经能借助地图或校方工具到达建筑，却仍无法在独处、等人、短时学习或会合等具体情境中，根据自己的经验选择合适的停留空间。现有 orientation、地图、朋友和自然熟悉是否已经充分解决，以及这个缺口是否值得额外 30–45 分钟，仍是唯一 R1 的核心。

这不是“缺少校园导览”的问题：NUS 官方 2026 [International Students Orientation](https://osa.nus.edu.sg/experience-communities/international-student-experience/orientation/) 已含 Trail Experience、Buddy/Peer 等入口，另有 [Campus Map](https://map.nus.edu.sg/) 与 [Campus Tours](https://uci.nus.edu.sg/campus-tour/)（E2）。也不是导航、安全或权威设施查询问题；这些需求超出当前候选 job。

### 1.2 谁受影响

- **研究样本框：** 当前学期首次进入 NUS 学习、正在建立校园日常使用模式、已能到达 UTown 指定建筑的国际学生。
- **不是已证明的因果 persona：** “国际学生”是首轮聚焦；区域新近性、真实停留情境、orientation 暴露和熟悉度才是待检验变量。
- **明确不代表：** 游客、长期熟悉 UTown 的人、全部 NUS 学生、其它街区用户，或只需要导航/安全/营业信息的人。

### 1.3 用户影响与规模

| 项目 | 当前状态 |
|---|---|
| 近期事件频率 | unknown；G2 V1 固定 N=16 后才能形成探索性信号 |
| 受影响人数/比例 | unknown；没有可用市场或校内 population baseline |
| 行为后果 | 假设为放弃/改选、再次移动、改变安排或反复使用不合适固定点；尚无 E3 |
| 情绪/归属影响 | unknown；没有原始引语，不进入业务主张 |
| 愿意付出的时间 | unknown；G2 V2d 用同剂量直接邀请与 JVAP 检验 |

### 1.4 为什么现在

- 现在不是因为市场突然扩大，而是因为概念已足够明确，能用低/无代码协议便宜证伪；继续先做软件会增加错误投资。
- 2026 NUS 官方 onboarding/trail 与 [Actionbound 官方产品能力](https://en.actionbound.com/)提高了差异化门槛，也让强对照与 build-null 更清楚。
- 这是时效敏感的研究窗口假设；实际招募与校园访问时间必须由人类 owner 核实，不能从网页日期自动推断可执行。

## 2. 锁定的 persona + area + theme

锁定只适用于验证配置；任何改动生成新版本。

### Persona / 样本框

> 当前学期新到 NUS、正在建立校园日常使用模式、已经能用惯常地图或校方工具到达 UTown 指定建筑的国际学生；不要求先承认痛点，保留有/无近期问题与已有充分替代的负样本。

### Area

> 以 [2024 NUS UCI UTown 官方地图](https://map.nus.edu.sg/download/University-Town-Map.pdf)的语义边界为桌面起点，仅考虑 College Link/CREATE—Town Plaza/Town Green—ERC—SRC 一带的非住宅公共核心。最终环线、anchor、时长、`dose_id` 和 audited-access candidate 只由具名、带 `field_verified_at` 的现场走查决定；不承诺严格 1 km²。

### Theme

> **“在这片区域里，我会在哪里停下来？当时哪些可以直接感知、无需猜测他人的空间条件影响我的选择？”**

“人们在哪里停留而不是经过”只作内部策展启发；不要求拍摄、计数或解释陌生人，不推断安全、人群、动机或街区规律。

## 3. 决策学习目标、候选用户价值与业务缺口

### 3.1 当前决策学习目标（不是已批准的业务目标）

| ID | 目标 | 证据状态 | 失败后的业务动作 |
|---|---|---|---|
| BG-01 | 用最小成本判断是否存在 residual job 与 revealed demand | 未验证 | No-go 即停止当前组合或 pivot，不开发 |
| BG-02 | 判断无 AI protocol package 是否优于普通地图/自由探索 | 未验证 | 相当或更差即否定核心机制 |
| BG-03 | 判断价值能否由现成低代码/内容载体交付 | 未验证 | 现成方案足够则不自研 |
| BG-04 | 若基础价值成立，判断可复用规范/area pack 是否比一次性策展更有价值 | 未验证 | 只有单一区域/高人工成立则定位为活动或停止扩展 |
| BG-05 | 保护参与者、旁观者、校园与素材权利，使任何学习可被审计 | 项目约束 | 权利/安全失败冻结版本并停止 |

这些目标决定“应否继续研究”，不证明有业务 owner、预算或组织价值。当前真正的业务目标、受益方与价值类型均为 **unknown**。

### 3.2 业务 sponsor/value/capacity contract（批准前硬门）

在任何 `business approval` 或 custom build 前，必须由具名 sponsor 签署以下合同；任一保持 unknown 即 **No-go for product classification**，项目最多停在研究材料或一次性活动：

| 字段 | 当前 | 必须由 sponsor 决定 |
|---|---|---|
| 受益方与业务 owner | unknown | 谁拥有 outcome、谁能停止/续投 |
| 价值类型 | unknown | onboarding outcome、一次性活动、研究工具、开源公共品或其它；只能选并说明证据 |
| Budget owner | unknown | 谁承担研究、策展、许可、维护、支持和 incident 成本 |
| Initial curation ceiling | unknown | 每 area 可接受 person-hours；未填即不扩区 |
| Recurring review/expiry ceiling | unknown | 每 area 每周期可承诺 person-hours 与 review SLA |
| Support/correction ceiling | unknown | 每个有效 completion 可接受人工分钟与严重事件上限 |
| Lifecycle commitment | unknown | 运行季节/学期、退役、删除、handoff 与替补 owner |
| Success recipient | unknown | 谁实际使用结果做何种决定；没有 recipient 不建 dashboard/平台 |

### 3.3 候选用户价值

> 用户能基于自己的现场证据，形成一个此前没有或经过实质修订的地点—条件—用途判断，并在 48 小时后无提示地表达如何用于其预先声明的停留情境；系统不替其宣布街区真相。

该指标测“自愿采用 + 持久的决定表达”，不等于参与者之后真的使用了该地点；实际地点 follow-through 必须单独报告。只有同一人自愿选择同一剂量 protocol、完成并在 48 小时保持新增认识时才有窄 demand 信号。被分配任务、漂亮照片、准确识别、流畅总结或称赞不算。

### 3.4 商业模式与经济价值

- Buyer、付费意愿、收入、CAC、retention、market size：**unknown**。
- 首版不以订阅、交易、广告或数据变现为目标。
- 可能的非收入价值（开源复用、orientation 内容、研究工具）均是假设；不能提前当作业务回报。
- 一次性 onboarding 可以是诚实结果；不得因为产品叙事而虚构高频留存。

## 4. 成功指标与业务门

### 4.1 唯一 demand primary

| 指标 | Baseline | Validation target | 解释边界 |
|---|---|---|---|
| `JVAP-7/48` | unknown | 两个独立 cohort 各 `RAP ≥8/24 AND JVAP ≥6/24`，合计 `RAP ≥16/48 AND JVAP ≥12/48`；同 dose、无 walk-linked 报酬 | 项目投资阈值，不是市场转化率或付费意愿 |

### 4.2 必须 AND 通过

- V1：固定 N=16，`qualifying_event ≥8/16 AND unresolved ≥6/16`。
- V2a：prompt component 相对 active control 出现 exploratory signal。
- V2b：完整 package 相对 ordinary map/free exploration 出现 pragmatic signal。
- V2c：独立、重算 N 的 confirmatory package effect 达预注册 MDE。
- V2d：两个独立 direct-invitation cohort 的同人 JVAP 信号。
- Rights/safety/research integrity：无未授权数据；任何 serious incident/near miss 冻结 manifest；没有版本混算、coaching 或总结泄漏。
- Burden：confirmatory margin 和每人 bad cases 全部在限内；不能用中位数掩盖严重失败。

### 4.3 业务成功与产品成功的区别

- G2 documentation PASS 只说明测试计划可审查。
- Product evidence gate 通过也只支持对单一区域/人群/条件进行 Build small 再评估，不支持规模化或商业模式成立。
- 自研、AI、扩区和开源生态分别需要独立门；任一不能由 protocol 信号自动推导。

### 4.4 Delivery classification gate（一次性活动不得自动升级）

在 G2 evidence 后必须选择且只能选择一种分类：

| 分类 | 必要证据 | 允许动作 |
|---|---|---|
| Stop / pivot | residual job、package effect、JVAP 或权利/负担失败 | 停止当前组合或注册新假设 |
| One-time curated activity | 单次 onboarding 价值成立；PDF/纸卡/现成工具足够；没有重复/扩区证据；activity owner、预算、场地/招募/摄影、数据/安全与 expiry/retirement contract 均签署 | 只交付一次性内容/活动，不称产品或平台；任一授权缺失则只归档研究材料，不对外运行 |
| Reusable content system | 同一规范由第二名独立 curator 在第二个经核验 area/theme 重建，且 sponsor 的成本/复核 contract 通过 | 可维护版本化规范；仍不自动支持 custom software |
| Custom product candidate | 上述全部成立，现成载体出现重复、阻塞核心价值且软件可解决的失败，业务 owner/budget/lifecycle 已签署 | 只允许 G5 最小技术 spike；不等于完整开发 |

任何单区成功、一次重走或开源意向都不能跨级。

## 5. 范围

### 5.1 Validation program scope（研究装置，不是产品范围）

- 单一 persona 样本框、单一 UTown 非住宅核心、单一第一人称停留主题。
- 一个版本化、人工走查的 area manifest 与 4–6 个地点特异 prompts。
- 同地图/同路线 active control、ordinary map/free exploration pragmatic control。
- G2 所需的共同记录表、active/pragmatic controls、盲化编码、直接邀请与人工成本记录。
- 具体载体、check-in 方式、媒体输入与研究存储只服务验证，不构成产品范围决策。

### 5.2 Candidate business capability boundary（不指定实现）

若且仅若 delivery classification 允许继续，候选交付必须具备：版本化且可过期的 area/prompt pack；参与者可自主开始/跳过/退出；现场留下最小、可回链的个人证据；无网络/定位/媒体权限时仍可完成核心 job；结果可纠正、导出和删除；所有地点元数据、人工推断和用户观察可区分。

本 BRD 不决定静态/交互地图、手动/GPS check-in、PDF/PWA/Actionbound 或确定性/AI 回顾。这些属于 G4 方案选择。

### 5.3 Explicitly out of scope

- 全球覆盖、多区域 rollout、动态路线、实时 POI、UGC feed、推荐/评分市场。
- 导航、安全判断、无障碍保证、开放状态保证或权威街区分析。
- 精确轨迹留存、背景定位、地图 tile 批量离线预取。
- 3D、AR、gamification、social feed、leaderboard。
- AI prompt 生成、AI 安全/地点事实、AI 回顾或端侧大模型。
- 收入/订阅设计、增长漏斗、付费投放、商业 partnership。

### 5.4 Deferred，且必须重新过门

- Custom PWA / 交互地图：只有 G4 build-null 后最小 spike justified 才讨论。
- AI 回顾：只有基础 protocol + build-null 后另行预注册。
- 第二区域/第二 persona/theme：需独立 field verification 和 replication，不能复制首区结论。
- 公开/开源 area pack：需许可、去标识、维护 owner 与复用证据。

## 6. 利益相关者与责任

以下是需要的角色，不代表任何 NUS 单位已经承诺。

| Stakeholder / role | Interest / authority | 当前状态 | 必须决策 |
|---|---|---|---|
| 目标参与者 | 时间、体验、数据与退出权 | 未招募 | 是否存在 job、是否选择/完成、价值/负担 |
| Product owner | 范围、gate、停止/继续 | 本项目角色 | 不让文档完整度替代证据 |
| Business sponsor / outcome owner | 业务价值、分类、停止/续投 | 未识别 | 签署 value/capacity/lifecycle contract；没有则不产品化 |
| Budget owner | 研究、策展、许可、维护、支持与 incident 成本 | 未识别 | 可接受成本 ceiling 与资金来源 |
| Research owner | 招募、同意、脚本、参与者支持 | 未具名 | 伦理/年龄/补贴/执行责任 |
| Institutional ethics/privacy authority | 研究审查、年龄、同意与数据责任 | 未确认 | 书面 determination；不由产品团队自行解释 |
| Recruitment channel owners | 触达合格样本、邀请边界 | 未确认 | 渠道授权、roster 资格与分母 |
| Field safety owner | 当日天气/access/中止与 incident | 未具名 | 书面 contract 与 tabletop |
| Accessibility reviewers / users | 移动、视觉、听觉、认知、语言、疲劳与感官 access | 未具名 | route-audited、task-audited、user-tested 分开 |
| Data steward | 访问、加密、保留、导出、删除、incident | 未具名 | data-flow 与 deletion drill |
| Campus access/operations authority | 场地、开放、活动限制与现场运行 | 未确认 | 书面 access/operations permission |
| Filming/photography/privacy authority | 现场拍摄、旁观者与校园行为边界 | 未确认 | 适用规则/许可；与场地准入分开 |
| NUS/content rights holders | 地图、地点文字、照片和品牌的复制/链接/再分发权 | 未确认 | 逐素材书面 permission/terms；不能由 liaison 一并承诺 |
| Curator | Anchor/prompt/source/license/expiry | 未具名 | 工时、复核、版本与停止 |
| Blind coders / adjudicator | Outcome measurement | 未具名 | codebook、一致性与解盲纪律 |
| Future maintainer | area pack / tool sustainability | unknown | 只有复用需求成立后识别 |

### Accessibility evidence contract

| 维度 | 当前证据状态 | 候选 accommodation / 待验证 | 不得宣称 |
|---|---|---|---|
| Mobility / route | official support context E2；pilot route unknown | audited-access candidate、休息/退出、无持续 GPS | 未 user-tested 前不得写 wheelchair-accessible |
| Vision | unknown | 文字/语音替代、屏幕阅读/高对比、非视觉 anchor | 不得把“可见条件”当普遍前提 |
| Hearing | unknown | 所有语音内容有文字等价；警示不只依赖声音 | 未测试不得写支持 |
| Cognitive / attention | unknown | 短句、单步任务、跳过/恢复、低屏幕负担 | 未测试不得写低认知负担 |
| Language | unknown | 首轮支持语言与翻译责任须明示 | 国际学生不等于英语体验一致 |
| Fatigue / sensory / weather | climate E2；个人影响 unknown | 缩短/退出、遮蔽、时段与刺激说明 | 无 incident 不等于适合全部人 |

每一维分别标 `not assessed / audited / user-tested / unsupported`，不能用一条 route walkthrough 代替全部 accessibility。

## 7. 约束与业务规则

| ID | 业务要求 |
|---|---|
| BR-001 | 在 product evidence gate 通过前，投资裁决保持 Validate first；不得开始完整开发。 |
| BR-002 | 所有重要输出必须回链用户原始材料、人工核验或明确计算规则；agent/council 文本不作事实来源。 |
| BR-003 | 路线是探索建议，不是导航；一平方公里不得压过有意义边界、可走性、安全与无障碍。 |
| BR-004 | Area/route/prompt 采用不可覆盖版本；含 source check、`field_verified_at`、条件、到期、已知失败与许可状态。 |
| BR-005 | 任何 serious incident/near miss 冻结对应 manifest；“已处置”不能把暴露清零。 |
| BR-006 | 参与者可跳过/退出/拒绝 camera/location/microphone；核心任务仍可完成。 |
| BR-007 | 核心 job 必须在不依赖持续 GPS 的情况下可完成；任何方案都要提供非 GPS 的 anchor 确认路径。若使用 GPS，只作建议、显示精度且不保留持续轨迹；具体 check-in 方法由 G4 决定。 |
| BR-008 | 不采或保留未授权旁观者材料；照片与语音均做旁观者检查，照片清除 EXIF。 |
| BR-009 | 导出、纠正、撤回和删除必须覆盖原件及派生物，并有可审计演练。 |
| BR-010 | 地图/媒体/地点文字的访问、复制、链接/deep-link、品牌与开源再分发权分开记录；unknown 不进入参与者包、不分发，链接也须先确认来源条款允许。 |
| BR-011 | AI 仅能在独立验证后整理用户材料；不能补地点事实、判断安全/无障碍/他人动机。当前明确 out of scope。 |
| BR-012 | 统计/探索性比例必须保留基线、N、分母、不确定性和反例；不得把小样本写成总体需求证明。 |
| BR-013 | 人工策展、复核、支持、纠正和 incident 工时进入业务成本；只看软件成本不合格。 |
| BR-014 | 现成低代码/内容载体默认优先；失败不自动支持自研。 |
| BR-015 | Accessibility 不只等于 stairs-free：移动、视觉、听觉、认知、语言、疲劳与感官需求分别标 `audited/tested/unknown`；未测试不能写支持。 |
| BR-016 | “一次性活动”仍须具名 activity owner、预算、场地/招募/摄影、数据/安全、expiry/retirement 合同；缺失时只能归档研究材料，不能对外运行。 |

## 8. 主要业务流程

### 8.1 内容包生命周期

```text
定义 area/theme/dose
→ 查来源与许可
→ 两次现场走查 + access review + tabletop
→ 冻结 manifest/prompt/codebook/version
→ 运行/监控条件
→ 记录 incident、correction 与工时
→ 到期自动不可用于新 session
→ 人工复核、升级版本或退役
```

### 8.2 Validation participant flow（研究流程，不是产品体验）

```text
中性邀请/资格与 teach-back consent
→ pre-choice 与分配（如适用）
→ 查看探索建议、可随时退出
→ 按研究版本确认 anchor + 最小记录
→ 共同 immediate choice
→ 48h 无提示 follow-up
→ 7d 行为/直接邀请结果
→ 导出、纠正、删除或退出
```

### 8.3 候选业务体验边界（实现待 G4）

```text
用户自主选择一个有效 area/theme
→ 看清时长、适用条件、来源日期、退出与数据边界
→ 按探索建议到现场，可跳过/停止
→ 留下最小、可回链的个人证据
→ 查看/纠正自己的观察，不接收权威街区结论
→ 导出或删除；area 到期后不再开始新体验
```

### 8.4 异常/权利流程

```text
天气/access/near miss/不适/旁观者/数据请求
→ 人类 owner 立即停止或隔离
→ 冻结 manifest/session（如触发）
→ 处置参与者/旁观者与数据
→ 记录最小 incident audit
→ 独立判断可修复版本 vs 固有 No-go
```

## 9. 依赖

| Dependency | 当前状态 | 未满足影响 |
|---|---|---|
| 人类 research/field/data owners | 未具名 | Field execution blocked |
| 伦理/年龄/场地书面 determination | 未完成 | 不得招募 |
| NUS ISO Trail 原始包/缺口日志 | 未取得 | 不得声称优于官方 trail |
| UTown manifest、route/access review、tabletop | 未完成 | 不得开始 field session |
| 地图/媒体/地点文字许可 | unknown | 不进入参与者包、不分发；链接/deep-link 也须先确认条款 |
| 三个非同质招募渠道与 V2d roster | 未确认 | 不能解释 target-frame demand |
| Blind coder/codebook/random table | 未封存 | V2 不可运行 |
| 数据存储、导出/删除演练 | 未完成 | 不采数据 |
| Business sponsor/value/capacity contract | 未识别/未签署 | 不得把一次性活动升级为可复用产品或 custom build |
| 第二 curator + 第二 area/theme replication | 未开始 | 不得声称 reusable content system |

## 10. 主要风险与依赖处置

| 风险 | 业务影响 | 处置/No-go |
|---|---|---|
| 官方 onboarding/自然熟悉已足够 | residual job 不存在 | V1 No-go；停止当前 persona/JTBD |
| Protocol package 不胜地图/自由探索 | 核心机制无增量 | V2b/V2c No-go；不做载体/AI |
| 自愿采用与持久价值不在同一人 | assigned task 冒充 demand | V2d JVAP 两 cohort；失败不 build |
| 路线/地点过期或不可达 | 伤害、误导、低复用 | 版本/到期/冻结；现场/用户审阅 |
| 人工策展与复核过高 | 一次性活动无产品经济性 | 逐项工时；超过 G4 预设上限不自研/不扩区 |
| 旁观者与位置数据 | 权利/信任风险 | 最小化、本地/研究受控、删除/导出 |
| 许可不可再分发 | 参与者包/开源示范包不可发布 | 取得书面许可、使用条款允许的引用/链接，或更换为权利清楚的素材；unknown 时不用 |
| AI 产生无来源推断 | 错误权威感与 correction burden | 当前排除；独立门失败永久移除 MVP |

## 11. 非目标与机会成本

- 不把“做一个城市产品”当目标；若一次性活动/纸卡最合适，就接受。
- 不把开源仓库、技术新颖度或地图复杂度当用户价值。
- 不用单一区域成功外推全球或持续留存。
- 不用高补贴、主持和精修体验掩盖自然采用不足。
- 在验证未运行时投入软件，会牺牲 persona/area/theme pivot、招募和路线/权利工作的资源。

## 12. 开放问题

- 真实 residual job 是否达到 V1 投资门？
- 哪个变量最能解释 job：区域新近性、orientation 暴露、居住/课程动线还是其它？
- UTown 非住宅核心能否形成一个同时有意义、可走、audited-access 的固定 dose？
- Full package 是否相对 ordinary map/free exploration 有 confirmatory effect？
- 两个 direct-invitation cohort 是否产生同人 JVAP，而非 research-context novelty？
- 一次性 onboarding 的业务 owner 与维护预算是否存在？
- NUS 地图/媒体/地点文字能否用于公开或开源示范包？
- 现成载体是否已经足够；custom build 的唯一阻塞是什么？

## 13. Gate 与批准条件

### G3 documentation gate 可通过的条件

- BRD 每项无证据内容均标假设/unknown；没有商业数字虚构。
- 问题不预设地图/AI/软件；范围与非目标完整。
- 成功指标完全回链 G2，不另造 vanity metrics。
- 角色、权利、许可、运营成本和 stop conditions 明确。
- Product council/对抗评审没有未处置 P0/P1。

### Product/business approval 仍被阻塞

在 G2 product evidence gate 实际运行并通过、业务 owner/价值/成本得到原始证据前，本 BRD 状态不得超过 `validation-ready draft`。后续 G4–G8 只能是 assumption-bound review artifacts。

## 14. 相关文档

### 当前一手事实来源（访问日 2026-08-29）

- [NUS OSA Orientation](https://osa.nus.edu.sg/experience-communities/international-student-experience/orientation/)：2026 ISO Trail、Buddy/Peer 等供给；不证明使用结果。
- [NUS Campus Map](https://map.nus.edu.sg/) · [UTown](https://uci.nus.edu.sg/campus-life/campus-services/utown/) · [2024 UTown Map](https://map.nus.edu.sg/download/University-Town-Map.pdf)：区域可研究性；不证明现场可达/开放。
- [NUS Campus Tours](https://uci.nus.edu.sg/campus-tour/) · [Accessibility support](https://osa.nus.edu.sg/services-support/accessibility-support/accessible-transport-housing-and-guided-orientation/)：访问、摄影、道路与 accessibility 约束；不等于 pilot permission。
- [NUS Legal Information](https://www.nus.edu.sg/legal-information-notices)：内容权利/核验边界；具体复制、链接与再分发仍需逐项确认。
- [Actionbound](https://en.actionbound.com/)：现成结构化现场任务能力；不证明其治理/成本适合本项目。

### 项目审计链

- [G0 Source of Truth](./00_SOURCE_OF_TRUTH.md)
- [G1 Insight](./01_INSIGHTS.md)
- [G2 Validation Plan](./02_VALIDATION_PLAN.md)
- [Public review summary](./REVIEW_SUMMARY.md)
- [Assumptions](../ASSUMPTIONS.md)
- [Decisions](../DECISIONS.md)
- [Risks](../RISKS.md)

## 15. 修订记录

| 版本 | 日期 | 状态 | 变化 |
|---|---|---|---|
| 0.1 | 2026-08-29 | council-review | 首版 assumption-bound BRD；无商业数字；范围/目标/角色/流程/指标/风险与依赖 |
| 0.2 | 2026-08-29 | PASS — validation-ready draft | 修订 48h 价值边界、business sponsor/value/capacity contract、delivery classification、validation vs product scope、authority split、license/accessibility 与一手来源；最终复验 0 个未解决 P0/P1 |
