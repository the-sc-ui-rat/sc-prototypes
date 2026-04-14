import type { ComponentPropsWithoutRef } from "react";
import type { Tooltip as BaseTooltip } from "@base-ui/react";

export interface TooltipPopupProps extends ComponentPropsWithoutRef<typeof BaseTooltip.Popup> {}
export interface TooltipProviderProps extends ComponentPropsWithoutRef<typeof BaseTooltip.Provider> {}
