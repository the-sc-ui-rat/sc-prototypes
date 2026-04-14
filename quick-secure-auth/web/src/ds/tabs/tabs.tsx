import React from "react";
import { Tabs as BaseTabs } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { TabsRootProps, TabsListProps, TabsTabProps, TabsPanelProps, TabsIndicatorProps } from "./types";

const rootVariants = tv({ base: "w-full" });

const listVariants = tv({
  base: "relative flex gap-1",
  variants: {
    variant: {
      border: "border-b border-solid border-surface-weak",
      pill: "",
    },
  },
  defaultVariants: { variant: "border" },
});

const tabVariants = tv({
  base: [
    "inline-flex items-center gap-1 label-md cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
    "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none",
  ],
  variants: {
    variant: {
      border: [
        "-mb-px pb-3 px-1",
        "text-surface-weaker border-b-2 border-transparent",
        "hover:text-surface-default transition-colors duration-120",
        "data-[active]:text-accent-default data-[active]:border-accent-default",
      ],
      pill: [
        "px-2",
        "text-surface-weaker",
        "hover:text-surface-default transition-colors duration-120",
        "data-[active]:bg-accent-weaker data-[active]:text-accent-default",
      ],
    },
    size: {
      md: "",
      sm: "",
    },
  },
  compoundVariants: [
    { variant: "pill", size: "md", class: "h-8 rounded-sm" },
    { variant: "pill", size: "sm", class: "h-6 rounded-xs" },
  ],
  defaultVariants: { variant: "border", size: "md" },
});

const panelVariants = tv({
  base: "pt-4 body-sm text-surface-default focus-visible:outline-none",
});

const Root = React.forwardRef<HTMLDivElement, TabsRootProps>(
  ({ className, ...props }, ref) => (
    <BaseTabs.Root ref={ref} className={rootVariants({ className: className as string | undefined })} {...props} />
  )
);
Root.displayName = "Tabs.Root";

const List = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant = "border", ...props }, ref) => (
    <BaseTabs.List ref={ref} className={listVariants({ variant, className: className as string | undefined })} {...props} />
  )
);
List.displayName = "Tabs.List";

const Tab = React.forwardRef<HTMLButtonElement, TabsTabProps>(
  ({ className, variant = "border", size = "md", startIcon, children, ...props }, ref) => (
    <BaseTabs.Tab
      ref={ref}
      className={tabVariants({ variant, size, className: className as string | undefined })}
      {...props}
    >
      {startIcon}
      {children}
    </BaseTabs.Tab>
  )
);
Tab.displayName = "Tabs.Tab";

const Panel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ className, ...props }, ref) => (
    <BaseTabs.Panel ref={ref} className={panelVariants({ className: className as string | undefined })} {...props} />
  )
);
Panel.displayName = "Tabs.Panel";

const Indicator = React.forwardRef<HTMLSpanElement, TabsIndicatorProps>(
  ({ className, ...props }, ref) => (
    <BaseTabs.Indicator
      ref={ref}
      className={`absolute bottom-0 h-0.5 bg-accent-default transition-[left,width] duration-200 left-[var(--active-tab-left)] w-[var(--active-tab-width)] ${className ?? ""}`}
      {...props}
    />
  )
);
Indicator.displayName = "Tabs.Indicator";

export const Tabs = { Root, List, Tab, Panel, Indicator };
