---
artifact: validation-plan
project: One Square Kilometre
created: 2026-08-29
status: passed-validation-plan-ready
gate: G2
mode: pre-build
verdict: validate-first
primary_risk_count: 1
documentation_gate: pass
product_evidence_gate: not-run
field_execution_status: blocked-pending-preregistration-lock-human-owners-and-route-review
g3_status: assumption-bound-draft-only
---

# G2｜Validation Plan：先证 residual job 与机制，再用真实选择验证 demand

## 0. 决策摘要

**Verdict：Validate first。** 当前只允许制作、审查和封存可丢弃的研究材料，不允许开发产品、AI 回顾或精修地图。

本计划只保留一个 primary risk，但明确证据权力不对称：V1/V2 可以否定方向，却只能产生 residual-job/机制信号；只有独立 revealed-choice、confirmatory replication 与所有权利/负担护栏共同通过，才可能把 R1 判为暂时不成立。任何单项正向结果都不支持 Build small。

## 1. 唯一 R1 与假设

### R1 `demand`

> **目标用户不会在真实机会成本下选择并完成地点特异 field protocol；即使被分配完成，协议相对同地图/同路线的无 prompt 对照也不会产生可持续到 48 小时的新地点—条件—用途认识，或其增量不足以抵偿时间、身体、注意、隐私与 correction burden。**

若 R1 成立，当前组合停止产品化；不得用 AI、交互地图、更漂亮的输出或事后缩窄样本抢救。

### 可证伪正向假设 H1

**We believe that** 一套无 AI、地点特异、可跳过的 field protocol

**for** 当前学期新到 NUS、正在建立 UTown 日常使用模式且已经能到达指定建筑的国际学生

**will** 在固定、无 walk-linked 报酬的直接邀请中被实际选择和完成，且同一自愿采用者在 48 小时后仍能使用本次新增/修订认识；同时完整 protocol package 在现实对照中优于普通地图/自由探索

**as measured by** `JVAP-7/48`（Joint Voluntary Adoption and Persistence）：全部送达的预先判定 eligible 邀请中，在一次中性邀请、无 walk-linked 报酬、无催促和无主持地点建议下，自主开始并完成与 confirmatory treatment **同一 treatment dose/version** 的协议，且在 48 小时无提示复测中达到 `iURCS-48` 的人数比例；同时 package-effect、burden、accessibility/safety、privacy 与 research-integrity 护栏全部通过。

`JVAP-7/48` 是唯一 demand primary metric；`RAP-7` 只报告采用组件。`iURCS-48` 是不可缺少但不能单独判赢的机制护栏；它测新增/修订认识，不测口头合规性。若无法以伦理与隐私可接受的方式运行 revealed-choice，G2 只能验证机制，不能验证 demand。

### 为什么这是 demand 而不是“识别准确率”

H1 要求用户在有机会成本的情境下选择、开始和完成，并要求受控任务中的认识相对 pre-task 真正新增或修订。照片数、prompt 完成数、地点识别准确率、满意度、偏好、点赞和输出流畅度均不能使 H1 通过。

## 2. 证据账本与基线

| 信号 | 强度 | 它证明/不证明什么 |
|---|---|---|
| `PRODUCT_BRIEF.md` 提出候选组合与 6/8、4/8 | Weak / E1 | 证明团队有待测方向；阈值没有基线，不是需求 |
| NUS 2026 ISO 含 Trail Experience，另有 buddy/peer/FOP/maps/tours | Context E2；不是需求信号 | 证明强替代供给存在；用户是否用过、是否满足未知 |
| UTown 官方边界与设施可被桌面界定 | E2 | 证明 area 可研究；路线、安全、无障碍和用户相关性未知 |
| Actionbound/PDF 可承载协议 | E2 capability | 证明无需自研即可测试；不证明协议有效 |
| 目标用户近期事件、替代失败、实际完成、48h 回忆 | **不存在** | 这是 G2 必须产生的 E3 原始行为证据 |

**当前基线：unknown。** 不用行业值或 council 判断填补。先导样本用于估计 control baseline 与失败模式，不能声称总体效果。

## 3. 验证顺序与停止逻辑

```text
V0 研究与路线就绪门
→ V1 residual demand：近期事件 + 真实替代复现
→ V2a component pilot：同地图/同路线/同记录机会，有 prompt vs 无 prompt
→ V2b pragmatic package pilot：完整 protocol vs 普通地图/自由探索
→ V2c confirmatory package comparison：独立样本、固定 dose、重新计算 N
→ V2d revealed choice：两个独立固定邀请 cohort、同一 treatment dose、JVAP-7/48
→ G4 再处理 build-null：PDF/纸卡 vs Actionbound/现成工具
→ AI 仅保留 parked interface；另行预注册
→ 决策：Build small / Validate first / Pivot first / Don't build yet
```

