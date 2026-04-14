import React, { useState } from "react";
import { DotsHorizontal } from "@safetyculture/icons-react";
import { Button, IconButton } from "@ds/button";
import { Menu } from "@ds/menu";
import { ListHeader } from "@patterns/list-header";
import type { FilterCategoryDef } from "@patterns/list-header/types";
import { DataTable, selectColumn, thumbnailColumn, actionsColumn } from "@patterns/data-table";
import { db } from "@mock/db";
import type { Course, CourseStatus } from "@mock/types";

const COURSES = db.courses();

const STATUS_LABELS: Record<CourseStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  "completed": "Completed",
};

const STATUS_COLORS: Record<CourseStatus, string> = {
  "not-started": "text-surface-weaker",
  "in-progress": "text-warning-default",
  "completed": "text-positive-default",
};

const FILTER_CATEGORIES: FilterCategoryDef[] = [
  {
    id: "category",
    label: "Category",
    options: [
      { id: "safety", label: "Safety" },
      { id: "compliance", label: "Compliance" },
      { id: "technical", label: "Technical" },
      { id: "leadership", label: "Leadership" },
    ],
  },
  {
    id: "status",
    label: "Status",
    options: [
      { id: "not-started", label: "Not started" },
      { id: "in-progress", label: "In progress" },
      { id: "completed", label: "Completed" },
    ],
  },
  {
    id: "assigned-to",
    label: "Assigned to",
    options: [
      { id: "me", label: "Me" },
      { id: "alice", label: "Alice Chen" },
      { id: "bob", label: "Bob Smith" },
      { id: "carol", label: "Carol Williams" },
    ],
  },
];

const columns = [
  selectColumn<Course>(),
  thumbnailColumn<Course>(),
  {
    id: "course",
    header: "Course",
    cell: ({ row }: any) => (
      <div>
        <p className="font-[500] text-surface-default">{row.original.name}</p>
        <p className="text-surface-weaker body-xs mt-0.5">{row.original.description}</p>
      </div>
    ),
  },
  {
    id: "assignedTo",
    accessorKey: "assignedTo",
    header: "Assigned to",
    size: 150,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const c: Course = row.original;
      return <span className={STATUS_COLORS[c.status]}>{STATUS_LABELS[c.status]}</span>;
    },
    size: 120,
    enableSorting: false,
  },
  {
    id: "dueDate",
    accessorKey: "dueDate",
    header: "Due date",
    size: 130,
  },
  actionsColumn<Course>({
    size: 210,
    render: (c) => {
      const label =
        c.status === "completed"
          ? "View Certificate"
          : c.status === "in-progress"
            ? "Continue"
            : "Start Course";
      return (
        <>
          <Button size="small" variant="secondary" className="whitespace-nowrap">
            {label}
          </Button>
          <Menu.Root>
            <Menu.Trigger
              render={
                <IconButton
                  variant="secondary"
                  size="small"
                  icon={<DotsHorizontal />}
                  aria-label="More actions"
                />
              }
            />
            <Menu.Portal>
              <Menu.Positioner side="bottom" align="end" sideOffset={4}>
                <Menu.Popup>
                  <Menu.Item>Reassign</Menu.Item>
                  <Menu.Item>View details</Menu.Item>
                  <Menu.Item>Send reminder</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item className="text-negative-default">Remove</Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </>
      );
    },
  }),
];

export function TrainingPage() {
  const [search, setSearch] = useState("");
  const [activeFilterIds, setActiveFilterIds] = useState<string[]>([]);
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({});

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="headline-sm text-surface-default">Training</h1>
      </div>

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

      <DataTable data={COURSES} columns={columns} />
    </div>
  );
}
