import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import type { Combobox as BaseCombobox } from "@base-ui/react";

export interface ComboboxInputProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  inputClassName?: string;
}
export interface ComboboxTriggerProps extends ComponentPropsWithoutRef<typeof BaseCombobox.Trigger> {}
export interface ComboboxPopupProps extends ComponentPropsWithoutRef<typeof BaseCombobox.Popup> {}
export interface ComboboxItemProps extends ComponentPropsWithoutRef<typeof BaseCombobox.Item> {}