- V0 失败：不招募 field test；缩小/更换 area 或停止。
- V1 No-go：不运行 V2；当前 persona/JTBD 退役或 pivot。
- V2a No-go：不运行 V2b/V2c/V2d；核心组件失败。
- V2a 只有 exploratory signal：只允许封存同 treatment dose/comparison contract 的 V2b，不允许解锁 demand 或 build。
- V2b No-go：完整 package 不胜普通地图/自由探索；不运行 V2c/V2d。
- V2c confirmatory win 但 V2d No-go：说明被分配时可能有效，但没有同人 voluntary adoption + durable value；不 build。
- G4 build-null 证明现成载体足够：可以交付活动/内容，不自研软件。
- AI 在独立门通过前不进入 BRD/方案/PRD 的 in-scope 范围。

## 4. V0｜研究、权利与路线就绪门

### 4.1 人类责任人在招募前必须具名

| 责任 | 必须具名的 owner | 未落实时 |
|---|---|---|
| 研究/同意与参与者支持 | Research owner | 不招募 |
| NUS/场地访问与摄影边界 | Campus liaison / research owner | 不进入不清楚区域 |
| 路线、天气与当日中止 | Field safety owner；不是 AI | 不开走 |
| 数据访问、删除、导出、保留期 | Data steward | 不采集 |
| 盲化编码与争议处置 | 两名不知分组的 coders | 不解盲、不裁决 |

V0 必须保存具名书面 determination：适用的伦理/研究审查或“不需审查”判断、年龄资格依据、校园招募/访问许可、consent 版本、补贴规则、数据流/保留/删除、incident owner。不得用未经确认的年龄阈值代替正式判断，也不得自行解释法律。

另建 `trail_material_status` 日志：向 NUS 主办方请求 2026 ISO Trail Experience 的 route、task sheet/script、时长、参与条件与结果形式；记录取得、拒绝或无响应。无许可只检查/链接，不复制。拿不到时只能把真实暴露作为描述变量，不能声称本研究直接胜过 NUS trail。

V1/V2 每位参与者另记：`trail_attended`、日期、是否完整完成、记得的 route/task、是否留下产物、后来是否复用任何认识；只有同意且去标识后才保存其持有材料。8/arm 不做 exposed/unexposed 胜负。

### 4.2 Area manifest v0 的最小字段

| 字段 | 要求 |
|---|---|
| `area_id` / `manifest_version` | 不可变 ID + 语义版本；实验开始后不覆盖旧版 |
| `source_url` / `source_publisher` / `source_checked_at` | 当前官方来源与访问时间 |
| `field_verified_at` / `verified_by` | 现场核验时间与具名责任人；不能由 source check 代替 |
| `valid_conditions` | 时段、开放/门禁、天气前提、活动限制 |
| `route_variant` | standard / audited-access candidate；明确共同与不同 anchor；`route-audited` 与 `user-tested` 分开 |
| `known_failures` | 施工、坡度、台阶、电梯、过街、弱网、GPS、拥挤等 |
| `review_due_at` / `expires_at` | 到期后默认不用于新 session，除非复核 |
| `license_status` | linked-only / permitted / prohibited / unknown；unknown 不再分发 |

### 4.3 现场走查通过条件

- 至少两次不同日期/时段的具名走查；其中一次按无障碍清单执行，并由合格评审者或具有相关需要的参与者审阅关键任务与退出流程。否则只能标 `audited-access candidate / not user-tested`，不能承诺可达。
- 实测起终点、步行/观察总时长、坡度/台阶/电梯/路缘/过街、遮蔽/避雨、饮水/洗手间、休息/退出点、门禁/开放、施工、照明、弱网和标识。
- 参与者不需要站在道路、车道或过街点完成记录；不进入 residential colleges 或受限室内空间。
- standard 与 audited-access candidate 均应完成同一核心问题；若不同 anchor/刺激使内容不可比，分开版本和 estimand，不混算。
- 每个 prompt 依赖锚点的具体空间关系；换到任意校园仍完全成立的 prompt 删除。
- 当日使用 NUS access notice 与 MSS weather/lightning 信息作条件输入；系统和 AI 不作安全判断。Field safety owner 必须在运行前封存明确的允许/取消/撤离触发、最近正式避难点、check-in/out、失联与医疗升级流程。
- tabletop 演练至少覆盖 lightning alert、故障电梯、过街 near miss、参与者失联和 access need 不匹配；每个情境必须得到唯一动作。
- `incident`、`near_miss`、`route_exclusion` 分级写入 manifest；任何 protocol-induced serious incident 或 near miss 立即冻结该 manifest version，事后“已处置”不能把暴露清零。

### 4.4 V0 硬性 No-go

- 没有具名 field owner/data steward，或同意/数据删除责任不清。
- 无伦理/年龄/场地书面 determination、consent/data-flow、删除演练或 incident contract。
- audited-access candidate 只能靠排除参与者或忽略关键障碍成立，或被错误标为已验证可达。
- 路线需要跨入受限/住宅空间、道路停留或不可核验过街。
- 地图/媒体许可不清却计划复制进参与者包或开源发布。
- 取消/中止/撤离规则不明确。
- tabletop 任一情境没有唯一动作。

