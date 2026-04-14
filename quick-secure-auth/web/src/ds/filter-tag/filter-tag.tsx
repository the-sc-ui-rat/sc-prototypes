import React from "react";
import { XSymbol } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { FilterTagProps } from "./types";

const rootVariants = tv({
  base: [
    "inline-flex items-stretch border border-solid rounded-sm",
    "transition-colors duration-120",
    "has-[:disabled]:opacity-50 has-[:disabled]:pointer-events-none",
  ],
  variants: {
    size: {
      md: "h-10 body-sm",
      sm: "h-8 body-sm",
    },
    selected: {
      true:  "bg-accent-weaker text-accent-default border-accent-default",
      false: "bg-surface-default text-surface-default border-surface-default",
    },
  },
  defaultVariants: { size: "md", selected: false },
});

const labelVariants = tv({
  base: [
    "self-stretch flex items-center",
    "appearance-none border-0 bg-transparent shadow-none m-0",
    "font-[500] cursor-pointer text-inherit",
    "hover:bg-surface-hover transition-colors duration-120",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
  ],
  variants: {
    size: { md: "", sm: "" },
    removable: { true: "", false: "" },
  },
  compoundVariants: [
    { size: "md", removable: false, class: "px-3 rounded-sm" },
    { size: "md", removable: true,  class: "pl-3 pr-3 rounded-l-sm" },
    { size: "sm", removable: false, class: "px-2 rounded-sm" },
    { size: "sm", removable: true,  class: "pl-2 pr-2 rounded-l-sm" },
  ],
  defaultVariants: { size: "md", removable: false },
});

const removeVariants = tv({
  base: [
    "self-stretch flex items-center justify-center rounded-r-sm",
    "appearance-none bg-transparent shadow-none m-0",
    "border-0 border-l border-solid border-surface-default",
    "cursor-pointer transition-[opacity,background-color] duration-120 hover:opacity-100 hover:bg-surface-hover text-inherit",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
  ],
  variants: {
    size: {
      md: "px-3",
      sm: "px-2",
    },
  },
  defaultVariants: { size: "md" },
});

export const FilterTag = React.forwardRef<HTMLDivElement, FilterTagProps>(
  ({ size = "md", selected = false, onSelectedChange, onRemove, disabled, className, children, ...props }, ref) => {
    const removable = !!onRemove;
    return (
      <div ref={ref} className={rootVariants({ size, selected, className: className as string | undefined })} {...props}>
        <button
          type="button"
          className={labelVariants({ size, removable })}
          onClick={onSelectedChange ? () => onSelectedChange(!selected) : undefined}
          disabled={disabled}
          aria-pressed={selected}
        >
          {children}
        </button>
        {removable && (
          <button
            type="button"
            className={removeVariants({ size })}
            onClick={onRemove}
            disabled={disabled}
            aria-label="Remove filter"
          >
            <XSymbol size={size === "sm" ? 10 : 12} />
          </button>
        )}
      </div>
    );
  },
);

FilterTag.displayName = "FilterTag";
