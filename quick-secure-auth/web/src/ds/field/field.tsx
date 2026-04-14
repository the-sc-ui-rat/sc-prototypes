import React from "react";
import { Field as BaseField, Fieldset as BaseFieldset } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { FieldRootProps, FieldLabelProps, FieldDescriptionProps, FieldErrorProps, FieldsetRootProps, FieldsetLegendProps } from "./types";

const rootVariants = tv({ base: "flex flex-col gap-1" });
const labelVariants = tv({ base: "label-md text-surface-default" });
const descriptionVariants = tv({ base: "body-xs text-surface-weaker" });
const errorVariants = tv({ base: "body-xs text-negative-default" });
const fieldsetRootVariants = tv({ base: "flex flex-col gap-4" });
const legendVariants = tv({ base: "label-md text-surface-default mb-2" });

const Root = React.forwardRef<HTMLDivElement, FieldRootProps>(
  ({ className, ...props }, ref) => (
    <BaseField.Root ref={ref} className={rootVariants({ className: className as string | undefined })} {...props} />
  )
);
Root.displayName = "Field.Root";

const Label = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, ...props }, ref) => (
    <BaseField.Label ref={ref} className={labelVariants({ className: className as string | undefined })} {...props} />
  )
);
Label.displayName = "Field.Label";

const Description = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ className, ...props }, ref) => (
    <BaseField.Description ref={ref} className={descriptionVariants({ className: className as string | undefined })} {...props} />
  )
);
Description.displayName = "Field.Description";

const Error = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, ...props }, ref) => (
    <BaseField.Error ref={ref} className={errorVariants({ className: className as string | undefined })} {...props} />
  )
);
Error.displayName = "Field.Error";

export const Field = {
  Root,
  Label,
  Description,
  Error,
  Control: BaseField.Control,
  Validity: BaseField.Validity,
};

const FieldsetRoot = React.forwardRef<HTMLFieldSetElement, FieldsetRootProps>(
  ({ className, ...props }, ref) => (
    <BaseFieldset.Root ref={ref} className={fieldsetRootVariants({ className: className as string | undefined })} {...props} />
  )
);
FieldsetRoot.displayName = "Fieldset.Root";

const Legend = React.forwardRef<HTMLLegendElement, FieldsetLegendProps>(
  ({ className, ...props }, ref) => (
    <BaseFieldset.Legend ref={ref} className={legendVariants({ className: className as string | undefined })} {...props} />
  )
);
Legend.displayName = "Fieldset.Legend";

export const Fieldset = { Root: FieldsetRoot, Legend };
