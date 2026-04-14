import type { ComponentPropsWithoutRef } from "react";
import type { Popover as BasePopover } from "@base-ui/react";

export interface PopoverPopupProps extends ComponentPropsWithoutRef<typeof BasePopover.Popup> {}
export interface PopoverArrowProps extends ComponentPropsWithoutRef<typeof BasePopover.Arrow> {}
export interface PopoverTitleProps extends ComponentPropsWithoutRef<typeof BasePopover.Title> {}
export interface PopoverDescriptionProps extends ComponentPropsWithoutRef<typeof BasePopover.Description> {}
export interface PopoverCloseProps extends ComponentPropsWithoutRef<typeof BasePopover.Close> {}
