---
artifact: product-insights
project: One Square Kilometre
created: 2026-08-29
status: conditional-pass-research-convergence-only
gate: G1
evidence_ceiling_user_demand: E1
evidence_ceiling_context_and_supply: E2
next_gate_at_g1_close: G2 Validation
g3_entry_at_g1_close: blocked-pending-g2
---

# G1｜Insight：把优雅概念收敛成可被强替代推翻的问题

## 1. Gate 裁决

**G1 = CONDITIONAL PASS — 只通过“研究范围收敛”，不通过用户洞察或产品方向。**

三方 council 已完成独立初稿、交叉阅读、反例挑战与回应。当前可以冻结一个 G2 测试配置，因为它已经足够具体、便宜且可证伪；当前不能声称：需求存在、persona 已验证、UTown 是最佳区域、主题有价值、AI 必要，或应开发软件。

**当前 verdict：Validate first。** 最强反证是 NUS 已有国际学生 trail/onboarding/同伴支持，普通地图与自由探索成本更低，Actionbound 已能交付大部分结构化现场任务。OSK 只有在“无 AI、无精修、同等时间”的 field protocol 产生行为增量时才有继续理由。

## 2. 事实、推断、假设与缺口

### 2.1 当前可核查事实

| ID | 事实 | 等级 | 决策含义 |
|---|---|---|---|
| F-01 | 项目没有用户访谈、行为数据、现场走查、实验产物或代码；唯一原始本地材料是 pre-validation brief。 | E2 工作区盘点 | 任何 persona/JTBD/价值判断仍是 E0/E1 |
| F-02 | NUS 2026 International Students Orientation 的 Day 1 包含校内外 Trail Experience；官方同时提供 PACP、Buddy Programme、Peer Connectors、faculty/hostel orientation 等入口。 | E2，一手官方资料 | “新生没有探索支持”是错误前提；必须测 residual demand |
| F-03 | NUS Campus Map 提供地点、方向、shuttle routes 和可下载 UTown 地图；官方 UTown 页面/地图显示教学、学习、餐饮、开放空间与非住宅设施。 | E2，一手官方资料 | UTown 是可界定、可研究的 pilot 候选；不证明它最有价值或可达 |
| F-04 | NUS 2026 Campus Tour 页面公布 blackout/access restriction，并要求不未经同意拍摄学生、不在道路或过街处停留拍摄。 | E2，一手官方资料 | 访问、时段、摄影与道路风险必须进入版本和失败分母 |
| F-05 | NUS 提供 accessible van、部分区域 accessible routes、辅助器具与一对一 guided orientation；本次公开页面没有列出 UTown accessible route。 | E2，一手官方资料 | UTown 无障碍状态是缺口；“未列出”不等于不可达或不存在 |
| F-06 | 新加坡官方气候资料说明全年高温高湿、多雨并常有雷暴；动态天气/闪电信息本身也有精度和时延限制。 | E2，一手官方资料 | 天气取消、中止、遮蔽、退出和过期不是边缘情形 |
| F-07 | Actionbound 官方资料已支持地点任务、GPS/地图、照片/音频/文字输入、跳过、离线预载和结果查看/下载。 | E2，一手供应商资料 | 自研软件不是验证协议的前提；现成工具是 build-null |
| F-08 | NUS 网页/地图、OSM/tiles、Google Maps 内容分别有版权、attribution、缓存/离线等使用边界。 | E2，一手许可/政策 | “可查看/可下载”不等于可放入开源 area pack |

### 2.2 仍未验证的核心断言

- **需求：** 新到 NUS 的国际学生是否反复遇到“能到达，但无法为具体用途选择停留空间”的近期问题，以及它是否有足够后果。
- **因果变量：** 国际身份、到校时间、首次规律使用 UTown 的时间、orientation 暴露或区域熟悉度，哪个真正解释问题。
- **主题：** 第一人称“我会在哪里停下”是否改变真实选择，而非只制造观察作业。
- **机制：** 地点特异 prompt 是否相对普通地图/惯常自由探索改善完成、48 小时无提示回忆与后续选择，并抵偿负担。
- **区域：** 候选 UTown 非住宅核心是否在多条件下可走、可达、连续、有意义且能在合理时长完成。
- **产品性：** 效果是否脱离主持和高人工策展仍成立；若 PDF/Actionbound 足够，就不应自研。

