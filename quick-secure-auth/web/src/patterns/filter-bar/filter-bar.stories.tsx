import React, { useState } from "react";
import type { Story } from "@ladle/react";
import { FilterBar } from "./filter-bar";
import type { FilterItem, FilterSelectItem } from "./types";

export default { title: "Patterns / Filter Bar" };

// ─── Basic tags ───────────────────────────────────────────────────────────────

const INITIAL_FILTERS: FilterItem[] = [
  { id: "status-open", label: "Status: Open" },
  { id: "assignee-kael", label: "Assignee: Kael" },
  { id: "priority-high", label: "Priority: High" },
  { id: "site-auckland", label: "Site: Auckland" },
];

// Basic removable filter tags — pre-formatted labels, no dropdown.
export const Default: Story = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  return (
    <div className="p-6">
      {filters.length > 0 ? (
        <FilterBar
          filters={filters}
          onRemove={(id) => setFilters((prev) => prev.filter((f) => f.id !== id))}
          onClearAll={() => setFilters([])}
        />
      ) : (
        <p className="body-sm text-surface-weaker">No active filters.</p>
      )}
    </div>
  );
};
Default.storyName = "Default";

// ─── Select tags ─────────────────────────────────────────────────────────────

// Each tag opens a PopoverSelect to choose values. The tag label updates to
// reflect the current selection (e.g. "Status: Open, Closed").
export const WithSelectTags: Story = () => {
  const [statusValue, setStatusValue] = useState<string[]>(["open"]);
  const [assigneeValue, setAssigneeValue] = useState<string[]>([]);
  const [priorityValue, setPriorityValue] = useState<string[]>(["high"]);

  const filters: FilterSelectItem[] = [
    {
      id: "status",
      filterLabel: "Status",
      options: [
        { id: "open", label: "Open" },
        { id: "in-progress", label: "In Progress" },
        { id: "on-hold", label: "On Hold" },
        { id: "completed", label: "Completed" },
        { id: "cancelled", label: "Cancelled" },
      ],
      value: statusValue,
      onValueChange: setStatusValue,
    },
    {
      id: "assignee",
      filterLabel: "Assignee",
      options: [
        { id: "me", label: "Assigned to me" },
        { id: "alice", label: "Alice Chen" },
        { id: "bob", label: "Bob Smith" },
        { id: "carol", label: "Carol Williams" },
        { id: "unassigned", label: "Unassigned" },
      ],
      value: assigneeValue,
      onValueChange: setAssigneeValue,
    },
    {
      id: "priority",
      filterLabel: "Priority",
      options: [
        { id: "high", label: "High" },
        { id: "medium", label: "Medium" },
        { id: "low", label: "Low" },
      ],
      value: priorityValue,
      onValueChange: setPriorityValue,
    },
  ];

  return (
    <div className="p-6">
      <FilterBar filters={filters} />
    </div>
  );
};
WithSelectTags.storyName = "With select tags";

// ─── Small size ───────────────────────────────────────────────────────────────

export const SmallSize: Story = () => {
  const [statusValue, setStatusValue] = useState<string[]>(["open"]);
  const [priorityValue, setPriorityValue] = useState<string[]>(["high", "medium"]);

  const filters: FilterSelectItem[] = [
    {
      id: "status",
      filterLabel: "Status",
      options: [
        { id: "open", label: "Open" },
        { id: "in-progress", label: "In Progress" },
        { id: "completed", label: "Completed" },
      ],
      value: statusValue,
      onValueChange: setStatusValue,
    },
    {
      id: "priority",
      filterLabel: "Priority",
      options: [
        { id: "high", label: "High" },
        { id: "medium", label: "Medium" },
        { id: "low", label: "Low" },
      ],
      value: priorityValue,
      onValueChange: setPriorityValue,
    },
  ];

  return (
    <div className="p-6">
      <FilterBar size="sm" filters={filters} />
    </div>
  );
};
SmallSize.storyName = "Small size";

// ─── In context ───────────────────────────────────────────────────────────────

// Filter tags above a mock list — the most common placement.
export const InContext: Story = () => {
  const [statusValue, setStatusValue] = useState<string[]>(["open"]);
  const [assigneeValue, setAssigneeValue] = useState<string[]>(["me"]);
  const [priorityValue, setPriorityValue] = useState<string[]>([]);

  const filters: FilterSelectItem[] = [
    {
      id: "status",
      filterLabel: "Status",
      options: [
        { id: "open", label: "Open" },
        { id: "in-progress", label: "In Progress" },
        { id: "on-hold", label: "On Hold" },
        { id: "completed", label: "Completed" },
      ],
      value: statusValue,
      onValueChange: setStatusValue,
    },
    {
      id: "assignee",
      filterLabel: "Assignee",
      options: [
        { id: "me", label: "Assigned to me" },
        { id: "alice", label: "Alice Chen" },
        { id: "bob", label: "Bob Smith" },
        { id: "unassigned", label: "Unassigned" },
      ],
      value: assigneeValue,
      onValueChange: setAssigneeValue,
    },
    {
      id: "priority",
      filterLabel: "Priority",
      options: [
        { id: "high", label: "High" },
        { id: "medium", label: "Medium" },
        { id: "low", label: "Low" },
      ],
      value: priorityValue,
      onValueChange: setPriorityValue,
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-4">
      <FilterBar size="sm" filters={filters} />

      <div className="border border-surface-weakest rounded-md">
        {["Inspection #1042", "Inspection #1041", "Inspection #1040", "Inspection #1039"].map(
          (row) => (
            <div
              key={row}
              className="px-4 py-3 border-b border-surface-weakest last:border-0 body-sm text-surface-default"
            >
              {row}
            </div>
          ),
        )}
      </div>
    </div>
  );
};
InContext.storyName = "In context";
