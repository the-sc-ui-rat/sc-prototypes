import React, { useState } from "react";
import type { Story } from "@ladle/react";
import { NumberField } from ".";

export default { title: "Components / NumberField" };


export const Default: Story = () => {
  const [value, setValue] = useState(0);
  return (
    <div className="p-6 flex flex-col gap-4">
      <NumberField.Root value={value} onValueChange={(v) => setValue(v ?? 0)} min={0} max={100}>
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField.Root>
      <NumberField.Root defaultValue={5} step={0.5}>
        <NumberField.Group>
          <NumberField.Decrement />
          <NumberField.Input />
          <NumberField.Increment />
        </NumberField.Group>
      </NumberField.Root>
    </div>
  );
};
Default.storyName = "Default";
