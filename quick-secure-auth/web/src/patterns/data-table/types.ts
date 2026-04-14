import type { ReactNode } from "react";
import type { ColumnDef } from "@tanstack/react-table";

export type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  loading?: boolean;
  skeletonRows?: number;
  emptyState?: ReactNode;
};
