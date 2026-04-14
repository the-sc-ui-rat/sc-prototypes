import type { ComponentPropsWithoutRef } from "react";
import type { DrawerPreview as BaseDrawer } from "@base-ui/react";

export interface DrawerBackdropProps extends ComponentPropsWithoutRef<typeof BaseDrawer.Backdrop> {}
export interface DrawerPopupProps extends ComponentPropsWithoutRef<typeof BaseDrawer.Popup> {
  side?: "right" | "left" | "bottom" | "top";
}
export interface DrawerTitleProps extends ComponentPropsWithoutRef<typeof BaseDrawer.Title> {}
export interface DrawerDescriptionProps extends ComponentPropsWithoutRef<typeof BaseDrawer.Description> {}
export interface DrawerCloseProps extends ComponentPropsWithoutRef<typeof BaseDrawer.Close> {}
