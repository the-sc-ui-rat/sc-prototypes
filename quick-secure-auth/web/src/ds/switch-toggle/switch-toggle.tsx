import React from "react";
import { Switch as BaseSwitch } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { SwitchToggleRootProps, SwitchToggleThumbProps } from "./types";

const rootVariants = tv({
  base: [
    "relative inline-flex shrink-0 cursor-pointer rounded-full",
    "border border-solid border-surface-default bg-surface2-default",
    "shadow-sm transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
    "data-[checked]:bg-accent-default data-[checked]:border-accent-default",
    "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none",
  ],
  variants: {
    size: {
      md: "h-5 w-9",
      sm: "h-4 w-7",
    },
  },
  defaultVariants: { size: "md" },
});

const thumbVariants = tv({
  base: [
    "pointer-events-none absolute top-0.5 left-0.5",
    "rounded-full bg-white-default",
    "transition-transform duration-150",
  ],
  variants: {
    size: {
      md: "h-3.5 w-3.5 data-[checked]:translate-x-4",
      sm: "h-3 w-3 data-[checked]:translate-x-3",
    },
  },
  defaultVariants: { size: "md" },
});

const Root = React.forwardRef<HTMLButtonElement, SwitchToggleRootProps>(
  ({ className, size = "md", ...props }, ref) => (
    <BaseSwitch.Root ref={ref} className={rootVariants({ size, className: className as string | undefined })} {...props}>
      <BaseSwitch.Thumb className={thumbVariants({ size })} />
    </BaseSwitch.Root>
  )
);
Root.displayName = "SwitchToggle.Root";

export const SwitchToggle = { Root, Thumb: BaseSwitch.Thumb };
