---
artifact: implementation-council-disposition
date: 2026-08-30
scope: local-portfolio-prototype-only
evidence_effect: none
verdict: validate-first
---

# Implementation council disposition

Product interaction, visual design, and implementation architecture reviewed the same user authorization, D-017, fixtures, and each other’s memo. The root product-engineering lead made the following implementation decisions.

| Dispute or tension | Inputs | Final disposition |
|---|---|---|
| Five anchors versus fail-closed route eligibility | Interaction initially proposed five anchors including stale/unsupported; architecture required every executable route anchor to be usable | Six total prompts: four current/low-confidence anchors in the active route, plus stale and unsupported examples outside the route. The user can inspect but cannot check in or write there. |
| Visual dials | Initial working read was 6/3/6; visual reviewer recommended 5/3/5 after seeing the multi-step product flow | Adopt 5/3/5. The result keeps a distinctive cartographic composition while reducing ornament and density on mobile. |
| Map interactivity | Visual memo considered presentation-only SVG; interaction required map/list equivalence | Every marker is a 44px DOM button and shares selection/status with the complete anchor list. The list remains sufficient when the map is removed. |
| Stop flow | One-step stop maximises escape; immediate termination risks accidental loss of flow | One visible `Stop and exit` action opens a single safety/help dialog. One explicit confirmation makes the session terminal. No completion penalty or navigation advice is shown. |
| Undo duration and scope | Visual initially suggested a timed toast; interaction required dependable correction | Undo stays in the action tray and only applies to committed observation/status changes. It is not used for hard delete. |
| Draft versus committed data | A simple reducer risked showing unsaved content as committed evidence | Drafts persist separately and never enter recap. Commit is saved before the reducer publishes it; failure keeps the prior committed projection and current draft. |
| Hard delete versus reset | Reversible reset would retain old text in history | Hard delete has a separate action, removes and reads back the namespace, then clears current, draft, check-in, and history state. Downloaded files remain outside control. |
| Offline implementation | Architecture preferred generated precache; the slice had no server or dynamic asset graph | A small same-origin service worker caches the loaded Vite shell. Production-preview tests prove warm offline on desktop/mobile and inspect caches for no session entry. Cold-start offline remains explicitly unsupported. |
| Multi-tab support | Full CAS is unavailable in Web Storage; silent overwrite is unacceptable | Compare an opaque last-observed envelope on every durable write, pause on every external session-key event, and require explicit reload. Record this as best effort, not production concurrency. No real data is authorised. |
| Recap and AI | A model seam could imply future AI capability | Only a synchronous deterministic adapter is enabled. The model adapter is explicitly unavailable, has no SDK/key/provider, and is not a fallback. |

The three council memos are design inputs, not product evidence. Their final shared conclusion remains **Validate first**, and the PRD threshold is not met.

The later direct-experience acceptance audit, fixes, three independent post-fix rereviews, final counts, and local-only `Ready` ruling are recorded in [experience-acceptance-council.md](./experience-acceptance-council.md). That ruling does not expand this scope.
