# Quick Secure Auth

> Enable any user to pick up any device for quick, secure access to SafetyCulture.

Multi-platform prototype showcasing tiered authentication for frontline workers on shared devices. Two personas in scope: **Sam** (admin — org-level configuration) and **Jeeves** (FLW — frontline worker login).

Built using [ODD (Outcome-Driven Development)](https://odd.studio). See `docs/` for the full plan.

---

## Prototypes

### Admin (Sam) — Web

| Prototype | Platform | Status | Link |
|---|---|---|---|
| Organization Settings > Login tab | Web | Live | [View →](https://quick-secure-auth-admin.vercel.app/) |

### FLW (Jeeves) — Native

| Prototype | Screens | Status | How to run |
|---|---|---|---|
| Shared device auth | Kiosk → Face / NFC / RFID / QR → Confirm → Home | Built | Expo Go — see `native/` |

To run the FLW prototype locally:
```
cd native/
npm install
npx expo start
```
Scan the QR with Expo Go on an iPad.

---

## Project structure

```
quick-secure-auth/
├── docs/
│   ├── PROJECT.md       ← project context and non-negotiables
│   ├── REQUIREMENTS.md  ← flows, screens, acceptance criteria
│   ├── ROADMAP.md       ← ODD phases and outcomes
│   ├── STATE.md         ← current build status per outcome
│   └── gsd-poster.html  ← historical GSD planning artifact
├── web/                 ← React + Vite (Admin prototype → Vercel)
└── native/              ← Expo (FLW prototype → Expo Go)
```

---

## Links

- Admin prototype: https://quick-secure-auth-admin.vercel.app/
- SC Auth Figma: https://www.figma.com/design/AgobZRogf7oW99qO3HsvvI
- Oloid: https://demo.oloid.com/
