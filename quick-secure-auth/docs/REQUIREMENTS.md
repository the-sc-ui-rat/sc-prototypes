# REQUIREMENTS.md — Quick Secure Auth

_Source of truth for all flows, screens, and acceptance criteria._
_Last updated: 2026-03-17_

---

## Flows

### Flow 1 — Default entry: personal device / first-use (passwordless configured)

> FLW on a personal device or a device where org context isn't pre-loaded.
> Assumption: admin has configured passwordless, FLW is enrolled in Oloid.

| Step | Screen | What happens |
|---|---|---|
| 1 | Welcome | FLW sees SC illustration + tagline + "Sign up for free" / "Log in" |
| 2 | Log in | FLW taps "Log in" → enters email or username → taps "Continue" |
| 3 | Face scan | System checks user config → routes to Oloid face scan. Camera feed fills screen. SC logo top-centre. Secondary affordances at bottom: QR Code \| Username and password \| Tap NFC tag |
| 4 | Confirmation card | Oloid returns match. Camera still fills screen. Bottom card slides up: user avatar + "Welcome back [Name]" + email. Auto-advances after 2s. |
| 5 | Home | FLW lands on their org home (Southern Logistics pattern): org header, stat cards, in-progress inspections, agenda |

**Failure states (step 3):**
- Face not recognised → card stays hidden → fallback row becomes prominent → FLW taps QR / Username+password
- Username not found → inline error on Log in screen: "We couldn't find that account"
- Network error → offline banner, PIN fallback offered

---

### Flow 2 — Shared device: face-first (org pre-configured)

> Device is pre-loaded with org/site context. FLW picks it up cold.
> No username entry — face is the identity claim.

| Step | Screen | What happens |
|---|---|---|
| 1 | Idle / lock | Last user chip, "Sign in with Face ID" primary CTA, QR + Password secondary affordances, site footer |
| 2 | Face scan | Oval + animated border. idle → detecting → scanning (Oloid API) → recognised |
| 3 | Confirmation | "Welcome back, [First Name]" + avatar + role. Auto-transitions in 1.8s. |
| 4 | Home | Same home screen as Flow 1 |

**Failure states:**
- Not recognised → oval turns red → retry + fallback sheet (QR / Password)
- Unenrolled → "Face not set up" distinct path → QR fallback

---

### Flow 3 — QR code fallback (1st fallback for both flows)

> Primary Oloid method fails OR FLW doesn't have face enrolled.

| Step | Screen | What happens |
|---|---|---|
| 1 | QR scan | Camera opens in QR mode. Instruction: "Scan the QR code on your device/email" |
| 2 | Matched | QR decoded → user matched → confirmation card → home |
| 3 | QR not valid | Error inline. Option to request new QR from admin. |

---

### Flow 4 — Username + password fallback (2nd fallback)

> QR unavailable or FLW prefers it. Last resort before "Contact admin".

| Step | Screen | What happens |
|---|---|---|
| 1 | Username + password | Standard login card. Username pre-filled if known from Flow 1 step 2. |
| 2 | Success | Confirmation card → home |
| 3 | Wrong credentials | Inline error. "Forgot password?" link. After 3 failures: show "Contact admin". |

---

### Flow 5 — Fast-user switching (online, shared device)

> Mid-shift swap. Previous user's session is visible. New worker authenticates.

| Step | Screen | What happens |
|---|---|---|
| 1 | Idle (mid-session) | "Switch user" chip instead of "Sign in". Previous user's name + avatar visible. |
| 2 | Face scan | Same scan screen. Previous user's details dimmed in background. |
| 3 | Recognised — new user | New user's confirmation card. Previous session cleared. |
| 4 | Home | New user's home |

---

### Flow 6 — First-time registration: Oloid enrollment _(future)_

> Admin sends invite → FLW registers face + NFC badge once → done.

_Not in current scope. Designed separately._

### Flow 7 — Offline fast-user switching _(future)_

> Glencore blocker. Zero network dependency. Local credential cache.

_Design after Flow 5 is validated._

---

## Scenarios (from Figma node 995:63)

| # | Scenario | Primary shown | Notes |
|---|---|---|---|
| A | Face-first org | Face scan (passive) | NFC + QR as secondary affordances |
| B | NFC-first org | NFC tap zone (large) | Face + QR as secondary affordances |
| C | Face fails | Fallback row appears | NFC → QR → Employee ID → Admin |
| D | NFC fails / no badge | Fallback row appears | Face → QR → Employee ID → Admin |
| E | New starter, no credentials | "Contact your admin" CTA | QR code the admin scans to issue invite |
| F | Offline, biometrics unavailable | PIN entry only | Offline banner — no spinner, no error state |
| G | Fast user switching (mid-shift) | Same as A or B | Previous user chip, "Switch user" not "Sign in" |

---

## Always-visible idle screen elements (shared device)

- Org logo + site label
- Last user + time signed out
- All available auth affordances visible (face / NFC / QR) — tapping any starts that method
- Default method has subtle active state (pulsing, larger)

---

## On auth failure

- Failed method dims
- Remaining methods become prominent
- PIN entry appears at bottom as last option
- "Contact admin" always reachable, never a dead end
