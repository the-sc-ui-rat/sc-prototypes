import React from "react";
import { Cog, ChevronRight } from "@safetyculture/icons-react";
import { NavItem } from "./nav-item";
import type { SidebarProps } from "./types";

export function Sidebar({
  items,
  activeItem,
  open = true,
  userName,
  orgName,
  onItemSelect,
}: SidebarProps) {
  return (
    <aside
      data-open={open}
      className={[
        "flex flex-col h-full bg-surface-default border-r border-surface-weakest",
        "transition-[width] duration-200 overflow-hidden shrink-0",
        open ? "w-[230px]" : "w-0",
      ].join(" ")}
    >
      {/* Nav list */}
      <nav className="flex-1 overflow-y-auto p-2 flex flex-col gap-0">
        {items.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={item.id === activeItem}
            chevron={item.chevron}
            onClick={() => onItemSelect?.(item.id)}
          />
        ))}
      </nav>

      {/* User footer */}
      <div className="shrink-0 border-t border-surface-weakest p-2">
        <button
          type="button"
          className="flex items-center gap-0.5 px-2 py-1.5 rounded-sm w-full hover:bg-surface-hover transition-colors duration-100"
        >
          <span className="flex items-start p-1 flex-none [&>svg]:w-4 [&>svg]:h-4 text-surface-default">
            <Cog />
          </span>
          <span className="flex-1 min-w-0 text-left">
            <p className="label-md text-surface-default truncate">{userName}</p>
            <p className="body-xs text-surface-weaker truncate">{orgName}</p>
          </span>
          <span className="flex items-start p-1 flex-none [&>svg]:w-4 [&>svg]:h-4 text-surface-default">
            <ChevronRight />
          </span>
        </button>
      </div>
    </aside>
  );
}
