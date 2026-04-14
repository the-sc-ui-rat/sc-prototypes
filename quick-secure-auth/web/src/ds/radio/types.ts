import type { ComponentPropsWithoutRef } from "react";
import type { Radio as BaseRadio, RadioGroup as BaseRadioGroup } from "@base-ui/react";

export interface RadioRootProps extends ComponentPropsWithoutRef<typeof BaseRadio.Root> {
  /** Size of the radio button. Defaults to `lg`. */
  size?: "lg" | "md";
  /** Error state — shows red border and indicator. */
  error?: boolean;
}
export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof BaseRadioGroup> {
  orientation?: "vertical" | "horizontal";
}
