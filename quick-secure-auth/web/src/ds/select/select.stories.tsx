import React, { useState } from "react";
import type { Story } from "@ladle/react";
import { Select } from ".";

export default { title: "Components / Select" };


const options = [
  { value: "inspection", label: "Inspection" },
  { value: "audit", label: "Audit" },
  { value: "safety-walk", label: "Safety walk" },
  { value: "checklist", label: "Checklist" },
  { value: "assessment", label: "Assessment" },
];

export const Default: Story = () => {
  const [value, setValue] = useState<string>("");
  return (
    <div className="p-12 flex justify-center">
      <Select.Root value={value} onValueChange={(v) => setValue(v ?? "")}>
        <Select.Trigger />
        <Select.Portal>
          <Select.Positioner sideOffset={4} side="bottom" align="start">
            <Select.Popup>
              {options.map(({ value, label }) => (
                <Select.Item key={value} value={value}>{label}</Select.Item>
              ))}
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
Default.storyName = "Default";

export const WithGroups: Story = () => (
  <div className="p-12 flex justify-center">
    <Select.Root defaultValue="audit">
      <Select.Trigger />
      <Select.Portal>
        <Select.Positioner sideOffset={4} side="bottom" align="start">
          <Select.Popup>
            <Select.Group>
              <Select.GroupLabel>Common</Select.GroupLabel>
              <Select.Item value="inspection">Inspection</Select.Item>
              <Select.Item value="audit">Audit</Select.Item>
            </Select.Group>
            <Select.Group>
              <Select.GroupLabel>Advanced</Select.GroupLabel>
              <Select.Item value="assessment">Assessment</Select.Item>
              <Select.Item value="review" disabled>Review (coming soon)</Select.Item>
            </Select.Group>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  </div>
);
WithGroups.storyName = "With groups";
