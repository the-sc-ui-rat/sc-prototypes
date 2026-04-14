import React, { useState, useEffect } from "react";
import { MagnifyingGlass } from "@safetyculture/icons-react";
import { Input } from "../../ds/input/input";
import { FilterButton } from "../../ds/filter-button/filter-button";
import { PopoverSelect } from "../../ds/popover-select/popover-select";
import { FilterBar } from "../filter-bar/filter-bar";
import { cn } from "../../utils/cn";
import type { FilterSelectItem } from "../filter-bar/types";
import type { ListHeaderProps } from "./types";

export const ListHeader = React.forwardRef<HTMLDivElement, ListHeaderProps>(
  (
    {
      searchValue,
      onSearchChange,
      searchPlaceholder = "Search",
      // Toggle mode
      filtersOpen = false,
      onFiltersOpenChange,
      filterCount,
      filters = [],
      onFilterRemove,
      onFilterClearAll,
      // Category-select mode
      filterCategories,
      activeFilterIds = [],
      onActiveFilterIdsChange,
      filterValues = {},
      onFilterValueChange,
      // Actions
      actions,
      className,
      ...props
    },
    ref,
  ) => {
    const isCategoryMode = !!filterCategories;

    // Controlled open state for the filter button popup (category mode only)
    const [filterButtonOpen, setFilterButtonOpen] = useState(false);
    // ID of a newly added category whose tag should auto-open its PopoverSelect
    const [autoOpenId, setAutoOpenId] = useState<string | null>(null);

    // Clear autoOpenId after one render cycle — FilterSelectTag reads it once on mount
    useEffect(() => {
      if (autoOpenId !== null) {
        const timer = setTimeout(() => setAutoOpenId(null), 0);
        return () => clearTimeout(timer);
      }
    }, [autoOpenId]);

    function handleCategoryChange(ids: string[]) {
      const addedId = ids.find((id) => !activeFilterIds.includes(id));
      if (addedId) {
        // A new category was selected: close the filter button popup and
        // signal the new tag to auto-open its value selector
        setFilterButtonOpen(false);
        setAutoOpenId(addedId);
      }
      onActiveFilterIdsChange?.(ids);
    }

    // Derive FilterSelectItem[] from category state
    const categoryFilterItems: FilterSelectItem[] = isCategoryMode
      ? (filterCategories ?? [])
          .filter((cat) => activeFilterIds.includes(cat.id))
          .map((cat) => ({
            id: cat.id,
            filterLabel: cat.label,
            options: cat.options,
            value: filterValues[cat.id] ?? [],
            onValueChange: (values) => onFilterValueChange?.(cat.id, values),
            onRemove: () =>
              onActiveFilterIdsChange?.(activeFilterIds.filter((id) => id !== cat.id)),
            autoOpen: cat.id === autoOpenId,
          }))
      : [];

    const activeCount = isCategoryMode
      ? activeFilterIds.filter((id) => (filterValues[id]?.length ?? 0) > 0).length
      : (filterCount ?? filters.length);

    const showFilterBar = isCategoryMode
      ? categoryFilterItems.length > 0
      : filtersOpen && filters.length > 0;

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        {/* Row 1: search + filter button on the left, actions on the right */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={onSearchChange ? (e) => onSearchChange(e.target.value) : undefined}
              leftIcon={<MagnifyingGlass />}
              className="w-52"
            />

            {/* Category-select mode: FilterButton opens a PopoverSelect of available categories */}
            {isCategoryMode ? (
              <PopoverSelect
                open={filterButtonOpen}
                onOpenChange={setFilterButtonOpen}
                options={(filterCategories ?? []).map((c) => ({ id: c.id, label: c.label }))}
                value={activeFilterIds}
                onValueChange={handleCategoryChange}
                trigger={
                  <FilterButton
                    active={activeCount > 0}
                    count={activeCount > 0 ? activeCount : undefined}
                  >
                    Filters
                  </FilterButton>
                }
              />
            ) : onFiltersOpenChange ? (
              /* Toggle mode: FilterButton shows/hides the filter tag row */
              <FilterButton
                active={activeCount > 0}
                count={filterCount}
                onClick={() => onFiltersOpenChange(!filtersOpen)}
                aria-pressed={filtersOpen}
              >
                Filters
              </FilterButton>
            ) : null}
          </div>

          {actions && (
            <div className="flex items-center gap-2 shrink-0">
              {actions}
            </div>
          )}
        </div>

        {/* Row 2: filter tags */}
        {showFilterBar && (
          <FilterBar
            filters={isCategoryMode ? categoryFilterItems : filters}
            onRemove={onFilterRemove}
            onClearAll={
              isCategoryMode
                ? () => onActiveFilterIdsChange?.([])
                : onFilterClearAll
            }
            size="sm"
          />
        )}
      </div>
    );
  },
);

ListHeader.displayName = "ListHeader";
