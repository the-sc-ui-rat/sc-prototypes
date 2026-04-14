import React, { useState } from "react";
import type { Story } from "@ladle/react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "@safetyculture/icons-react";
import { Checkbox } from "../checkbox";
import { Table } from ".";

export default { title: "Components / Table" };


type Person = {
  name: string;
  email: string;
  role: string;
  status: string;
};

const sampleData: Person[] = [
  { name: "Alice Johnson", email: "alice@example.com", role: "Inspector", status: "Active" },
  { name: "Bob Smith", email: "bob@example.com", role: "Manager", status: "Active" },
  { name: "Carol White", email: "carol@example.com", role: "Auditor", status: "Inactive" },
  { name: "David Brown", email: "david@example.com", role: "Inspector", status: "Active" },
];

const columnHelper = createColumnHelper<Person>();

export const Default: Story = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          size="md"
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onCheckedChange={() => table.toggleAllRowsSelected()}
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          size="md"
          checked={row.getIsSelected()}
          onCheckedChange={() => row.toggleSelected()}
          aria-label="Select row"
        />
      ),
      size: 52,
      enableSorting: false,
    },
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("email", { header: "Email" }),
    columnHelper.accessor("role", { header: "Role" }),
    columnHelper.accessor("status", { header: "Status" }),
  ];

  const table = useReactTable({
    data: sampleData,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  return (
    <div className="p-6 max-w-3xl">
      <div className="overflow-auto rounded-md border border-surface-weak">
        <Table.Root>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Head
                    key={header.id}
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <button
                            className="text-surface-weaker opacity-60 hover:opacity-100 cursor-pointer bg-transparent border-0 p-0 flex items-center"
                            onClick={header.column.getToggleSortingHandler()}
                            aria-label={`Sort by ${header.column.id}`}
                          >
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp size={14} />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown size={14} />
                            ) : (
                              <ArrowUpDown size={14} />
                            )}
                          </button>
                        )}
                      </div>
                    )}
                  </Table.Head>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                className="hover:bg-surface-hover cursor-default"
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
      <p className="mt-3 body-xs text-surface-weaker">
        {Object.keys(rowSelection).length} of {sampleData.length} rows selected
      </p>
    </div>
  );
};
Default.storyName = "Default";

export const Simple: Story = () => (
  <div className="p-6 max-w-md">
    <div className="overflow-auto rounded-md border border-surface-weak">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sampleData.map((row) => (
            <Table.Row key={row.name} className="hover:bg-surface-hover">
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.role}</Table.Cell>
              <Table.Cell>{row.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  </div>
);
Simple.storyName = "Simple";
