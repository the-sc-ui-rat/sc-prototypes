import type { ComponentPropsWithoutRef } from "react";
import type { Select as BaseSelect } from "@base-ui/react";

export interface SelectTriggerProps extends ComponentPropsWithoutRef<typeof BaseSelect.Trigger> {
  size?: "md" | "lg";
}
export interface SelectPopupProps extends ComponentPropsWithoutRef<typeof BaseSelect.Popup> {}
export interface SelectItemProps extends ComponentPropsWithoutRef<typeof BaseSelect.Item> {}
export interface SelectGroupLabelProps extends ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel> {}
