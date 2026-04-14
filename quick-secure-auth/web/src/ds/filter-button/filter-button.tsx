import React from "react";
import { BarsFilter } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { FilterButtonProps } from "./types";

const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center gap-1.5",
    "border border-solid rounded-sm",
    "font-[500] select-none cursor-pointer",
    "transition-colors duration-120",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  ],
  variants: {
    size: {
      md: "h-10 px-3 body-sm",
      sm: "h-8 px-2.5 body-sm",
    },
    active: {
      true: [
        "bg-accent-weaker border-accent-default text-accent-default",
        "hover:bg-accent-weaker-hover",
      ],
      false: [
        "bg-surface-default border-surface-default text-surface-default",
        "hover:bg-surface-hover",
      ],
    },
    collapsed: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { size: "md", collapsed: true, class: "w-10 px-0" },
    { size: "sm", collapsed: true, class: "w-8 px-0" },
  ],
  defaultVariants: { size: "md", active: false, collapsed: false },
});

const iconSizeMap: Record<NonNullable<FilterButtonProps["size"]>, number> = {
  md: 16,
  sm: 14,
};

export const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  (
    {
      size = "md",
      active = false,
      collapsed = false,
      count,
      icon,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const iconSize = iconSizeMap[size ?? "md"];
    const iconEl = icon
      ? React.cloneElement(icon, { size: iconSize })
      : <BarsFilter size={iconSize} />;

    const showBadge = count != null && count > 0;

    return (
      <span className="relative inline-flex">
        <button
          ref={ref}
          type="button"
          aria-pressed={active}
          className={buttonVariants({ size, active, collapsed, className: className as string | undefined })}
          {...props}
        >
          <span aria-hidden className="inline-flex shrink-0">
            {iconEl}
          </span>
          {!collapsed && (
            <span>{children ?? "Filters"}</span>
          )}
        </button>

        {showBadge && (
          <span
            aria-hidden
            className={[
              "absolute -top-2 -right-2",
              "min-w-[18px] h-[18px] px-1",
              "inline-flex items-center justify-center",
              "rounded-full bg-accent-default text-accent-on-default",
              "text-[10px] font-bold leading-none tracking-wide",
              "pointer-events-none select-none",
            ].join(" ")}
          >
            {count! > 99 ? "99+" : count}
          </span>
        )}
      </span>
    );
  },
);

FilterButton.displayName = "FilterButton";
