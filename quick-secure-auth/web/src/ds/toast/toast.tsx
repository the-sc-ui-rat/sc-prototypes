import React from "react";
import { Toast as BaseToast } from "@base-ui/react";
import { XSymbol, CircleCheckFilled, CircleExclamationFilled } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type {
  ToastRootProps,
  ToastContentProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastCloseProps,
  ToastViewportProps,
  ToastStatusIconProps,
  ToastActionProps,
} from "./types";

// Viewport: fixed container — toasts are absolutely positioned inside it
const viewportVariants = tv({
  base: "fixed bottom-4 right-4 z-50 w-80 outline-none",
});

// Root: the visual card + stacking machinery (ported from Base UI official Tailwind demo)
const rootVariants = tv({
  base: [
    // Local CSS variable definitions for stacking math
    "[--gap:0.75rem] [--peek:0.75rem]",
    "[--scale:calc(max(0,1-(var(--toast-index)*0.1)))]",
    "[--shrink:calc(1-var(--scale))]",
    "[--height:var(--toast-frontmost-height,var(--toast-height))]",
    "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
    // Positioning — all toasts anchor to bottom-right of the viewport
    "absolute right-0 bottom-0 left-auto mr-0 w-full",
    "z-[calc(1000-var(--toast-index))] origin-bottom",
    "h-[var(--height)] select-none",
    // Pseudo-element fills the gap between stacked toasts so hover doesn't break
    "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
    // Default transform: scale + peek offset (collapsed/stacked state)
    "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
    "[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
    // Expanded state (hover): fan out with full height
    "data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
    "data-[expanded]:h-[var(--toast-height)]",
    // Enter: slide up from below
    "data-[starting-style]:[transform:translateY(150%)]",
    // Exit: slide down (standard dismiss, no swipe)
    "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
    "data-[ending-style]:opacity-0",
    // Excess toasts
    "data-[limited]:opacity-0",
    // Swipe-exit directions
    "data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
    "data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
    "data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
    "data-[expanded]:data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
    "data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
    "data-[expanded]:data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
    "data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
    "data-[expanded]:data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
    // Visual card
    "rounded-md shadow-md p-3 body-sm bg-clip-padding",
  ],
  variants: {
    status: {
      neutral: "bg-inverse-default text-inverse-default",
      success: "bg-positive-default text-positive-on-default",
      error:   "bg-negative-default text-negative-on-default",
    },
  },
  defaultVariants: { status: "neutral" },
});

// Content: inner layout + opacity for behind/expanded state
const contentVariants = tv({
  base: [
    "overflow-hidden flex gap-3",
    "transition-opacity duration-[250ms]",
    "data-[behind]:pointer-events-none data-[behind]:opacity-0",
    "data-[expanded]:pointer-events-auto data-[expanded]:opacity-100",
  ],
  variants: {
    direction: {
      row:    "flex-row items-center",
      column: "flex-row items-start",
    },
  },
  defaultVariants: { direction: "row" },
});

const titleVariants = tv({ base: "label-md" });
const descriptionVariants = tv({ base: "body-xs opacity-70" });
const closeVariants = tv({
  base: [
    "ml-auto flex items-center justify-center h-5 w-5 shrink-0 rounded-xs",
    "text-inherit opacity-70 cursor-pointer bg-transparent border-0",
    "hover:opacity-100 transition-opacity duration-120",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
  ],
});
const actionVariants = tv({
  base: "underline text-inherit label-md shrink-0 cursor-pointer",
});

const STATUS_ICON_MAP = {
  success: CircleCheckFilled,
  error:   CircleExclamationFilled,
  neutral: null,
} as const;

const Viewport = React.forwardRef<HTMLDivElement, ToastViewportProps>(
  ({ className, ...props }, ref) => (
    <BaseToast.Viewport ref={ref} className={viewportVariants({ className: className as string | undefined })} {...props} />
  )
);
Viewport.displayName = "Toast.Viewport";

const Root = React.forwardRef<HTMLDivElement, ToastRootProps>(
  ({ status = "neutral", className, ...props }, ref) => (
    <BaseToast.Root
      ref={ref}
      className={rootVariants({ status, className: className as string | undefined })}
      {...props}
    />
  )
);
Root.displayName = "Toast.Root";

const Content = React.forwardRef<HTMLDivElement, ToastContentProps>(
  ({ direction = "row", className, ...props }, ref) => (
    <BaseToast.Content
      ref={ref}
      className={contentVariants({ direction, className: className as string | undefined })}
      {...props}
    />
  )
);
Content.displayName = "Toast.Content";

const StatusIcon = ({ status, className }: ToastStatusIconProps) => {
  const Icon = STATUS_ICON_MAP[status ?? "neutral"];
  if (!Icon) return null;
  return <Icon size={16} className={className} />;
};
StatusIcon.displayName = "Toast.StatusIcon";

const Title = React.forwardRef<HTMLDivElement, ToastTitleProps>(
  ({ className, ...props }, ref) => (
    <BaseToast.Title ref={ref} className={titleVariants({ className: className as string | undefined })} {...props} />
  )
);
Title.displayName = "Toast.Title";

const Description = React.forwardRef<HTMLDivElement, ToastDescriptionProps>(
  ({ className, ...props }, ref) => (
    <BaseToast.Description ref={ref} className={descriptionVariants({ className: className as string | undefined })} {...props} />
  )
);
Description.displayName = "Toast.Description";

const Close = React.forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ className, children, ...props }, ref) => (
    <BaseToast.Close ref={ref} className={closeVariants({ className: className as string | undefined })} {...props}>
      {children ?? <XSymbol size={10} />}
    </BaseToast.Close>
  )
);
Close.displayName = "Toast.Close";

const Action = React.forwardRef<HTMLAnchorElement, ToastActionProps>(
  ({ className, ...props }, ref) => (
    <a ref={ref} className={actionVariants({ className: className as string | undefined })} {...props} />
  )
);
Action.displayName = "Toast.Action";

export const Toast = {
  useToastManager: BaseToast.useToastManager,
  Provider: BaseToast.Provider,
  Viewport,
  Root,
  Content,
  StatusIcon,
  Title,
  Description,
  Close,
  Action,
};
