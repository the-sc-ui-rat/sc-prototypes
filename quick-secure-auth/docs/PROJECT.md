# PROJECT.md — Quick Secure Auth

_Lead designer: Josh Ratnasingham_
_Last updated: 2026-03-17_

---

## Mission

Define and prototype the complete FLW authentication experience across shared devices, personal devices, and fast-user switching — so SafetyCulture customers can pick up any device and get to work in seconds, without typing.

---

## What this project covers

Three authentication contexts, all using Oloid as the underlying provider:

| Context | Description | Primary method |
|---|---|---|
| **Shared device** | Pooled handheld tablets (majority use case). Device is pre-configured for an org/site. Workers pick it up, authenticate, use it, hand it back. | Face or NFC — no typing ever |
| **Personal device** | Worker's own iOS/Android device. Org context detected from account. | SSO → face → email+OTP → password (last resort) |
| **Fast-user switching** | Mid-shift swap on a shared device. Previous user's session visible. New worker authenticates without restarting. | Face or badge tap |

---

## Current SC auth baseline

Today SC asks the FLW to enter a username or email. The system then checks:
- Is this user email-less?
- Has the admin configured SSO, email-less, or passwordless?

Based on admin config the FLW is routed to the appropriate flow. We are designing the passwordless / face-first path through that routing.

**Existing web reference prototypes:**
- Default SC login: https://app-two-vert.vercel.app
- Invite link flow (email-less): https://app-two-vert.vercel.app/?flow=invite

These need to be recreated as native iOS + Android prototype screens.

---

## Auth provider: Oloid

Handles face recognition, QR, NFC, and RFID. No embeddable SDK — integration is via REST API. The camera UI is built by us; Oloid matches the face server-side. All four methods (face, QR, NFC, RFID) are confirmed for customer use.

---

## Stack

| Layer | Technology |
|---|---|
| iOS + Android prototype | Expo (React Native), Expo Go |
| Web reference | React + Vite + TypeScript + Tailwind → Vercel (app-two-vert.vercel.app) |
| Auth mock | services/oloidMock.ts — simulates Oloid API, 1.8s latency |

---

## Design tokens (SC)

```
accent:              #6559ff   on-accent: #ffffff
base (screen bg):    #e9edf6   surface (card): #ffffff
text-surface:        #1f2533   text-surface-weaker: #3f495a
negative:            #cc3340
```

Figma: AgobZRogf7oW99qO3HsvvI (Authentication)

---

## Non-negotiables

- No spinners — show state, not waiting
- No email + password as primary or secondary on a shared device
- Min touch target 44dp/pt
- Tablet-first: max 480dp/pt content width
- Haptics on: successful auth, failed auth, face recognised, badge tap
- Privacy by default: clear previous user session on sign-out
- Auth method priority is org/site-configurable, not hardcoded

---

## Auth tiers

| Tier | Type | Methods |
|---|---|---|
| 1 — Primary | Passive biometric | Face (Oloid), NFC badge |
| 2 — Secondary | Active physical token | QR code, RFID, NFC tap |
| 3 — Fallback | Knowledge factor | Username + password, PIN, Contact admin |

---

## Team

- **Josh Ratnasingham** — Lead designer (FLW auth experience)
- **Sarina Lu** — Android engineer (Kotlin + Jetpack Compose)
- **Andrew Bui** — iOS engineer (SwiftUI)
- **Oloid** — auth platform partner
