import React from "react";
import { Menu as BaseMenu } from "@base-ui/react";
import { Check, ChevronRight } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { MenuPopupProps, MenuItemProps, MenuGroupLabelProps, MenuCheckboxItemProps, MenuSubTriggerProps } from "./types";

const popupVariants = tv({
  base: "bg-surface-default border border-solid border-surface-weak rounded-md shadow-md p-1 min-w-40 focus-visible:outline-none",
});

const itemVariants = tv({
  base: [
    "flex items-center gap-2 rounded-xs px-2 py-1.5 body-sm text-surface-default",
    "cursor-pointer select-none outline-none",
    "[&:not([data-disabled])]:data-[highlighted]:bg-surface-hover",
    "data-[disabled]:text-surface-disabled data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none",
  ],
});

const groupLabelVariants = tv({
  base: "px-2 py-1 body-xs text-surface-weaker font-[500] uppercase tracking-wide",
});

const separatorVariants = tv({
  base: "my-1 h-px bg-surface-weak mx-1",
});

const Popup = React.forwardRef<HTMLDivElement, MenuPopupProps>(
  ({ className, ...props }, ref) => (
    <BaseMenu.Popup ref={ref} className={popupVariants({ className: className as string | undefined })} {...props} />
  )
);
Popup.displayName = "Menu.Popup";

const Item = React.forwardRef<HTMLDivElement, MenuItemProps>(
  ({ className, ...props }, ref) => (
    <BaseMenu.Item ref={ref} className={itemVariants({ className: className as string | undefined })} {...props} />
  )
);
Item.displayName = "Menu.Item";

const GroupLabel = React.forwardRef<HTMLDivElement, MenuGroupLabelProps>(
  ({ className, ...props }, ref) => (
    <BaseMenu.GroupLabel ref={ref} className={groupLabelVariants({ className: className as string | undefined })} {...props} />
  )
);
GroupLabel.displayName = "Menu.GroupLabel";

const CheckboxItem = React.forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  ({ className, children, ...props }, ref) => (
    <BaseMenu.CheckboxItem ref={ref} className={itemVariants({ className: className as string | undefined })} {...props}>
      <BaseMenu.CheckboxItemIndicator className="flex w-4 h-4 items-center justify-center">
        <Check size={12} />
      </BaseMenu.CheckboxItemIndicator>
      {children}
    </BaseMenu.CheckboxItem>
  )
);
CheckboxItem.displayName = "Menu.CheckboxItem";

const SubTrigger = React.forwardRef<HTMLDivElement, MenuSubTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <BaseMenu.SubmenuTrigger ref={ref} className={itemVariants({ className: className as string | undefined })} {...props}>
      {children}
      <ChevronRight size={14} className="ml-auto text-surface-weaker" />
    </BaseMenu.SubmenuTrigger>
  )
);
SubTrigger.displayName = "Menu.SubTrigger";

const MenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={separatorVariants({ className: className as string | undefined })} {...props} />
  )
);
MenuSeparator.displayName = "Menu.Separator";

export const Menu = {
  Root: BaseMenu.Root,
  Trigger: BaseMenu.Trigger,
  Portal: BaseMenu.Portal,
  Positioner: BaseMenu.Positioner,
  Backdrop: BaseMenu.Backdrop,
  Arrow: BaseMenu.Arrow,
  Popup,
  Item,
  Group: BaseMenu.Group,
  GroupLabel,
  CheckboxItem,
  CheckboxItemIndicator: BaseMenu.CheckboxItemIndicator,
  RadioItem: BaseMenu.RadioItem,
  RadioItemIndicator: BaseMenu.RadioItemIndicator,
  SubTrigger,
  Separator: MenuSeparator,
};