### 2.3 不得偷换的结论

- 官方 supply 存在，不等于 supply 已满足；必须观察真实使用史和结果。
- UTown 可研究，不等于 UTown 正确；官方宣传性描述不是停留行为证据。
- 协议可执行，不等于协议有价值；完成率和素材数量不能代替行为结果。
- 观察更具体，不等于用户价值更高；识别准确率、满意度和“很有趣”均不是主端点。
- 协议有效，不等于需要软件；软件必要性、AI 必要性和规模化价值是后续独立命题。

## 3. Product Proto-Persona（研究模型，不是真实画像）

### Persona Card

**PU-001｜正在建立 UTown 日常使用模式的新国际学生**

| 字段 | 当前定义 |
|---|---|
| 类型 | Product Proto-Persona / Primary research candidate |
| 置信度 | Low；用户需求证据仍为 E0/E1 |
| Valid for | 当前学期首次进入 NUS 学习、已开始使用 UTown、能够用惯常地图或校方工具到达指定建筑，但尚未确认是否有稳定停留选择方法的国际学生 |
| Not valid for | 游客、长期熟悉 UTown 的学生、只需要导航/营业时间/安全保证/权威设施答案的人 |
| 关键筛选纪律 | 不要求参与者先承认痛点；同时保留近期有/无问题、拒绝、no-show 和已有充分替代者 |
| 必须分层记录 | undergraduate/graduate/exchange、住校/校外、到校与首次规律使用 UTown 的时间、ISO/FOP/tour/buddy 暴露、独行/同行、accessibility needs |
| 关键引语 | **无。** 当前没有目标用户原始引语，禁止代写 |

**候选目标（假设）：** 为独处、等人、短时学习或会合，形成几个空间“何时适合我”的个人判断；之后能回忆并使用，而不是只记地标。

**设计护栏（项目约束）：** 可跳过和退出；路线不是导航；输出回链用户材料；不猜他人身份/动机、安全或街区规律；拒绝 camera/location/microphone 后仍可完成核心任务。

公开仓库保留本文件中的低置信 persona、证据标注与限制；原始 council 工作稿不作为事实来源，也不进入公开 baseline。

## 4. 触发情境与 JTBD

### 4.1 候选触发

> 用户刚开始规律使用 UTown，已经可以到达建筑，但出现一个具体停留用途——独处、等人、短时学习或与人会合——且现有 orientation、地图、朋友或自然熟悉没有形成稳定解法。

“最近”将在 G2 用短回忆窗口操作化并校准；不把 4、6 或 8 周写成已经发现的用户规律。

### 4.2 JTBD 假设

> **When** 我刚开始规律使用 UTown、已经能到达目的地，但需要决定在哪里短暂停留，**I want to** 基于少量现场观察形成对几个空间“何时适合我”的可回溯判断，**so I can** 下一次更有把握地选择，而不只是记住地标或照抄他人推荐。

| 维度 | 当前判断 | 证据状态 |
|---|---|---|
| Functional | 形成可用于一次后续停留选择的、地点特异且可回链的个人判断 | E0/E1，待验证 |
| Emotional | 可能希望从被动跟随转为主动理解、减少陌生感 | E0；无原话，不进入价值主张 |
| Social | 可能希望能向同伴具体说明某处为何适合 | E0；若访谈不自然出现则删除 |
| Underlying | 从“别人告诉我去哪里”转为“我能基于自己的证据使用地方” | 产品推断，不是用户事实 |

**Definition of done（候选）：** 不是完成卡片，而是参与者能在 48 小时后无提示回忆至少一个地点特异认识、回链自己的现场证据，并在预定义的真实停留情境中使用或合理拒绝使用它。阈值由 G2 预注册，不在 G1 伪造。

