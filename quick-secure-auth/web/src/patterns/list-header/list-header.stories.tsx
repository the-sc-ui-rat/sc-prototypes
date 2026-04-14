import React, { useState } from "react";
import type { Story } from "@ladle/react";
import {
  ArrowDownToBracket,
  DotsHorizontal,
  Sliders,
} from "@safetyculture/icons-react";
import { IconButton } from "../../ds/button/icon-button";
import { ListHeader } from "./list-header";
import type { FilterCategoryDef } from "./types";

export default { title: "Patterns / List Header" };

// ─── Available filter categories ─────────────────────────────────────────────

const FILTER_CATEGORIES: FilterCategoryDef[] = [
  {
    id: "status",
    label: "Status",
    options: [
      { id: "open", label: "Open" },
      { id: "in-progress", label: "In Progress" },
      { id: "on-hold", label: "On Hold" },
      { id: "completed", label: "Completed" },
      { id: "cancelled", label: "Cancelled" },
    ],
  },
  {
    id: "assignee",
    label: "Assignee",
    options: [
      { id: "me", label: "Assigned to me" },
      { id: "alice", label: "Alice Chen" },
      { id: "bob", label: "Bob Smith" },
      { id: "carol", label: "Carol Williams" },
      { id: "unassigned", label: "Unassigned" },
    ],
  },
  {
    id: "priority",
    label: "Priority",
    options: [
      { id: "high", label: "High" },
      { id: "medium", label: "Medium" },
      { id: "low", label: "Low" },
    ],
  },
  {
    id: "site",
    label: "Site",
    options: [
      { id: "auckland", label: "Auckland" },
      { id: "sydney", label: "Sydney" },
      { id: "melbourne", label: "Melbourne" },
      { id: "singapore", label: "Singapore" },
    ],
  },
];

// ─── Default ─────────────────────────────────────────────────────────────────

// Full filter flow: clicking Filters opens a PopoverSelect to pick which filter
// categories to activate. Each active category tag opens its own PopoverSelect
// to choose values. "Clear all" deactivates all categories.
export const Default: Story = () => {
  const [search, setSearch] = useState("");
  const [activeFilterIds, setActiveFilterIds] = useState<string[]>(["status", "assignee"]);
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({
    status: ["open"],
    assignee: ["me"],
  });

  return (
    <div className="p-6">
      <ListHeader
        searchValue={search}
        onSearchChange={setSearch}
        filterCategories={FILTER_CATEGORIES}
        activeFilterIds={activeFilterIds}
        onActiveFilterIdsChange={setActiveFilterIds}
        filterValues={filterValues}
        onFilterValueChange={(categoryId, values) =>
          setFilterValues((prev) => ({ ...prev, [categoryId]: values }))
        }
        actions={
          <>
            <IconButton variant="secondary" icon={<Sliders />} aria-label="Sort" />
            <IconButton variant="secondary" icon={<ArrowDownToBracket />} aria-label="Export" />
            <IconButton variant="secondary" icon={<DotsHorizontal />} aria-label="More options" />
          </>
        }
      />
    </div>
  );
};
Default.storyName = "Default";

// ─── No active filters ────────────────────────────────────────────────────────

// Starts empty — click Filters to activate categories, then click each tag to
// choose values.
export const NoActiveFilters: Story = () => {
  const [search, setSearch] = useState("");
  const [activeFilterIds, setActiveFilterIds] = useState<string[]>([]);
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({});

  return (
    <div className="p-6">
      <ListHeader
        searchValue={search}
        onSearchChange={setSearch}
        filterCategories={FILTER_CATEGORIES}
        activeFilterIds={activeFilterIds}
        onActiveFilterIdsChange={setActiveFilterIds}
        filterValues={filterValues}
        onFilterValueChange={(categoryId, values) =>
          setFilterValues((prev) => ({ ...prev, [categoryId]: values }))
        }
        actions={
          <>
            <IconButton variant="secondary" icon={<Sliders />} aria-label="Sort" />
            <IconButton variant="secondary" icon={<DotsHorizontal />} aria-label="More options" />
          </>
        }
      />
    </div>
  );
};
NoActiveFilters.storyName = "No active filters";

// ─── No actions ───────────────────────────────────────────────────────────────

export const NoActions: Story = () => {
  const [search, setSearch] = useState("");
  const [activeFilterIds, setActiveFilterIds] = useState<string[]>(["status", "priority"]);
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({
    status: ["open", "in-progress"],
    priority: ["high"],
  });

  return (
    <div className="p-6">
      <ListHeader
        searchValue={search}
        onSearchChange={setSearch}
        filterCategories={FILTER_CATEGORIES}
        activeFilterIds={activeFilterIds}
        onActiveFilterIdsChange={setActiveFilterIds}
        filterValues={filterValues}
        onFilterValueChange={(categoryId, values) =>
          setFilterValues((prev) => ({ ...prev, [categoryId]: values }))
        }
      />
    </div>
  );
};
NoActions.storyName = "No actions";
