import { useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { PageHeader } from "./components/PageHeader"
import { LoginOptionItem } from "./components/LoginOptionItem"
import { PasswordlessConfig } from "./components/PasswordlessConfig"
import { EmaillessConfig } from "./components/EmaillessConfig"
import { ConfirmDialog } from "./components/ConfirmDialog"
import type { AuthConfig } from "./state/org-config"
import { DEFAULT_AUTH_CONFIG, ORG_LOGIN_URL } from "./state/org-config"
import { toast } from "sonner"

interface PendingToggle {
  feature: "passwordless" | "emailless"
  enabling: boolean
}

const ENABLE_BODY =
  "This will immediately change how all workers log in across every enrolled device. Make sure your devices support the selected authentication method before enabling."
const DISABLE_BODY =
  "Workers currently signed in on shared devices will be immediately logged out and must re-authenticate. Make sure a fallback login method is available before disabling."

const FEATURE_LABELS = {
  passwordless: "Passwordless login",
  emailless: "Shared device login",
}

export default function App() {
  const [passwordlessEnabled, setPasswordlessEnabled] = useState(false)
  const [emaillessEnabled, setEmaillessEnabled] = useState(false)
  const [authConfig, setAuthConfig] = useState<AuthConfig>(DEFAULT_AUTH_CONFIG)
  const [passwordlessExpanded, setPasswordlessExpanded] = useState(false)
  const [emaillessExpanded, setEmaillessExpanded] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [pendingToggle, setPendingToggle] = useState<PendingToggle | null>(null)

  const requestToggle = (feature: PendingToggle["feature"], currentlyEnabled: boolean) =>
    setPendingToggle({ feature, enabling: !currentlyEnabled })

  const confirmToggle = () => {
    if (!pendingToggle) return
    const { feature, enabling } = pendingToggle
    const snapshot = { passwordlessEnabled, emaillessEnabled, passwordlessExpanded, emaillessExpanded }

    if (feature === "passwordless") {
      setPasswordlessEnabled(enabling)
      if (enabling) setPasswordlessExpanded(true)
      else if (passwordlessExpanded) setPasswordlessExpanded(false)
    } else {
      setEmaillessEnabled(enabling)
      if (enabling) setEmaillessExpanded(true)
      else if (emaillessExpanded) setEmaillessExpanded(false)
    }
    setPendingToggle(null)
    const label = `${FEATURE_LABELS[feature]} ${enabling ? "enabled" : "disabled"}`
    toast.success(label, {
      duration: 25000,
      action: {
        label: "Undo",
        onClick: () => revertToSnapshot(snapshot),
      },
    })
  }

  const revertToSnapshot = (snapshot: {
    passwordlessEnabled: boolean
    emaillessEnabled: boolean
    passwordlessExpanded: boolean
    emaillessExpanded: boolean
  }) => {
    setPasswordlessEnabled(snapshot.passwordlessEnabled)
    setEmaillessEnabled(snapshot.emaillessEnabled)
    setPasswordlessExpanded(snapshot.passwordlessExpanded)
    setEmaillessExpanded(snapshot.emaillessExpanded)
    toast.warning("Change reverted", { icon: "↩" })
  }

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar />
      <main className="ml-[220px] pl-16 pr-8 pb-8">
        <div className="pt-2">
          <PageHeader />
          {!bannerDismissed && (
            <div className="mt-4 flex items-start gap-3 rounded-[6px] px-4 py-3" style={{ backgroundColor: "#0E8AD8" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5"/>
                <path d="M8 7v4M8 5.5v.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="flex-1 text-sm font-medium text-white">
                Any change here takes effect immediately across your entire organisation and all enrolled devices.
              </span>
              <button onClick={() => setBannerDismissed(true)} className="shrink-0 text-white opacity-70 hover:opacity-100 transition-opacity mt-0.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          )}
          <div className="mt-4 rounded-xl p-3 flex flex-col gap-2" style={{ backgroundColor: "#f1f3fb" }}>
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
              title="Shared device login"
              description={
                <>
                  Deploy a shared login link or QR code to devices so frontline workers can authenticate without individual email addresses.{" "}
                  <a href="#" className="text-accent underline">
                    Learn how to deploy this link to devices via MDM
                  </a>
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
          <p className="mt-4 text-xs text-text-weak">
            All changes are logged in the{" "}
            <button className="underline hover:text-text-default transition-colors">
              Activity log
            </button>
            .
          </p>
        </div>
      </main>
      {pendingToggle && (
        <ConfirmDialog
          title={`${pendingToggle.enabling ? "Enable" : "Disable"} ${FEATURE_LABELS[pendingToggle.feature]}?`}
          body={pendingToggle.enabling ? ENABLE_BODY : DISABLE_BODY}
          confirmLabel={pendingToggle.enabling ? "Enable" : "Disable"}
          confirmVariant={pendingToggle.enabling ? "accent" : "danger"}
          onConfirm={confirmToggle}
          onCancel={() => setPendingToggle(null)}
        />
      )}
    </div>
  )
}
