import React from "react";
import type { Story } from "@ladle/react";
import { CircleExclamation } from "@safetyculture/icons-react";
import { AlertDialog } from ".";
import { Button } from "../button";

export default { title: "Components / AlertDialog" };


export const Destructive: Story = () => (
  <div className="p-6">
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button variant="primary" modifier="destructive">Delete record</Button>} />
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup>
          <AlertDialog.Title>Delete record?</AlertDialog.Title>
          <AlertDialog.Description>
            This will permanently delete this record and all associated data. This action cannot be undone.
          </AlertDialog.Description>
          <div className="flex justify-end gap-2">
            <AlertDialog.Close>Cancel</AlertDialog.Close>
            <Button variant="primary" modifier="destructive">Delete</Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  </div>
);
Destructive.storyName = "Destructive";

export const Confirm: Story = () => (
  <div className="p-6">
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button variant="secondary">Track location</Button>} />
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup>
          <AlertDialog.Title>Allow location tracking?</AlertDialog.Title>
          <AlertDialog.Description>
            Are you ok with us tracking your location? We will not share your location with anyone outside iAuditor.
          </AlertDialog.Description>
          <div className="flex justify-end gap-2">
            <AlertDialog.Close>Cancel</AlertDialog.Close>
            <Button variant="primary">Agree</Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  </div>
);
Confirm.storyName = "Confirm";

export const Acknowledge: Story = () => (
  <div className="p-6">
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button variant="secondary">Show error</Button>} />
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup>
          <AlertDialog.Icon>
            <CircleExclamation size={32} className="text-negative-default" />
          </AlertDialog.Icon>
          <div className="flex flex-col gap-1 text-center">
            <AlertDialog.Title>Unable to share template</AlertDialog.Title>
            <AlertDialog.Description>
              We were unable to share your template due to your email address not being verified.
            </AlertDialog.Description>
          </div>
          <AlertDialog.Close>Okay</AlertDialog.Close>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  </div>
);
Acknowledge.storyName = "Acknowledge";

export const Small: Story = () => (
  <div className="p-6">
    <AlertDialog.Root>
      <AlertDialog.Trigger render={<Button variant="primary" modifier="destructive">Delete files</Button>} />
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup size="sm">
          <AlertDialog.Title>Delete 103 files?</AlertDialog.Title>
          <AlertDialog.Description>
            103 files will be deleted forever, are you sure you want to proceed?
          </AlertDialog.Description>
          <div className="flex flex-col gap-2">
            <Button variant="primary" modifier="destructive">Move to trash</Button>
            <AlertDialog.Close>Cancel</AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  </div>
);
Small.storyName = "Small";
