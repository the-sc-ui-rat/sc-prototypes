import React from "react";
import { Popover as BasePopover } from "@base-ui/react";
import { XSymbol } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { PopoverPopupProps, PopoverArrowProps, PopoverTitleProps, PopoverDescriptionProps, PopoverCloseProps } from "./types";

const popupVariants = tv({
  base: [
    "bg-surface-default border border-solid border-surface-weak rounded-md shadow-md",
    "p-4 body-sm text-surface-default max-w-72",
    "focus-visible:outline-none",
  ],
});

const arrowVariants = tv({
  base: "data-[side=top]:bottom-[-6px] data-[side=bottom]:top-[-6px] data-[side=left]:right-[-6px] data-[side=right]:left-[-6px]",
});

const titleVariants = tv({ base: "body-sm-strong text-surface-default mb-1" });
const descriptionVariants = tv({ base: "body-sm text-surface-weaker" });
const closeVariants = tv({
  base: [
    "absolute top-2 right-2 flex items-center justify-center h-6 w-6 rounded-xs",
    "text-surface-weaker cursor-pointer bg-transparent border-0",
    "hover:bg-surface-hover hover:text-surface-default transition-colors duration-120",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
  ],
});

const Popup = React.forwardRef<HTMLDivElement, PopoverPopupProps>(
  ({ className, ...props }, ref) => (
    <BasePopover.Popup ref={ref} className={popupVariants({ className: className as string | undefined })} {...props} />
  )
);
Popup.displayName = "Popover.Popup";

const Arrow = React.forwardRef<HTMLDivElement, PopoverArrowProps>(
  ({ className, ...props }, ref) => (
    <BasePopover.Arrow ref={ref} className={arrowVariants({ className: className as string | undefined })} {...props} />
  )
);
Arrow.displayName = "Popover.Arrow";

const Title = React.forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  ({ className, ...props }, ref) => (
    <BasePopover.Title ref={ref} className={titleVariants({ className: className as string | undefined })} {...props} />
  )
);
Title.displayName = "Popover.Title";

const Description = React.forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  ({ className, ...props }, ref) => (
    <BasePopover.Description ref={ref} className={descriptionVariants({ className: className as string | undefined })} {...props} />
  )
);
Description.displayName = "Popover.Description";

const Close = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ className, children, ...props }, ref) => (
    <BasePopover.Close ref={ref} className={closeVariants({ className: className as string | undefined })} {...props}>
      {children ?? <XSymbol size={12} />}
    </BasePopover.Close>
  )
);
Close.displayName = "Popover.Close";

export const Popover = {
  Root: BasePopover.Root,
  Trigger: BasePopover.Trigger,
  Portal: BasePopover.Portal,
  Positioner: BasePopover.Positioner,
  Backdrop: BasePopover.Backdrop,
  Popup,
  Arrow,
  Title,
  Description,
  Close,
};
