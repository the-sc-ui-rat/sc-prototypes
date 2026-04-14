import type { ComponentPropsWithoutRef } from "react";
import type { ScrollArea as BaseScrollArea } from "@base-ui/react";

export interface ScrollAreaRootProps extends ComponentPropsWithoutRef<typeof BaseScrollArea.Root> {}
export interface ScrollAreaViewportProps extends ComponentPropsWithoutRef<typeof BaseScrollArea.Viewport> {}
export interface ScrollAreaScrollbarProps extends ComponentPropsWithoutRef<typeof BaseScrollArea.Scrollbar> {}
export interface ScrollAreaThumbProps extends ComponentPropsWithoutRef<typeof BaseScrollArea.Thumb> {}
