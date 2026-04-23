import React from "react"
import { toast } from "sonner"
import { Select as BaseSelect } from "@base-ui/react"
import { ChevronDown } from "@safetyculture/icons-react"
import { Select } from "../../../../src/ds/select"
import type { PinConfig as PinConfigType } from "./config"
import { PIN_LENGTH_LABELS, MAX_ATTEMPTS_LABELS, PIN_EXPIRY_LABELS } from "./config"

type PinLength = PinConfigType["pinLength"]
type MaxAttempts = PinConfigType["maxAttempts"]
type PinExpiry = PinConfigType["pinExpiry"]

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

function PinSelect<T extends string>({
  value, options, labels, disabled, onChange,
}: {
  value: T
  options: T[]
  labels: Record<string, string>
  disabled?: boolean
  onChange: (v: T) => void
}) {
  return (
    <Select.Root value={value} onValueChange={(v) => onChange(v as T)} disabled={disabled}>
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

interface PinConfigProps {
  config: PinConfigType
  onConfigChange: (config: PinConfigType) => void
  disabled?: boolean
}

const PIN_LENGTHS: PinLength[] = ["4", "6"]
const MAX_ATTEMPTS_OPTIONS: MaxAttempts[] = ["3", "5", "10"]
const PIN_EXPIRY_OPTIONS: PinExpiry[] = ["never", "30d", "60d", "90d"]

export function PinConfig({ config, onConfigChange, disabled }: PinConfigProps) {
  const update = (patch: Partial<PinConfigType>) => {
    onConfigChange({ ...config, ...patch })
    toast.success("Saved")
  }

  return (
    <div className={`flex flex-col gap-2 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <ConfigRow
        title="PIN length"
        description="Minimum number of digits required for each user's PIN"
      >
        <PinSelect
          value={config.pinLength}
          options={PIN_LENGTHS}
          labels={PIN_LENGTH_LABELS}
          disabled={disabled}
          onChange={(v) => update({ pinLength: v })}
        />
      </ConfigRow>
      <ConfigRow
        title="Maximum failed attempts"
        description="Users will be locked out after this many consecutive incorrect PIN entries"
      >
        <PinSelect
          value={config.maxAttempts}
          options={MAX_ATTEMPTS_OPTIONS}
          labels={MAX_ATTEMPTS_LABELS}
          disabled={disabled}
          onChange={(v) => update({ maxAttempts: v })}
        />
      </ConfigRow>
      <ConfigRow
        title="PIN expiry"
        description="Users will be prompted to set a new PIN after this period"
      >
        <PinSelect
          value={config.pinExpiry}
          options={PIN_EXPIRY_OPTIONS}
          labels={PIN_EXPIRY_LABELS}
          disabled={disabled}
          onChange={(v) => update({ pinExpiry: v })}
        />
      </ConfigRow>
    </div>
  )
}
