import React from "react";
import { Toggle as BaseToggle } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { ToggleProps } from "./types";

const toggleVariants = tv({
  base: [
    "inline-flex items-center justify-center gap-1.5 rounded-sm border border-solid",
    "border-surface-default bg-surface-default text-surface-default",
    "label-md select-none",
    "cursor-pointer transition-colors duration-120",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
    "[&:not([data-disabled])]:hover:bg-surface-hover",
    "data-[pressed]:bg-accent-weaker data-[pressed]:text-accent-default data-[pressed]:border-accent-weak",
    "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none",
  ],
  variants: {
    size: {
      sm: "h-8 px-2 body-xs",
      md: "h-9 px-3",
      lg: "h-10 px-4",
    },
  },
  defaultVariants: { size: "md" },
});

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ size, className, ...props }, ref) => (
    <BaseToggle ref={ref} className={toggleVariants({ size, className: className as string | undefined })} {...props} />
  )
);
Toggle.displayName = "Toggle";
