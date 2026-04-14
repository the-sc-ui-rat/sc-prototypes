import React from "react";
import type { Story } from "@ladle/react";
import { PreviewCard } from ".";
import { Avatar } from "../avatar";

export default { title: "Components / PreviewCard" };


export const Default: Story = () => (
  <div className="p-16 flex justify-center">
    <PreviewCard.Root>
      <PreviewCard.Trigger className="text-accent-default body-sm underline cursor-pointer">
        Jane Doe
      </PreviewCard.Trigger>
      <PreviewCard.Portal>
        <PreviewCard.Positioner sideOffset={8} side="bottom">
          <PreviewCard.Popup>
            <div className="flex items-center gap-3 mb-3">
              <Avatar.Root size="lg">
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar.Root>
              <div>
                <div className="font-[500] text-surface-default">Jane Doe</div>
                <div className="body-xs text-surface-weaker">Safety Manager</div>
              </div>
            </div>
            <p className="body-xs text-surface-weaker">Member since Jan 2023 · 42 inspections</p>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  </div>
);
Default.storyName = "Default";
