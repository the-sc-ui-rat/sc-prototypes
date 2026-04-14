import React from "react";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { ToggleGroupProps } from "./types";

const toggleGroupVariants = tv({
  base: [
    "inline-flex border border-solid bg-surface-default text-surface-default  border-surface-weak rounded-sm overflow-hidden",
    "[&>*]:border-none [&>*]:rounded-none",
  ],
  variants: {
    orientation: {
      horizontal: "flex-row [&>*+*]:border-l [&>*+*]:border-solid [&>*+*]:border-surface-weak" ,
      vertical: "flex-col [&>*+*]:border-t [&>*+*]:border-solid [&>*+*]:border-surface-weak ",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => (
    <BaseToggleGroup
      ref={ref}
      orientation={orientation}
      className={toggleGroupVariants({ orientation, className: className as string | undefined })}
      {...props}
    />
  )
);
ToggleGroup.displayName = "ToggleGroup";
