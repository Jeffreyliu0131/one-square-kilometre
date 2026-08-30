# Known limitations and cannot-claim list

## Product and field limits

- No external product validation has been run. Evidence verdict: **Validate first**.
- The PRD remains `validation-ready draft / not approved`.
- Marshline Commons and all anchors are fictional. There is no NUS place, map, route, sponsor, or institutional approval.
- The map is an observation sketch, not navigation. It provides no directions, current position, distance, safety, opening, accessibility, or alternative-route assertion.
- Stale and unsupported examples demonstrate failure handling only.

## Runtime limits

- One small local session only. No account, sync, multi-user support, or cross-device recovery.
- `localStorage` is synchronous, unencrypted, and suitable only for this synthetic prototype.
- The fixture fingerprint detects accidental content drift within this build contract; it is not a signature, authenticity proof, or protection from a person who can change both source and fingerprint.
- Multi-tab writes use an opaque expected-envelope check plus storage-event pause. This blocks deterministic idle-tab overwrite but cannot eliminate a narrow simultaneous-write race because Web Storage has no atomic compare-and-swap.
- A note commit is limited to 800 characters. A draft can retain up to 4000 characters. Committed undo history is capped at 30 changes without eviction.
- A stopped session is terminal and never resumes the field task. Existing partial data can still be reviewed, corrected in the separate correction phase, exported, or deleted.
- Cold-start offline is unsupported. Warm offline requires one successful load and service-worker activation.
- The hand-written, versioned service worker caches same-origin app assets after a controlled online reload. It is not a production update or rollback system.
- No encryption at rest, secure erase, institutional retention policy, or privacy-law determination is provided.
- Downloaded exports, screenshots, and any note copied to the system clipboard are outside app deletion control and may be retained or synchronised elsewhere.

## Verification limits

- Automated browser evidence is Chromium only: desktop and Pixel 7 emulation.
- 320px, reduced motion, keyboard focus, axe, network deny, no-WebGL, warm offline, and local performance budgets are tested.
- Safari, Firefox, real mobile hardware, slow-device energy use, Windows high contrast, and manual VoiceOver are not verified.
- Automated axe results do not establish full WCAG conformance.
- Local timing and bundle budgets are engineering checks, not production SLOs.

## Explicitly cannot be claimed

- Product-market fit, demand, retention, willingness to walk, or user value.
- A safer, more accessible, more memorable, or more complete experience than a normal map or free walk.
- Validated observation change, completion change, memory change, or AI increment.
- Production readiness, approved release, deployability, field feasibility, or real-data suitability.
- Official NUS status or verified facts about any real place.
- AI summary, smart insight, verified arrival, or real-world environmental inference.
