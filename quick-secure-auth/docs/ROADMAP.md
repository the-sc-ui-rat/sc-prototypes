# ROADMAP.md — Quick Secure Auth

_Method: ODD (Outcome-Driven Development)_
_Prototype-first. Build to validate with customers, not to hand off to engineers._
_Last updated: 2026-04-13_

---

## Build sequence

```
Phase A:  1 (web) + 2 (web) → 3 (verify) → 4 + 4b + 4c
Phase B:  5 + 6 + 7 + 8  (parallel — gaps only)
Phase C:  9 (verify) → 10 (update)
```

Phase B cannot start until Phase A is fully verified.

---

## Phase A — Foundation gaps

### Outcome 1 — Sam configures passwordless login ⚠️ in progress

**Persona:** Sam | **Platform:** Web admin

- [x] Organization Settings > Login tab navigation
- [x] Three login option toggles (Passwordless, Shared device login, PIN — disabled)
- [x] Passwordless toggle expands: Primary method + First fallback + Second fallback dropdowns
- [x] Inactivity logout timer control
- [ ] Dropdown options match Oloid methods (face, QR, NFC, RFID)
- [ ] Primary method cannot be selected as a fallback
- [ ] `org.authConfig` contract exposed correctly for Outcome 8

### Outcome 2 — Sam shares the login link with workers ⚠️ in progress

**Persona:** Sam | **Platform:** Web admin

- [x] Org-specific URL visible in share card
- [x] Copy link button
- [x] Download QR code button
- [ ] Copied link and QR resolve to correct org-scoped login URL
- [ ] Verified that a device arriving via the link lands pre-scoped (no org ID entry)

### Outcome 3 — Jeeves opens the app ⚠️ partial

**Persona:** Jeeves | **Platform:** Expo (iPad)

- [x] WelcomeScreen — illustration + tagline + Sign up / Log in CTAs
- [x] LoadingScreen — transition state
- [ ] MDM deep link handling — pre-scopes org when arriving via Outcome 2 URL
- [ ] Active session bypass — landing directly in app if already authenticated

### Outcome 4 — Jeeves enters his identifier ⚠️ partial

**Persona:** Jeeves | **Platform:** Expo (iPad)

- [x] LoginScreen — username/email field + Continue
- [ ] Org auth config routing — checks `org.authConfig` to route to the correct auth flow
- [ ] Currently routes on `@` detection only — must route by actual org configuration

### Outcome 4b — MDM deep link pre-scopes org ❌ not started

**Persona:** Jeeves | **Platform:** Expo (iPad)

- [ ] LoginScreen pre-fills org context when opened via MDM deep link (Outcome 2 URL)
- [ ] Jeeves does not need to enter org ID when arriving via link

### Outcome 4c — better-auth.com + Oloid as OAuth provider ❌ not started

**Persona:** Both | **Platform:** Shared infrastructure

- [ ] better-auth.com configured with Oloid as OAuth provider
- [ ] SSO connection wired
- [ ] Shared auth infrastructure backing Outcomes 5–8
- ⚠️ Open question: does better-auth.com run on Vercel?

---

## Phase B — Auth path gaps (parallel)

All four outcomes can be built simultaneously once Phase A is verified.

### Outcome 5 — Jeeves logs in via SSO ⚠️ verify

**Persona:** Jeeves | **Platform:** Expo (iPad)

- [x] EmailPasswordScreen with SSO button exists
- [ ] Pixel-perfect check against Figma
- [ ] SSO wired to better-auth.com (Outcome 4c)

### Outcome 6 — Jeeves logs in via email + password ⚠️ verify

**Persona:** Jeeves | **Platform:** Expo (iPad)

- [x] EmailPasswordScreen (email + password path) exists
- [ ] Pixel-perfect check against Figma
- [ ] Produces `session.authToken` in correct shape

### Outcome 7 — Jeeves logs in email-less ⚠️ partial

**Persona:** Jeeves | **Platform:** Expo (iPad)

- [x] PasswordScreen (username path) exists
- [ ] Org ID pre-fill from MDM deep link context (requires Outcome 4b)
- [ ] Produces `session.authToken` in correct shape

### Outcome 8 — Jeeves logs in via Oloid (passwordless) ⚠️ partial

**Persona:** Jeeves | **Platform:** Expo (iPad)

- [x] KioskScreen — shared device idle/entry point
- [x] FaceAuthScreen — face recognition flow
- [x] NFCAuthScreen — NFC tap flow
- [x] RFIDAuthScreen — RFID flow
- [x] QRAuthScreen — QR code flow
- [x] AuthenticatingScreen — processing state
- [x] AuthFailedScreen — failure + fallback prompt
- [ ] Fallback chain wired from `org.authConfig` (Outcome 1) — currently uses static dev bar
- [ ] Auth method driven by org config, not dev toggle

---

## Phase C — Completion

### Outcome 9 — Auth success ⚠️ verify

**Persona:** Both | **Platform:** Expo (iPad)

- [x] IdentityConfirmScreen — name + org + welcome card
- [ ] Correct name + org shown for all auth paths (5, 6, 7, 8)
- [ ] Produced by a valid `session.authToken` in all cases

### Outcome 10 — Jeeves can't remember his username ⚠️ partial

**Persona:** Jeeves | **Platform:** Expo (iPad)

- [x] ForgotScreen — email recovery path exists
- [ ] Email-less recovery path — "Recover your account" two-path screen
- ⚠️ Open question: is "Log in with code" the same action as password reset link, or separate?

---

## Future (out of current scope)

- **Fast-user switching (online)** — mid-shift swap, previous user chip, new user scans
- **First-time registration** — admin invite → face enrollment → NFC badge
- **Offline fast-user switching** — Glencore blocker, local credential cache, zero network dependency
