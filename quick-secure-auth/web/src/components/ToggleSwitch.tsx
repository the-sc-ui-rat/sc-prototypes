import { Check } from "lucide-react"

interface ToggleSwitchProps {
  checked: boolean
  onChange: () => void
  disabled?: boolean
}

export function ToggleSwitch({ checked, onChange, disabled }: ToggleSwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
        disabled
          ? "opacity-40 cursor-not-allowed"
          : checked
            ? "bg-accent cursor-pointer"
            : "bg-border cursor-pointer"
      }`}
    >
      <span
        className={`inline-flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-[18px]" : "translate-x-0.5"
        }`}
      >
        {checked && <Check size={10} strokeWidth={3} className="text-accent" />}
      </span>
    </button>
  )
}
