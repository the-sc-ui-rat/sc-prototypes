import React from "react";
import type { Story } from "@ladle/react";
import { Separator } from ".";

export default { title: "Components / Separator" };


export const Horizontal: Story = () => (
  <div className="w-48 p-4 flex flex-col gap-3">
    <span className="body-sm text-surface-default">Above</span>
    <Separator />
    <span className="body-sm text-surface-default">Below</span>
  </div>
);
Horizontal.storyName = "Horizontal";

export const Vertical: Story = () => (
  <div className="flex items-center gap-3 p-4 h-12">
    <span className="body-sm text-surface-default">Left</span>
    <Separator orientation="vertical" />
    <span className="body-sm text-surface-default">Right</span>
  </div>
);
Vertical.storyName = "Vertical";
