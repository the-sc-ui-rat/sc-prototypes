import React, { useState } from "react";
import type { Story } from "@ladle/react";
import { Combobox } from ".";

export default { title: "Components / Combobox" };

const fruits = ["Apple", "Apricot", "Banana", "Cherry", "Date", "Fig", "Grape", "Kiwi", "Lemon", "Mango", "Orange", "Peach", "Pear", "Plum", "Raspberry", "Strawberry"];

export const Default: Story = () => {
  const [value, setValue] = useState("");
  return (
    <div className="p-12 flex justify-center">
      <Combobox.Root value={value} onValueChange={(v) => setValue(v ?? "")}>
        <Combobox.Input placeholder="Search fruit..." className="w-56" />
        <Combobox.Portal>
          <Combobox.Positioner sideOffset={4} side="bottom" align="start">
            <Combobox.Popup className="w-56 max-h-48 overflow-y-auto">
              <Combobox.List>
                {fruits.map((fruit) => (
                  <Combobox.Item key={fruit} value={fruit}>{fruit}</Combobox.Item>
                ))}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
};
Default.storyName = "Default";

// ─── Grouped ────────────────────────────────────────────────────────────────

const groupedItems: Record<string, string[]> = {
  Fruits:     ["Apple", "Banana", "Cherry", "Grape", "Mango"],
  Vegetables: ["Broccoli", "Carrot", "Cucumber", "Spinach", "Tomato"],
  Grains:     ["Barley", "Oats", "Quinoa", "Rice", "Wheat"],
};

export const Grouped: Story = () => {
  const [value, setValue] = useState("");
  return (
    <div className="p-12 flex justify-center">
      <Combobox.Root value={value} onValueChange={(v) => setValue(v ?? "")}>
        <Combobox.Input placeholder="Search food..." className="w-56" />
        <Combobox.Portal>
          <Combobox.Positioner sideOffset={4} side="bottom" align="start">
            <Combobox.Popup className="w-56 max-h-64 overflow-y-auto">
              <Combobox.List>
                {Object.entries(groupedItems).map(([group, items]) => (
                  <Combobox.Group key={group}>
                    <Combobox.GroupLabel className="px-2 pb-0.5 pt-2 label-sm text-surface-weaker font-[600] uppercase tracking-wide">
                      {group}
                    </Combobox.GroupLabel>
                    {items.map((item) => (
                      <Combobox.Item key={item} value={item}>{item}</Combobox.Item>
                    ))}
                  </Combobox.Group>
                ))}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
};
Grouped.storyName = "Grouped";

// ─── Disabled Items ──────────────────────────────────────────────────────────

const countries = [
  { name: "Australia", disabled: false },
  { name: "Brazil",    disabled: false },
  { name: "Canada",    disabled: true  },
  { name: "Denmark",   disabled: false },
  { name: "Egypt",     disabled: true  },
  { name: "France",    disabled: false },
  { name: "Germany",   disabled: false },
  { name: "Hungary",   disabled: true  },
  { name: "India",     disabled: false },
  { name: "Japan",     disabled: false },
];

export const DisabledItems: Story = () => {
  const [value, setValue] = useState("");
  return (
    <div className="p-12 flex justify-center">
      <Combobox.Root value={value} onValueChange={(v) => setValue(v ?? "")}>
        <Combobox.Input placeholder="Select country..." className="w-56" />
        <Combobox.Portal>
          <Combobox.Positioner sideOffset={4} side="bottom" align="start">
            <Combobox.Popup className="w-56 max-h-56 overflow-y-auto">
              <Combobox.List>
                {countries.map(({ name, disabled }) => (
                  <Combobox.Item key={name} value={name} disabled={disabled}>
                    {name}
                  </Combobox.Item>
                ))}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
};
DisabledItems.storyName = "Disabled Items";

// ─── Pre-selected Value ──────────────────────────────────────────────────────

export const PreSelected: Story = () => {
  const [value, setValue] = useState("Mango");
  return (
    <div className="p-12 flex justify-center">
      <Combobox.Root value={value} onValueChange={(v) => setValue(v ?? "")}>
        <Combobox.Input placeholder="Search fruit..." className="w-56" />
        <Combobox.Portal>
          <Combobox.Positioner sideOffset={4} side="bottom" align="start">
            <Combobox.Popup className="w-56 max-h-48 overflow-y-auto">
              <Combobox.List>
                {fruits.map((fruit) => (
                  <Combobox.Item key={fruit} value={fruit}>{fruit}</Combobox.Item>
                ))}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
};
PreSelected.storyName = "Pre-selected Value";

// ─── Custom Filter (starts-with) ─────────────────────────────────────────────

export const CustomFilter: Story = () => {
  const [value, setValue] = useState("");
  return (
    <div className="p-12 flex justify-center">
      <Combobox.Root
        value={value}
        onValueChange={(v) => setValue(v ?? "")}
        filterFn={(option, inputValue) =>
          option.value.toLowerCase().startsWith(inputValue.toLowerCase())
        }
      >
        <Combobox.Input placeholder="Starts with..." className="w-56" />
        <Combobox.Portal>
          <Combobox.Positioner sideOffset={4} side="bottom" align="start">
            <Combobox.Popup className="w-56 max-h-48 overflow-y-auto">
              <Combobox.List>
                {fruits.map((fruit) => (
                  <Combobox.Item key={fruit} value={fruit}>{fruit}</Combobox.Item>
                ))}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
};
CustomFilter.storyName = "Custom Filter (starts-with)";

// ─── Disabled Combobox ───────────────────────────────────────────────────────

export const Disabled: Story = () => (
  <div className="p-12 flex justify-center">
    <Combobox.Root disabled>
      <Combobox.Input placeholder="Not available..." className="w-56" />
    </Combobox.Root>
  </div>
);
Disabled.storyName = "Disabled";
