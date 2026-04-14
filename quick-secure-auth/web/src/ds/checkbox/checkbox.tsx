import React from "react";
import { Checkbox as BaseCheckbox, CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react";
import { Check, Minus } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { CheckboxProps, CheckboxGroupProps } from "./types";

const rootVariants = tv({
  base: [
    "relative flex shrink-0 cursor-pointer items-center justify-center",
    "rounded-xs border border-solid",
    "bg-surface-default border-surface-default",
    "transition-colors duration-120",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
    "[&:not([data-disabled])]:hover:border-accent-default",
    "data-[checked]:bg-accent-default data-[checked]:border-accent-default",
    "data-[indeterminate]:bg-accent-default data-[indeterminate]:border-accent-default",
    "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none",
  ],
  variants: {
    size: {
      lg: "h-5 w-5",
      md: "h-4 w-4",
    },
    error: {
      true: [
        "border-negative-default",
        "[&:not([data-disabled])]:hover:border-negative-default",
        "data-[checked]:bg-negative-default data-[checked]:border-negative-default",
        "data-[indeterminate]:bg-negative-default data-[indeterminate]:border-negative-default",
      ],
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

const indicatorVariants = tv({
  base: "flex items-center justify-center text-accent-on-default",
});

const iconSizeMap = { lg: 12, md: 10 } as const;

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, size = "lg", error, ...props }, ref) => (
    <BaseCheckbox.Root
      ref={ref}
      className={rootVariants({ size, error, className: className as string | undefined })}
      {...props}
    >
      <BaseCheckbox.Indicator keepMounted className={indicatorVariants()}>
        <Check size={iconSizeMap[size]} className="hidden [[data-checked]_&]:block [[data-indeterminate]_&]:hidden" />
        <Minus size={iconSizeMap[size]} className="hidden [[data-indeterminate]_&]:block" />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  )
);
Checkbox.displayName = "Checkbox";

export const CheckboxGroup = BaseCheckboxGroup;
