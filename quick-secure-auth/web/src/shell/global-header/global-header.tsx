import React from "react";
import {
  Sidebar as SidebarIcon,
  ChevronDown,
  MagnifyingGlass,
  Sparkle,
  CircleQuestionMark,
  Bell,
} from "@safetyculture/icons-react";
import { Input } from "../../ds/input";
import type { GlobalHeaderProps } from "./types";

function HeaderIconButton({
  children,
  "aria-label": ariaLabel,
  onClick,
}: {
  children: React.ReactNode;
  "aria-label": string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 rounded-sm text-surface-default hover:bg-surface-hover transition-colors duration-100 [&>svg]:w-[18px] [&>svg]:h-[18px] shrink-0"
    >
      {children}
    </button>
  );
}

export function GlobalHeader({
  orgName,
  orgInitials,
  onToggleSidebar,
  hasNotification = false,
}: GlobalHeaderProps) {
  return (
    <header className="flex items-center gap-1 h-[52px] px-4 bg-surface-default border-b border-surface-weakest shrink-0">
      {/* Sidebar toggle */}
      <HeaderIconButton aria-label="Toggle sidebar" onClick={onToggleSidebar}>
        <SidebarIcon />
      </HeaderIconButton>

      {/* Content row */}
      <div className="flex flex-1 items-center justify-between min-w-0">
        {/* Org switcher */}
        <button
          type="button"
          className="flex items-center gap-2 px-1 py-1 rounded-sm hover:bg-surface-hover transition-colors duration-100 max-w-[240px] shrink-0"
        >
          {/* Org logo tile */}
          <span className="flex items-center justify-center w-[30px] h-[30px] rounded-sm bg-default shrink-0 body-sm-strong text-surface-default select-none">
            {orgInitials}
          </span>
          <span className="body-md-strong text-surface-default truncate">{orgName}</span>
          <span className="[&>svg]:w-4 [&>svg]:h-4 text-surface-default shrink-0">
            <ChevronDown />
          </span>
        </button>

        {/* Search */}
        <Input
          size="medium"
          placeholder="Search"
          leftIcon={<MagnifyingGlass />}
          style={{ width: 300 }}
          aria-label="Search"
        />

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <HeaderIconButton aria-label="AI features">
            <Sparkle />
          </HeaderIconButton>
          <HeaderIconButton aria-label="Help">
            <CircleQuestionMark />
          </HeaderIconButton>
          {/* Bell with optional notification dot */}
          <span className="relative">
            <HeaderIconButton aria-label="Notifications">
              <Bell />
            </HeaderIconButton>
            {hasNotification && (
              <span
                aria-hidden
                className="absolute top-0 right-0 w-[10px] h-[10px] rounded-full bg-negative-default border-2 border-surface-default"
              />
            )}
          </span>
        </div>
      </div>
    </header>
  );
}
