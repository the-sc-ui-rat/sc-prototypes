import React, { useState } from "react";
import type { Story } from "@ladle/react";
import { Menu } from ".";
import { Button } from "../button";

export default { title: "Components / Menu" };


export const Default: Story = () => (
  <div className="p-12 flex justify-center">
    <Menu.Root>
      <Menu.Trigger render={<Button variant="secondary">Actions</Button>} />
      <Menu.Portal>
        <Menu.Positioner sideOffset={4} side="bottom" align="start">
          <Menu.Popup>
            <Menu.Item>View details</Menu.Item>
            <Menu.Item>Edit</Menu.Item>
            <Menu.Item>Duplicate</Menu.Item>
            <Menu.Separator />
            <Menu.Item className="text-negative-default [&:not([data-disabled])]:data-[highlighted]:bg-negative-weaker">
              Delete
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  </div>
);
Default.storyName = "Default";

export const WithGroups: Story = () => {
  const [notifications, setNotifications] = useState(true);
  return (
    <div className="p-12 flex justify-center">
      <Menu.Root>
        <Menu.Trigger render={<Button variant="secondary">Options</Button>} />
        <Menu.Portal>
          <Menu.Positioner sideOffset={4} side="bottom" align="start">
            <Menu.Popup>
              <Menu.Group>
                <Menu.GroupLabel>Account</Menu.GroupLabel>
                <Menu.Item>Profile</Menu.Item>
                <Menu.Item>Settings</Menu.Item>
              </Menu.Group>
              <Menu.Separator />
              <Menu.Group>
                <Menu.GroupLabel>Preferences</Menu.GroupLabel>
                <Menu.CheckboxItem checked={notifications} onCheckedChange={setNotifications}>
                  Notifications
                </Menu.CheckboxItem>
              </Menu.Group>
              <Menu.Separator />
              <Menu.Item>Sign out</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
};
WithGroups.storyName = "With groups";
