import React from "react";
import type { Story } from "@ladle/react";
import { ScrollArea } from ".";

export default { title: "Components / ScrollArea" };


export const Default: Story = () => (
  <div className="p-6">
    <ScrollArea.Root className="h-48 w-64 rounded-md border border-surface-weak">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <div className="p-3 flex flex-col gap-2">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="body-sm text-surface-default py-1 border-b border-surface-weak last:border-0">
                Item {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  </div>
);
Default.storyName = "Default";
