import type { ComponentPropsWithoutRef } from "react";
import type { Checkbox as BaseCheckbox, CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react";

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {
  /** Size of the checkbox. Defaults to `lg`. */
  size?: "lg" | "md";
  /** Renders the checkbox in an error state. */
  error?: boolean;
}
export interface CheckboxGroupProps extends ComponentPropsWithoutRef<typeof BaseCheckboxGroup> {}
