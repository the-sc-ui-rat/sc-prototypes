# SC-PIN-Prototype

> Shared device login using a stored user list and 4-digit PIN.

Native prototype for the PIN-based frontline worker authentication flow on shared devices. A user selects their profile from a list of people who have previously authenticated on the device, then enters a 4-digit PIN to log in — no password required.

---

## Try the prototype

### FLW — Native (iOS + Android)

#### Option A — Expo Go (recommended)

1. Install **[Expo Go](https://expo.dev/go)** from the App Store or Google Play
2. Open this link on your device:

```
exp://u.expo.dev/cbc7ff8f-97f5-464f-8852-2de02e263574?channel-name=main
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
Login screen (email or username)
  └── Authenticating
        └── Home
              └── Switch user
                    ├── Select stored user → PIN entry → Authenticating → Home
                    └── Log in via email → Login screen
```

### Screens

| Screen | Description |
|--------|-------------|
| Login | Email / username entry for Glencore Mining |
| Authenticating | Loading state between auth and home |
| Home | SafetyCulture home — stat cards, agenda, bottom nav |
| Switch user | Searchable list of users who have authenticated on this device |
| PIN entry | 4-digit PIN pad with user avatar and name |

---

## Project structure

```
sc-pin-prototype/
└── native/             ← Expo React Native → Expo Go
    └── src/screens/
        ├── LoginScreen.tsx
        ├── SwitchUserScreen.tsx
        ├── PinEntryScreen.tsx
        ├── AuthenticatingScreen.tsx
        ├── HomeScreen.tsx
        ├── TransitionToHome.tsx
        └── home/       ← StatCard, AgendaRow, BottomNav
```

---

## Links

- EAS dashboard: https://expo.dev/accounts/theuirat/projects/SC-PIN-Prototype
- Figma (Authentication): https://www.figma.com/design/AgobZRogf7oW99qO3HsvvI
