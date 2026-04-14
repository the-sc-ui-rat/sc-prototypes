import React, { useState } from "react";
import type { Story } from "@ladle/react";
import { Toggle } from "../toggle";
import { ToggleGroup } from ".";

export default { title: "Components / ToggleGroup" };


export const Single: Story = () => {
  const [value, setValue] = useState<string[]>(["center"]);
  return (
    <div className="p-6">
      <ToggleGroup value={value} onValueChange={(v) => setValue(v)}>
        {["Left", "Center", "Right"].map((label) => (
          <Toggle key={label} value={label.toLowerCase()}>{label}</Toggle>
        ))}
      </ToggleGroup>
    </div>
  );
};
Single.storyName = "Single";

export const Multiple: Story = () => {
  const [value, setValue] = useState<string[]>(["bold"]);
  return (
    <div className="p-6">
      <ToggleGroup value={value} onValueChange={(v) => setValue(v)} multiple>
        {["Bold", "Italic", "Underline"].map((label) => (
          <Toggle key={label} value={label.toLowerCase()}>{label}</Toggle>
        ))}
      </ToggleGroup>
    </div>
  );
};
Multiple.storyName = "Multiple";
