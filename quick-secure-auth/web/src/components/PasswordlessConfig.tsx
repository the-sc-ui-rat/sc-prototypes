import { toast } from "sonner"
import { Dropdown } from "./Dropdown"
import type { AuthConfig, AuthMethod, InactivityTimeout } from "../state/org-config"
import { AUTH_METHOD_LABELS, TIMEOUT_LABELS } from "../state/org-config"

interface PasswordlessConfigProps {
  config: AuthConfig
  onConfigChange: (config: AuthConfig) => void
  disabled?: boolean
}

const AUTH_METHODS: AuthMethod[] = [
  "facial-recognition",
  "qr-code",
  "nfc",
  "username-password",
]

const TIMEOUTS: InactivityTimeout[] = ["15s", "30s", "1m", "5m", "15m", "30m"]

interface ConfigRowProps {
  title: string
  description: string
  children: React.ReactNode
}

function ConfigRow({ title, description, children }: ConfigRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-text-default">{title}</div>
        <div className="text-xs text-text-weak leading-4 mt-0.5">{description}</div>
      </div>
      {children}
    </div>
  )
}

export function PasswordlessConfig({ config, onConfigChange, disabled }: PasswordlessConfigProps) {
  const update = (patch: Partial<AuthConfig>) => {
    onConfigChange({ ...config, ...patch })
    toast.success("Saved")
  }

  const firstFallbackOptions = AUTH_METHODS.filter(
    (m) => m !== config.primaryMethod
  )
  const secondFallbackOptions = AUTH_METHODS.filter(
    (m) => m !== config.primaryMethod && m !== config.firstFallback
  )

  return (
    <div className={`flex flex-col gap-2 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <ConfigRow
        title="Primary authentication method"
        description="The device focuses on this method — it takes up the full screen when a worker approaches."
      >
        <Dropdown
          value={config.primaryMethod}
          options={AUTH_METHODS}
          labels={AUTH_METHOD_LABELS}
          disabled={disabled}
          onChange={(v) => {
            const patch: Partial<AuthConfig> = { primaryMethod: v as AuthMethod }
            if (v === config.firstFallback)
              patch.firstFallback = firstFallbackOptions.find((m) => m !== v) ?? AUTH_METHODS[1]
            if (v === config.secondFallback)
              patch.secondFallback = secondFallbackOptions.find((m) => m !== v) ?? AUTH_METHODS[2]
            update(patch)
          }}
        />
      </ConfigRow>
      <ConfigRow
        title="First fallback"
        description="Shown as a persistent alternative at the bottom of the sign-in screen"
      >
        <Dropdown
          value={config.firstFallback}
          options={firstFallbackOptions}
          labels={AUTH_METHOD_LABELS}
          disabled={disabled}
          onChange={(v) => {
            const patch: Partial<AuthConfig> = { firstFallback: v as AuthMethod }
            if (v === config.secondFallback)
              patch.secondFallback = secondFallbackOptions.find((m) => m !== v) ?? AUTH_METHODS[2]
            update(patch)
          }}
        />
      </ConfigRow>
      <ConfigRow
        title="Second fallback"
        description="Shown alongside the first fallback as a second persistent alternative"
      >
        <Dropdown
          value={config.secondFallback}
          options={secondFallbackOptions}
          labels={AUTH_METHOD_LABELS}
          disabled={disabled}
          onChange={(v) => update({ secondFallback: v as AuthMethod })}
        />
      </ConfigRow>
      <ConfigRow
        title="Logout after inactivity"
        description="Set the inactivity period before workers must re-authenticate"
      >
        <Dropdown
          value={config.inactivityTimeout}
          options={TIMEOUTS}
          labels={TIMEOUT_LABELS}
          disabled={disabled}
          onChange={(v) => update({ inactivityTimeout: v as InactivityTimeout })}
        />
      </ConfigRow>
    </div>
  )
}
