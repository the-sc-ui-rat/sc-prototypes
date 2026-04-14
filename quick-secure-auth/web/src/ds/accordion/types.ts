import type { ComponentPropsWithoutRef } from "react";
import type { Accordion as BaseAccordion } from "@base-ui/react";

export interface AccordionRootProps extends ComponentPropsWithoutRef<typeof BaseAccordion.Root> {}
export interface AccordionItemProps extends ComponentPropsWithoutRef<typeof BaseAccordion.Item> {}
export interface AccordionHeaderProps extends ComponentPropsWithoutRef<typeof BaseAccordion.Header> {}
export interface AccordionTriggerProps extends ComponentPropsWithoutRef<typeof BaseAccordion.Trigger> {}
export interface AccordionPanelProps extends ComponentPropsWithoutRef<typeof BaseAccordion.Panel> {}
