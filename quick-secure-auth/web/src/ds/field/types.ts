import type { ComponentPropsWithoutRef } from "react";
import type { Field as BaseField, Fieldset as BaseFieldset } from "@base-ui/react";

export interface FieldRootProps extends ComponentPropsWithoutRef<typeof BaseField.Root> {}
export interface FieldLabelProps extends ComponentPropsWithoutRef<typeof BaseField.Label> {}
export interface FieldDescriptionProps extends ComponentPropsWithoutRef<typeof BaseField.Description> {}
export interface FieldErrorProps extends ComponentPropsWithoutRef<typeof BaseField.Error> {}
export interface FieldsetRootProps extends ComponentPropsWithoutRef<typeof BaseFieldset.Root> {}
export interface FieldsetLegendProps extends ComponentPropsWithoutRef<typeof BaseFieldset.Legend> {}
