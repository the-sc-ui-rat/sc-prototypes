import React from "react";
import type { Story } from "@ladle/react";
import { FilterButton } from "./filter-button";

export default { title: "Components / FilterButton" };

// Default state — no active filters, no badge.
export const Default: Story = () => (
  <FilterButton>Filters</FilterButton>
);
Default.storyName = "Default";

// Active state — filters are applied, accent styling.
export const Active: Story = () => (
  <FilterButton active>Filters</FilterButton>
);
Active.storyName = "Active";

// Both sizes side by side.
export const Sizes: Story = () => (
  <div className="flex items-center gap-4">
    <FilterButton size="md">Filters</FilterButton>
    <FilterButton size="sm">Filters</FilterButton>
  </div>
);
Sizes.storyName = "Sizes";

// Count badge — shows number of active filters on top-right corner.
export const WithCount: Story = () => (
  <div className="flex items-center gap-6">
    <FilterButton count={3}>Filters</FilterButton>
    <FilterButton count={3} active>Filters</FilterButton>
    <FilterButton count={12}>Filters</FilterButton>
    <FilterButton count={100}>Filters</FilterButton>
  </div>
);
WithCount.storyName = "With count";

// Collapsed mode — icon only, useful in compact toolbars.
export const Collapsed: Story = () => (
  <div className="flex items-center gap-4">
    <FilterButton collapsed size="md" />
    <FilterButton collapsed size="sm" />
    <FilterButton collapsed active size="md" />
    <FilterButton collapsed active size="sm" />
  </div>
);
Collapsed.storyName = "Collapsed";

// Collapsed with a count badge.
export const CollapsedWithCount: Story = () => (
  <div className="flex items-center gap-4">
    <FilterButton collapsed count={3} size="md" />
    <FilterButton collapsed count={3} active size="md" />
    <FilterButton collapsed count={3} size="sm" />
  </div>
);
CollapsedWithCount.storyName = "Collapsed with count";

// Disabled state — pointer events removed, 50% opacity.
export const Disabled: Story = () => (
  <div className="flex items-center gap-4">
    <FilterButton disabled>Filters</FilterButton>
    <FilterButton disabled active>Filters</FilterButton>
    <FilterButton disabled count={3}>Filters</FilterButton>
    <FilterButton disabled collapsed />
  </div>
);
Disabled.storyName = "Disabled";

// All variants together — a reference overview.
export const Overview: Story = () => (
  <div className="flex flex-col gap-6 p-4">
    <div className="flex items-center gap-4">
      <FilterButton>Filters</FilterButton>
      <FilterButton active>Filters</FilterButton>
      <FilterButton count={3}>Filters</FilterButton>
      <FilterButton count={3} active>Filters</FilterButton>
    </div>
    <div className="flex items-center gap-4">
      <FilterButton size="sm">Filters</FilterButton>
      <FilterButton size="sm" active>Filters</FilterButton>
      <FilterButton size="sm" count={3}>Filters</FilterButton>
      <FilterButton size="sm" count={3} active>Filters</FilterButton>
    </div>
    <div className="flex items-center gap-4">
      <FilterButton collapsed />
      <FilterButton collapsed active />
      <FilterButton collapsed count={3} />
      <FilterButton collapsed count={3} active />
    </div>
  </div>
);
Overview.storyName = "Overview";
