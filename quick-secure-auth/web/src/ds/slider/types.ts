import type { ComponentPropsWithoutRef } from "react";
import type { Slider as BaseSlider } from "@base-ui/react";

export interface SliderRootProps extends ComponentPropsWithoutRef<typeof BaseSlider.Root> {}
export interface SliderControlProps extends ComponentPropsWithoutRef<typeof BaseSlider.Control> {}
export interface SliderTrackProps extends ComponentPropsWithoutRef<typeof BaseSlider.Track> {}
export interface SliderIndicatorProps extends ComponentPropsWithoutRef<typeof BaseSlider.Indicator> {}
export interface SliderThumbProps extends ComponentPropsWithoutRef<typeof BaseSlider.Thumb> {}
