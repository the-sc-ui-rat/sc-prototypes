import type { ComponentPropsWithoutRef } from "react";
import type { Toolbar as BaseToolbar } from "@base-ui/react";

export interface ToolbarRootProps extends ComponentPropsWithoutRef<typeof BaseToolbar.Root> {}
export interface ToolbarSeparatorProps extends ComponentPropsWithoutRef<typeof BaseToolbar.Separator> {}
