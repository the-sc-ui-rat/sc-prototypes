import React from "react";
import { Progress as BaseProgress } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { ProgressRootProps, ProgressTrackProps, ProgressIndicatorProps } from "./types";

const trackVariants = tv({
  base: "relative w-full overflow-hidden rounded-full bg-surface2-default",
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: { size: "md" },
});

const indicatorVariants = tv({
  base: "h-full bg-accent-default rounded-full transition-[width] duration-300 ease-out",
  variants: {
    status: {
      default: "bg-accent-default",
      positive: "bg-positive-default",
      negative: "bg-negative-default",
      warning: "bg-warning-default",
    },
  },
  defaultVariants: { status: "default" },
});

const Root = React.forwardRef<HTMLDivElement, ProgressRootProps>(
  ({ className, ...props }, ref) => (
    <BaseProgress.Root ref={ref} className={className} {...props} />
  )
);
Root.displayName = "Progress.Root";

const Track = React.forwardRef<HTMLDivElement, ProgressTrackProps>(
  ({ size, className, ...props }, ref) => (
    <BaseProgress.Track ref={ref} className={trackVariants({ size, className: className as string | undefined })} {...props} />
  )
);
Track.displayName = "Progress.Track";

const Indicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ status, className, style, ...props }, ref) => (
    <BaseProgress.Indicator
      ref={ref}
      className={indicatorVariants({ status, className: className as string | undefined })}
      style={style}
      {...props}
    />
  )
);
Indicator.displayName = "Progress.Indicator";

const Label = BaseProgress.Label;
const Value = BaseProgress.Value;

export const Progress = { Root, Track, Indicator, Label, Value };