## 5. 当前替代与相邻方案

### 5.1 三个不同层级的零假设

| 零假设 | 强替代 | 它检验什么 | 当前结论 |
|---|---|---|---|
| residual job 已被解决 | NUS ISO trail、FOP、buddy/peer、faculty/hostel onboarding | 是否还存在近期、有后果的未解决问题 | 供给存在（E2），用户结果未知 |
| 无结构也一样有效 | Google/NUS 地图、朋友、自由散步、自然熟悉 | field protocol 是否真的有行为增量 | 未测试 |
| 无需自研软件 | PDF/消息/纸卡、Actionbound | 即使协议有效，是否需要新产品 | 现成载体能力存在（E2） |

这三类不能混成一个多臂“竞品 A/B”。尤其不能把 8 人拆成地图、NUS trail、Actionbound、OSK 四个极小组后宣称证明需求。

### 5.2 能力比较

`完整/部分/未知` 只反映官方公开资料，不代表用户效果。

| 能力 | Google Maps | NUS 地图/Orientation/Tour | 同伴/自由散步 | Actionbound | Seek by iNaturalist | OSK 假设 |
|---|---|---|---|---|---|---|
| 到达/路线 | 完整 | 完整 | 部分 | 取决于策展 | 无 | 非目标 |
| 地点化任务 | 本次未见观察协议 | 部分；checkpoint/trail 内容未知 | 即兴/无 | 完整 | 完整（自然观察） | 计划验证 |
| 用户现场证据 | 部分且常面向公开贡献 | 本次未见 | 非结构化 | 完整 | 部分 | 计划验证 |
| 证据化走后回顾 | 本次未见 | 本次未见 | 无结构 | 结果查看，自动证据总结未知 | 观察记录 | 未证明必要 |
| 默认最小数据/本地 | 取决于功能设置 | 不采此类用户材料 | 无数字采集 | 服务器结果，需单独治理 | Seek 默认本机 | 约束：local-first |
| 无 AI 可完整交付 | 是 | 是 | 是 | 是 | 是 | 必须先证明 |

### 5.3 竞争结论

当前没有可声明的“市场空白”。结构化现场任务、主题观察、导航和校园 onboarding 都已有供给。唯一待证明的窄差异是：

> **地点特异问题 → 用户自己的现场证据 → 可纠正回顾 → 48 小时记忆/真实选择** 是否相对强替代产生足够增量。

这是一条假设，不是定位。

## 6. 行为链、用户成本与 correction burden

### 6.1 必须观察完整分母

```text
接触候选人
→ 符合/不符合；拒绝/预约/no-show
→ 近期真实事件与替代复现
→ 到场/取消；开始/不开始
→ 找到或确认锚点
→ 观察并留下最小证据
→ 跳过/求助/错绑/中止/完成
→ 立即地点选择与理由
→ 48h 无提示回忆/失访
→ 有机会成本的真实后续选择
```

只分析完成者会制造幸存者偏差；补贴、主持、同行和天气都要进入原始表。

### 6.2 成本与负担

| 成本 | 必须记录 | 失败解释 |
|---|---|---|
| 时间 | 邀请到开始、往返、实际步行、暂停、回顾 | 30–45 分钟只是提案，不是容忍度事实 |
| 身体/无障碍 | 距离、坡度、台阶、电梯、遮蔽、过街、休息、改道、中止 | “可走”不代表可达 |
| 注意力 | 重读、看屏幕、漏看现场、求助 | prompt 可能伤害自由观察 |
| 隐私/社会 | 拒绝权限、避拍、删除、他人在场不适 | 完成不能压过参与者与旁观者权利 |
| 纠正 | 错点、改绑、删媒体、澄清、撤销过度推断的次数/时间 | correction burden 过高即使输出正确也失败 |
| 机会成本 | 当时可做的课程、休息、社交、办事或自由活动 | 必须与真实替代比，不与“无聊”比 |

## 7. Bad cases 与机会成本

### 7.1 必须主动寻找的 bad cases

