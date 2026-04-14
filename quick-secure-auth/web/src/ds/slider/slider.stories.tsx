import React, { useState } from "react";
import type { Story } from "@ladle/react";
import { Slider } from ".";

export default { title: "Components / Slider" };


export const Default: Story = () => {
  const [value, setValue] = useState(40);
  return (
    <div className="w-64 p-6 flex flex-col gap-4">
      <div className="body-sm text-surface-weaker">Value: {value}</div>
      <Slider.Root value={value} onValueChange={(v) => setValue(Array.isArray(v) ? v[0] : v)} min={0} max={100}>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    </div>
  );
};
Default.storyName = "Default";

export const Range: Story = () => {
  const [value, setValue] = useState([20, 70]);
  return (
    <div className="w-64 p-6">
      <Slider.Root value={value} onValueChange={(v) => setValue(v as number[])} min={0} max={100}>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb />
            <Slider.Thumb />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    </div>
  );
};
Range.storyName = "Range";