## 5. V1｜Residual demand：近期事件与真实替代复现

### 5.1 目的

回答：在 NUS 官方 onboarding、地图、同伴和自然熟悉已经存在的情况下，是否仍有一个重复、近期、有具体后果的停留选择 job。V1 不展示 OSK 概念，不问“你会不会用”。

### 5.2 样本与抽样框

- **固定 N = 16；不顺序扩样、不提前停止。** 这是探索性投资门，不是市场比例估计。
- V1 与 V2 使用独立样本；V1 参与者不得进入 V2，避免访谈敏化。
- 在招募前封存至少三个非同质渠道、每渠道邀请上限、统一邀请文案与资格分母；单一兴趣社群或团队熟人不得占多数。若触达远多于完成访谈，拒绝/no-show 作为选择偏差证据，V1 只能支持“完成访谈者中的 residual-job 信号”，不能支持总体 demand。
- 中性招募文案：“研究新到 NUS 的学生如何使用 UTown”；不提停留困难、AI、观察能力、摄影或“空间心智地图”。
- 不以“有痛点”“喜欢散步/摄影/城市观察”筛选。
- 记录 ISO/FOP/tour/buddy 暴露、undergraduate/graduate/exchange、住校/校外、到校/首次规律使用 UTown 的时间、语言/access needs 与熟悉度；小样本只作描述，不事后挑胜出子群。
- 全漏斗记录：接触、资格、拒绝、预约、no-show、完成、退出与原因。研究响应率不等于产品采用率。

### 5.3 事件访谈任务

1. 先做过去 14 天 UTown 到访 timeline：“最近三次去 UTown 分别做了什么？”开放叙述阶段不得出现“停留”“困难”“地图不够”等词。
2. 由参与者自然指出地点选择事件；开放叙述结束后，才用独处、等人、短时学习或会合作遗漏检查。
3. 对每个事件只追问事实链：目标、时间约束、实际步骤、使用的地图/官方资源/朋友/自然熟悉、最后选择与发生的后果；访谈现场不裁定“问题”或“替代失败”。
4. 尽可能复现惯常替代。朋友消息默认只在参与者设备上演示；如需保存，先由参与者遮蔽第三方身份，研究同意不替代第三方同意。
5. 有事件和无事件都进入分母；“没遇到”“已有稳定方案”“不值得多花时间”是有效负面证据。
6. 访谈末尾才询问同样时间的真实替代活动；不展示 OSK。
7. 封存逐字脚本、允许/禁止 probes 和 interviewer fidelity 抽查。两名不知道累计门槛的 coder 独立编码；访谈员不得看累计通过数或单独判定。

### 5.4 事件判定 rubric

一个 `qualifying_event` 必须同时包含：

- 具体时间和用途，不是一般态度；
- 实际使用或放弃的替代；
- 一个预注册的可观察行为后果：放弃原计划、选择后再次移动、显著改变/延迟安排，或反复回到并不满足本次用途的固定点；单独“问过别人/多走几步”不够；
- 不是纯导航、营业时间、安全保证或权威设施查询。

`unresolved_by_alternative = true` 还要求参与者在相似情境再次发生时仍没有能直接复用的步骤/地点组合，并能说明替代在何处失败；仅说“地图不够深入”不算。`alternative_succeeded`、`no_event`、`wrong_job` 同样编码。

### 5.5 V1 决策阈值

以下是固定 N=16 的样本内投资门槛，不是总体 prevalence：

- **Residual-job signal：** `qualifying_event ≥ 8/16` **AND** `unresolved_by_alternative ≥ 6/16`；信号只允许进入 V2a 机制 pilot。
- **No-go：** `qualifying_event ≤ 4/16` **OR** `unresolved_by_alternative ≤ 3/16`。
- **Inconclusive：** 其余所有组合；不进入 V2a，除非先从负例中形成并注册一个不同 persona/JTBD 版本。

选择 ≥50% 出现事件、≥37.5% 替代未解决，是为了避免为一个只能从小比例自选探索者中筛出的 job 建产品；仍是项目投资偏好，不是用户事实。邀请→访谈转化过低会进一步收窄结论，不可由上述比例掩盖。

任何“很有趣”“我会试”“学校应该有”不计数。

## 6. V2a｜无 AI prompt-pack 的组件增量

### 6.1 设计