1. 已参加官方 trail/onboarding 的参与者没有 residual job。
2. 普通地图、朋友或一周自然熟悉产生相同或更好的选择和回忆。
3. 只招喜欢探索/摄影的人，筛选制造需求。
4. prompt 提高记忆但不改变任何真实选择，只是测试练习效应。
5. 结论只是“有遮阴和座位的地方适合停留”，未超出现有直觉。
6. prompt 可复制到任意校园，地点特异性失败。
7. 真正效果来自主持或同伴讨论，个人协议无增量。
8. 天气、访问、施工、路线或 accessibility 使成功者成为理想条件幸存者。
9. 主题诱导拍摄/分类陌生人，或把一次观察泛化成群体/街区事实。
10. 手动 check-in/GPS 误差导致证据错绑，回顾失真。
11. 策展、许可、复核、过期、纠正与支持工时吞噬单一区域价值。
12. 协议有效但 PDF/Actionbound 已足够，只能支持活动/内容而不能支持新软件。

### 7.2 机会成本

- **用户：** 同一时间可用于入学事务、课程、休息、建立关系或纯自由活动。
- **产品：** 过早做地图、AI 或精修交互会消耗验证其它 persona/area/theme 的自由。
- **运营：** 每小时人工策展/复核都应与更轻的 newcomer checklist、同伴 walk 或一次性活动比较。
- **开源：** 单一区域内容有效不自动证明通用 manifest 或平台有外部维护者与复用价值。

## 8. `persona + area + theme` 实验锁定 v0.1

锁定日期：2026-08-29。锁定对象是 G2 研究配置，不是 validated persona 或产品定位。开始收集数据后，任何改动都必须创建新版本并记录失败，不能与旧版混算。

### 8.1 Persona / 样本框

> 当前学期首次进入 NUS 学习、正在建立校园日常使用模式的新国际学生；已经能用惯常地图或校方工具到达 UTown 指定建筑。招募不要求其先认同存在问题；G2 必须保留最近具体情境中有/无停留选择困难、已有/没有稳定替代的正负样本。

“国际学生”是首轮招募聚焦，不是需求原因。真正待检验的解释变量是对区域的新近性、近期真实选择事件、替代暴露和使用频率。

### 8.2 Area

> 以 2024 NUS UCI UTown 官方语义边界为桌面起点，只从 College Link/CREATE—Town Plaza/Town Green—Education Resource Centre—Stephen Riady Centre 一带非住宅公共核心选择连续环线；排除 residential colleges、受限室内空间和未经核验的过街。最终起终点、锚点、距离、面积、时长与 accessible variant 只由具名、带 `field_verified_at` 的现场走查决定，不承诺严格 1 km²。

在走查通过前：`LEADING CANDIDATE / NOT FIELD-VERIFIED`。若可达、有意义区域小于一平方公里，缩小而不补点。

### 8.3 Theme

> **参与者可见主题：** “在这片区域里，我会在哪里停下来？当时哪些可以直接观察、无需猜测他人的空间条件——例如遮阴、可用座位、边界、噪声、视线、动线与可达性——影响我的选择？”

“人们在哪里停留而不是经过”只保留为内部策展启发。任务不要求拍摄、计数或解释陌生人；不推断身份、动机、安全性或街区规律。

### 8.4 锁定理由与撤销条件

| 维度 | 为什么选 | 撤销/回退条件 |
|---|---|---|
| Persona | 招募入口明确，且可检验 residual demand | 找不到重复近期事件；问题由导航/权威信息完全解释；筛选才制造需求 |
| Area | 官方语义边界清楚、非住宅空间类型多、可低成本证伪 | 现场路线不可达/不连续/无意义；用户真实动线不相关；维护成本超限 |
| Theme | 把观察连接个人选择并降低旁观者风险 | 不改变真实选择/回忆；只产生显而易见或通用观察；负担大于收益 |

## 9. G1 未关闭的缺口与进入 G2 的条件

G2 计划必须预注册并获取：

