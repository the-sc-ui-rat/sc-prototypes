import React from "react"
import { toast } from "sonner"
import { Select as BaseSelect } from "@base-ui/react"
import { ChevronDown } from "@safetyculture/icons-react"
import { Select } from "../../../../src/ds/select"
import type { AuthConfig, AuthMethod, InactivityTimeout } from "./config"
import { AUTH_METHOD_LABELS, TIMEOUT_LABELS } from "./config"

const AUTH_METHODS: AuthMethod[] = [
  "facial-recognition",
  "qr-code",
  "nfc",
  "rfid",
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
        <div className="body-sm font-semibold text-surface-default">{title}</div>
        <div className="body-xs text-surface-weaker leading-4 mt-0.5">{description}</div>
      </div>
      {children}
    </div>
  )
}

interface AuthSelectProps {
  value: string
  options: string[]
  labels: Record<string, string>
  disabled?: boolean
  onChange: (v: string) => void
}

function AuthSelect({ value, options, labels, disabled, onChange }: AuthSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
      <BaseSelect.Trigger
        className={[
          "inline-flex items-center justify-between gap-2 min-w-44",
          "h-10 px-3 rounded-sm border border-solid",
          "bg-surface-default border-surface-default body-sm text-surface-default",
          "cursor-pointer select-none",
          "hover:border-accent-default transition-colors duration-120",
          "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
          "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none",
        ].join(" ")}
      >
        <span>{labels[value]}</span>
        <ChevronDown size={14} className="text-surface-weaker shrink-0" />
      </BaseSelect.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={4}>
          <Select.Popup>
            {options.map((opt) => (
              <Select.Item key={opt} value={opt}>
                {labels[opt]}
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}

interface PasswordlessConfigProps {
  config: AuthConfig
  onConfigChange: (config: AuthConfig) => void
  disabled?: boolean
}

export function PasswordlessConfig({ config, onConfigChange, disabled }: PasswordlessConfigProps) {
  const update = (patch: Partial<AuthConfig>) => {
    onConfigChange({ ...config, ...patch })
    toast.success("Saved")
  }

  const firstFallbackOptions = AUTH_METHODS.filter((m) => m !== config.primaryMethod)
  const secondFallbackOptions = AUTH_METHODS.filter(
    (m) => m !== config.primaryMethod && m !== config.firstFallback
  )

  return (
    <div className={`flex flex-col gap-2 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <ConfigRow
        title="Primary authentication method"
        description="This will be the only thing users see when authenticating"
      >
        <AuthSelect
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
        title="First fallback authentication method"
        description={`If ${AUTH_METHOD_LABELS[config.primaryMethod]} fails, users will be shown this method`}
      >
        <AuthSelect
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
        title="Second fallback authentication method"
        description={`If ${AUTH_METHOD_LABELS[config.firstFallback]} fails, users will be shown this method`}
      >
        <AuthSelect
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
        <AuthSelect
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