| 字段 | 预注册值 |
|---|---|
| Estimand | 当前学期、对 UTown 尚不熟悉且符合本轮 consent/access/language 条件的 NUS 国际学生中，`同地图 + 同路线 + 同记录机会 + prompt-pack` 相对 `同地图 + 同路线 + 同记录机会、无 prompts` 的短期机制增量；不是总体 demand |
| Protocol/dose identity | `protocol_family_id/comparison_set_id` 锁定共享比较合同；每个 arm/carrier 有 condition-specific `dose_id`。V2b/V2c/V2d 必须复用 exact treatment dose；controls 各有自己的 dose/actual exposure。任何 treatment 缩短/增点/换主题都重启 V2b；carrier 改变也生成新 condition/dose |
| 设计 | V2a：独立新样本的随机平行组 pilot；不复用 V1，不做同区域 crossover |
| 样本 | V2a 固定 16 人，8 control / 8 treatment；不得以 V1 pain-positive 或替代失败为资格条件 |
| Eligibility | 当前学期新到 NUS、对 UTown 尚不熟悉、能用惯常工具到达指定建筑、未来 7 天有一个真实停留情境；随机前锁定。无真实情境者保留在 demand screening 分母但不进入机制随机化 |
| 分配 | 到场、同意、baseline 与真实情境确认后，由不接触参与者的人用封存表分配；只按 ISO/trail exposure 与 route variant 平衡，记录 seed/table/version、隐藏分配、禁止重抽 |
| 时段 | 两组尽量在同日相邻时段成对运行；每个 pair 随机分组。允许的天气/时段窗口、取消与重约规则在封存版中写死 |
| 接触量 | 统一 briefing、固定 35 分钟上限、相同补贴/求助/文本记录规则；记录研究者接触分钟，不提供地点建议 |
| AI | 无；不生成 prompt、不总结、不打分、不判断地点/安全 |
| Summary leakage | 48h 访谈完成前，不向任一组展示走后总结或自己的封存现场记录 |

### 6.2 公平任务

每位参与者在开始前指定一个未来 7 天内真实或已承诺的 UTown 30 分钟停留情境，并在共同 `pre_choice` 表写下当前地点—条件—用途链。若没有真实情境，不随机、不替换，记录在 screening 分母。

**Control A：同地图/同路线、无 prompts**

- 使用同一版本的静态/NUS 地图、同一建议路线、同一 4–6 个 anchor 和固定 35 分钟上限。
- 每个 anchor 有相同的 text-only 空白记录入口，不提供观察类别或答案暗示；不使用朋友消息、照片、语音或其它不可复现/扩权的外部处理。
- 目标是为预声明情境选择一个地点并给出依据。

**Treatment B：无 AI field protocol**

- 与 control 相同的地图、路线、anchor、目标、35 分钟上限和空白记录机会；唯一系统差异是额外获得同一版本的 4–6 个地点特异 prompt，可跳过或停止。
- 用手动选择 anchor；首轮 dose 不读取 GPS，`found/unsure/skip/stop/rebind` 都保留。
- 每个选答 prompt 只用文字；不收照片、语音、位置或媒体权限。C1-text 是对首轮 field dose 的正式收窄，任何 modality/access variant 变化都需新的 `EstimandVersion/DoseDefinition` 并重新过门。
- 两组走后填写完全相同的 `immediate_choice` 表；不展示总结。Treatment-only field notes 不进入 primary scoring。

本轮只能解释“prompt-pack package 增量”，不能声称胜过朋友、全部 onboarding 或所有自由散步；这些只在 V1 替代史中描述。

### 6.3 必须通过的机制指标：`iURCS-48`

参与者在 `48h ± 6h` 的无提示访谈中同时满足以下条件，记为 1，否则 0：

1. `pre_choice` 中不存在同一地点—条件—用途链，或 `immediate_choice` 显示该链发生了有现场依据的实质修订；已有认知的原样复述不能计成功；
2. 48h 时无地图、笔记、照片或提示，能指出具体 anchor，并陈述一个可由两组共同 `immediate_choice` 表复核的、参与者可直接感知且无需猜测他人的条件；
3. 该新增/修订条件能区分至少两个可行 anchor，并用于原先声明的情境作出选择或拒绝；通用于任意地点的“有座位/有遮阴更好”不够。

“不推断安全/身份/动机/街区规律”从 composite 中拆出，作为两组共同 briefing 后的 epistemic hard guardrail。

48h interviewer 必须不知道分组且未参与 field session，使用封存 probes。评分材料去除 prompt/格式/文件名线索并随机排序；两名 coder 先用至少 12 份不属于正式样本的边界回答校准 codebook。锁定要求：raw agreement ≥85% 且 Cohen's kappa ≥0.60；若 prevalence 使 kappa 无法解释，预先改用 Gwet's AC1 并记录理由，不能看正式结果后换统计量。`cannot_rate` 因参与者回答不足时按 failure；因研究录制/转写故障时该样本进入 `INVALID-MEASUREMENT` 边界，不 replacement。分歧由不知分组的第三名 adjudicator 处理。未达一致度则整批 measurement invalid，不能边看组别边改 rubric。

### 6.4 Secondary metrics（解释，不单独判赢）

