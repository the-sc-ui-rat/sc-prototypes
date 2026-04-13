# Email-less Auth Flow

A clickable mobile auth flow prototype for SafetyCulture users who don't have an email address associated with their account. Built with Claude Code + Figma MCP.

## Live demos

| Flow | URL |
|---|---|
| Default SC login | https://app-two-vert.vercel.app |
| Admin flow | https://app-two-vert.vercel.app/?flow=admin |
| Invite link flow | https://app-two-vert.vercel.app/?flow=invite |

---

## What it is and what problem it solves

SafetyCulture supports "email-less" users — frontline workers who log in with a username and Organisation ID rather than an email address. This prototype explores what that auth flow should look and feel like on mobile, using the existing SC design system tokens and components.

It covers three flows:

### Email flow (standard entry point)
- **Welcome screen** — App entry point with illustration, Sign up for free + Log in CTAs

### Email-less flow (QR code / login link entry point)
- **Screen 1 — Enter username** with animated loading CTA on continue
- **Screen 2 — Enter password** with org ID pre-filled and show/hide toggle
- **Screen 3 — Forgot username or password?** with admin contact messaging
- **Loading screen** — white screen with pulsing purple dots
- **Home screen** — Agenda 3.0 home, showing what users land on after login

### Admin flow (enabling email-less for FLW staff)
Admins manage the email-less setup from the SafetyCulture web app. The flow covers:

- **Enable email-less** — Admin toggles on the email-less sign-up option for their organisation
- **Invite link** — Once enabled, a unique sign-up URL is generated for the org. Admin can copy the link to share directly with staff via any channel (chat, notice board, etc.)
- **QR code** — Admin can download a QR code that encodes the same invite URL. Designed to be printed and posted in physical locations (break rooms, site offices, lockers) so FLW staff can scan and self-enrol without needing an email address

A dev state picker lets you toggle between Default / Hover / Focus / Disabled / Error states without writing any code.

---

## How to set it up and run it

```bash
# 1. Navigate to the app folder
cd projects/Email-less/app

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open http://localhost:5173 in your browser.

The sticky toolbar at the top lets you jump between screens and toggle component states.

---

## Dependencies and prerequisites

- **Node.js** 18+
- **npm** 9+

### Key packages

| Package | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Dev server + build |
| TypeScript | 5.9 | Type safety |
| Tailwind CSS | 4 | Utility styling |
| lucide-react | 0.577 | Icons |

SC design tokens are vendored locally in `src/tokens.css`. When `@safetyculture/design-tokens` is published to npm, replace that file with the package import.

---

## How it was built

This prototype was built entirely with **Claude Code** using:
- **Figma MCP** — pulled designs pixel-perfect from the Authentication and Agenda 3.0 Figma files
- **Vercel CLI** — deployed in one command

Total build time: ~2 hours of prompting.
