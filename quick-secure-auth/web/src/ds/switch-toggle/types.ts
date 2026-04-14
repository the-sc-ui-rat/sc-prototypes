import type { ComponentPropsWithoutRef } from "react";
import type { Switch as BaseSwitch } from "@base-ui/react";

export interface SwitchToggleRootProps extends ComponentPropsWithoutRef<typeof BaseSwitch.Root> {
  /** Size of the toggle. Defaults to `md`. */
  size?: "md" | "sm";
}
export interface SwitchToggleThumbProps extends ComponentPropsWithoutRef<typeof BaseSwitch.Thumb> {}
