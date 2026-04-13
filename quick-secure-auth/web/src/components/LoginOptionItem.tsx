import { type ReactNode } from "react"
import { ChevronRight } from "lucide-react"
import { ToggleSwitch } from "./ToggleSwitch"

interface LoginOptionItemProps {
  title: string
  description: ReactNode
  expanded: boolean
  onToggleExpand: () => void
  enabled: boolean
  onToggleEnabled: () => void
  disabled?: boolean
  children?: ReactNode
}

export function LoginOptionItem({
  title,
  description,
  expanded,
  onToggleExpand,
  enabled,
  onToggleEnabled,
  disabled,
  children,
}: LoginOptionItemProps) {
  return (
    <div
      className={`rounded-lg bg-surface border border-card-border ${disabled ? "opacity-40" : ""}`}
    >
      <div
        className={`flex items-center gap-3 px-5 py-4 ${disabled ? "cursor-default" : "cursor-pointer"}`}
        onClick={disabled ? undefined : onToggleExpand}
      >
        <ChevronRight
          size={16}
          className={`text-text-weak shrink-0 transition-transform ${
            !disabled && expanded ? "rotate-90" : ""
          }`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${enabled && !disabled ? "text-text-default" : "text-text-weak"}`}>{title}</span>
            {disabled && (
              <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-[#e9edf6] text-text-weak">
                Not available
              </span>
            )}
          </div>
          <div className="text-xs text-text-weak leading-4">{description}</div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <ToggleSwitch
            checked={enabled}
            onChange={onToggleEnabled}
            disabled={disabled}
          />
        </div>
      </div>
      {expanded && children && (
        <div className="border-t border-card-border pl-9 pr-3 py-3">
          {children}
        </div>
      )}
    </div>
  )
}
