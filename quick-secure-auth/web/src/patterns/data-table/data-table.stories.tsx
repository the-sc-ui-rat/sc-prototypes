import React from "react";
import type { Story } from "@ladle/react";
import { DotsHorizontal } from "@safetyculture/icons-react";
import { Button, IconButton } from "../../ds/button";
import { Menu } from "../../ds/menu";
import { DataTable, selectColumn, actionsColumn } from "./data-table";

export default { title: "Patterns / DataTable" };

type Item = {
  id: string;
  name: string;
  description: string;
  status: string;
  date: string;
};

const ITEMS: Item[] = [
  { id: "1", name: "Vehicle Safety Inspection", description: "Monthly safety check for fleet vehicles", status: "Active",    date: "Mar 12, 2026" },
  { id: "2", name: "Fire Safety Checklist",     description: "Quarterly fire equipment verification",   status: "Active",    date: "Mar 8, 2026" },
  { id: "3", name: "Site Hazard Assessment",    description: "Pre-work hazard identification protocol",  status: "Draft",     date: "Mar 1, 2026" },
  { id: "4", name: "Equipment Maintenance Log", description: "Preventive maintenance scheduling",         status: "Active",    date: "Feb 28, 2026" },
  { id: "5", name: "Quality Assurance Audit",   description: "ISO compliance verification checklist",    status: "Archived",  date: "Feb 14, 2026" },
];

const columns = [
  selectColumn<Item>(),
  {
    id: "name",
    header: "Name",
    cell: ({ row }: any) => (
      <div>
        <p className="font-[500] text-surface-default">{row.original.name}</p>
        <p className="text-surface-weaker body-xs mt-0.5">{row.original.description}</p>
      </div>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    size: 100,
  },
  {
    id: "date",
    accessorKey: "date",
    header: "Last updated",
    size: 140,
  },
  actionsColumn<Item>({
    size: 180,
    render: () => (
      <>
        <Button size="small" variant="secondary" className="whitespace-nowrap">
          Start
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

export const Default: Story = () => (
  <div className="p-6">
    <DataTable data={ITEMS} columns={columns} />
  </div>
);

export const Loading: Story = () => (
  <div className="p-6">
    <DataTable data={[]} columns={columns} loading skeletonRows={6} />
  </div>
);

export const Empty: Story = () => (
  <div className="p-6">
    <DataTable
      data={[]}
      columns={columns}
      emptyState={
        <p className="text-surface-weaker py-8">No items found.</p>
      }
    />
  </div>
);
