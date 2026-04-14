import React from "react";
import { Meter as BaseMeter } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { MeterRootProps, MeterTrackProps, MeterIndicatorProps } from "./types";

const trackVariants = tv({
  base: "relative w-full overflow-hidden rounded-full bg-surface2-default h-2",
});

const indicatorVariants = tv({
  base: "h-full rounded-full transition-[width] duration-300 ease-out",
  variants: {
    status: {
      default: "bg-accent-default",
      low: "bg-negative-default",
      medium: "bg-warning-default",
      high: "bg-positive-default",
    },
  },
  defaultVariants: { status: "default" },
});

const Root = React.forwardRef<HTMLDivElement, MeterRootProps>(
  ({ className, ...props }, ref) => (
    <BaseMeter.Root ref={ref} className={className} {...props} />
  )
);
Root.displayName = "Meter.Root";

const Track = React.forwardRef<HTMLDivElement, MeterTrackProps>(
  ({ className, ...props }, ref) => (
    <BaseMeter.Track ref={ref} className={trackVariants({ className: className as string | undefined })} {...props} />
  )
);
Track.displayName = "Meter.Track";

const Indicator = React.forwardRef<HTMLDivElement, MeterIndicatorProps>(
  ({ status, className, style, ...props }, ref) => (
    <BaseMeter.Indicator
      ref={ref}
      className={indicatorVariants({ status, className: className as string | undefined })}
      style={style}
      {...props}
    />
  )
);
Indicator.displayName = "Meter.Indicator";

const Label = BaseMeter.Label;
const Value = BaseMeter.Value;

export const Meter = { Root, Track, Indicator, Label, Value };
