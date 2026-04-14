import React from "react";
import { cn } from "../../utils/cn";
import { Button } from "./button";
import type { ButtonProps } from "./types";

export interface IconButtonProps
  extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "children"> {
  /** Icon to render. Accepts a component from `@safetyculture/icons-react`. */
  icon: React.ReactElement;
  /**
   * Accessible label describing the button action.
   * Required because there is no visible text.
   */
  "aria-label": string;
  /** Renders the button as a pill/circle shape. */
  rounded?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, rounded, size = "medium", className, ...props }, ref) => {
    const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
      large: "w-12 h-12 p-s3",
      medium: "w-10 h-10 p-s3",
      small: "w-8 h-8 p-s2",
    };

    return (
      <Button
        ref={ref}
        size={size}
        className={cn(
          sizeClasses[size ?? "medium"],
          rounded && "rounded-full",
          "[&>svg]:shrink-0",
          className,
        )}
        leftIcon={icon}
        {...props}
      />
    );
  },
);

IconButton.displayName = "IconButton";
