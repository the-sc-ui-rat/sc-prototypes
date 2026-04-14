import type { ComponentPropsWithoutRef } from "react";
import type { Collapsible as BaseCollapsible } from "@base-ui/react";

export interface CollapsibleRootProps extends ComponentPropsWithoutRef<typeof BaseCollapsible.Root> {}
export interface CollapsibleTriggerProps extends ComponentPropsWithoutRef<typeof BaseCollapsible.Trigger> {}
export interface CollapsiblePanelProps extends ComponentPropsWithoutRef<typeof BaseCollapsible.Panel> {}
