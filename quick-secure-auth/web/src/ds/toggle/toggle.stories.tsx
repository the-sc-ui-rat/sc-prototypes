import React, { useState } from "react";
import type { Story } from "@ladle/react";
import { Toggle } from ".";

export default { title: "Components / Toggle" };


export const Default: Story = () => {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="p-6 flex gap-3">
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        {pressed ? "On" : "Off"}
      </Toggle>
      <Toggle defaultPressed>Bold</Toggle>
      <Toggle disabled>Disabled</Toggle>
    </div>
  );
};
Default.storyName = "Default";
