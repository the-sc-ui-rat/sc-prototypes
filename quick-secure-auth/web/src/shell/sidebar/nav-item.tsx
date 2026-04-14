import React from "react";
import { ChevronRight } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { NavItemProps } from "./types";

const navItemVariants = tv({
  base: [
    "flex items-center gap-0.5 px-2 py-1.5 rounded-sm w-full",
    "label-md cursor-pointer select-none",
    "transition-colors duration-100",
  ],
  variants: {
    active: {
      true: "bg-accent-weakest text-accent-on-weaker",
      false: "text-surface-default hover:bg-surface-hover",
    },
  },
  defaultVariants: { active: false },
});

const iconSlotVariants = tv({
  base: "flex items-start p-1 flex-none [&>svg]:w-4 [&>svg]:h-4",
});

export function NavItem({ icon, label, active = false, chevron, onClick }: NavItemProps) {
  return (
    <button type="button" className={navItemVariants({ active })} onClick={onClick}>
      <span className={iconSlotVariants()}>{icon}</span>
      <span className="flex-1 min-w-0 text-left">{label}</span>
      {chevron && (
        <span className="flex items-start p-1 flex-none [&>svg]:w-4 [&>svg]:h-4">
          <ChevronRight />
        </span>
      )}
    </button>
  );
}
