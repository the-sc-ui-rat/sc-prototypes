# Quick Secure Auth

> Enable any user to pick up any device for quick, secure access to SafetyCulture.

Multi-platform prototype (iOS, Android, Web) showcasing tiered authentication for frontline workers on shared devices. Two experiences in scope: **Admin** (org-level configuration) and **FLW** (frontline worker login).

---

## Prototypes

### Admin

| Prototype | Platform | Status | Link |
|---|---|---|---|
| Admin enabling email-less | Web | Live | [View →](https://app-two-vert.vercel.app/?flow=admin) |
| Admin users page | Web | Live | [View →](https://app-two-vert.vercel.app/?flow=users) |

### FLW

| Prototype | Platform | Status | Link |
|---|---|---|---|
| Face auth — primary method (mocked Oloid) | iOS / Android (Expo Go) | Live | [View code →](./native/) |

> Shared Vercel deployment with the Email-less project (`projects/Email-less`).

---

## Project structure

```
quick-secure-auth/
├── docs/
│   ├── PROJECT.md       ← project context, loaded every session
│   ├── REQUIREMENTS.md  ← scenarios, flows, acceptance criteria
│   ├── ROADMAP.md       ← milestones and epics
│   └── STATE.md         ← current progress tracker
├── web/                 ← React + Vite (Vercel — shared with Email-less)
└── native/              ← iOS + Android
```

## Links

- Oloid: https://demo.oloid.com/
- SC Auth Figma: https://www.figma.com/design/AgobZRogf7oW99qO3HsvvI
