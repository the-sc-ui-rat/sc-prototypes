import React from "react";
import { Slider as BaseSlider } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { SliderRootProps, SliderControlProps, SliderTrackProps, SliderIndicatorProps, SliderThumbProps } from "./types";

const controlVariants = tv({
  base: "flex w-full touch-none select-none items-center py-2",
});

const trackVariants = tv({
  base: "relative h-1.5 w-full rounded-full bg-surface2-default",
});

const indicatorVariants = tv({
  base: "absolute h-full rounded-full bg-accent-default",
});

const thumbVariants = tv({
  base: [
    "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
    "h-4 w-4 rounded-full bg-surface-default border-2 border-accent-default shadow-xs",
    "cursor-grab active:cursor-grabbing",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
    "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
    "transition-shadow duration-100",
  ],
});

const Root = React.forwardRef<HTMLDivElement, SliderRootProps>(
  ({ className, ...props }, ref) => (
    <BaseSlider.Root ref={ref} className={className} {...props} />
  )
);
Root.displayName = "Slider.Root";

const Control = React.forwardRef<HTMLDivElement, SliderControlProps>(
  ({ className, ...props }, ref) => (
    <BaseSlider.Control ref={ref} className={controlVariants({ className: className as string | undefined })} {...props} />
  )
);
Control.displayName = "Slider.Control";

const Track = React.forwardRef<HTMLDivElement, SliderTrackProps>(
  ({ className, ...props }, ref) => (
    <BaseSlider.Track ref={ref} className={trackVariants({ className: className as string | undefined })} {...props} />
  )
);
Track.displayName = "Slider.Track";

const Indicator = React.forwardRef<HTMLDivElement, SliderIndicatorProps>(
  ({ className, ...props }, ref) => (
    <BaseSlider.Indicator ref={ref} className={indicatorVariants({ className: className as string | undefined })} {...props} />
  )
);
Indicator.displayName = "Slider.Indicator";

const Thumb = React.forwardRef<HTMLDivElement, SliderThumbProps>(
  ({ className, ...props }, ref) => (
    <BaseSlider.Thumb ref={ref} className={thumbVariants({ className: className as string | undefined })} {...props} />
  )
);
Thumb.displayName = "Slider.Thumb";

const Value = BaseSlider.Value;

export const Slider = { Root, Control, Track, Indicator, Thumb, Value };