| 指标 | 定义 |
|---|---|
| raw URCS components | 新增/修订、地点特异回忆、情境化选择分别报告，不只给 composite |
| actual follow-through | 7 天内是否在预声明真实情境中实际使用/拒绝该地点；它是现实行为解释，不等于选择 protocol |
| contamination | 48h 前是否重访、看材料、与人讨论或真实场景已发生；不事后排除，按预注册敏感性报告 |
| burden | 总时长、看屏幕/重读、求助、跳点、错点、暂停、改道、身体中止与主观负担；逐人报告并与 control 比较 |
| operational cost | 每 session 支持、route review、数据处置与修正工时 |

### 6.5 必须 AND 通过的 guardrails

| 护栏 | 通过条件 | 失败处理 |
|---|---|---|
| Completion | treatment 至少 6/8 完成共同 `immediate_choice`，且不比 control 少超过 1 人 | `NO-GO-MECHANISM`；不能只看完成者 |
| 48h follow-up | 普通失访按 `iURCS-48 = 0`；每组至少 7/8 完成才解释质性模式 | 低于阈值为 `INCONCLUSIVE-ATTRITION`；不 build |
| Burden | 同时报告逐人、最大值与组间差；任何 1 人出现预注册的不可接受负担，或 treatment 有 2 人以上需要 >20% session 时间的纠正/主持恢复，不得判 signal；正式 margin 在 V2c 前封存 | 不能被中位数掩盖；机制固有则 No-go，可修复执行缺陷则 Invalid-version |
| Privacy | 首轮零照片/语音/GPS/精确轨迹；零个未授权的旁观者/第三方文本；所有删除/导出完成并留最小审计 | 任一不可恢复事件为 `STOP-RIGHTS` |
| Safety/accessibility | 任何 protocol-induced serious incident/near miss 立即冻结 manifest；route-audited 不等于 user-tested，未暴露的 access needs 写 unknown | `STOP-SAFETY`，事后处置不清零 |
| Epistemic | 两组均不得把一次观察升级为安全、人群、动机或街区结论 | 固有诱导则 No-go；单次可纠正事件也进入负担 |
| Research integrity | 无额外 coaching、总结泄漏、事后排除或版本混算 | 该批结果无效 |

### 6.6 V2 决策规则

V2a 是大效应筛查，不是统计显著性试验。使用有优先级且互斥的状态机：

1. **STOP-SAFETY/RIGHTS：** 发生硬事件，立即冻结版本；判断风险固有还是可修复。
2. **INVALID：** 研究完整性、测量一致度、版本或不可解释执行偏差失败；不作正/负产品证据。
3. **NO-GO-MECHANISM：** 有效数据中 treatment `iURCS-48 ≤ control`，或 treatment `≤3/8`，或 burden/epistemic 失败是机制固有。
4. **EXPLORATORY SIGNAL：** treatment `iURCS-48 ≥6/8`、control `≤3/8`、差至少 3 人，且所有护栏通过；只允许注册 V2b。
5. **INCONCLUSIVE：** 有效、无硬失败、treatment > control 但未达 signal 的其余组合；保持 Validate first。

每个版本最多允许一次因已定位执行缺陷导致的修复性重跑；旧批次必须并列报告，不合并、不消失。机制或权利失败不得通过换 prompt 反复重跑。

### 6.7 样本量解释

基线未知，因此 8/arm 只用于发现大效应和 bad cases。V2a 对每组比例和组间 risk difference 报告预注册的 exact 95% interval、全部 2×2 原始数和单人翻转敏感性；不把 pilot p-value 当结论。

### 6.8 V2b pragmatic package pilot 与 V2c confirmatory

V2a 只回答 prompt component。项目指定的现实问题必须另测：完整无 AI protocol package 是否优于普通地图/自由探索。

**V2b pragmatic package pilot：** 独立新样本 16 人、8/arm、同一 comparison set、同一真实停留目标、35 分钟上限、共同 pre/immediate/48h 表单和相邻时段；Treatment 使用封存 treatment dose 的完整 protocol package，Control 使用独立 usual-practice condition/dose 与其平时会用的普通地图/自由探索，不接受研究者地点建议。记录 control 的 actual exposure、工具/路线/屏幕时间/是否联系他人；本轮估计 package-vs-usual-practice，不能归因单一组件。使用与 V2a 相同状态机和 `iURCS-48` 大效应阈值，仅产生 pilot signal。

**V2c confirmatory package comparison：** 使用独立参与者、同一封存 treatment dose/comparison set 与 condition-specific pragmatic control dose。N 由独立 owner 根据 V2b 的保守 control baseline、事先定义的最小有意义 risk difference 和实际失访率重算，不能把 pilot 赢家效应直接当 MDE。若只作示例：control 37.5%、treatment 75% 的假设在双侧 `alpha=.05`、power `=.80` 下两比例正态近似约需 27/arm（未计失访）；这些比例不是事实。

V2c preregistration 必须在看 confirmatory 数据前写死：N、MDE、alpha/power 或选择的非频率方法、primary analysis、burden margin、缺失/withdrawal、exact interval、停止规则。只有 package effect 重复方向、达到预注册最小差异并通过全部护栏，才能进入 V2d；V2a/V2b 单独永不使需求验证通过。

