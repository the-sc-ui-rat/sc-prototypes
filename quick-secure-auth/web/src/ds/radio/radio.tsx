import React from "react";
import { Radio as BaseRadio, RadioGroup as BaseRadioGroup } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { RadioRootProps, RadioGroupProps } from "./types";

const rootVariants = tv({
  base: [
    "relative flex shrink-0 cursor-pointer items-center justify-center",
    "rounded-full border border-solid bg-surface-default border-surface-default",
    "transition-colors duration-120",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
    "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none",
  ],
  variants: {
    size: {
      lg: "h-5 w-5",
      md: "h-4 w-4",
    },
    error: {
      true: "border-negative-default [&:not([data-disabled])]:hover:border-negative-default data-[checked]:border-negative-default",
      false: "[&:not([data-disabled])]:hover:border-accent-default data-[checked]:border-accent-default",
    },
  },
  defaultVariants: { size: "lg", error: false },
});

const indicatorVariants = tv({
  base: [
    "rounded-full",
    "scale-0 data-[checked]:scale-100 transition-transform duration-150",
  ],
  variants: {
    size: {
      lg: "h-2.5 w-2.5",
      md: "h-2 w-2",
    },
    error: {
      true: "bg-negative-default",
      false: "bg-accent-default",
    },
  },
  defaultVariants: { size: "lg", error: false },
});

const Root = React.forwardRef<HTMLButtonElement, RadioRootProps>(
  ({ className, size = "lg", error = false, ...props }, ref) => (
    <BaseRadio.Root ref={ref} className={rootVariants({ size, error, className: className as string | undefined })} {...props}>
      <BaseRadio.Indicator className={indicatorVariants({ size, error })} />
    </BaseRadio.Root>
  )
);
Root.displayName = "Radio.Root";

const groupVariants = tv({
  base: "flex flex-col gap-2",
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row flex-wrap",
    },
  },
  defaultVariants: { orientation: "vertical" },
});

const Group = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <BaseRadioGroup ref={ref} className={groupVariants({ orientation, className: className as string | undefined })} {...props} />
  )
);
Group.displayName = "Radio.Group";

export const Radio = { Root, Group, Indicator: BaseRadio.Indicator };
export const RadioGroup = Group;
