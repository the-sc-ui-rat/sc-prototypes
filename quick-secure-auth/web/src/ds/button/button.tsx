import React from "react";
import { Button as BaseButton } from "@base-ui/react";
import { cn } from "../../utils/cn";
import { buttonVariants } from "./button.variants";
import type { ButtonProps } from "./types";

const iconSizeMap: Record<NonNullable<ButtonProps["size"]>, number> = {
  large: 20,
  medium: 18,
  small: 18,
};

function sizeIcon(icon: React.ReactElement, size: number): React.ReactElement {
  return React.cloneElement(icon, { size });
}

/** Three-dot bounce spinner, matching the existing sc-web-ui pattern. */
function Spinner() {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label="loading"
      className="inline-flex items-center gap-[3px] py-[3px]"
    >
      {["-0.32s", "-0.16s", "0s"].map((delay) => (
        <span
          key={delay}
          className="inline-block h-[6px] w-[6px] rounded-full bg-current animate-bounce"
          style={{ animationDelay: delay, animationDuration: "1.4s" }}
        />
      ))}
    </span>
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      render,
      variant,
      size = "medium",
      modifier,
      leftIcon,
      rightIcon,
      isLoading,
      disabled,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const iconSize = iconSizeMap[size ?? "medium"];

    return (
      <BaseButton
        ref={ref}
        render={render}
        disabled={isLoading || disabled}
        aria-busy={isLoading || undefined}
        className={cn(buttonVariants({ variant, size, modifier }), className)}
        {...props}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {leftIcon && (
              <span aria-hidden className="inline-flex shrink-0">
                {sizeIcon(leftIcon, iconSize)}
              </span>
            )}
            {children}
            {rightIcon && (
              <span aria-hidden className="inline-flex shrink-0">
                {sizeIcon(rightIcon, iconSize)}
              </span>
            )}
          </>
        )}
      </BaseButton>
    );
  },
);

Button.displayName = "Button";
