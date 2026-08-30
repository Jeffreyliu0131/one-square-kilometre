---
artifact: local-experience-acceptance-guide
project: One Square Kilometre
updated: 2026-08-30
audience: non-technical-local-reviewer
scope: synthetic-local-portfolio-prototype-only
candidate_status: ready-local-experience-acceptance-only
project_verdict: validate-first
prd_status: validation-ready-draft-not-approved
---

# 纯体验验收指南

## 先看结论和边界

这份指南只验收一个本地、synthetic 的现场观察笔记本候选。它要让你判断：普通人能否理解边界、完成记录、看到证据从哪里来、纠正记录，并在失败时安全停止、导出或删除。

当前本地候选状态：**Ready for direct local experience acceptance only**。

它不验收真实 NUS 路线、真实地点、安全、开放、无障碍、用户需求、AI 增量或生产可用性。项目结论仍是 **Validate first**；PRD 仍未批准。

请勿输入姓名、联系方式、真实地点、第三方信息或任何真实私人数据。测试文字只用虚构内容。

## 启动

要求：Node 22、pnpm 11。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

浏览器打开 `http://127.0.0.1:4317`。

如果首页显示旧数据需要 recovery，先打开 `Data` 或正文里的数据入口。需要保留时先导出，再选择 `Review deletion` → `Delete local data`。删除只覆盖本 app 的 session key，不会删除已下载文件、截图、系统剪贴板、主题偏好或其它浏览器数据。

## 主体验路径

以下文字均是界面上的英文标签。建议先按顺序体验，不要先看代码或测试。

| 步骤 | 操作 | 预期结果 | 不通过条件 |
|---|---|---|---|
| 1 | 打开首页 | 首屏清楚出现 `Portfolio prototype`、`Synthetic place`、`Not navigation`；内容包写明 `4 active prompts, 2 blocked examples`；`Start synthetic session` 可用 | 看起来像真实地点、导航或 6 个都要完成；边界只能在隐藏说明里找到 |
| 2 | 点 `Start synthetic session` | 进入 `Observe the pause conditions`；进度为 `0 of 4`；地图无当前位置、距离、方向、ETA；列表有 A-F 六项 | 请求定位/相机/麦克风/账户；地图是唯一入口；Start 后数据未保存却宣称成功 |
| 3 | A `Lantern Steps` 选 `I found this anchor`，写一条虚构 note，再点 `Save observation` | draft 明确说尚未进入 recap；commit 后 A 变为 `Participant reported found`，进度 1/4，显示 observation revision | `found` 被写成到场验证；draft 被当作已提交证据；原文被改写 |
| 4 | B 选 `I am not sure`；C 选 `Skip this prompt`；D 选 `I found this anchor` 并写 note | `Unsure` 和 `Skipped` 都是正常结果；完成后进度 4/4；底部 `Review` 可用 | 系统强迫把 unsure 改成 found；skip 被当作失败；按钮或输入被 sticky tray 遮挡 |
| 5 | 打开 E `North Shelter`，再打开 F `Reed Bridge` | E 显示 stale；F 显示 unsupported；两者都没有 radio、textarea 或 save；都不给替代路线 | 可 `Continue anyway`；生成安全/可达替代；仍允许写入 |
| 6 | 点 `Review` | recap 只统计 4 个 active anchors：预期 Found 2、Unsure 1、Skipped 1、Unrecorded 0；另写明 2 个 fail-closed examples 不计完成 | 仍显示 2 个未完成；把 fail-closed 示例混进完成分母 |
| 7 | 阅读 recap 三层 | `Your saved observations` 保留 exact text；`What the synthetic pack supplies` 标明 synthetic/non-authoritative；`What this recap will not claim` 明确 abstention | 流畅总结覆盖原文；出现 AI/pattern/recommendation；fixture metadata 被写成真实地点事实 |
| 8 | 点一条 `Correct record` | 进入独立 `Correct a saved record`；没有恢复成普通 field flow；保存生成新 revision；`Undo last change` 可恢复；`Return to recap` 返回 | 又出现完成态与现场态混用；已 stopped 的 session 被恢复；修改没有 lineage |
| 9 | 点 `Data and deletion` | 解释 this-browser-only、无账户/服务器/同步/analytics/媒体/定位；可见 provenance、cannot-claim、Export/Delete | 使用 `private`、`anonymous`、`deleted everywhere` 等过度承诺；rights action 藏在设置深处 |
| 10 | 点 `Export JSON` | 创建本地 JSON；界面明确下载文件已离开 app 控制；本地记录不被清空 | export 改变或删除本地记录；下载副本被声称可由 app 删除 |

## 关键异常路径

`?demo=` 只在开发或显式 fault-lab build 生效，用于稳定复现本地错误，不是对真实环境的证明。

