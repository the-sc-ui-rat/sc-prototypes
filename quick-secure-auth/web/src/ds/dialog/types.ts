import type { ComponentPropsWithoutRef } from "react";
import type { Dialog as BaseDialog } from "@base-ui/react";

export interface DialogBackdropProps extends ComponentPropsWithoutRef<typeof BaseDialog.Backdrop> {}
export interface DialogPopupProps extends ComponentPropsWithoutRef<typeof BaseDialog.Popup> {
  size?: "sm" | "md" | "lg" | "xl";
}
export interface DialogTitleProps extends ComponentPropsWithoutRef<typeof BaseDialog.Title> {}
export interface DialogDescriptionProps extends ComponentPropsWithoutRef<typeof BaseDialog.Description> {}
export interface DialogCloseProps extends ComponentPropsWithoutRef<typeof BaseDialog.Close> {}
