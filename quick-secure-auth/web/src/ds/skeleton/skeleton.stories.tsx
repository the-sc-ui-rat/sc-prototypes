import type { Story } from "@ladle/react";
import { Skeleton } from "./skeleton";

export default { title: "Components / Skeleton" };

export const TextLine: Story = () => (
  <div className="flex flex-col gap-2 w-64">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);

export const Thumbnail: Story = () => (
  <Skeleton className="h-10 w-10 rounded-md" />
);

export const Avatar: Story = () => (
  <Skeleton className="h-10 w-10 rounded-full" />
);

export const Card: Story = () => (
  <div className="flex items-start gap-3 w-72">
    <Skeleton className="h-10 w-10 rounded-md shrink-0" />
    <div className="flex flex-col gap-2 flex-1">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  </div>
);

export const TableRows: Story = () => (
  <div className="flex flex-col gap-3 w-full max-w-lg">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3">
        <Skeleton className="h-4 w-4 rounded-sm" />
        <Skeleton className="h-10 w-10 rounded-md shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-4 w-24 shrink-0" />
      </div>
    ))}
  </div>
);
