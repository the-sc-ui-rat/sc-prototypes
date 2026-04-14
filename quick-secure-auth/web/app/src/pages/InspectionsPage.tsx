import React, { useState } from "react";
import { DotsHorizontal } from "@safetyculture/icons-react";
import { Button, IconButton } from "@ds/button";
import { Menu } from "@ds/menu";
import { ListHeader } from "@patterns/list-header";
import type { FilterCategoryDef } from "@patterns/list-header/types";
import { DataTable, selectColumn, thumbnailColumn, actionsColumn } from "@patterns/data-table";
import { db } from "@mock/db";
import type { Inspection } from "@mock/types";

const INSPECTIONS = db.inspections();

const FILTER_CATEGORIES: FilterCategoryDef[] = [
  {
    id: "template",
    label: "Template",
    options: [
      { id: "vehicle-safety", label: "Vehicle Safety Inspection" },
      { id: "fire-safety", label: "Fire Safety Checklist" },
      { id: "site-hazard", label: "Site Hazard Assessment" },
      { id: "equipment-maintenance", label: "Equipment Maintenance Log" },
      { id: "qa-audit", label: "Quality Assurance Audit" },
      { id: "onboarding", label: "New Employee Onboarding" },
      { id: "contractor", label: "Contractor Compliance Check" },
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
      { id: "brisbane", label: "Brisbane" },
    ],
  },
  {
    id: "status",
    label: "Status",
    options: [
      { id: "in-progress", label: "In Progress" },
      { id: "completed", label: "Completed" },
    ],
  },
];

const columns = [
  selectColumn<Inspection>(),
  thumbnailColumn<Inspection>(),
  {
    id: "inspection",
    header: "Inspection",
    cell: ({ row }: any) => (
      <div>
        <p className="font-[500] text-surface-default">{row.original.templateName}</p>
        <p className="text-surface-weaker body-xs mt-0.5">{row.original.description}</p>
      </div>
    ),
  },
  {
    id: "site",
    accessorKey: "site",
    header: "Site",
    size: 140,
  },
  {
    id: "conductedBy",
    accessorKey: "conductedBy",
    header: "Conducted by",
    size: 160,
  },
  {
    id: "completedDate",
    header: "Completed",
    cell: ({ row }: any) => {
      const i: Inspection = row.original;
      return i.completedDate ? (
        <span>{i.completedDate}</span>
      ) : (
        <span className="text-surface-weaker">—</span>
      );
    },
    size: 140,
    enableSorting: false,
  },
  actionsColumn<Inspection>({
    size: 190,
    render: (i) => (
      <>
        <Button size="small" variant="secondary" className="whitespace-nowrap">
          {i.status === "in-progress" ? "Continue" : "View Report"}
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
                <Menu.Item>Share</Menu.Item>
                <Menu.Item>Export PDF</Menu.Item>
                <Menu.Item>Duplicate</Menu.Item>
                <Menu.Separator />
                <Menu.Item className="text-negative-default">Delete</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </>
    ),
  }),
];

export function InspectionsPage() {
  const [search, setSearch] = useState("");
  const [activeFilterIds, setActiveFilterIds] = useState<string[]>([]);
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({});

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="headline-sm text-surface-default">Inspections</h1>
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

      <DataTable data={INSPECTIONS} columns={columns} />
    </div>
  );
}
