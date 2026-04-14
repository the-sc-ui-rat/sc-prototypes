import React from "react";
import { Dialog as BaseDialog } from "@base-ui/react";
import { XSymbol } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { DialogBackdropProps, DialogPopupProps, DialogTitleProps, DialogDescriptionProps, DialogCloseProps } from "./types";

const backdropVariants = tv({
  base: "fixed inset-0 z-50 bg-overlay-default",
});

const popupVariants = tv({
  base: [
    "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
    "w-full max-w-md bg-surface-default border border-solid border-surface-weak rounded-md shadow-xl",
    "p-6 flex flex-col gap-4",
    "focus-visible:outline-none",
  ],
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
    },
  },
  defaultVariants: { size: "md" },
});

const titleVariants = tv({ base: "title-sm text-surface-default" });
const descriptionVariants = tv({ base: "body-sm text-surface-weaker" });
const closeVariants = tv({
  base: [
    "absolute top-4 right-4 flex items-center justify-center h-7 w-7 rounded-xs",
    "text-surface-weaker cursor-pointer bg-transparent border-0",
    "hover:bg-surface-hover hover:text-surface-default transition-colors duration-120",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
  ],
});

const Backdrop = React.forwardRef<HTMLDivElement, DialogBackdropProps>(
  ({ className, ...props }, ref) => (
    <BaseDialog.Backdrop ref={ref} className={backdropVariants({ className: className as string | undefined })} {...props} />
  )
);
Backdrop.displayName = "Dialog.Backdrop";

const Popup = React.forwardRef<HTMLDivElement, DialogPopupProps>(
  ({ size, className, ...props }, ref) => (
    <BaseDialog.Popup ref={ref} className={popupVariants({ size, className: className as string | undefined })} {...props} />
  )
);
Popup.displayName = "Dialog.Popup";

const Title = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <BaseDialog.Title ref={ref} className={titleVariants({ className: className as string | undefined })} {...props} />
  )
);
Title.displayName = "Dialog.Title";

const Description = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <BaseDialog.Description ref={ref} className={descriptionVariants({ className: className as string | undefined })} {...props} />
  )
);
Description.displayName = "Dialog.Description";

const Close = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, render: renderProp, ...props }, ref) => {
    if (renderProp) {
      return <BaseDialog.Close ref={ref} render={renderProp} {...props} />;
    }
    return (
      <BaseDialog.Close ref={ref} className={closeVariants({ className: className as string | undefined })} {...props}>
        {children ?? <XSymbol size={14} />}
      </BaseDialog.Close>
    );
  }
);
Close.displayName = "Dialog.Close";

export const Dialog = {
  Root: BaseDialog.Root,
  Trigger: BaseDialog.Trigger,
  Portal: BaseDialog.Portal,
  Viewport: BaseDialog.Viewport,
  Backdrop,
  Popup,
  Title,
  Description,
  Close,
};
