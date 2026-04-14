import React from "react";
import { ScrollArea as BaseScrollArea } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { ScrollAreaRootProps, ScrollAreaViewportProps, ScrollAreaScrollbarProps, ScrollAreaThumbProps } from "./types";

const rootVariants = tv({ base: "relative overflow-hidden" });
const viewportVariants = tv({ base: "h-full w-full overflow-scroll scroll-smooth" });
const contentVariants = tv({ base: "min-w-full table" });
const scrollbarVariants = tv({
  base: "flex touch-none select-none p-[3px] transition-colors duration-150",
  variants: {
    orientation: {
      vertical: "w-2.5 border-l border-transparent",
      horizontal: "h-2.5 flex-col border-t border-transparent",
    },
  },
  defaultVariants: { orientation: "vertical" },
});
const thumbVariants = tv({
  base: "relative flex-1 rounded-full bg-surface-strong hover:bg-surface-strong cursor-grab active:cursor-grabbing",
});
const cornerVariants = tv({ base: "bg-transparent" });

const Root = React.forwardRef<HTMLDivElement, ScrollAreaRootProps>(
  ({ className, ...props }, ref) => (
    <BaseScrollArea.Root ref={ref} className={rootVariants({ className: className as string | undefined })} {...props} />
  )
);
Root.displayName = "ScrollArea.Root";

const Viewport = React.forwardRef<HTMLDivElement, ScrollAreaViewportProps>(
  ({ className, ...props }, ref) => (
    <BaseScrollArea.Viewport ref={ref} className={viewportVariants({ className: className as string | undefined })} {...props} />
  )
);
Viewport.displayName = "ScrollArea.Viewport";

const Content = BaseScrollArea.Content;

const Scrollbar = React.forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(
  ({ orientation = "vertical", className, ...props }, ref) => (
    <BaseScrollArea.Scrollbar
      ref={ref}
      orientation={orientation}
      className={scrollbarVariants({ orientation, className: className as string | undefined })}
      {...props}
    />
  )
);
Scrollbar.displayName = "ScrollArea.Scrollbar";

const Thumb = React.forwardRef<HTMLDivElement, ScrollAreaThumbProps>(
  ({ className, ...props }, ref) => (
    <BaseScrollArea.Thumb ref={ref} className={thumbVariants({ className: className as string | undefined })} {...props} />
  )
);
Thumb.displayName = "ScrollArea.Thumb";

const Corner = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className, ...props }, ref) => (
    <BaseScrollArea.Corner ref={ref} className={cornerVariants({ className: className as string | undefined })} {...props} />
  )
);
Corner.displayName = "ScrollArea.Corner";

export const ScrollArea = { Root, Viewport, Content, Scrollbar, Thumb, Corner };
