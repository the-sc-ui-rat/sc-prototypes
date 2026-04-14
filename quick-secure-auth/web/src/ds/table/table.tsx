import React from "react";
import { tv } from "../../utils/variants";
import type {
  TableRootProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
} from "./types";

const rootVariants = tv({
  base: "w-full border-collapse body-sm",
});

const rowVariants = tv({
  base: "border-b border-surface-weak last:border-b-0 data-[state=selected]:bg-accent-weakest",
});

const headVariants = tv({
  base: [
    "h-11 bg-weak px-4 text-left align-middle",
    "body-sm-strong text-surface-weaker whitespace-nowrap",
  ],
});

const cellVariants = tv({
  base: "h-11 px-4 text-surface-default body-sm align-middle",
});

export const TableRoot = React.forwardRef<HTMLTableElement, TableRootProps>(
  ({ className, ...props }, ref) => (
    <table ref={ref} className={rootVariants({ className: className as string | undefined })} {...props} />
  )
);
TableRoot.displayName = "Table.Root";

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  (props, ref) => <thead ref={ref} {...props} />
);
TableHeader.displayName = "Table.Header";

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => <tbody ref={ref} {...props} />
);
TableBody.displayName = "Table.Body";

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={rowVariants({ className: className as string | undefined })} {...props} />
  )
);
TableRow.displayName = "Table.Row";

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th ref={ref} scope="col" className={headVariants({ className: className as string | undefined })} {...props} />
  )
);
TableHead.displayName = "Table.Head";

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cellVariants({ className: className as string | undefined })} {...props} />
  )
);
TableCell.displayName = "Table.Cell";

export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
};
