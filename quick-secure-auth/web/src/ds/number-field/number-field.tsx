import React from "react";
import { NumberField as BaseNumberField } from "@base-ui/react";
import { Plus, Minus } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { NumberFieldRootProps, NumberFieldGroupProps, NumberFieldInputProps, NumberFieldButtonProps } from "./types";

const groupVariants = tv({
  base: [
    "relative inline-flex items-center overflow-hidden",
    "bg-surface-default border border-solid border-surface-default text-surface-default rounded-sm",
    "has-[:disabled]:bg-surface-disabled has-[:disabled]:text-surface-disabled has-[:disabled]:border-surface-disabled",
    "[&:not(:has(:disabled))]:hover:border-accent-default",
    "focus-within:outline-2 focus-within:outline-focus-default focus-within:[outline-offset:-2px] focus-within:border-focus-default",
  ],
});

const inputVariants = tv({
  base: [
    "appearance-none border-0 bg-transparent shadow-none m-0 p-0 outline-none",
    "[font-family:inherit] [font-size:inherit] [font-weight:inherit] [line-height:inherit] [color:inherit]",
    "min-w-0 w-16 text-center h-10 body-sm",
    "placeholder:text-surface-placeholder",
    "[&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden",
  ],
});

const stepButtonVariants = tv({
  base: [
    "flex items-center justify-center h-10 w-8 shrink-0",
    "border-0 bg-transparent text-surface-default cursor-pointer",
    "hover:bg-surface-hover transition-colors duration-120",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "focus-visible:outline-2 focus-visible:outline-focus-default",
  ],
});

const Root = React.forwardRef<HTMLDivElement, NumberFieldRootProps>(
  ({ className, ...props }, ref) => (
    <BaseNumberField.Root ref={ref} className={className} {...props} />
  )
);
Root.displayName = "NumberField.Root";

const Group = React.forwardRef<HTMLDivElement, NumberFieldGroupProps>(
  ({ className, ...props }, ref) => (
    <BaseNumberField.Group ref={ref} className={groupVariants({ className: className as string | undefined })} {...props} />
  )
);
Group.displayName = "NumberField.Group";

const NumberInput = React.forwardRef<HTMLInputElement, NumberFieldInputProps>(
  ({ className, ...props }, ref) => (
    <BaseNumberField.Input ref={ref} className={inputVariants({ className: className as string | undefined })} {...props} />
  )
);
NumberInput.displayName = "NumberField.Input";

const Increment = React.forwardRef<HTMLButtonElement, NumberFieldButtonProps>(
  ({ className, children, ...props }, ref) => (
    <BaseNumberField.Increment ref={ref} className={stepButtonVariants({ className: className as string | undefined })} {...props}>
      {children ?? <Plus size={14} />}
    </BaseNumberField.Increment>
  )
);
Increment.displayName = "NumberField.Increment";

const Decrement = React.forwardRef<HTMLButtonElement, NumberFieldButtonProps>(
  ({ className, children, ...props }, ref) => (
    <BaseNumberField.Decrement ref={ref} className={stepButtonVariants({ className: className as string | undefined })} {...props}>
      {children ?? <Minus size={14} />}
    </BaseNumberField.Decrement>
  )
);
Decrement.displayName = "NumberField.Decrement";

export const NumberField = { Root, Group, Input: NumberInput, Increment, Decrement, ScrubArea: BaseNumberField.ScrubArea };
