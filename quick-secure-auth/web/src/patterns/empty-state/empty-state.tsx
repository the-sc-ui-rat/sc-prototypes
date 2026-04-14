import React from "react";
import { cn } from "../../utils/cn";
import type { EmptyStateProps } from "./types";

const illustrationSizeMap = {
  sm: "w-20 h-20",
  md: "w-32 h-32",
};

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      illustration,
      title,
      description,
      size = "md",
      primaryAction,
      secondaryAction,
      tertiaryAction,
      className,
      ...props
    },
    ref,
  ) => {
    const hasActions = primaryAction || secondaryAction || tertiaryAction;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center gap-4 text-center",
          size === "md" ? "py-10 px-6" : "py-6 px-4",
          className,
        )}
        {...props}
      >
        {illustration && (
          <div className={illustrationSizeMap[size]}>{illustration}</div>
        )}

        <div className="flex flex-col items-center gap-1">
          <p className="title-md text-surface-default">{title}</p>
          {description && (
            <p className="body-sm text-surface-weaker max-w-xs">
              {description}
            </p>
          )}
        </div>

        {hasActions && (
          <div className="flex flex-col items-center gap-2">
            {(primaryAction || secondaryAction) && (
              <div className="flex items-center gap-2">
                {primaryAction}
                {secondaryAction}
              </div>
            )}
            {tertiaryAction}
          </div>
        )}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";
