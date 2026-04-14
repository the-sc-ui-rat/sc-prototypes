import React from "react";
import type { Story } from "@ladle/react";
import { Popover } from ".";
import { Button } from "../button";

export default { title: "Components / Popover" };


export const Default: Story = () => (
  <div className="p-16 flex justify-center">
    <Popover.Root>
      <Popover.Trigger render={<Button variant="secondary">More info</Button>} />
      <Popover.Portal>
        <Popover.Positioner sideOffset={8} side="bottom" align="center">
          <Popover.Popup>
            <Popover.Close />
            <Popover.Title>Template settings</Popover.Title>
            <Popover.Description>
              Configure who can edit this template and how it appears in the library.
            </Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  </div>
);
Default.storyName = "Default";
