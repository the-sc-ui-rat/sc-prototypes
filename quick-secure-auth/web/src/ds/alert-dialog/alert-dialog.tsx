import React from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type {
  AlertDialogBackdropProps,
  AlertDialogPopupProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogCloseProps,
  AlertDialogIconProps,
} from "./types";

const backdropVariants = tv({ base: "fixed inset-0 z-50 bg-overlay-default" });

const popupVariants = tv({
  base: [
    "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
    "w-full bg-surface-default border border-solid border-surface-weak rounded-md shadow-md",
    "p-6 flex flex-col gap-4 focus-visible:outline-none",
  ],
  variants: {
    size: {
      md: "max-w-md",
      sm: "max-w-xs",
    },
  },
  defaultVariants: { size: "md" },
});

const titleVariants = tv({ base: "title-sm text-surface-default" });
const descriptionVariants = tv({ base: "body-sm text-surface-weaker" });
const closeVariants = tv({
  base: [
    "inline-flex items-center justify-center gap-1.5 rounded-sm border border-solid",
    "border-surface-default bg-surface-default text-surface-default label-md",
    "px-3 h-10 cursor-pointer",
    "hover:bg-surface-hover transition-colors duration-120",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
  ],
});
const iconVariants = tv({ base: "flex justify-center" });

const Backdrop = React.forwardRef<HTMLDivElement, AlertDialogBackdropProps>(
  ({ className, ...props }, ref) => (
    <BaseAlertDialog.Backdrop ref={ref} className={backdropVariants({ className: className as string | undefined })} {...props} />
  )
);
Backdrop.displayName = "AlertDialog.Backdrop";

const Popup = React.forwardRef<HTMLDivElement, AlertDialogPopupProps>(
  ({ className, size, ...props }, ref) => (
    <BaseAlertDialog.Popup ref={ref} className={popupVariants({ size, className: className as string | undefined })} {...props} />
  )
);
Popup.displayName = "AlertDialog.Popup";

const Title = React.forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  ({ className, ...props }, ref) => (
    <BaseAlertDialog.Title ref={ref} className={titleVariants({ className: className as string | undefined })} {...props} />
  )
);
Title.displayName = "AlertDialog.Title";

const Description = React.forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <BaseAlertDialog.Description ref={ref} className={descriptionVariants({ className: className as string | undefined })} {...props} />
  )
);
Description.displayName = "AlertDialog.Description";

const Close = React.forwardRef<HTMLButtonElement, AlertDialogCloseProps>(
  ({ className, children, ...props }, ref) => (
    <BaseAlertDialog.Close ref={ref} className={closeVariants({ className: className as string | undefined })} {...props}>
      {children ?? "Cancel"}
    </BaseAlertDialog.Close>
  )
);
Close.displayName = "AlertDialog.Close";

const Icon = React.forwardRef<HTMLDivElement, AlertDialogIconProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={iconVariants({ className: className as string | undefined })} {...props} />
  )
);
Icon.displayName = "AlertDialog.Icon";

export const AlertDialog = {
  Root: BaseAlertDialog.Root,
  Trigger: BaseAlertDialog.Trigger,
  Portal: BaseAlertDialog.Portal,
  Backdrop,
  Popup,
  Title,
  Description,
  Close,
  Icon,
};
