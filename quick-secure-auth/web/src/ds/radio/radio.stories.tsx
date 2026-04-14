import React, { useState } from "react";
import type { Story } from "@ladle/react";
import { Radio, RadioGroup } from ".";

export default { title: "Components / Radio" };


export const Default: Story = () => {
  const [value, setValue] = useState("b");
  return (
    <div className="p-6">
      <RadioGroup value={value} onValueChange={(v) => setValue(v as string)}>
        {[
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
          { value: "c", label: "Option C (disabled)", disabled: true },
        ].map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
            <Radio.Root value={opt.value} disabled={opt.disabled} />
            {opt.label}
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};
Default.storyName = "Default";

export const Horizontal: Story = () => (
  <div className="p-6">
    <RadioGroup orientation="horizontal" defaultValue="yes">
      {["Yes", "No", "Maybe"].map((label) => (
        <label key={label} className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
          <Radio.Root value={label.toLowerCase()} />
          {label}
        </label>
      ))}
    </RadioGroup>
  </div>
);
Horizontal.storyName = "Horizontal";

export const Sizes: Story = () => (
  <div className="p-6 flex flex-col gap-4">
    {(["lg", "md"] as const).map((size) => (
      <RadioGroup key={size} defaultValue="b" orientation="horizontal">
        {[
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
          { value: "c", label: "Option C" },
        ].map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
            <Radio.Root value={opt.value} size={size} />
            {opt.label} ({size})
          </label>
        ))}
      </RadioGroup>
    ))}
  </div>
);
Sizes.storyName = "Sizes";

export const Error: Story = () => (
  <div className="p-6">
    <RadioGroup defaultValue="b">
      {[
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
        { value: "c", label: "Option C" },
      ].map((opt) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
          <Radio.Root value={opt.value} error />
          {opt.label}
        </label>
      ))}
    </RadioGroup>
  </div>
);
Error.storyName = "Error";

export const ErrorDisabled: Story = () => (
  <div className="p-6">
    <RadioGroup defaultValue="b">
      {[
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
      ].map((opt) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
          <Radio.Root value={opt.value} error disabled />
          {opt.label}
        </label>
      ))}
    </RadioGroup>
  </div>
);
ErrorDisabled.storyName = "Error Disabled";
