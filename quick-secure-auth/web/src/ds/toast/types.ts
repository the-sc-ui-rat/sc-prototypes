import type { AnchorHTMLAttributes, ComponentPropsWithoutRef } from "react";
import type { Toast as BaseToast } from "@base-ui/react";

export interface ToastViewportProps extends ComponentPropsWithoutRef<typeof BaseToast.Viewport> {}
export interface ToastRootProps extends ComponentPropsWithoutRef<typeof BaseToast.Root> {
  /** Semantic status — controls background colour and pairs with `Toast.StatusIcon`. Defaults to `neutral`. */
  status?: "neutral" | "success" | "error";
}
export interface ToastContentProps extends ComponentPropsWithoutRef<typeof BaseToast.Content> {
  /** Layout direction. `row` keeps items inline; `column` aligns to top so action can stack below title. Defaults to `row`. */
  direction?: "row" | "column";
}
export interface ToastStatusIconProps {
  /** Must match the `status` prop on the parent `Toast.Root`. */
  status?: "neutral" | "success" | "error";
  className?: string;
}
export interface ToastTitleProps extends ComponentPropsWithoutRef<typeof BaseToast.Title> {}
export interface ToastDescriptionProps extends ComponentPropsWithoutRef<typeof BaseToast.Description> {}
export interface ToastCloseProps extends ComponentPropsWithoutRef<typeof BaseToast.Close> {}
export interface ToastActionProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}
