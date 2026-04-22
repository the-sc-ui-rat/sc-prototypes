# SC Prototypes

Interactive prototypes built at SafetyCulture. Typed, tokenised against the SC design system, and deployed — not throwaway code.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS 4 · Expo (iOS/Android)  
**Built with:** Claude Code + Figma MCP

---

## SC-Oloid-Prototype

Multi-platform prototype for tiered authentication on shared devices using facial recognition, QR scan, and username/password fallbacks. Two personas: **Admin** (org-level configuration) and **FLW** (frontline worker login).

| Experience | Link |
|---|---|
| Admin setup (web) | [quick-secure-auth-admin.vercel.app](https://quick-secure-auth-admin.vercel.app/) |
| FLW login (Expo Go) | `exp://u.expo.dev/208a28d7-2399-4c80-adce-790038910163?channel-name=main` |

→ [Full docs](./quick-secure-auth/README.md)

---

## SC-PIN-Prototype

Native prototype for PIN-based shared device login. A frontline worker selects their profile from a stored list and enters a 4-digit PIN — no password required.

| Experience | Link |
|---|---|
| FLW login (Expo Go) | `exp://u.expo.dev/cbc7ff8f-97f5-464f-8852-2de02e263574?channel-name=main` |

→ [Full docs](./sc-pin-prototype/README.md)

---

## Email-less Authentication

Clickable mobile auth flow for SC users without an email address. Frontline workers log in with a username and Organisation ID. Covers three flows: standard email entry, email-less (QR code / login link), and admin configuration.

| Flow | Link |
|---|---|
| Default SC login | [app-two-vert.vercel.app](https://app-two-vert.vercel.app) |
| Admin flow | [app-two-vert.vercel.app/?flow=admin](https://app-two-vert.vercel.app/?flow=admin) |
| Invite link flow | [app-two-vert.vercel.app/?flow=invite](https://app-two-vert.vercel.app/?flow=invite) |
