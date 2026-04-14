import type { ComponentPropsWithoutRef } from "react";
import type { Menu as BaseMenu } from "@base-ui/react";

export interface MenuPopupProps extends ComponentPropsWithoutRef<typeof BaseMenu.Popup> {}
export interface MenuItemProps extends ComponentPropsWithoutRef<typeof BaseMenu.Item> {}
export interface MenuGroupLabelProps extends ComponentPropsWithoutRef<typeof BaseMenu.GroupLabel> {}
export interface MenuCheckboxItemProps extends ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItem> {}
export interface MenuSubTriggerProps extends ComponentPropsWithoutRef<typeof BaseMenu.SubmenuTrigger> {}
