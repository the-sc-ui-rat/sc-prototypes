import type { Story } from "@ladle/react";
import { Eye, MagnifyingGlass, XSymbol } from "@safetyculture/icons-react";
import { useState } from "react";
import { IconButton } from "../button";
import { Input } from "./input";

export default { title: "Components / Input" };


// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Sizes: Story = () => (
  <div className="flex flex-col gap-4 w-64">
    <Input size="medium" placeholder="Medium" />
    <Input size="large" placeholder="Large" />
  </div>
);
Sizes.storyName = "Sizes";

// ─── States ──────────────────────────────────────────────────────────────────

export const States: Story = () => (
  <div className="flex flex-col gap-4 w-64">
    <Input placeholder="Default" />
    <Input defaultValue="With value" />
    <Input placeholder="Disabled" disabled />
    <Input defaultValue="Disabled with value" disabled />
    <Input placeholder="Error" error />
    <Input defaultValue="Error with value" error />
    <Input defaultValue="Error disabled" error disabled />
  </div>
);
States.storyName = "States";

// ─── leftIcon / rightIcon (absolute, decorative) ─────────────────────────────

export const WithIcons: Story = () => (
  <div className="flex flex-col gap-4 w-72">
    <Input placeholder="Left icon" leftIcon={<MagnifyingGlass />} />
    <Input placeholder="Right icon" rightIcon={<Eye />} />
    <Input placeholder="Both icons" leftIcon={<MagnifyingGlass />} rightIcon={<Eye />} />
    <Input placeholder="Disabled with icons" leftIcon={<MagnifyingGlass />} rightIcon={<Eye />} disabled />
    <Input size="large" placeholder="Large left icon" leftIcon={<MagnifyingGlass />} />
    <Input size="large" placeholder="Large both icons" leftIcon={<MagnifyingGlass />} rightIcon={<Eye />} />
  </div>
);
WithIcons.storyName = "With Icons";

// ─── leftAddOn / rightAddOn (flex, interactive/complex) ──────────────────────

export const WithAddOns: Story = () => (
  <div className="flex flex-col gap-4 w-72">
    <Input
      placeholder="Right icon button"
      rightAddOn={<IconButton variant="ghost" size="small" aria-label="Clear" icon={<XSymbol />} rounded />}
    />
    <Input
      placeholder="Left badge"
      leftAddOn={
        <span className="inline-flex items-center px-2 py-0.5 rounded-xs bg-accent-weaker text-accent-default label-md whitespace-nowrap">
          USD
        </span>
      }
    />
    <Input
      placeholder="Right badge"
      rightAddOn={
        <span className="inline-flex items-center px-2 py-0.5 rounded-xs bg-accent-weaker text-accent-default label-md whitespace-nowrap">
          kg
        </span>
      }
    />
    <Input
      placeholder="Badge left, icon button right"
      leftAddOn={
        <span className="inline-flex items-center px-2 py-0.5 rounded-xs bg-accent-weaker text-accent-default label-md whitespace-nowrap">
          https://
        </span>
      }
      rightAddOn={<IconButton variant="ghost" size="small" aria-label="Clear" icon={<XSymbol />} rounded />}
    />
  </div>
);
WithAddOns.storyName = "With AddOns";

// ─── Width ───────────────────────────────────────────────────────────────────

export const FullWidth: Story = () => (
  <Input placeholder="Full width" width="full" leftIcon={<MagnifyingGlass />} />
);
FullWidth.storyName = "Full Width";

// ─── Controlled clear button ─────────────────────────────────────────────────

export const WithClearButton: Story = () => {
  const [value, setValue] = useState("Clear me");
  return (
    <Input
      value={value}
      width="full"
      onChange={(e) => setValue(e.target.value)}
      rightAddOn={
        <IconButton
          variant="ghost"
          size="small"
          aria-label="Clear"
          icon={<XSymbol />}
          rounded
          style={{ visibility: value ? "visible" : "hidden" }}
          onClick={() => setValue("")}
        />
      }
    />
  );
};
WithClearButton.storyName = "With Clear Button";