**Confirmatory burden margin（项目投资上限，不是用户事实）：** 两组均固定 35 分钟；Treatment 相对 control 的中位 `screen/recording interaction` 增量 ≤10 分钟，中位 `help + correction` 增量 ≤3.5 分钟（session 的 10%），且需要 >7 分钟 help/correction 的 treatment 比例不得比 control 高超过 10 percentage points；零个因 protocol 造成的身体/access 退出、serious incident 或 near miss。每个参与者逐项报告，任何不可接受事件不能被中位数掩盖。V2a 可用于检验该 margin 是否现实，但不能在结果后放宽。

## 7. 缺失数据、偏差与停止规则

### 7.1 分母

- 招募分母从首次接触开始报告；拒绝/no-show 不能消失。
- 随机分配后按 intention-to-treat 报告；普通 48h 失访按 `iURCS-48 = 0`，另做 best/worst bounds。参与者若撤回且不同意继续使用数据，必须删除，不能为 ITT 继续评分；只报告撤回人数和可计算边界。
- 迟到、部分回答、`cannot_rate`、超出 `48h ± 6h` 窗口和 7 天 follow-through 缺失分别使用封存规则；不临时 replacement。
- 天气/access 导致的 session 取消可按原分组重约一次；仍未完成则进入 completion/operational failure，不以“外部原因”删除。
- 安全或不适退出不记参与者失败标签，但在产品判定中是协议/运营失败。

### 7.2 污染与偏差控制

- 两组使用同一地图、路线、anchor、空白记录机会和 35 分钟上限；Treatment 只增加 prompt-pack。
- 参与者不得看到另一条件材料；V1/V2a/V2b/V2c 样本互不复用。
- 统一研究者脚本、求助次数、接触分钟与补贴条件；补贴不以完成所有点为条件。
- 48h interviewer 和 coders 在解盲前不知道分组；去除条件线索，记录 coder 条件猜测与 blinding failure。
- 不做事后“只有未参加 orientation 的人才是真 persona”式改写；任何新 persona 需新实验。

### 7.3 立即停止

- 达到 field owner 书面 contract 中的雷暴/高温/官方警报/访问触发、路线异常或参与者要求停止。
- 未经同意的可识别旁观者材料无法即时隔离删除。
- 研究同意、数据访问或删除责任出现缺口。
- manifest 过期、关键 anchor 失效或 route variant 不再可比。
- 任何 protocol-induced serious incident、near miss、失联或关键 access mismatch；对应 manifest 立即冻结，不以“已处置”继续。

## 8. V2d｜Revealed choice：真正的 demand primary

V2d 只在 V1 residual-job signal 与 V2c confirmatory package win 后运行，使用独立新样本。它不以研究任务分配或 paid screening responders 冒充采用。

### 8.1 样本与邀请

- 运行两个连续、独立 cohort；每个固定 24 个**直接、预先判定 eligible** 的邀请，来自三个非同质渠道，每渠道恰好 8 个。每 cohort 达到 24 即停止，不追加到成功。
- 在邀请前封存 pre-enumerated roster 与确定性选择规则；不先发 paid screening 再从 responders 中挑 24。若渠道无法在不交互筛选的情况下确认 current-semester NUS international student eligibility，V2d 不能声称 target-frame demand，只能标 `research-context uptake`。
- Eligibility 与 G1 样本框一致，不要求自报痛点、V1 qualifying event 或既往参与本项目；V1/V2a/V2b/V2c 参与者排除。
- 每人只收到一次中性邀请，可在 7 天内选择使用与 V2c confirmatory **完全相同 treatment dose_id** 的 OSK protocol，也可不做；无 follow-up 催促、无主持地点建议、不能用 1-anchor/5-minute teaser 代替 4–6 anchor/35-minute dose。
- `walk-linked compensation = 0`；若正式伦理/机构 determination 要求补偿 walk，则结果只能解释为“补偿条件下 uptake”，不得进入 evidence gate，除非另行设计真实机会成本测试。
- 邀请文案、送达定义、7 天窗口、开始/完成、48h follow-up 与无响应处理在看结果前封存。

### 8.2 唯一 primary metric：`JVAP-7/48`

`JVAP-7/48 = 在 7 天内自主开始并完成同一 treatment dose，且随后在 48h ± 6h 达到 iURCS-48 的 invitees / 全部送达的 eligible invitations`。

同时报告 `RAP-7`（只含自主开始+完成）以解释采用漏斗。完成定义必须与 V2c confirmatory 相同；不得为提高 uptake 缩短 dose。拒绝、无响应、开始未完成、48h 失访、天气/route 运营失败分别报告，不能从分母消失；普通失访使 JVAP=0，撤回且不许使用数据按 §7.1 处理。

### 8.3 V2d 决策阈值

以下是一次性 onboarding 场景的探索性投资门槛，不是市场转化率估计：

