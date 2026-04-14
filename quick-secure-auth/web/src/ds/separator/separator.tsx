import React from "react";
import { Separator as BaseSeparator } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { SeparatorProps } from "./types";

const separatorVariants = tv({
  base: "shrink-0 bg-surface2-default",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px h-full",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

export const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => (
    <BaseSeparator
      ref={ref}
      orientation={orientation}
      className={separatorVariants({ orientation, className: className as string | undefined })}
      {...props}
    />
  )
);
Separator.displayName = "Separator";
