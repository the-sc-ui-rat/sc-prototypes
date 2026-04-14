import type { ComponentPropsWithoutRef } from "react";
import type { Meter as BaseMeter } from "@base-ui/react";

export interface MeterRootProps extends ComponentPropsWithoutRef<typeof BaseMeter.Root> {}
export interface MeterTrackProps extends ComponentPropsWithoutRef<typeof BaseMeter.Track> {}
export interface MeterIndicatorProps extends ComponentPropsWithoutRef<typeof BaseMeter.Indicator> {
  status?: "default" | "low" | "medium" | "high";
}
