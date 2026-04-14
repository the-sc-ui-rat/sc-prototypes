import React, { useState } from "react";
import type { Story } from "@ladle/react";
import { SwitchToggle } from ".";

export default { title: "Components / SwitchToggle" };


export const Default: Story = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="p-6 flex flex-col gap-4">
      <label className="flex items-center gap-3 cursor-pointer body-sm text-surface-default">
        <SwitchToggle.Root checked={checked} onCheckedChange={setChecked} aria-label="Toggle feature" />
        {checked ? "Enabled" : "Disabled"}
      </label>
      <label className="flex items-center gap-3 cursor-pointer body-sm text-surface-default">
        <SwitchToggle.Root defaultChecked aria-label="Pre-enabled" />
        Pre-enabled
      </label>
      <label className="flex items-center gap-3 cursor-not-allowed body-sm text-surface-weaker">
        <SwitchToggle.Root disabled aria-label="Disabled off" />
        Disabled (off)
      </label>
      <label className="flex items-center gap-3 cursor-not-allowed body-sm text-surface-weaker">
        <SwitchToggle.Root disabled defaultChecked aria-label="Disabled on" />
        Disabled (on)
      </label>
    </div>
  );
};
Default.storyName = "Default";

export const Sizes: Story = () => (
  <div className="p-6 flex flex-col gap-6">
    <div className="flex flex-col gap-3">
      <p className="label-md text-surface-default">Medium (md)</p>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
          <SwitchToggle.Root size="md" defaultChecked aria-label="md on" />
          On
        </label>
        <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
          <SwitchToggle.Root size="md" aria-label="md off" />
          Off
        </label>
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <p className="label-md text-surface-default">Small (sm)</p>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
          <SwitchToggle.Root size="sm" defaultChecked aria-label="sm on" />
          On
        </label>
        <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
          <SwitchToggle.Root size="sm" aria-label="sm off" />
          Off
        </label>
      </div>
    </div>
  </div>
);
Sizes.storyName = "Sizes";
