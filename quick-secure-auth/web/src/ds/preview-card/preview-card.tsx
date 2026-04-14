import React from "react";
import { PreviewCard as BasePreviewCard } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { PreviewCardPopupProps } from "./types";

const popupVariants = tv({
  base: [
    "bg-surface-default border border-solid border-surface-weak rounded-md shadow-md",
    "p-4 max-w-64 body-sm text-surface-default",
    "focus-visible:outline-none",
  ],
});

const Popup = React.forwardRef<HTMLDivElement, PreviewCardPopupProps>(
  ({ className, ...props }, ref) => (
    <BasePreviewCard.Popup ref={ref} className={popupVariants({ className: className as string | undefined })} {...props} />
  )
);
Popup.displayName = "PreviewCard.Popup";

export const PreviewCard = {
  Root: BasePreviewCard.Root,
  Trigger: BasePreviewCard.Trigger,
  Portal: BasePreviewCard.Portal,
  Positioner: BasePreviewCard.Positioner,
  Backdrop: BasePreviewCard.Backdrop,
  Popup,
  Arrow: BasePreviewCard.Arrow,
};
