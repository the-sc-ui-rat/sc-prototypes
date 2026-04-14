import React, { useState } from "react"
import { AlertDialog } from "../../../../src/ds/alert-dialog"
import { Button } from "../../../../src/ds/button"
import { Toaster, toast } from "sonner"
import { LoginOptionItem } from "./LoginOptionItem"
import { PasswordlessConfig } from "./PasswordlessConfig"
import { EmaillessConfig } from "./EmaillessConfig"
import { DEFAULT_AUTH_CONFIG, ORG_LOGIN_URL } from "./config"
import type { AuthConfig } from "./config"

type Feature = "passwordless" | "emailless"

const LABELS: Record<Feature, string> = {
  passwordless: "Passwordless login",
  emailless: "Log in without email",
}

const ENABLE_BODY =
  "This will immediately change how all workers log in across every enrolled device. Make sure your devices support the selected authentication method before enabling."
const DISABLE_BODY =
  "Workers currently signed in on shared devices will be immediately logged out and must re-authenticate. Make sure a fallback login method is available before disabling."

const TABS = ["Global settings", "Features", "Activity log", "Security", "SafetyCulture AI", "Login"]

export function OrgSettingsPage() {
  const [activeTab, setActiveTab] = useState("Login")
  const [passwordlessEnabled, setPasswordlessEnabled] = useState(false)
  const [emaillessEnabled, setEmaillessEnabled] = useState(false)
  const [authConfig, setAuthConfig] = useState<AuthConfig>(DEFAULT_AUTH_CONFIG)
  const [passwordlessExpanded, setPasswordlessExpanded] = useState(false)
  const [emaillessExpanded, setEmaillessExpanded] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [pending, setPending] = useState<{ feature: Feature; enabling: boolean } | null>(null)

  const requestToggle = (feature: Feature, currentlyEnabled: boolean) =>
    setPending({ feature, enabling: !currentlyEnabled })

  const confirmToggle = () => {
    if (!pending) return
    const { feature, enabling } = pending
    const snap = { passwordlessEnabled, emaillessEnabled, passwordlessExpanded, emaillessExpanded }

    if (feature === "passwordless") {
      setPasswordlessEnabled(enabling)
      if (enabling) setPasswordlessExpanded(true)
      else if (passwordlessExpanded) setPasswordlessExpanded(false)
    } else {
      setEmaillessEnabled(enabling)
      if (enabling) setEmaillessExpanded(true)
      else if (emaillessExpanded) setEmaillessExpanded(false)
    }
    setPending(null)

    toast.success(`${LABELS[feature]} ${enabling ? "enabled" : "disabled"}`, {
      duration: 25000,
      action: { label: "Undo", onClick: () => revert(snap) },
    })
  }

  const revert = (snap: typeof pending extends null ? never : {
    passwordlessEnabled: boolean; emaillessEnabled: boolean
    passwordlessExpanded: boolean; emaillessExpanded: boolean
  }) => {
    if (!snap) return
    setPasswordlessEnabled(snap.passwordlessEnabled)
    setEmaillessEnabled(snap.emaillessEnabled)
    setPasswordlessExpanded(snap.passwordlessExpanded)
    setEmaillessExpanded(snap.emaillessExpanded)
    toast.warning("Change reverted", { icon: "↩" })
  }

  return (
    <div className="px-16 pb-8">
      <Toaster position="bottom-center" />

      <h1 className="title-lg text-surface-default pt-6 pb-4">Organization settings</h1>

      {/* Tab bar */}
      <div className="flex gap-0 border-b border-surface-weakest mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              "px-4 py-2 body-sm font-medium -mb-px border-b-2 transition-colors",
              activeTab === tab
                ? "border-accent-default text-accent-default"
                : "border-transparent text-surface-weaker hover:text-surface-default",
            ].join(" ")}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Info banner */}
      {!bannerDismissed && (
        <div className="mb-4 flex items-start gap-3 rounded-sm px-4 py-3 bg-info-default">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
            <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5"/>
            <path d="M8 7v4M8 5.5v.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="flex-1 body-sm font-medium text-info-on-default">
            Any change here takes effect immediately across your entire organisation and all enrolled devices.
          </span>
          <button
            onClick={() => setBannerDismissed(true)}
            className="shrink-0 text-info-on-default opacity-70 hover:opacity-100 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* Login option cards */}
      <div className="rounded-xl p-3 flex flex-col gap-2 bg-base-default">
        <LoginOptionItem
          title="Passwordless login"
          description="Let users sign in without a password using face recognition, NFC, RFID, or QR codes. Ideal for shared devices and frontline teams."
          expanded={passwordlessExpanded}
          onToggleExpand={() => setPasswordlessExpanded((p) => !p)}
          enabled={passwordlessEnabled}
          onToggleEnabled={() => requestToggle("passwordless", passwordlessEnabled)}
        >
          <PasswordlessConfig
            config={authConfig}
            onConfigChange={setAuthConfig}
            disabled={!passwordlessEnabled}
          />
        </LoginOptionItem>

        <LoginOptionItem
          title="Log in without email"
          description={
            <>
              Enable login without an email address. Perfect for shared devices and frontline workers.{" "}
              <a href="#" className="text-accent-default underline">Learn more about email-less login</a>
            </>
          }
          expanded={emaillessExpanded}
          onToggleExpand={() => setEmaillessExpanded((p) => !p)}
          enabled={emaillessEnabled}
          onToggleEnabled={() => requestToggle("emailless", emaillessEnabled)}
        >
          <EmaillessConfig loginURL={ORG_LOGIN_URL} disabled={!emaillessEnabled} />
        </LoginOptionItem>

        <LoginOptionItem
          title="Mobile app pin authentication"
          description="Require users to set and enter a PIN to access the mobile app."
          expanded={false}
          onToggleExpand={() => {}}
          enabled={false}
          onToggleEnabled={() => {}}
          disabled
        />
      </div>

      <p className="mt-4 body-xs text-surface-weaker">
        All changes are logged in the{" "}
        <button className="underline hover:text-surface-default transition-colors">Activity log</button>.
      </p>

      {/* Confirm dialog */}
      {pending && (
        <AlertDialog.Root open onOpenChange={() => setPending(null)}>
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>
                {pending.enabling ? "Enable" : "Disable"} {LABELS[pending.feature]}?
              </AlertDialog.Title>
              <AlertDialog.Description>
                {pending.enabling ? ENABLE_BODY : DISABLE_BODY}
              </AlertDialog.Description>
              <div className="flex justify-end gap-2">
                <AlertDialog.Close>Cancel</AlertDialog.Close>
                <Button
                  variant={pending.enabling ? "primary" : "danger"}
                  size="medium"
                  onClick={confirmToggle}
                >
                  {pending.enabling ? "Enable" : "Disable"}
                </Button>
              </div>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      )}
    </div>
  )
}
