import React from "react";
import type { Story } from "@ladle/react";
import { Dialog } from ".";
import { Button } from "../button";

export default { title: "Components / Dialog" };


export const Default: Story = () => (
  <div className="p-6">
    <Dialog.Root>
      <Dialog.Trigger render={<Button>Open dialog</Button>} />
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Close />
          <Dialog.Title>Confirm action</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to continue? This action cannot be undone.
          </Dialog.Description>
          <div className="flex justify-end gap-2">
            <Dialog.Close render={<Button variant="tertiary">Cancel</Button>} />
            <Button>Confirm</Button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  </div>
);
Default.storyName = "Default";
