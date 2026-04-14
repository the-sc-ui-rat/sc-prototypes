import type { ComponentPropsWithoutRef } from "react";
import type { NumberField as BaseNumberField } from "@base-ui/react";

export interface NumberFieldRootProps extends ComponentPropsWithoutRef<typeof BaseNumberField.Root> {}
export interface NumberFieldGroupProps extends ComponentPropsWithoutRef<typeof BaseNumberField.Group> {}
export interface NumberFieldInputProps extends ComponentPropsWithoutRef<typeof BaseNumberField.Input> {}
export interface NumberFieldButtonProps extends ComponentPropsWithoutRef<typeof BaseNumberField.Increment> {}
