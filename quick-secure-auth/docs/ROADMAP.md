# ROADMAP.md — Quick Secure Auth

_Prototype-first. Build to validate with customers, not to hand off to engineers._
_Last updated: 2026-03-17_

---

## Milestone 1 — Foundation ✅

- [x] GSD docs created
- [x] Expo project initialised (native/)
- [x] SC design tokens configured (tokens.ts)
- [x] Vercel connected (app-two-vert.vercel.app)

---

## Milestone 2 — Flow 1: Default entry (current)

> FLW on personal device / first-use. Username → face auth → home.
> Figma reference: node 1035:10470

### Epic 2.1 — Welcome screen (Screen 1)
- [ ] Illustration (2 workers, chat bubbles, plane)
- [ ] Tagline: "Create checklists. Conduct inspections. Generate and share reports."
- [ ] "Sign up for free" primary button
- [ ] "Log in" secondary button

### Epic 2.2 — Log in screen (Screen 2)
- [ ] SC logo top-centre
- [ ] "Log in" heading
- [ ] "Email or username" field
- [ ] "Continue" primary button
- [ ] "Forgot username?" text link
- [ ] System routing logic: on Continue → check user config → route to face scan

### Epic 2.3 — Face scan screen (Screen 3)
- [ ] Full-screen camera feed (simulated)
- [ ] SC logo top-centre (light/white version)
- [ ] Oval overlay with animated border (SC accent → green on success)
- [ ] Mocked Oloid API call (1.8s latency → returns Austin Turner)
- [ ] "or sign in with" divider
- [ ] "QR Code" | "Username and password" secondary buttons
- [ ] "Tap NFC tag at the device" text link

### Epic 2.4 — Confirmation card (Screen 4)
- [ ] Camera feed persists as background
- [ ] Card slides up from bottom: user avatar + "Welcome back [Name]" + email
- [ ] Mint/light-green card tint (per Figma)
- [ ] Auto-advances to home after 2s

### Epic 2.5 — Home screen (Screen 5)
- [ ] Org header: "SL" avatar + "Southern Logistics" + dropdown arrow
- [ ] Bell + user avatar right actions
- [ ] Stat cards: "4 Training" + "3 Issues"
- [ ] "In progress 10" section: horizontal scroll of inspection cards
- [ ] Agenda section: All/Inspections/Actions tabs
- [ ] Accordion rows: Overdue / Today / Upcoming / No date
- [ ] Bottom nav: Home, Inspections, Actions, Training, More

---

## Milestone 3 — Flow 2: Shared device (face-first)

> Pre-configured org. FLW picks up device, no username entry.
> **Partially built** — IdleLockScreen + FaceScanScreen exist, need polish.

### Epic 3.1 — Idle / lock screen _(partially built)_
- [x] SC wordmark
- [x] Last-user chip
- [x] Face ID icon
- [x] "Sign in with Face ID" primary CTA
- [x] QR + Password secondary affordances
- [x] Site footer
- [ ] Org logo (replaces SC wordmark when org is configured)
- [ ] NFC affordance

### Epic 3.2 — Face scan screen _(partially built)_
- [x] Dark bg, oval, animated border
- [x] 5-state machine (idle → detecting → scanning → recognised → failed)
- [x] Mocked Oloid API
- [x] Fallback sheet on failure
- [ ] Connect to Flow 1 face scan (shared component)

---

## Milestone 4 — Fallback chain

### Epic 4.1 — QR code screen (Flow 3)
- [ ] Camera in QR mode
- [ ] Scan instruction
- [ ] Match → confirmation card
- [ ] Error state

### Epic 4.2 — Username + password (Flow 4)
- [ ] Login card (username pre-filled if known)
- [ ] Password field
- [ ] Error states (wrong credentials, 3-failure contact admin)

---

## Milestone 5 — Fast-user switching (Flow 5, online)

- [ ] "Switch user" chip variant on idle screen
- [ ] Previous user dimmed during scan
- [ ] New user confirmation + session clear

---

## Milestone 6 — First-time registration (Flow 6) _(future)_

Admin invite → face enrollment → NFC badge tap → done.

---

## Milestone 7 — Offline fast-user switching (Flow 7) _(future)_

Glencore blocker. Local credential cache. Zero network dependency.

---

## Build order rationale

Flow 1 first — it mirrors the existing SC auth baseline and gives us the most comparable surface for customer testing against what they use today. Flow 2 (shared device) is the target state but Flow 1 gives us the contrast story.
