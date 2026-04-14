import React, { useState } from "react";
import { DotsHorizontal, Plus } from "@safetyculture/icons-react";
import { Button, IconButton } from "@ds/button";
import { Menu } from "@ds/menu";
import { ListHeader } from "@patterns/list-header";
import type { FilterCategoryDef } from "@patterns/list-header/types";
import { DataTable, selectColumn, thumbnailColumn, actionsColumn } from "@patterns/data-table";
import { db } from "@mock/db";
import type { Template } from "@mock/types";

const TEMPLATES = db.templates();

const FILTER_CATEGORIES: FilterCategoryDef[] = [
  {
    id: "owned-by",
    label: "Owned by",
    options: [
      { id: "me", label: "Me" },
      { id: "alice", label: "Alice Chen" },
      { id: "bob", label: "Bob Smith" },
      { id: "carol", label: "Carol Williams" },
    ],
  },
  {
    id: "available-to",
    label: "Available to",
    options: [
      { id: "my-team", label: "My team" },
      { id: "everyone", label: "Everyone" },
      { id: "specific-sites", label: "Specific sites" },
    ],
  },
];

const columns = [
  selectColumn<Template>(),
  thumbnailColumn<Template>(),
  {
    id: "template",
    header: "Template",
    cell: ({ row }: any) => (
      <div>
        <p className="font-[500] text-surface-default">{row.original.name}</p>
        <p className="text-surface-weaker body-xs mt-0.5">{row.original.description}</p>
      </div>
    ),
  },
  {
    id: "lastPublished",
    accessorKey: "lastPublished",
    header: "Last published",
    size: 160,
  },
  actionsColumn<Template>({
    size: 200,
    render: () => (
      <>
        <Button size="small" variant="secondary" className="whitespace-nowrap">
          Start Inspection
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
                <Menu.Item>Edit</Menu.Item>
                <Menu.Item>Duplicate</Menu.Item>
                <Menu.Item>Schedule</Menu.Item>
                <Menu.Separator />
                <Menu.Item className="text-negative-default">Archive</Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </>
    ),
  }),
];

export function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [activeFilterIds, setActiveFilterIds] = useState<string[]>([]);
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({});

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="headline-sm text-surface-default">Templates</h1>
        <Button size="medium" variant="primary" leftIcon={<Plus />}>
          Create template
        </Button>
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

      <DataTable data={TEMPLATES} columns={columns} />
    </div>
  );
}
