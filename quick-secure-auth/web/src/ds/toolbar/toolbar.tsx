import React from "react";
import { Toolbar as BaseToolbar } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { ToolbarRootProps, ToolbarSeparatorProps } from "./types";

const rootVariants = tv({
  base: "flex items-center gap-1 p-1 rounded-sm bg-surface-default text-surface-default border border-solid border-surface-weak",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col w-fit",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

const separatorVariants = tv({
  base: "bg-surface2-default shrink-0",
  variants: {
    orientation: {
      horizontal: "w-px h-5 mx-1",
      vertical: "h-px w-5 my-1",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

const Root = React.forwardRef<HTMLDivElement, ToolbarRootProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => (
    <BaseToolbar.Root
      ref={ref}
      orientation={orientation}
      className={rootVariants({ orientation, className: className as string | undefined })}
      {...props}
    />
  )
);
Root.displayName = "Toolbar.Root";

const ToolbarSeparator = React.forwardRef<HTMLDivElement, ToolbarSeparatorProps>(
  ({ className, ...props }, ref) => (
    <BaseToolbar.Separator ref={ref} className={separatorVariants({ className: className as string | undefined })} {...props} />
  )
);
ToolbarSeparator.displayName = "Toolbar.Separator";

export const Toolbar = {
  Root,
  Button: BaseToolbar.Button,
  Link: BaseToolbar.Link,
  Input: BaseToolbar.Input,
  Group: BaseToolbar.Group,
  Separator: ToolbarSeparator,
};