- **Per-cohort signal：** `RAP-7 ≥ 8/24` **AND** `JVAP-7/48 ≥ 6/24`，且所有权利/安全/负担护栏通过。
- **Repeated revealed-demand signal：** 两个 cohort 都达 per-cohort signal；合计 `RAP ≥16/48` 且 `JVAP ≥12/48`；每个渠道均至少产生一个 JVAP success。只有这一重复结果才满足 demand primary。
- **No-go demand：** 任一 cohort `RAP ≤3/24` **OR** `JVAP ≤2/24`，或采用只来自一个兴趣渠道，或两个 cohort 方向不一致。
- **Inconclusive：** 其余结果；不 build。若不再做更大、预注册 replication，结论保持 Validate first。

选择每 cohort `RAP 8/24 + JVAP 6/24` 是为了避免把一次 30–45 分钟、人工策展的 onboarding 活动建给少数自选爱好者，并确保同一人既自愿采用又获得持久价值；仍是项目投资偏好，不是市场率。正式结论必须展示 roster、选择规则、渠道、全部送达、拒绝、不开始、未完成和失访。即使重复通过，结论也只适用于 direct-invitation context，不等同自然市场 demand 或付费意愿。

## 9. 后续接口：build-null 与 AI（当前不激活）

### 9.1 Build-null 移交 G4

默认裁决是**不自研**。G4 必须比较完全相同内容在纸卡/PDF/消息与 Actionbound/其它现成工具中的开始、弱网、恢复、删除/导出、参与者/策展者工时、第三方成本与权利。

只有同时存在以下证据，才允许一个最小 custom technical spike：重复、可观察且阻塞已验证核心价值的载体失败；配置/人工/内容改进不能解决；现成工具治理不可接受；使用频次和节省负担足以覆盖预估开发、维护、策展和数据责任。现成工具失败本身只支持 Validate first/Pivot，不支持“所以自研”。

### 9.2 AI parked interface

AI 不属于当前 R1，且在独立验证前不得进入 G3/G4/G7 的 in-scope solution。后续若激活，必须另行封存：exact N 与全部 eligible corpus、模型/供应商/版本、system prompt、参数、首次输出/重试上限、分析集、确定性模板、盲化版式、claim coverage/source validity/abstention、逐人 correction、延迟、成本与实际下一次选择。任何 retune 是新版本，旧失败保留。

AI 的硬 No-go 已确定：任何无来源的安全、人群、身份、动机或街区事实；实际选择无增量；只是更流畅/更漂亮；或 correction burden 不低于确定性模板。数字门槛待有真实 corpus baseline 后由独立 council 预注册，当前不提前猜测。

## 10. 数据、隐私与权利协议

### 10.1 最小数据

| 数据 | 默认 | 理由/限制 |
|---|---|---|
| 参与者 ID | 随机匿名 ID；身份映射分离 | 分析只用匿名 ID |
| 精确轨迹 | 不采 | 核心任务不需要 |
| Check-in | 手动 participant assertion；无 GPS path | found/unsure/skip/stop/rebind；不等于 verified presence |
| 照片 | 不采 | 未来启用需新 dose/rights/campus/data-flow gate |
| 语音 | 不采 | 访谈/field 均用受控文字记录；不发送第三方 AI/转写 |
| 文本 | 默认可用 | 允许在现场/48h 后纠正，但保留 revision audit |
| 天气/访问 | 记录权威页面快照和访问时间 | 系统不作安全结论 |

### 10.2 权利

- 同意使用 teach-back，并分别授权受控文字记录、后续联系和任何第三方；首轮没有访谈录音、照片、语音、GPS 或 hosted provider。
- V1/V2 默认不使用 Actionbound 或 AI provider；研究受控存储须加密，身份映射与研究数据分离。访问仅限具名 research owner 与 data steward。
- 默认保留期：身份映射在最后 follow-up 后 30 天内删除；去标识文字记录/评分/成本数据在 gate 决策后 90 天内删除。人类 owner 可按正式政策缩短或修改，但必须在招募前封存且不得事后延长。
- 参与者导出/删除请求 7 个日历日内完成；备份和派生缩略图/转写在 30 日内清除。保留只用于证明处置完成的最小审计记录。
- 参与者撤回且不同意继续使用时，删除可识别与可链接研究数据；不能以 ITT 为由保留。
- 地图/媒体许可单独于参与者同意；无再分发权只链接，不打包。
- V0 必须用一名虚拟参与者演练“立即导出并完全删除”，覆盖本地、备份、缩略图与转写；任何环节不可验证则不招募。

## 11. 运行材料与数据字典

在首位参与者招募前，必须封存以下表单版本：

