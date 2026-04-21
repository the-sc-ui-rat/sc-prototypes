# Quick Secure Auth

> Enable any user to pick up any device for quick, secure access to SafetyCulture.

Multi-platform prototype showcasing tiered authentication for frontline workers on shared devices. Two personas in scope: **Sam** (admin — org-level configuration) and **Old Mate** (FLW — frontline worker login).

---

## Try the prototypes

### Admin — Web
Configure authentication methods at the organisation level.

**[Open Admin prototype →](https://quick-secure-auth-admin.vercel.app/)**

No setup required — opens in any browser.

---

### FLW — Native (iOS + Android)

The full shared-device login flow: facial recognition, QR scan, and username/password fallbacks.

#### Option A — Expo Go (recommended)

1. Install **[Expo Go](https://expo.dev/go)** from the App Store or Google Play
2. Open this link on your device:

```
exp://u.expo.dev/208a28d7-2399-4c80-adce-790038910163?channel-name=main
```

> Works on iPhone and iPad. No developer account needed.

#### Option B — Run locally

```bash
cd native/
npm install
npx expo start
```

Scan the QR code in the terminal with your device camera.

---

## Flow overview

```
Idle screen
  └── Tap to log in
        ├── Face scan (tap to simulate recognition)
        │     ├── ✓ Confirm card → Authenticating → Home
        │     ├── QR Code → QR scan screen → Authenticating → Home
        │     └── Username and password → Login form → Authenticating → Home
        └── (idle-after-auth: continue as last user or switch)
```

### Screens

| Screen | Description |
|--------|-------------|
| Idle | Shared device lock screen with workers illustration |
| Idle (returning user) | Shows last logged-in user, option to switch |
| Face scan | Live front camera, tap to simulate recognition |
| QR scan | Live back camera, torch toggle, tap to simulate scan |
| Username + password | Two-step: username → password + org ID |
| Authenticating | Loading state between auth and home |
| Home | SafetyCulture home — stat cards, agenda, bottom nav |

---

## Project structure

```
quick-secure-auth/
├── docs/               ← project context, requirements, roadmap
├── web/                ← React + Vite (Admin prototype → Vercel)
└── native/             ← Expo React Native (FLW prototype → Expo Go)
    └── src/screens/
        ├── IdleScreen.tsx
        ├── IdleAfterAuthScreen.tsx
        ├── FaceScanScreen.tsx
        ├── QRScanScreen.tsx
        ├── PasswordLoginScreen.tsx
        ├── AuthenticatingScreen.tsx
        ├── HomeScreen.tsx
        └── home/       ← StatCard, AgendaRow, BottomNav
```

---

## Links

- Admin prototype: https://quick-secure-auth-admin.vercel.app/
- EAS dashboard: https://expo.dev/accounts/theuirat/projects/SC-Oloid-Prototype
- Figma (Authentication): https://www.figma.com/design/AgobZRogf7oW99qO3HsvvI
