import type { ComponentPropsWithoutRef } from "react";
import type { Toggle as BaseToggle } from "@base-ui/react";

export interface ToggleProps extends ComponentPropsWithoutRef<typeof BaseToggle> {
  size?: "sm" | "md" | "lg";
}
