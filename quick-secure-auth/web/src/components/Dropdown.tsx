import { ChevronDown } from "lucide-react"

interface DropdownProps {
  value: string
  options: string[]
  labels: Record<string, string>
  onChange: (value: string) => void
  disabled?: boolean
}

export function Dropdown({ value, options, labels, onChange, disabled }: DropdownProps) {
  return (
    <div className="relative w-[220px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full h-9 appearance-none rounded-[6px] border border-border bg-surface px-3 pr-8 text-sm text-text-default focus:outline-none focus:ring-2 focus:ring-accent ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {labels[opt]}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-weak"
      />
    </div>
  )
}