1. `recruitment_funnel`：candidate_id、source、channel_cap、invitation_delivered、eligibility、refusal/no-show、incentive、exposure strata。
2. `recent_event`：time/window、purpose、alternative_steps、artifact_refs、behavioral_consequence、qualifying_event、unresolved_by_alternative。
3. `session`：manifest/prompt version、assignment、start/end、weather/access snapshot、variant、help/skip/stop、completion。
4. `field_note`：note_id、anchor assertion/revision、relative sequence、text、source_type、unsupported_inference flag；无媒体/GPS字段。
5. `pre_choice/immediate_choice`：pre/post location—condition—use chain、reason IDs、new_or_revised、anchor discrimination、unsupported inference flag；两组格式相同。
6. `followup_48h`：window deviation、unaided response、material revisit/discussion contamination、iURCS components、coder IDs、condition guess、agreement/disagreement/resolution。
7. `burden`：correction type/count/time、route issue、privacy/delete/export request、support minutes。
8. `curation_cost`：source check、license, walkthrough、prompt authoring、update、support、incident handling minutes。
9. `revealed_choice`：roster_version、selection_rule、invite delivered_at、walk-linked compensation、dose_id、start/completion、reminder count、channel、RAP-7、iURCS-48、JVAP-7/48 status。
10. `incident`：severity、incident/near_miss/route_exclusion、manifest frozen_at、owner action、tabletop scenario/version。

原始材料与评分结果必须能逐条回链；分析表不能覆盖原始答案。

## 12. 时间与里程碑（相对时间，不伪造日期）

| 阶段 | 时长 | DoD | 停止条件 |
|---|---:|---|---|
| V0 owner/consent/route | 5–10 工作日，取决于授权 | owner 具名、manifest v0、两次走查、同意/删除演练 | 任何 V0 No-go |
| V1 residual job | 1–2 周 | 固定 16 份 timeline/event 与替代复现；盲化编码 | No-go/Inconclusive 不进 V2a |
| V2a component pilot | 2 周 + 48h follow-up | 独立 16 人、active control、盲化编码 | signal 只进 V2b |
| V2b pragmatic pilot | 2 周 + 48h follow-up | 独立 16 人、package vs usual practice | signal 只用于 V2c preregistration |
| V2c confirmatory package | 取决于重算 N 与招募 | 独立样本、固定 dose、confirmatory result | 未重复不进 V2d |
| V2d revealed choice | 两个 7–14 天 cohort | 2×24 直接邀请、三渠道、同 treatment dose、JVAP-7/48 | 任一 cohort No-go/Inconclusive 不支持 demand |
| G4 build-null / AI council | 仅在前门通过后另排 | 独立决策/预注册 | 不得提前运行 |

## 13. Gate 通过标准

这里分开两个状态，禁止语义滑移：

1. **G2 documentation gate：** 当唯一 R1、样本、对照、主指标、护栏、No-go、权利/安全合同和评审处置均完整时，可标 `PASS — VALIDATION PLAN READY`。它只允许继续制作带假设标记的后续决策文档，不授权招募、产品建设或“需求已验证”。
2. **Product validation outcome：** 只有 V1 residual-job signal、V2a component signal、V2b pragmatic signal、V2c confirmatory package win、V2d 两个 cohort 的 repeated JVAP signal、全部 guardrails 与完整原始审计链同时成立，才可标 `EVIDENCE GATE PASSED` 并重新评估 Build small。

在产品验证实际完成前，G3/G4/G5/G6/G7/G8 只能产出 `validation-ready / assumption-bound draft`；不得标 approved，不得把未执行验证写成事实。AI 必须 out of scope。若后续业务材料掩盖这些限制，文档 gate 自动回退。

## 14. 来源与相关文档

- [G1 Insight](./01_INSIGHTS.md)
- [Public review summary](./REVIEW_SUMMARY.md)
- [NUS OSA Orientation](https://osa.nus.edu.sg/experience-communities/international-student-experience/orientation/)
- [NUS Campus Tours / current restrictions](https://uci.nus.edu.sg/campus-tour/)
- [NUS accessibility support](https://osa.nus.edu.sg/services-support/accessibility-support/accessible-transport-housing-and-guided-orientation/)
- [MSS climate and weather systems](https://www.weather.gov.sg/climate-climate-of-singapore/) · [lightning information](https://www.weather.gov.sg/lightning/)
- [Actionbound](https://en.actionbound.com/) · [preload behavior](https://en.actionbound.com/help/article/preloading-bounds) · [results](https://en.actionbound.com/help/article/results)

## 15. 修订记录

| 版本 | 日期 | 状态 | 变化 |
|---|---|---|---|
| 0.1 | 2026-08-29 | council-review | 首版预注册草案；唯一 R1、V0–V4 顺序、主端点、样本、AND 护栏与 No-go |
| 0.2 | 2026-08-29 | revision-in-progress | 处置 G2 council P0/P1：独立样本、固定 N、active control、iURCS、revealed-choice primary、confirmatory split、安全冻结、build/AI 后置 |
| 0.3 | 2026-08-29 | PASS — validation plan ready | 处置复验 P1：增加 pragmatic package 对照、同人 JVAP 主指标、直接 roster、双 cohort 重复、同 treatment dose、防 screening 拒绝消失、coder/burden 明确值；三方最终复验 0 个未解决 P0/P1 |
