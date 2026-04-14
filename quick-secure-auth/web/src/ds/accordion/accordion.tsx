import React from "react";
import { Accordion as BaseAccordion } from "@base-ui/react";
import { ChevronDown } from "@safetyculture/icons-react";
import { tv } from "../../utils/variants";
import type { AccordionRootProps, AccordionItemProps, AccordionHeaderProps, AccordionTriggerProps, AccordionPanelProps } from "./types";

const rootVariants = tv({ base: "w-full divide-y divide-surface-weak border border-solid border-surface-weak rounded-md overflow-hidden" });

const itemVariants = tv({ base: "bg-surface-default" });

const headerVariants = tv({ base: "flex" });

const triggerVariants = tv({
  base: [
    "flex flex-1 items-center justify-between py-3 px-4",
    "label-md text-surface-default text-left",
    "cursor-pointer bg-transparent border-0 w-full",
    "hover:text-accent-default transition-colors duration-120",
    "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-[-2px]",
  ],
});

const iconVariants = tv({
  base: "shrink-0 text-surface-weaker transition-transform duration-200 data-[open]:rotate-180",
});

const panelVariants = tv({
  base: "px-4 pb-3 body-sm text-surface-weaker overflow-hidden",
  // Base UI v1 handles open/close visibility via [hidden] attribute + CSS grid
  // For transition, add: "[&[hidden]]:hidden"
});

const Root = React.forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ className, ...props }, ref) => (
    <BaseAccordion.Root ref={ref} className={rootVariants({ className: className as string | undefined })} {...props} />
  )
);
Root.displayName = "Accordion.Root";

const Item = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <BaseAccordion.Item ref={ref} className={itemVariants({ className: className as string | undefined })} {...props} />
  )
);
Item.displayName = "Accordion.Item";

const Header = React.forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  ({ className, ...props }, ref) => (
    <BaseAccordion.Header ref={ref} className={headerVariants({ className: className as string | undefined })} {...props} />
  )
);
Header.displayName = "Accordion.Header";

const Trigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <BaseAccordion.Trigger ref={ref} className={triggerVariants({ className: className as string | undefined })} {...props}>
      {children}
      <ChevronDown size={16} className={iconVariants()} />
    </BaseAccordion.Trigger>
  )
);
Trigger.displayName = "Accordion.Trigger";

const Panel = React.forwardRef<HTMLDivElement, AccordionPanelProps>(
  ({ className, ...props }, ref) => (
    <BaseAccordion.Panel ref={ref} className={panelVariants({ className: className as string | undefined })} {...props} />
  )
);
Panel.displayName = "Accordion.Panel";

export const Accordion = { Root, Item, Header, Trigger, Panel };
