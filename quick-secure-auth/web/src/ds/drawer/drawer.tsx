import React from "react";
import { DrawerPreview as BaseDrawer } from "@base-ui/react";
import { XSymbol } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { DrawerBackdropProps, DrawerPopupProps, DrawerTitleProps, DrawerDescriptionProps, DrawerCloseProps } from "./types";

const backdropVariants = tv({ base: "fixed inset-0 z-50 bg-overlay-default" });

const popupVariants = tv({
  base: [
    "fixed z-50 bg-surface-default border border-solid border-surface-weak shadow-xl",
    "flex flex-col gap-0 focus-visible:outline-none",
  ],
  variants: {
    side: {
      right: "right-0 top-0 h-full w-80 border-l rounded-l-md",
      left: "left-0 top-0 h-full w-80 border-r rounded-r-md",
      bottom: "bottom-0 left-0 w-full max-h-[85vh] border-t rounded-t-md",
      top: "top-0 left-0 w-full max-h-[85vh] border-b rounded-b-md",
    },
  },
  defaultVariants: { side: "right" },
});

const titleVariants = tv({ base: "title-sm text-surface-default" });
const descriptionVariants = tv({ base: "body-sm text-surface-weaker" });
const closeVariants = tv({
  base: [
    "flex items-center justify-center h-7 w-7 rounded-xs",
    "text-surface-weaker cursor-pointer bg-transparent border-0",
    "hover:bg-surface-hover hover:text-surface-default transition-colors duration-120",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
  ],
});

const Backdrop = React.forwardRef<HTMLDivElement, DrawerBackdropProps>(
  ({ className, ...props }, ref) => (
    <BaseDrawer.Backdrop ref={ref} className={backdropVariants({ className: className as string | undefined })} {...props} />
  )
);
Backdrop.displayName = "Drawer.Backdrop";

const Popup = React.forwardRef<HTMLDivElement, DrawerPopupProps>(
  ({ side, className, ...props }, ref) => (
    <BaseDrawer.Popup ref={ref} className={popupVariants({ side, className: className as string | undefined })} {...props} />
  )
);
Popup.displayName = "Drawer.Popup";

const Title = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, ...props }, ref) => (
    <BaseDrawer.Title ref={ref} className={titleVariants({ className: className as string | undefined })} {...props} />
  )
);
Title.displayName = "Drawer.Title";

const Description = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ className, ...props }, ref) => (
    <BaseDrawer.Description ref={ref} className={descriptionVariants({ className: className as string | undefined })} {...props} />
  )
);
Description.displayName = "Drawer.Description";

const Close = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ className, children, ...props }, ref) => (
    <BaseDrawer.Close ref={ref} className={closeVariants({ className: className as string | undefined })} {...props}>
      {children ?? <XSymbol size={14} />}
    </BaseDrawer.Close>
  )
);
Close.displayName = "Drawer.Close";

// Header utility component
const Header = ({ children, title, description, onClose }: { children?: React.ReactNode; title?: string; description?: string; onClose?: () => void }) => (
  <div className="flex items-start justify-between p-6 border-b border-solid border-surface-weak">
    <div className="flex flex-col gap-1">
      {title && <BaseDrawer.Title className={titleVariants()}>{title}</BaseDrawer.Title>}
      {description && <BaseDrawer.Description className={descriptionVariants()}>{description}</BaseDrawer.Description>}
      {children}
    </div>
    <BaseDrawer.Close className={closeVariants()}><XSymbol size={14} /></BaseDrawer.Close>
  </div>
);

export const Drawer = {
  Root: BaseDrawer.Root,
  Trigger: BaseDrawer.Trigger,
  Portal: BaseDrawer.Portal,
  Backdrop,
  Popup,
  Title,
  Description,
  Close,
  Header,
};