1. 完整招募分母、同意、拒绝/no-show 与分层变量。
2. 近期具体事件、现有替代的实际复现与原始产物。
3. 2026 ISO Trail Experience 原始任务包；拿不到就记录缺口，只将真实暴露作为分层，禁止伪造实验臂。
4. 版本化、具名、多条件的 UTown 现场走查与 accessible variant。
5. 无 AI、无总结泄漏、同区域/目标/时间/研究者接触量的真实对照。
6. 盲化 rubric、48 小时无提示回忆、一次真实或高代价地点选择。
7. correction burden、策展/复核/支持工时和所有 bad cases。
8. 预注册的 AND 成功规则与 No-go；不得用漂亮输出、AI 或事后分群抢救失败。

在以上行为证据产生前，G3 继续 BLOCKED。

## 10. 一手来源台账（访问日 2026-08-29）

| ID | 来源 | 用途 |
|---|---|---|
| R-01 | [NUS OSA — Orientation](https://osa.nus.edu.sg/experience-communities/international-student-experience/orientation/) | 2026 ISO Trail、PACP、Buddy、Peer Connectors |
| R-02 | [NUS OSA — Settle In](https://osa.nus.edu.sg/experience-communities/international-student-experience/resources/settle-in/) | Campus Map、shuttle、NextBus |
| R-03 | [NUS Campus Map](https://map.nus.edu.sg/) | 地点、方向、shuttle、下载地图 |
| R-04 | [NUS UCI — UTown](https://uci.nus.edu.sg/campus-life/campus-services/utown/) | UTown 设施与语义范围；机构描述不作行为事实 |
| R-05 | [NUS UCI — University Town Map (2024)](https://map.nus.edu.sg/download/University-Town-Map.pdf) | 候选边界、比例与设施；现场状态未知 |
| R-06 | [NUS OSA — Accessible Transport, Housing and Wayfinding](https://osa.nus.edu.sg/services-support/accessibility-support/accessible-transport-housing-and-guided-orientation/) | 无障碍服务与公开路线缺口 |
| R-07 | [NUS UCI — Campus Tours](https://uci.nus.edu.sg/campus-tour/) | 2026 限制、摄影与道路提醒 |
| R-08 | [NUS — Filming and Photography on Campuses](https://news.nus.edu.sg/filming-and-photography-on-nus-campuses/) | 人像、教学/研究/住宅边界 |
| R-09 | [NUS — Legal Information & Notices](https://www.nus.edu.sg/legal-information-notices) | 内容权利、免责声明与独立核验 |
| R-10 | [Google Maps 官方功能](https://maps.google.com/intl/en-GB/maps/about/) | 普通地图基线，导航/列表/探索 |
| R-11 | [Actionbound 官方产品页](https://en.actionbound.com/) · [Preload](https://en.actionbound.com/help/article/preloading-bounds) · [Results](https://en.actionbound.com/help/article/results) | 现成结构化任务、离线与数据边界 |
| R-12 | [Seek by iNaturalist](https://www.inaturalist.org/pages/seek_app) · [Privacy](https://www.inaturalist.org/pages/seek_privacy_policy) | 主题观察与 local-first 相邻范式 |
| R-13 | [Meteorological Service Singapore — Climate](https://www.weather.gov.sg/climate-climate-of-singapore/) · [Weather Systems](https://www.weather.gov.sg/learn_weather_systems/) | 户外天气、雷暴与取消风险 |
| R-14 | [OpenStreetMap Copyright](https://www.openstreetmap.org/copyright) · [Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/) | ODbL、attribution、禁止离线预取公共 tiles |
| R-15 | [Google Maps Platform Policies](https://developers.google.com/maps/documentation/javascript/policies) | attribution、缓存/存储等平台约束 |

公开仓库只保留与当前判断直接相关、可复核的一手来源；原始 council 研究工作稿不进入 public baseline。

## 11. Review record

G1-G8 的公开 disposition 与实现复验结果统一收敛在 [Public review summary](./REVIEW_SUMMARY.md)。原始 council 工作稿未公开，也不作为外部事实来源。
