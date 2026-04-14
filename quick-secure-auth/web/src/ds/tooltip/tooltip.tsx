import React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { TooltipPopupProps, TooltipProviderProps } from "./types";

const popupVariants = tv({
  base: [
    "bg-inverse-default [color:var(--text-color-inverse)]",
    "body-xs rounded-xs px-2 py-1 shadow-sm",
    "pointer-events-none select-none max-w-48 z-50",
  ],
});

const Popup = React.forwardRef<HTMLDivElement, TooltipPopupProps>(
  ({ className, ...props }, ref) => (
    <BaseTooltip.Popup ref={ref} className={popupVariants({ className: className as string | undefined })} {...props} />
  )
);
Popup.displayName = "Tooltip.Popup";

export const Tooltip = {
  Provider: BaseTooltip.Provider,
  Root: BaseTooltip.Root,
  Trigger: BaseTooltip.Trigger,
  Portal: BaseTooltip.Portal,
  Positioner: BaseTooltip.Positioner,
  Popup,
  Arrow: BaseTooltip.Arrow,
};
