---
project: One Square Kilometre
updated: 2026-08-30
---

# 风险台账

评分为当前判断，不伪装成统计概率。G2 已锁定唯一 R1；其状态仍是 OPEN，因为 evidence gate 未运行。

| ID | 风险 | 类型 | 可能性 | 影响 | 早期信号 | 处置/停建条件 | 状态 |
|---|---|---|---|---|---|---|---|
| R1 | 目标用户不会在真实机会成本下自愿完成同一剂量协议，或完整 protocol 不胜普通地图/自由探索，或增量不能持续到 48h/抵偿总负担 | demand | 高（E1 判断；E2 供给反证） | 致命 | 直接邀请 uptake 弱；没有 JVAP；pragmatic control 相当；只有口头答题；负担/权利失败 | V1 residual job → V2a component → V2b pragmatic → V2c confirmatory → 2×V2d JVAP；任一 No-go 停止，不用 AI/漂亮输出抢救 | OPEN |
| R-002 | 目标用户不愿投入 30–45 分钟 | demand | 中高 | 高 | 爽约、早退、跳过多、需强激励 | 记录从邀请到完成的漏斗；不能靠高额激励掩盖 | OPEN |
| R-003 | persona/area/theme 组合不相关或区域边界不可行 | positioning/safety | 中高 | 高 | 用户无真实触发；路线绕行、不可达、不安全或无障碍失败 | EP-01/field 前走查；必要时换组合，不为“一平方公里”硬凑 | OPEN |
| R-004 | 人工策展与复核成本超过单一区域所得价值 | operations | 高（E0/E1） | 高 | 每个 prompt 都需频繁现场复核；低复用；许可不清 | 在 pilot 计时并建立成本模型；超过事先阈值则不扩区 | OPEN |
| R-005 | 地点、开放状态或无障碍信息过期导致误导 | freshness/trust | 中高 | 高 | `verified_at` 超期、现场关闭、锚点迁移 | 版本化 manifest、过期即降级/隐藏、人工复核 SLA | OPEN |
| R-006 | AI 回顾无增量或错误总结增加 correction burden | feature-fit/trust | 高（E1） | 中高 | 模板同样好；无来源断言；用户修正时间长于阅读 | 当前 deny-all/out of scope；未来只有独立新 gate，失败永久移除 | OPEN |
| R-007 | Manual anchor assertion 错绑或被误写为 verified presence | usability/data | 中 | 中高 | unsure/skip 被改成 found；rebind 覆盖原记录；研究者导航 rescue | C1 manual-only；assertion/stop/rebind lineage；GPS path 不存在 | OPEN |
| R-008 | C1 纸本/受控文本在 custody、转录、盲化、导出/删除中丢失或错配 | reliability | 中 | 高 | 丢纸、错 transcription/coder packet、pending backup、stale copy | D1/D2 copy graph drills；不确定即 invalid/incident；不静默补写 | OPEN |
| R-009 | 未来媒体/位置或自由文本第三方信息扩大隐私/权利面 | privacy/rights | 中 | 高 | PII 进入 text；有人提议媒体/GPS/provider；副本无法关闭 | 首轮 text/manual/no-hosted；PII quarantine；任何偏离新 dose/right gate | OPEN |
| R-010 | 地图/媒体/地点说明许可不允许再分发或开源 | licensing | 中 | 高 | 无 attribution、条款禁止离线或衍生分发 | 逐项素材账本；不清楚即替换或不发布 | OPEN |
| R-011 | 一次性 onboarding 体验被误写为高频留存产品 | strategy | 高 | 中高 | 第二次实际完成弱，但只统计意向 | 明确一次性定位；真实重走行为不足则不承诺留存 | OPEN |
| R-012 | 系统从有限个人证据错误推断“街区事实” | epistemic/trust | 中高 | 高 | participant inference 被升格；wrong/self/expired ref 支持 claim | Typed claim dependencies、epistemic status、deterministic invalidation/abstention；无 AI | OPEN |
| R-013 | 高完成度本地 synthetic 体验被误读为需求、真实路线、production 或 PRD 已获批 | governance/communication | 高 | 高 | 截图或演示脱离 limitations；`Ready` 未限定 local experience acceptance | 首页/recap/guide/STATUS 同时保留 synthetic/not navigation/not field evidence；Ready 只能写 `local experience acceptance candidate`；项目 verdict 永远与之分列 | OPEN |
