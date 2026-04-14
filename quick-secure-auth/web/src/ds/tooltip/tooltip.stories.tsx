import React from "react";
import type { Story } from "@ladle/react";
import { Tooltip } from ".";
import { Button } from "../button";

export default { title: "Components / Tooltip" };


export const Default: Story = () => (
  <div className="p-16 flex items-center justify-center gap-6">
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger render={<Button variant="secondary">Hover me</Button>} />
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={4} side="top">
            <Tooltip.Popup>Creates a new inspection template</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger render={<Button variant="tertiary">And me</Button>} />
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={4} side="bottom">
            <Tooltip.Popup>Opens the schedule editor</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  </div>
);
Default.storyName = "Default";
