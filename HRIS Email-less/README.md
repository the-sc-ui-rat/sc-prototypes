# HRIS Email-less Prototypes

---

Clickable web prototypes covering the HRIS integration setup and bulk user management flows for SafetyCulture. Built with React + Vite + Tailwind CSS and deployed on Vercel.

---

## 1. Setup HRIS Integration

Covers admin configuration of an HRIS provider connection and the email-less login feature — enabling frontline workers to log in with a username and Organisation ID instead of an email address.

| Flow | Description | Link |
|------|-------------|------|
| Admin settings — Login tab | Enable email-less login, copy org ID, share login link and QR code | [app-two-vert.vercel.app/?flow=admin](https://app-two-vert.vercel.app/?flow=admin) |
| Users list — email-less filter | View and filter email-less users in the organisation | [app-two-vert.vercel.app/?flow=users](https://app-two-vert.vercel.app/?flow=users) |
| FLW login — invite link flow | Email-less frontline worker login via username + org ID | [app-two-vert.vercel.app/?flow=invite](https://app-two-vert.vercel.app/?flow=invite) |
| FLW login — default SC login | Standard SafetyCulture email login entry point | [app-two-vert.vercel.app](https://app-two-vert.vercel.app) |

---

## 2. Bulk CSV Upload

Multi-step flow for admins to add or update users in bulk via CSV file.

| Flow | Description | Link |
|------|-------------|------|
| CSV upload wizard | Full 4-step flow: Upload → Map columns → Review → Summary | [app-two-vert.vercel.app/?flow=redesign](https://app-two-vert.vercel.app/?flow=redesign) |

### 2.1 Bulk CSV Exploration

Early design exploration of the CSV upload experience — focused on the column mapping and review steps for email-less users (users without an email address in the CSV).

| Flow | Description | Link |
|------|-------------|------|
| CSV exploration | Upload → Map columns → Review → Summary (email-less variant) | [app-two-vert.vercel.app/?flow=redesign](https://app-two-vert.vercel.app/?flow=redesign) |
