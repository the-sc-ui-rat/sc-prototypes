import { forwardRef } from "react";
import { Input as BaseInput } from "@base-ui/react";
import { tv } from "../../utils/variants";
import { cn } from "../../utils/cn";
import type { InputProps } from "./types";

// ─── Variants ────────────────────────────────────────────────────────────────

const wrapperVariants = tv({
  base: [
    "relative flex items-center overflow-hidden",
    "bg-surface-default border border-solid border-surface-default text-surface-default",
    "font-[inherit] cursor-text",
    // Hover — suppressed when any child is disabled
    "[&:not(:has(:disabled))]:hover:border-accent-default",
    // Focus
    "focus-within:outline-2 focus-within:outline-focus-default focus-within:[outline-offset:-2px] focus-within:border-focus-default",
    // Disabled — driven by native :disabled on BaseInput, no JS needed
    "has-[:disabled]:bg-surface-disabled has-[:disabled]:border-surface-disabled has-[:disabled]:text-surface-disabled has-[:disabled]:cursor-not-allowed",
  ],
  variants: {
    size: {
      medium: "min-h-10 rounded-sm body-sm gap-2 px-2",
      large: "min-h-12 rounded-md body-md gap-3 px-3",
    },
    error: {
      true: [
        "border-negative-default",
        "[&:not(:has(:disabled))]:hover:border-negative-default",
        "focus-within:outline-negative-default focus-within:border-negative-default",
      ],
    },
  },
  defaultVariants: {
    size: "medium",
    error: false,
  },
});

const inputVariants = tv({
  base: [
    // Explicit resets — no [all:unset] to avoid CSS cascade conflicts
    "appearance-none border-0 bg-transparent shadow-none m-0 p-0 outline-none",
    "[font-family:inherit] [font-size:inherit] [font-weight:inherit] [line-height:inherit] [color:inherit]",
    "[text-overflow:ellipsis] self-stretch flex-1 min-w-0 basis-[10ch]",
    "placeholder:text-surface-placeholder",
    "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
    "[&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden",
  ],
  defaultVariants: { size: "medium" },
});

const iconSlotVariants = tv({
  base: "flex-none flex items-center justify-center pointer-events-none",
  variants: {
    size: {
      medium: "[&>svg]:w-4 [&>svg]:h-4",
      large:  "[&>svg]:w-5 [&>svg]:h-5",
    },
  },
  defaultVariants: { size: "medium" },
});

const addOnVariants = tv({
  base: "flex-none flex items-center",
  variants: {
    size: {
      medium: "[&>svg]:w-4 [&>svg]:h-4 [&>svg]:max-w-4 [&>svg]:max-h-4",
      large:  "[&>svg]:w-5 [&>svg]:h-5 [&>svg]:max-w-5 [&>svg]:max-h-5",
    },
  },
  defaultVariants: { size: "medium" },
});

// ─── Component ───────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "medium",
      error,
      leftIcon,
      rightIcon,
      leftAddOn,
      rightAddOn,
      width,
      children,
      className,
      style,
      onValueChange,
      ...inputProps
    },
    ref,
  ) => (
    <label
      className={wrapperVariants({
        size,
        error,
        className: cn(width === "full" && "w-full", className),
      })}
      style={width && width !== "full" ? { width, ...style } : style}
    >
      {leftIcon && (
        <span className={iconSlotVariants({ size })}>{leftIcon}</span>
      )}

      {leftAddOn && (
        <span className={addOnVariants({ size })}>{leftAddOn}</span>
      )}

      {children}

      <BaseInput
        ref={ref}
        onValueChange={onValueChange}
        {...inputProps}
        className={inputVariants()}
      />

      {rightAddOn && (
        <span className={addOnVariants({ size })}>{rightAddOn}</span>
      )}

      {rightIcon && (
        <span className={iconSlotVariants({ size })}>{rightIcon}</span>
      )}
    </label>
  ),
);

Input.displayName = "Input";
