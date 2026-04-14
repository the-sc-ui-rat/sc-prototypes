import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import type { AlertDialog as BaseAlertDialog } from "@base-ui/react";

export interface AlertDialogBackdropProps extends ComponentPropsWithoutRef<typeof BaseAlertDialog.Backdrop> {}
export interface AlertDialogPopupProps extends ComponentPropsWithoutRef<typeof BaseAlertDialog.Popup> {
  /** Width of the dialog. Defaults to `md`. */
  size?: "md" | "sm";
}
export interface AlertDialogTitleProps extends ComponentPropsWithoutRef<typeof BaseAlertDialog.Title> {}
export interface AlertDialogDescriptionProps extends ComponentPropsWithoutRef<typeof BaseAlertDialog.Description> {}
export interface AlertDialogCloseProps extends ComponentPropsWithoutRef<typeof BaseAlertDialog.Close> {}
/** Centered container for an icon or illustration at the top of an AlertDialog (e.g. acknowledge type). */
export interface AlertDialogIconProps extends HTMLAttributes<HTMLDivElement> {}
