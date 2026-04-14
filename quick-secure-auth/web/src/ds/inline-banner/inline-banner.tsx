import React from "react";
import {
  XSymbol,
  CircleInfo,
  CircleInfoFilled,
  CircleCheckFilled,
  CircleExclamationFilled,
} from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { InlineBannerProps } from "./types";

const rootVariants = tv({
  base: "flex rounded-sm p-3 body-sm",
  variants: {
    status: {
      neutral:     "bg-base-weakest text-surface-default",
      information: "bg-info-weakest text-info-default",
      success:     "bg-positive-weakest text-positive-default",
      warning:     "bg-warning-weakest text-warning-default",
      error:       "bg-negative-weakest text-negative-default",
    },
    direction: {
      row:    "flex-row items-center gap-3",
      column: "flex-row items-start gap-3",
    },
  },
  defaultVariants: { status: "neutral", direction: "row" },
});

const closeVariants = tv({
  base: [
    "flex items-center justify-center shrink-0",
    "appearance-none border-0 bg-transparent shadow-none m-0 p-0",
    "opacity-70 cursor-pointer hover:opacity-100 transition-opacity duration-120 text-inherit",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2 rounded-xs",
  ],
});

const STATUS_ICON_MAP = {
  neutral:     CircleInfo,
  information: CircleInfoFilled,
  success:     CircleCheckFilled,
  warning:     CircleExclamationFilled,
  error:       CircleExclamationFilled,
} as const;

export const InlineBanner = React.forwardRef<HTMLDivElement, InlineBannerProps>(
  ({ status = "neutral", direction = "row", title, description, action, onDismiss, className, ...props }, ref) => {
    const Icon = STATUS_ICON_MAP[status];

    const closeBtn = onDismiss ? (
      <button type="button" onClick={onDismiss} className={closeVariants()} aria-label="Dismiss">
        <XSymbol size={12} />
      </button>
    ) : null;

    return (
      <div
        ref={ref}
        className={rootVariants({ status, direction, className: className as string | undefined })}
        {...props}
      >
        <Icon size={16} className="shrink-0 mt-0.5" aria-hidden />
        {direction === "row" ? (
          <>
            <div className="flex-1 min-w-0">
              <p className="font-[600]">{title}</p>
              {description && <p>{description}</p>}
            </div>
            {action}
            {closeBtn}
          </>
        ) : (
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-start gap-1">
              <p className="flex-1 font-[600]">{title}</p>
              {closeBtn}
            </div>
            {description && <p>{description}</p>}
            {action}
          </div>
        )}
      </div>
    );
  },
);

InlineBanner.displayName = "InlineBanner";
