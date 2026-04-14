import React from "react";
import type { Story } from "@ladle/react";
import { Toggle } from "../toggle";
import { Toolbar } from ".";

export default { title: "Components / Toolbar" };


export const Default: Story = () => (
  <div className="p-6">
    <Toolbar.Root>
      {["Bold", "Italic", "Underline"].map((label) => (
        <Toggle key={label} size="sm">{label}</Toggle>
      ))}
      <Toolbar.Separator />
      {["Left", "Center", "Right"].map((label) => (
        <Toggle key={label} size="sm">{label}</Toggle>
      ))}
    </Toolbar.Root>
  </div>
);
Default.storyName = "Default";
