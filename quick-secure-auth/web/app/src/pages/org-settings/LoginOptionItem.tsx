import React from "react"
import { ChevronRight } from "@safetyculture/icons-react"
import { SwitchToggle } from "../../../../src/ds/switch-toggle"

interface LoginOptionItemProps {
  title: string
  description: React.ReactNode
  expanded: boolean
  onToggleExpand: () => void
  enabled: boolean
  onToggleEnabled: () => void
  disabled?: boolean
  children?: React.ReactNode
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
    <div className={`rounded-lg bg-surface-default border border-surface-weakest ${disabled ? "opacity-40" : ""}`}>
      <div
        className={`flex items-center gap-3 px-5 py-4 ${disabled ? "cursor-default" : "cursor-pointer"}`}
        onClick={disabled ? undefined : onToggleExpand}
      >
        <ChevronRight
          size={16}
          className={`text-surface-weaker shrink-0 transition-transform ${!disabled && expanded ? "rotate-90" : ""}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`body-sm font-semibold ${enabled && !disabled ? "text-surface-default" : "text-surface-weaker"}`}>
              {title}
            </span>
            {disabled && (
              <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-surface-weakest text-surface-weaker">
                Not available
              </span>
            )}
          </div>
          <div className="body-xs text-surface-weaker leading-4 mt-0.5">{description}</div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <SwitchToggle.Root
            checked={enabled}
            onCheckedChange={onToggleEnabled}
            disabled={disabled}
          />
        </div>
      </div>
      {expanded && children && (
        <div className="border-t border-surface-weakest pl-9 pr-3 py-3">
          {children}
        </div>
      )}
    </div>
  )
}
