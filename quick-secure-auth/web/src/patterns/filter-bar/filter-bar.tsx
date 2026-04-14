import React, { useState } from "react";
import { FilterTag } from "../../ds/filter-tag";
import { PopoverSelect } from "../../ds/popover-select/popover-select";
import { cn } from "../../utils/cn";
import type { FilterBarItem, FilterBarProps, FilterSelectItem } from "./types";
import type { PopoverSelectOption } from "../../ds/popover-select/types";

function isSelectItem(item: FilterBarItem): item is FilterSelectItem {
  return "options" in item;
}

function formatTagLabel(
  filterLabel: string,
  options: PopoverSelectOption[],
  value: string[],
): string {
  if (value.length === 0) return filterLabel;
  const names = value.map((id) => options.find((o) => o.id === id)?.label ?? id);
  if (names.length === 1) return `${filterLabel}: ${names[0]}`;
  if (names.length === 2) return `${filterLabel}: ${names[0]}, ${names[1]}`;
  return `${filterLabel}: ${names[0]} +${names.length - 1}`;
}

function FilterSelectTag({
  item,
  size,
}: {
  item: FilterSelectItem;
  size: "md" | "sm";
}) {
  // Initialize open from autoOpen so newly added tags open immediately on mount
  const [open, setOpen] = useState(() => item.autoOpen ?? false);
  return (
    <PopoverSelect
      open={open}
      onOpenChange={setOpen}
      options={item.options}
      value={item.value}
      onValueChange={item.onValueChange}
      trigger={
        <FilterTag
          size={size}
          selected={item.value.length > 0}
          onSelectedChange={() => setOpen(true)}
          onRemove={
            item.onRemove
              ? () => {
                  item.onRemove!();
                  setOpen(false);
                }
              : undefined
          }
        >
          {formatTagLabel(item.filterLabel, item.options, item.value)}
        </FilterTag>
      }
    />
  );
}

export const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  ({ filters, onRemove, onClearAll, size = "md", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center gap-2", className)}
        {...props}
      >
        {filters.map((filter) =>
          isSelectItem(filter) ? (
            <FilterSelectTag key={filter.id} item={filter} size={size} />
          ) : (
            <FilterTag
              key={filter.id}
              size={size}
              onRemove={onRemove ? () => onRemove(filter.id) : undefined}
            >
              {filter.label}
            </FilterTag>
          ),
        )}

        {onClearAll && filters.length > 0 && (
          <button
            type="button"
            className={cn(
              "appearance-none border-0 bg-transparent shadow-none m-0 p-0",
              "label-md text-accent-default cursor-pointer",
              "hover:underline transition-colors duration-120",
              "focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
              size === "sm" ? "px-1" : "px-2",
            )}
            onClick={onClearAll}
          >
            Clear all
          </button>
        )}
      </div>
    );
  },
);

FilterBar.displayName = "FilterBar";
