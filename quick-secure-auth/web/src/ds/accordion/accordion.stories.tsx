import React from "react";
import type { Story } from "@ladle/react";
import { Accordion } from ".";

export default { title: "Components / Accordion" };


const items = [
  { value: "q1", question: "What is SafetyCulture?", answer: "SafetyCulture is a global technology company that helps teams work safely and meet higher standards." },
  { value: "q2", question: "How do I create a template?", answer: "Navigate to Templates in the sidebar, then click 'New Template'. You can add questions, logic, and media." },
  { value: "q3", question: "Can I schedule inspections?", answer: "Yes, use the Schedules feature to set up recurring inspections for your teams." },
];

export const Default: Story = () => (
  <div className="p-6 w-96">
    <Accordion.Root>
      {items.map(({ value, question, answer }) => (
        <Accordion.Item key={value} value={value}>
          <Accordion.Header>
            <Accordion.Trigger>{question}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>{answer}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  </div>
);
Default.storyName = "Default";

export const Multiple: Story = () => (
  <div className="p-6 w-96">
    <Accordion.Root multiple>
      {items.map(({ value, question, answer }) => (
        <Accordion.Item key={value} value={value}>
          <Accordion.Header>
            <Accordion.Trigger>{question}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>{answer}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  </div>
);
Multiple.storyName = "Multiple Open";
