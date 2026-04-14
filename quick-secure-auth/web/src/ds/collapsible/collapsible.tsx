import React from "react";
import { Collapsible as BaseCollapsible } from "@base-ui/react";
import { ChevronDown } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { CollapsibleRootProps, CollapsibleTriggerProps, CollapsiblePanelProps } from "./types";

const triggerVariants = tv({
  base: [
    "inline-flex items-center gap-2",
    "label-md text-surface-default",
    "cursor-pointer bg-transparent border-0 p-0 m-0",
    "hover:text-accent-default transition-colors duration-120",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
    "[&>svg]:transition-transform [&>svg]:duration-200 [&[aria-expanded=true]>svg]:rotate-180",
  ],
});

const panelVariants = tv({
  base: "overflow-hidden body-sm text-surface-weaker",
});

const Root = React.forwardRef<HTMLDivElement, CollapsibleRootProps>(
  ({ className, ...props }, ref) => (
    <BaseCollapsible.Root ref={ref} className={className} {...props} />
  )
);
Root.displayName = "Collapsible.Root";

const Trigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <BaseCollapsible.Trigger ref={ref} className={triggerVariants({ className: className as string | undefined })} {...props}>
      {children}
      <ChevronDown size={14} />
    </BaseCollapsible.Trigger>
  )
);
Trigger.displayName = "Collapsible.Trigger";

const Panel = React.forwardRef<HTMLDivElement, CollapsiblePanelProps>(
  ({ className, ...props }, ref) => (
    <BaseCollapsible.Panel ref={ref} className={panelVariants({ className: className as string | undefined })} {...props} />
  )
);
Panel.displayName = "Collapsible.Panel";

export const Collapsible = { Root, Trigger, Panel };
