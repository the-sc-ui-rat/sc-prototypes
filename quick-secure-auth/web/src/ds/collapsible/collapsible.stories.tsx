import React from "react";
import type { Story } from "@ladle/react";
import { Collapsible } from ".";

export default { title: "Components / Collapsible" };


export const Default: Story = () => (
  <div className="p-6 w-72 flex flex-col gap-2">
    <Collapsible.Root>
      <Collapsible.Trigger>Show advanced settings</Collapsible.Trigger>
      <Collapsible.Panel>
        <div className="pt-3 flex flex-col gap-2">
          <div className="body-sm text-surface-default">Retry on failure: <strong>Yes</strong></div>
          <div className="body-sm text-surface-default">Timeout: <strong>30s</strong></div>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  </div>
);
Default.storyName = "Default";
