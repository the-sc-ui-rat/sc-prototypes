import type { ComponentPropsWithoutRef } from "react";
import type { Progress as BaseProgress } from "@base-ui/react";

export interface ProgressRootProps extends ComponentPropsWithoutRef<typeof BaseProgress.Root> {}
export interface ProgressTrackProps extends ComponentPropsWithoutRef<typeof BaseProgress.Track> {
  size?: "sm" | "md" | "lg";
}
export interface ProgressIndicatorProps extends ComponentPropsWithoutRef<typeof BaseProgress.Indicator> {
  status?: "default" | "positive" | "negative" | "warning";
}
