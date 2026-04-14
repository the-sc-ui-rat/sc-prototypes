import React from "react";
import type { Story } from "@ladle/react";
import { Drawer } from ".";
import { Button } from "../button";

export default { title: "Components / Drawer" };


export const Default: Story = () => (
  <div className="p-6">
    <Drawer.Root>
      <Drawer.Trigger render={<Button>Open drawer</Button>} />
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Popup side="right">
          <Drawer.Header title="Settings" description="Configure your preferences." />
          <div className="p-6 flex-1 overflow-auto">
            <p className="body-sm text-surface-weaker">Drawer content goes here.</p>
          </div>
          <div className="p-4 border-t border-surface-weak flex justify-end gap-2">
            <Drawer.Close render={<Button variant="tertiary">Cancel</Button>} />
            <Button>Save</Button>
          </div>
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer.Root>
  </div>
);
Default.storyName = "Default";

export const Bottom: Story = () => (
  <div className="p-6">
    <Drawer.Root>
      <Drawer.Trigger render={<Button>Open bottom drawer</Button>} />
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Popup side="bottom">
          <div className="p-6">
            <Drawer.Title className="title-sm text-surface-default mb-2">Bottom drawer</Drawer.Title>
            <p className="body-sm text-surface-weaker">Slide up from bottom — good for mobile flows.</p>
          </div>
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer.Root>
  </div>
);
Bottom.storyName = "Bottom";
