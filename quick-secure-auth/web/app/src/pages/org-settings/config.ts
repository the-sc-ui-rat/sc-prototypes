export type AuthMethod =
  | "facial-recognition"
  | "qr-code"
  | "nfc"
  | "rfid"
  | "username-password"

export type InactivityTimeout =
  | "15s"
  | "30s"
  | "1m"
  | "5m"
  | "15m"
  | "30m"

export interface AuthConfig {
  primaryMethod: AuthMethod
  firstFallback: AuthMethod
  secondFallback: AuthMethod
  inactivityTimeout: InactivityTimeout
}

export const AUTH_METHOD_LABELS: Record<AuthMethod, string> = {
  "facial-recognition": "Facial recognition",
  "qr-code": "QR code",
  "nfc": "NFC",
  "rfid": "RFID",
  "username-password": "Username and password",
}

export const TIMEOUT_LABELS: Record<InactivityTimeout, string> = {
  "15s": "After 15 seconds",
  "30s": "After 30 seconds",
  "1m": "After 1 minute",
  "5m": "After 5 minutes",
  "15m": "After 15 minutes",
  "30m": "After 30 minutes",
}

export const DEFAULT_AUTH_CONFIG: AuthConfig = {
  primaryMethod: "facial-recognition",
  firstFallback: "qr-code",
  secondFallback: "username-password",
  inactivityTimeout: "15s",
}

export interface PinConfig {
  pinLength: "4" | "6"
  maxAttempts: "3" | "5" | "10"
  pinExpiry: "never" | "30d" | "60d" | "90d"
}

export const DEFAULT_PIN_CONFIG: PinConfig = {
  pinLength: "4",
  maxAttempts: "5",
  pinExpiry: "never",
}

export const PIN_LENGTH_LABELS: Record<string, string> = {
  "4": "4 digits",
  "6": "6 digits",
}

export const MAX_ATTEMPTS_LABELS: Record<string, string> = {
  "3": "3 attempts",
  "5": "5 attempts",
  "10": "10 attempts",
}

export const PIN_EXPIRY_LABELS: Record<string, string> = {
  "never": "Never",
  "30d": "Every 30 days",
  "60d": "Every 60 days",
  "90d": "Every 90 days",
}

export const ORG_LOGIN_URL = {
  url: "https://app-two-vert.vercel.app/?flow=invite",
  orgId: "93463472",
}
