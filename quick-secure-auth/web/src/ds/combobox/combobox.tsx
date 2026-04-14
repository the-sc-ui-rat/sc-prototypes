import React from "react";
import { Combobox as BaseCombobox } from "@base-ui/react";
import { ChevronDown } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { ComboboxInputProps, ComboboxPopupProps, ComboboxItemProps } from "./types";

const inputWrapperVariants = tv({
  base: [
    "relative inline-flex items-center overflow-hidden",
    "bg-surface-default border border-solid border-surface-default text-surface-default rounded-sm",
    "has-[:disabled]:bg-surface-disabled has-[:disabled]:text-surface-disabled has-[:disabled]:border-surface-disabled",
    "[&:not(:has(:disabled))]:hover:border-accent-default",
    "focus-within:outline-2 focus-within:outline-focus-default focus-within:[outline-offset:-2px] focus-within:border-focus-default",
  ],
});

const inputVariants = tv({
  base: [
    "appearance-none border-0 bg-transparent shadow-none m-0 p-0 outline-none",
    "[font-family:inherit] [font-size:inherit] [font-weight:inherit] [line-height:inherit] [color:inherit]",
    "min-w-0 flex-1 h-10 px-3 body-sm",
    "placeholder:text-surface-placeholder",
  ],
});

const triggerVariants = tv({
  base: [
    "flex items-center justify-center h-10 w-9 shrink-0",
    "border-0 bg-transparent text-surface-weaker cursor-pointer",
    "hover:text-surface-default transition-colors duration-120",
  ],
});

const popupVariants = tv({
  base: "bg-surface-default border border-solid border-surface-weak rounded-md shadow-md p-1 focus-visible:outline-none",
});

const itemVariants = tv({
  base: [
    "flex items-center gap-2 rounded-xs px-2 py-1.5 body-sm text-surface-default",
    "cursor-pointer select-none outline-none",
    "[&:not([data-disabled])]:data-[highlighted]:bg-surface-hover",
    "data-[selected]:text-accent-default",
    "data-[disabled]:text-surface-disabled data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none",
  ],
});

const Input = React.forwardRef<HTMLDivElement, ComboboxInputProps>(
  ({ className, inputClassName, placeholder, ...props }, ref) => (
    <div ref={ref} className={inputWrapperVariants({ className: className as string | undefined })}>
      <BaseCombobox.Input
        placeholder={placeholder}
        className={inputVariants({ className: inputClassName })}
        {...props}
      />
      <BaseCombobox.Trigger className={triggerVariants()}>
        <ChevronDown size={14} />
      </BaseCombobox.Trigger>
    </div>
  )
);
Input.displayName = "Combobox.Input";

const Popup = React.forwardRef<HTMLDivElement, ComboboxPopupProps>(
  ({ className, ...props }, ref) => (
    <BaseCombobox.Popup ref={ref} className={popupVariants({ className: className as string | undefined })} {...props} />
  )
);
Popup.displayName = "Combobox.Popup";

const Item = React.forwardRef<HTMLDivElement, ComboboxItemProps>(
  ({ className, ...props }, ref) => (
    <BaseCombobox.Item ref={ref} className={itemVariants({ className: className as string | undefined })} {...props} />
  )
);
Item.displayName = "Combobox.Item";

export const Combobox = {
  Root: BaseCombobox.Root,
  Input,
  Trigger: BaseCombobox.Trigger,
  Portal: BaseCombobox.Portal,
  Positioner: BaseCombobox.Positioner,
  Popup,
  Item,
  List: BaseCombobox.List,
  Group: BaseCombobox.Group,
  GroupLabel: BaseCombobox.GroupLabel,
};
