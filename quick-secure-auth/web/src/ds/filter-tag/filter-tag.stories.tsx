import React, { useState } from "react";
import type { Story } from "@ladle/react";
import { FilterTag } from "./filter-tag";

export default { title: "Components / Filter Tag" };

export const Default: Story = () => {
  const [selected, setSelected] = useState(false);
  return (
    <div className="p-6 flex gap-3">
      <FilterTag selected={selected} onSelectedChange={setSelected} onRemove={() => {}}>
        Filter Label
      </FilterTag>
    </div>
  );
};
Default.storyName = "Default";

export const Sizes: Story = () => (
  <div className="p-6 flex items-center gap-3">
    <FilterTag size="md" onRemove={() => {}}>Filter Label</FilterTag>
    <FilterTag size="sm" onRemove={() => {}}>Filter Label</FilterTag>
  </div>
);
Sizes.storyName = "Sizes";

export const Selected: Story = () => (
  <div className="p-6 flex items-center gap-3">
    <FilterTag selected onRemove={() => {}}>Filter Label</FilterTag>
    <FilterTag selected size="sm" onRemove={() => {}}>Filter Label</FilterTag>
  </div>
);
Selected.storyName = "Selected";

export const WithoutRemove: Story = () => (
  <div className="p-6 flex items-center gap-3">
    <FilterTag>Filter Label</FilterTag>
    <FilterTag selected>Filter Label</FilterTag>
    <FilterTag size="sm">Filter Label</FilterTag>
    <FilterTag size="sm" selected>Filter Label</FilterTag>
  </div>
);
WithoutRemove.storyName = "Without Remove";

export const Disabled: Story = () => (
  <div className="p-6 flex items-center gap-3">
    <FilterTag disabled onRemove={() => {}}>Filter Label</FilterTag>
    <FilterTag disabled selected onRemove={() => {}}>Filter Label</FilterTag>
  </div>
);
Disabled.storyName = "Disabled";