| 路径 | 打开方式 | 预期结果 |
|---|---|---|
| 列表降级 | `/?demo=list-only` | 显示 `Map layer unavailable`；完整 anchor list 仍可完成流程；不写成定位失败 |
| 离线提示 | `/?demo=list-only,offline` | 显示 `Nothing will sync`；local flow 继续；不承诺 cold-start offline |
| 内容包错误 | `/?demo=pack-error` | Start 不出现；正文同时有 `Retry bundled fixture` 和 `Open data and recovery` |
| 空内容包 | `/?demo=empty` | 不显示空地图假象；可以 Retry，也能打开数据与恢复 |
| 过期内容包 | `/?demo=stale-pack` | Start disabled；已有数据仍可 export/delete；没有继续按钮 |
| 存储前检失败 | `/?demo=storage-preflight-error` | Start disabled；不创建易丢失的 volatile session |
| 保存失败 | `/?demo=storage-error` | 屏幕文字保留；committed projection 不前进；`Retry save` 与 `Copy note` 可见；复制边界说明 clipboard 已离开 app 控制 |
| 删除失败 | `/?demo=delete-error` | 显示 `Deletion was not completed`；UI 和 storage 都保留；不能出现成功回执 |
| Stop | 任意 active screen 点 `Stop and exit` | 一步到确认说明；确认后 terminal；正常保存可经 reload 保持 stopped；保存失败则明确 `this tab only` 并提供 recovery export |
| Stopped record correction | Stop 后点 `Review partial record` → `Correct record` → 保存 → `Return to recap` → `Back to stopped session` | 进入独立 correction phase；文字可生成新 revision；返回后仍是 stopped，不能恢复 field task |

真实 warm-offline 只在 production preview 中验收：先在线完成 service worker 安装和一次受控 reload，再断网。Cold-start offline 不支持。

## 数据权利与重置

- Session key：`osk.synthetic-session.v1`。
- 内容是当前浏览器 profile 中未加密的 localStorage。共享设备使用者、扩展、本机访问或浏览器清理都可能看到或移除它。
- `Export` 生成的文件、截图和系统剪贴板在 app 控制之外，可能被其它 app 或设备同步保留。
- `Delete local data` 必须先确认，默认焦点在 `Cancel`；只有 remove 后 read-back 为 absent 才显示成功。
- 删除不是 secure erase，也不覆盖设备备份、下载、截图、clipboard 或 theme preference。
- 重置方法：`Data` → `Review deletion` → `Delete local data` → 关闭面板；首页重新出现 Start。

## 截图索引

公开 baseline 只保留 4 张 fixed-viewport 精选图，避免把自动生成的完整 screenshot matrix 当作手工交付资产：

| 体验状态 | 截图 |
|---|---|
| Desktop 首页边界 | [desktop overview](../artifacts/screenshots/desktop-experience-01-overview.png) |
| Mobile 首页边界 | [mobile overview](../artifacts/screenshots/mobile-experience-01-overview.png) |
| Exact note 与 source | [desktop recap detail](../artifacts/screenshots/desktop-experience-05b-recap-evidence.png) |
| Mobile Export/Delete 权利区 | [mobile data rights](../artifacts/screenshots/mobile-experience-06b-data-rights.png) |

完整 desktop/mobile screenshot matrix 会在本地 `pnpm test:e2e` 时重新生成，但其余自动产物不进入公开 Git baseline。

## 通过标准

本地候选只有同时满足以下条件才可标 `Ready`：

1. 上述主路径、异常路径和数据权利路径均按预期工作。
2. Desktop 1280×720、mobile 390×844 和 320px smoke 无横向溢出、遮挡或不可达关键操作。
3. Fixtures、lint、typecheck、unit/integration、production build、bundle、desktop/mobile E2E、a11y、offline 全部在同一最终 snapshot 通过。
4. 独立体验、架构/隐私和 QA reviewer 复验后，本地 scope 的 unresolved P0/P1 均为 0。
5. 所有文档继续明确：这是 local synthetic candidate，不是 approved product、production、field capability 或 product evidence。

任一数据静默丢失/覆盖、错误成功回执、过期仍可写、模型/远端请求、导航/安全暗示、Stop 不可达，均为 P0/P1，不得用“测试多数通过”抵消。

## 不能宣称

- 不能宣称需求、PMF、留存、愿意步行、观察或记忆改变。
- 不能宣称比普通地图或自由散步更安全、更可达、更有价值。
- 不能宣称真实 NUS 地点、路线、开放、access 或官方身份。
- 不能宣称 AI summary、smart insight、verified arrival 或真实环境推断。
- 不能宣称 production ready、可部署、可收真实数据或已达到 PRD 门槛。
