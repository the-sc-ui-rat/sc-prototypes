import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type RowSelectionState,
} from "@tanstack/react-table";
import { Table } from "../../ds/table";
import { Checkbox } from "../../ds/checkbox";
import { Skeleton } from "../../ds/skeleton";
import type { DataTableProps } from "./types";

// ─── Column helpers ────────────────────────────────────────────────────────────

export function selectColumn<T>(): ColumnDef<T, any> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        size="md"
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onCheckedChange={() => table.toggleAllRowsSelected()}
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        size="md"
        checked={row.getIsSelected()}
        onCheckedChange={() => row.toggleSelected()}
        aria-label="Select row"
      />
    ),
    size: 52,
    enableSorting: false,
  };
}

export function thumbnailColumn<
  T extends { color: string; Illustration: React.FC },
>(): ColumnDef<T, any> {
  return {
    id: "thumbnail",
    header: () => null,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div
          className={`${item.color} rounded-md w-10 h-10 flex items-center justify-center overflow-hidden shrink-0`}
        >
          <item.Illustration />
        </div>
      );
    },
    size: 64,
    enableSorting: false,
  };
}

export function actionsColumn<T>({
  size = 200,
  render,
}: {
  size?: number;
  render: (row: T) => React.ReactNode;
}): ColumnDef<T, any> {
  return {
    id: "actions",
    header: () => null,
    cell: ({ row }) => (
      <div className="invisible group-hover:visible flex items-center gap-2 justify-end">
        {render(row.original)}
      </div>
    ),
    size,
    enableSorting: false,
  };
}

// ─── DataTable component ───────────────────────────────────────────────────────

export function DataTable<T>({
  data,
  columns,
  loading = false,
  skeletonRows = 6,
  emptyState,
}: DataTableProps<T>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  return (
    <div className="overflow-auto rounded-md border border-surface-weakest bg-surface-default">
      <Table.Root>
        <Table.Header>
          {headerGroups.map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Head
                  key={header.id}
                  style={{
                    width: header.getSize() !== 150 ? header.getSize() : undefined,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Table.Head>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {loading ? (
            Array.from({ length: skeletonRows }).map((_, i) => (
              <Table.Row key={i}>
                {table.getAllColumns().map((col) => (
                  <Table.Cell key={col.id} className="h-auto py-3">
                    {col.id === "select" ? (
                      <Skeleton className="h-4 w-4 rounded-sm" />
                    ) : col.id === "thumbnail" ? (
                      <Skeleton className="h-10 w-10 rounded-md" />
                    ) : (
                      <Skeleton className="h-4 w-full" />
                    )}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : rows.length === 0 && emptyState ? (
            <Table.Row>
              <Table.Cell colSpan={columns.length} className="h-64 text-center">
                {emptyState}
              </Table.Cell>
            </Table.Row>
          ) : (
            rows.map((row) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                className="group hover:bg-surface-hover cursor-default"
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id} className="h-auto py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
