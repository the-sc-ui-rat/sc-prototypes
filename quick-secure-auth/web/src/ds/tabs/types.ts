import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Tabs as BaseTabs } from "@base-ui/react";

export interface TabsRootProps extends ComponentPropsWithoutRef<typeof BaseTabs.Root> {}
export interface TabsListProps extends ComponentPropsWithoutRef<typeof BaseTabs.List> {
  /** Visual style of the tab list. Defaults to `border`. */
  variant?: "border" | "pill";
}
export interface TabsTabProps extends ComponentPropsWithoutRef<typeof BaseTabs.Tab> {
  /** Visual style of the tab. Should match the parent `Tabs.List` variant. Defaults to `border`. */
  variant?: "border" | "pill";
  /** Size of the tab. Primarily affects pill variant. Defaults to `md`. */
  size?: "md" | "sm";
  /** Icon rendered before the label. */
  startIcon?: ReactNode;
}
export interface TabsPanelProps extends ComponentPropsWithoutRef<typeof BaseTabs.Panel> {}
export interface TabsIndicatorProps extends ComponentPropsWithoutRef<typeof BaseTabs.Indicator> {}
