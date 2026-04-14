import React from "react";
import type { Story } from "@ladle/react";
import { Meter } from ".";

export default { title: "Components / Meter" };


export const Default: Story = () => (
  <div className="w-64 p-4 flex flex-col gap-4">
    <Meter.Root value={30} min={0} max={100}>
      <div className="flex justify-between body-xs text-surface-weaker mb-1">
        <Meter.Label>Battery</Meter.Label>
        <Meter.Value />
      </div>
      <Meter.Track>
        <Meter.Indicator status="low" style={{ width: "30%" }} />
      </Meter.Track>
    </Meter.Root>
    <Meter.Root value={65} min={0} max={100}>
      <Meter.Track>
        <Meter.Indicator status="medium" style={{ width: "65%" }} />
      </Meter.Track>
    </Meter.Root>
    <Meter.Root value={90} min={0} max={100}>
      <Meter.Track>
        <Meter.Indicator status="high" style={{ width: "90%" }} />
      </Meter.Track>
    </Meter.Root>
  </div>
);
Default.storyName = "Default";
