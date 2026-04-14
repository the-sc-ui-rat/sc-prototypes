import React from "react";
import type { Story } from "@ladle/react";
import { Progress } from ".";

export default { title: "Components / Progress" };


export const Default: Story = () => (
  <div className="w-64 p-4 flex flex-col gap-4">
    <Progress.Root value={40} max={100}>
      <Progress.Track>
        <Progress.Indicator style={{ width: "40%" }} />
      </Progress.Track>
    </Progress.Root>
    <Progress.Root value={70} max={100}>
      <Progress.Track>
        <Progress.Indicator status="positive" style={{ width: "70%" }} />
      </Progress.Track>
    </Progress.Root>
    <Progress.Root value={30} max={100}>
      <Progress.Track>
        <Progress.Indicator status="negative" style={{ width: "30%" }} />
      </Progress.Track>
    </Progress.Root>
  </div>
);
Default.storyName = "Default";

export const Sizes: Story = () => (
  <div className="w-64 p-4 flex flex-col gap-4">
    {(["sm", "md", "lg"] as const).map((size) => (
      <Progress.Root key={size} value={60} max={100}>
        <Progress.Track size={size}>
          <Progress.Indicator style={{ width: "60%" }} />
        </Progress.Track>
      </Progress.Root>
    ))}
  </div>
);
Sizes.storyName = "Sizes";
