# SC Prototypes

Interactive web prototypes built at SafetyCulture. Design exploration shipped to Vercel so stakeholders can actually click through it — not just view static screens in Figma.

---

## Email-less Authentication

A clickable mobile auth flow prototype for SafetyCulture users who don't have an email address associated with their account. Frontline workers log in with a username and Organisation ID rather than an email — this prototype explores what that flow should look and feel like on mobile, using SC design system tokens and components.

Covers three flows: standard email entry, email-less (QR code / login link), and admin configuration (enable email-less, generate invite links, download QR codes for physical locations).

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS 4  
**Built with:** Claude Code + Figma MCP

| Flow | Live |
|---|---|
| Default SC login | [app-two-vert.vercel.app](https://app-two-vert.vercel.app) |
| Admin flow | [app-two-vert.vercel.app/?flow=admin](https://app-two-vert.vercel.app/?flow=admin) |
| Invite link flow | [app-two-vert.vercel.app/?flow=invite](https://app-two-vert.vercel.app/?flow=invite) |

---

## Quick Secure Auth

Multi-platform prototype showcasing tiered authentication for frontline workers on shared devices. Two experiences in scope: **Admin** (org-level configuration) and **FLW** (frontline worker login via face auth).

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS 4 · Expo (iOS/Android)  
**Live:** [app-two-vert.vercel.app/?flow=admin](https://app-two-vert.vercel.app/?flow=admin)

---

*Prototypes here are production-quality — typed, tokenised against the SafetyCulture design system, and deployed. Not throwaway code.*
