import React, { useState } from "react";
import type { Story } from "@ladle/react";
import { PopoverSelect } from "./popover-select";
import { FilterButton } from "../filter-button/filter-button";
import { FilterTag } from "../filter-tag/filter-tag";
import type { PopoverSelectOption } from "./types";

export default { title: "Components / Popover Select" };

const STATUS_OPTIONS: PopoverSelectOption[] = [
  { id: "open", label: "Open" },
  { id: "in-progress", label: "In Progress" },
  { id: "on-hold", label: "On Hold" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
  { id: "archived", label: "Archived" },
];

// Default: FilterButton trigger with multiselect. Popup closes on outside click.
export const Default: Story = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div className="p-6">
      <PopoverSelect
        options={STATUS_OPTIONS}
        value={value}
        onValueChange={setValue}
        trigger={
          <FilterButton
            active={value.length > 0}
            count={value.length > 0 ? value.length : undefined}
          >
            Status
          </FilterButton>
        }
      />
    </div>
  );
};
Default.storyName = "Default";

// Single select: selecting a new option replaces the previous selection.
export const SingleSelect: Story = () => {
  const [value, setValue] = useState<string[]>([]);
  const selectedLabel = STATUS_OPTIONS.find((o) => o.id === value[0])?.label;
  return (
    <div className="p-6">
      <PopoverSelect
        multiple={false}
        options={STATUS_OPTIONS}
        value={value}
        onValueChange={setValue}
        trigger={
          <FilterButton active={value.length > 0}>
            {selectedLabel ? `Status: ${selectedLabel}` : "Status"}
          </FilterButton>
        }
      />
    </div>
  );
};
SingleSelect.storyName = "Single select";

// FilterTag trigger: uses controlled open state so the tag's label click opens
// the popup and the × button removes all selections independently.
function formatTagLabel(
  filterLabel: string,
  opts: PopoverSelectOption[],
  ids: string[],
): string {
  if (ids.length === 0) return filterLabel;
  const names = ids.map((id) => opts.find((o) => o.id === id)?.label ?? id);
  if (names.length === 1) return `${filterLabel}: ${names[0]}`;
  if (names.length === 2) return `${filterLabel}: ${names[0]}, ${names[1]}`;
  return `${filterLabel}: ${names[0]} +${names.length - 1}`;
}

export const WithFilterTagTrigger: Story = () => {
  const [value, setValue] = useState<string[]>(["open"]);
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <PopoverSelect
        open={open}
        onOpenChange={setOpen}
        options={STATUS_OPTIONS}
        value={value}
        onValueChange={setValue}
        trigger={
          <FilterTag
            selected={value.length > 0}
            onSelectedChange={() => setOpen(true)}
            onRemove={() => {
              setValue([]);
              setOpen(false);
            }}
          >
            {formatTagLabel("Status", STATUS_OPTIONS, value)}
          </FilterTag>
        }
      />
    </div>
  );
};
WithFilterTagTrigger.storyName = "With FilterTag trigger";

// Some options marked disabled — not selectable.
export const DisabledOptions: Story = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div className="p-6">
      <PopoverSelect
        options={[
          { id: "open", label: "Open" },
          { id: "in-progress", label: "In Progress", disabled: true },
          { id: "completed", label: "Completed" },
          { id: "cancelled", label: "Cancelled", disabled: true },
          { id: "archived", label: "Archived" },
        ]}
        value={value}
        onValueChange={setValue}
        trigger={
          <FilterButton active={value.length > 0} count={value.length > 0 ? value.length : undefined}>
            Status
          </FilterButton>
        }
      />
    </div>
  );
};
DisabledOptions.storyName = "Disabled options";
