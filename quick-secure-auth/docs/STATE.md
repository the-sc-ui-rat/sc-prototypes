# STATE.md — Quick Secure Auth

_Last updated: 2026-04-13_
_Method: ODD (Outcome-Driven Development)_

---

## Current phase

**Phase A — Foundation gaps** (in progress)

Outcomes 1 and 2 are partially built. Outcomes 4, 4b, 4c are not yet started.

---

## Outcome status

### Phase A — Foundation

| # | Outcome | Persona | Status | Notes |
|---|---|---|---|---|
| 1 | Sam configures passwordless login | Sam | ⚠️ In progress | Admin prototype live at `quick-secure-auth-admin.vercel.app`. Toggle + expand + dropdowns + inactivity timer exist. Gaps remain before verification. |
| 2 | Sam shares login link with workers | Sam | ⚠️ In progress | Share card UI (copy link + download QR) exists. Gaps remain before verification. |
| 3 | Jeeves opens the app | Jeeves | ⚠️ Partial | WelcomeScreen + LoadingScreen exist in Expo project. MDM deep link handling not built. |
| 4 | Jeeves enters his identifier | Jeeves | ⚠️ Partial | LoginScreen exists. Routes on `@` detection only — needs org auth config routing. |
| 4b | MDM deep link pre-scopes org | Jeeves | ❌ Not started | LoginScreen should pre-fill org context when arriving via MDM deep link. |
| 4c | better-auth.com + Oloid OAuth | Both | ❌ Not started | Shared auth infrastructure — Oloid as OAuth provider. Open question: does better-auth run on Vercel? |

### Phase B — Auth path gaps (parallel)

| # | Outcome | Persona | Status | Notes |
|---|---|---|---|---|
| 5 | Jeeves logs in via SSO | Jeeves | ⚠️ Verify | EmailPasswordScreen (SSO button) exists. Pixel-perfect Figma check pending. |
| 6 | Jeeves logs in via email + password | Jeeves | ⚠️ Verify | EmailPasswordScreen exists. Pixel-perfect Figma check pending. |
| 7 | Jeeves logs in email-less | Jeeves | ⚠️ Partial | PasswordScreen (username path) exists. Org ID pre-fill from MDM deep link not built. |
| 8 | Jeeves logs in via Oloid | Jeeves | ⚠️ Partial | KioskScreen + FaceAuthScreen + QRAuthScreen + NFCAuthScreen + RFIDAuthScreen all exist. Fallback chain must be wired from `org.authConfig` (Outcome 1) instead of static dev bar. |

### Phase C — Completion

| # | Outcome | Persona | Status | Notes |
|---|---|---|---|---|
| 9 | Auth success | Both | ⚠️ Verify | IdentityConfirmScreen exists. Must show correct name + org for all auth paths. |
| 10 | Jeeves can't remember his username | Jeeves | ⚠️ Partial | ForgotScreen exists (email path only). Email-less recovery path not built. |

---

## Decisions log

| Date | Decision | Rationale |
|---|---|---|
| 2026-04-13 | Docs rewritten to ODD format | Project moved from GSD to ODD methodology. Milestones/Epics replaced by Phases/Outcomes. |
| 2026-04-13 | native/ replaced with SC-Oloid-Prototype | SC-Oloid-Prototype is the canonical FLW Expo prototype — more complete than the original native/ content. |
| 2026-03-17 | Oloid handles all methods: face, QR, NFC, RFID | All confirmed for customer use. Not exploratory. |
| 2026-03-17 | Fast-user switching: online first, offline later | Offline (Glencore blocker) requires local face matching — engineering decision. Prototype online first. |
| 2026-03-17 | Camera is simulated in prototype | No expo-camera dependency. Dark bg + oval overlay is sufficient for FLW customer testing. |
| 2026-03-17 | Auto-trigger camera on app open: rejected | FLW-dude: surveillance feel, fails on PPE, breaks always-on mounted deployments. Auth initiates on tap only. |

---

## Prototype output contract

Expo prototype screens are **design artefacts for customer validation**, not engineering deliverables.

When a flow is validated, the output to engineering is:
1. Figma link (visual spec)
2. Expo prototype link / Expo Go QR (interaction reference)
3. `/native-handoff` output doc (annotated spec for Sarina + Andrew)

Sarina (Kotlin/Compose) and Andrew (SwiftUI) rebuild natively from these three inputs.

---

## Open questions

1. Does better-auth.com run cleanly on Vercel? (Outcome 4c — raised by Luke Donnet, not yet confirmed)
2. Is "Log in with code" (temp code to email) the same action as the password reset link, or a separate flow? (Outcome 10)

---

## Figma references

| Screen / section | Node ID | Description |
|---|---|---|
| Admin login settings | 1002:7977 | Organization Settings > Login tab |
| Flow 1 sequence | 1035:10470 | All 5 FLW screens |
| Face scan | 1002:7508 | Camera + oval + secondary affordances |
| Confirmation | 1035:6952 | Welcome card slide-up |
| Scenario overview | 995:63 | 7 scenarios + 5 flow cards |
