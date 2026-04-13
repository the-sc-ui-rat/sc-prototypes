# STATE.md — Quick Secure Auth

_Last updated: 2026-03-17_

---

## Current milestone

Milestone 2 — Flow 1: Default entry

## Current epic

Epic 2.1 — Welcome screen (first screen in Flow 1)

## Status

### Built (Milestone 1 + partial Milestone 3)
- [x] Expo project initialised, SC tokens configured
- [x] IdleLockScreen — SC-branded idle state, last-user chip, 3 auth affordances (this is Flow 2 / shared device)
- [x] FaceScanScreen — oval animation, 5-state machine, mocked Oloid API, Austin Turner
- [x] oloidMock.ts — simulates POST /credentials/face/login, 1.8s latency
- [x] GSD docs rewritten to reflect full scope (all 7 flows, 7 scenarios)
- [x] README FLW table populated

### Next actions (Milestone 2 — Flow 1)
1. Welcome screen (Screen 1) — illustration + "Sign up for free" / "Log in"
2. Log in screen (Screen 2) — username field + routing logic
3. Face scan screen (Screen 3) — reuse/adapt FaceScanScreen, connect from login
4. Confirmation card (Screen 4) — camera bg + welcome card slide-up
5. Home screen (Screen 5) — Southern Logistics org home

---

## Decisions log

| Date | Decision | Rationale |
|---|---|---|
| 2026-03-17 | GSD docs rewritten with full scope | Original docs only covered shared device face auth. Scope is 3 contexts (shared, personal, fast-switch) + 7 flows. |
| 2026-03-17 | Flow 1 (default entry) built before Flow 2 polish | Gives customer testing a direct comparison to current SC baseline. |
| 2026-03-17 | Oloid handles all methods: face, QR, NFC, RFID | All confirmed for customer use. Not exploratory. |
| 2026-03-17 | Fast-user switching: online first, offline later | Offline (Glencore blocker) requires local face matching — architectural decision for engineering. Prototype online first. |
| 2026-03-17 | Handheld pool devices = primary context | Site visits confirm majority are handheld, not mounted. Design for handheld; mounted is a variation. |
| 2026-03-17 | Camera is simulated in prototype | No expo-camera dependency. Dark bg + oval overlay is sufficient for FLW customer testing. |
| 2026-03-17 | Auto-trigger camera on app open: rejected | FLW-dude: surveillance feel, fails on PPE, breaks always-on mounted deployments. Auth initiates on tap only. |
| 2026-03-16 | Expo over native Xcode/Android Studio | Expo Go makes sharing trivial; single codebase for iOS + Android. |
| 2026-03-16 | Reusing app-two-vert.vercel.app | Shared Vercel deployment with Email-less project (?flow parameter routing). |

---

## Prototype output contract

Expo prototype screens are **design artefacts for customer validation**, not engineering deliverables.

When a flow is validated, the output to engineering is:
1. Figma link (visual spec)
2. Expo prototype link / Expo Go QR (interaction reference)
3. `/native-handoff` output doc (annotated spec for Sarina + Andrew)

Sarina (Kotlin/Compose) and Andrew (SwiftUI) rebuild natively from these three inputs. They do not run or extend the Expo code.

---

## Reminder: set up Xcode

> When you have time — set up a bare Xcode project alongside the Expo folder using Andrew's method:
> 1. Create an empty iOS project in Xcode in a new folder
> 2. Run Claude Code inside that folder
> 3. Connect Figma MCP
> 4. Use it to generate SwiftUI screens directly for demos that need true native feel
>
> Not urgent for current prototype work. Revisit before handing off Flow 1 to Andrew.

---

## Blockers

None.

---

## Figma references

| Screen | Node ID | Description |
|---|---|---|
| Full Flow 1 sequence | 1035:10470 | Section containing all 5 screens |
| Welcome (#1) | 870:7672 | Illustration + Sign up / Log in |
| Log in (#2) | 1006:4853 | SC logo + username field + Continue |
| Face scan (#3) | 1002:7508 | Camera bg + SC logo + secondary auth |
| Confirmation (#4) | 1035:6952 | Camera bg + welcome card (Jane Smith) |
| Home (#5) | 1035:9841 | Southern Logistics home |
| Scenario overview | 995:63 | 7 scenarios table + 5 flow cards |
