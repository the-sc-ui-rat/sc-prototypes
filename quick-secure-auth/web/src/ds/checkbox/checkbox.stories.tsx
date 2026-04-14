import React, { useState } from "react";
import type { Story } from "@ladle/react";
import { Checkbox, CheckboxGroup } from ".";

export default { title: "Components / Checkbox" };


export const Default: Story = () => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div className="p-6 flex flex-col gap-3">
      <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        Accept terms
      </label>
      <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
        <Checkbox defaultChecked />
        Pre-checked
      </label>
      <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-disabled">
        <Checkbox disabled />
        Disabled
      </label>
      <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
        <Checkbox indeterminate />
        Indeterminate
      </label>
    </div>
  );
};
Default.storyName = "Default";

export const Sizes: Story = () => (
  <div className="p-6 flex flex-col gap-6">
    <div className="flex flex-col gap-3">
      <p className="label-md text-surface-default">Large (lg)</p>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
          <Checkbox size="lg" defaultChecked />
          Checked
        </label>
        <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
          <Checkbox size="lg" />
          Unchecked
        </label>
        <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
          <Checkbox size="lg" indeterminate />
          Indeterminate
        </label>
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <p className="label-md text-surface-default">Medium (md)</p>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
          <Checkbox size="md" defaultChecked />
          Checked
        </label>
        <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
          <Checkbox size="md" />
          Unchecked
        </label>
        <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
          <Checkbox size="md" indeterminate />
          Indeterminate
        </label>
      </div>
    </div>
  </div>
);
Sizes.storyName = "Sizes";

export const Error: Story = () => (
  <div className="p-6 flex flex-col gap-3">
    <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
      <Checkbox error />
      Unchecked error
    </label>
    <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
      <Checkbox error defaultChecked />
      Checked error
    </label>
    <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
      <Checkbox error indeterminate />
      Indeterminate error
    </label>
    <label className="flex items-center gap-2 cursor-pointer body-sm text-surface-disabled">
      <Checkbox error disabled />
      Disabled error
    </label>
  </div>
);
Error.storyName = "Error";

export const Group: Story = () => {
  const [value, setValue] = useState<string[]>(["a"]);
  return (
    <CheckboxGroup value={value} onValueChange={setValue} className="flex flex-col gap-2 p-6">
      {["Option A", "Option B", "Option C"].map((label, i) => {
        const val = ["a", "b", "c"][i];
        return (
          <label key={val} className="flex items-center gap-2 cursor-pointer body-sm text-surface-default">
            <Checkbox value={val} />
            {label}
          </label>
        );
      })}
    </CheckboxGroup>
  );
};
Group.storyName = "Group";
