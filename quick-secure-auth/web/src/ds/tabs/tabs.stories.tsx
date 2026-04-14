import React from "react";
import type { Story } from "@ladle/react";
import { Lightning } from "@safetyculture/icons-react";
import { Tabs } from ".";

export default { title: "Components / Tabs" };


const tabItems = [
  { value: "overview", label: "Overview", content: "Overview content goes here." },
  { value: "inspections", label: "Inspections", content: "Inspection records and history." },
  { value: "actions", label: "Actions", content: "Open and completed actions." },
  { value: "reports", label: "Reports", content: "Generated reports and exports." },
];

export const Default: Story = () => (
  <div className="p-6 w-96">
    <Tabs.Root defaultValue="overview">
      <Tabs.List>
        {tabItems.map(({ value, label }) => (
          <Tabs.Tab key={value} value={value}>{label}</Tabs.Tab>
        ))}
      </Tabs.List>
      {tabItems.map(({ value, content }) => (
        <Tabs.Panel key={value} value={value}>{content}</Tabs.Panel>
      ))}
    </Tabs.Root>
  </div>
);
Default.storyName = "Default";

export const Pill: Story = () => (
  <div className="p-6 w-96 flex flex-col gap-6">
    <div>
      <p className="body-xs text-surface-weaker mb-3">Medium (md)</p>
      <Tabs.Root defaultValue="overview">
        <Tabs.List variant="pill">
          {tabItems.slice(0, 3).map(({ value, label }) => (
            <Tabs.Tab key={value} value={value} variant="pill" size="md">{label}</Tabs.Tab>
          ))}
        </Tabs.List>
        {tabItems.slice(0, 3).map(({ value, content }) => (
          <Tabs.Panel key={value} value={value}>{content}</Tabs.Panel>
        ))}
      </Tabs.Root>
    </div>
    <div>
      <p className="body-xs text-surface-weaker mb-3">Small (sm)</p>
      <Tabs.Root defaultValue="overview">
        <Tabs.List variant="pill">
          {tabItems.slice(0, 3).map(({ value, label }) => (
            <Tabs.Tab key={value} value={value} variant="pill" size="sm">{label}</Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </div>
  </div>
);
Pill.storyName = "Pill";

export const WithIcon: Story = () => (
  <div className="p-6 w-96 flex flex-col gap-6">
    <Tabs.Root defaultValue="overview">
      <Tabs.List>
        {tabItems.slice(0, 3).map(({ value, label }) => (
          <Tabs.Tab key={value} value={value} startIcon={<Lightning size={16} />}>{label}</Tabs.Tab>
        ))}
      </Tabs.List>
      {tabItems.slice(0, 3).map(({ value, content }) => (
        <Tabs.Panel key={value} value={value}>{content}</Tabs.Panel>
      ))}
    </Tabs.Root>
    <Tabs.Root defaultValue="overview">
      <Tabs.List variant="pill">
        {tabItems.slice(0, 3).map(({ value, label }) => (
          <Tabs.Tab key={value} value={value} variant="pill" startIcon={<Lightning size={16} />}>{label}</Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.Root>
  </div>
);
WithIcon.storyName = "With Icon";

export const Disabled: Story = () => (
  <div className="p-6 w-96">
    <Tabs.Root defaultValue="overview">
      <Tabs.List>
        {tabItems.map(({ value, label }, i) => (
          <Tabs.Tab key={value} value={value} disabled={i === 2}>{label}</Tabs.Tab>
        ))}
      </Tabs.List>
      {tabItems.map(({ value, content }) => (
        <Tabs.Panel key={value} value={value}>{content}</Tabs.Panel>
      ))}
    </Tabs.Root>
  </div>
);
Disabled.storyName = "Disabled";

export const WithIndicator: Story = () => (
  <div className="p-6 w-96">
    <Tabs.Root defaultValue="overview">
      <Tabs.List>
        {tabItems.map(({ value, label }) => (
          <Tabs.Tab key={value} value={value} className="border-b-0 data-[selected]:border-b-0">
            {label}
          </Tabs.Tab>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      {tabItems.map(({ value, content }) => (
        <Tabs.Panel key={value} value={value}>{content}</Tabs.Panel>
      ))}
    </Tabs.Root>
  </div>
);
WithIndicator.storyName = "With animated indicator";
