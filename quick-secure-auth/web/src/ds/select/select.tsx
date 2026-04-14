import React from "react";
import { Select as BaseSelect } from "@base-ui/react";
import { Check, ChevronDown } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { SelectTriggerProps, SelectPopupProps, SelectItemProps, SelectGroupLabelProps } from "./types";

const triggerVariants = tv({
  base: [
    "inline-flex items-center justify-between gap-2",
    "h-10 min-w-32 px-3 rounded-sm border border-solid",
    "bg-surface-default border-surface-default body-sm text-surface-default",
    "cursor-pointer select-none",
    "hover:border-accent-default transition-colors duration-120",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
    "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none",
  ],
  variants: {
    size: {
      md: "h-10 body-sm",
      lg: "h-12 body-md px-4",
    },
  },
  defaultVariants: { size: "md" },
});

const popupVariants = tv({
  base: "bg-surface-default border border-solid border-surface-weak rounded-md shadow-md p-1 min-w-[var(--anchor-width)] focus-visible:outline-none",
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

const groupLabelVariants = tv({
  base: "px-2 py-1 body-xs text-surface-weaker font-[500]",
});

const Trigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ size, className, ...props }, ref) => (
    <BaseSelect.Trigger ref={ref} className={triggerVariants({ size, className: className as string | undefined })} {...props}>
      <BaseSelect.Value placeholder="Select..." />
      <BaseSelect.Icon>
        <ChevronDown size={14} className="text-surface-weaker shrink-0" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
);
Trigger.displayName = "Select.Trigger";

const Popup = React.forwardRef<HTMLDivElement, SelectPopupProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.Popup ref={ref} className={popupVariants({ className: className as string | undefined })} {...props} />
  )
);
Popup.displayName = "Select.Popup";

const Item = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <BaseSelect.Item ref={ref} className={itemVariants({ className: className as string | undefined })} {...props}>
      <BaseSelect.ItemIndicator className="flex w-4 h-4 items-center justify-center shrink-0">
        <Check size={12} />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  )
);
Item.displayName = "Select.Item";

const GroupLabel = React.forwardRef<HTMLDivElement, SelectGroupLabelProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.GroupLabel ref={ref} className={groupLabelVariants({ className: className as string | undefined })} {...props} />
  )
);
GroupLabel.displayName = "Select.GroupLabel";

export const Select = {
  Root: BaseSelect.Root,
  Trigger,
  Value: BaseSelect.Value,
  Icon: BaseSelect.Icon,
  Portal: BaseSelect.Portal,
  Backdrop: BaseSelect.Backdrop,
  Positioner: BaseSelect.Positioner,
  Popup,
  Item,
  ItemText: BaseSelect.ItemText,
  ItemIndicator: BaseSelect.ItemIndicator,
  Group: BaseSelect.Group,
  GroupLabel,
  Arrow: BaseSelect.Arrow,
  ScrollUpArrow: BaseSelect.ScrollUpArrow,
  ScrollDownArrow: BaseSelect.ScrollDownArrow,
};
