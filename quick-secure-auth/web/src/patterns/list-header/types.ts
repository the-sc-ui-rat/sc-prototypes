import type { HTMLAttributes, ReactNode } from "react";
import type { FilterBarItem } from "../filter-bar/types";
import type { PopoverSelectOption } from "../../ds/popover-select/types";

/** A filter category available to activate via the FilterButton. */
export interface FilterCategoryDef {
  /** Unique identifier for this filter category. */
  id: string;
  /** Label shown in the FilterButton dropdown and as the tag prefix. */
  label: string;
  /** Available values for this filter category. */
  options: PopoverSelectOption[];
}

export interface ListHeaderProps extends HTMLAttributes<HTMLDivElement> {
  // ─── Search ──────────────────────────────────────────────────────────────

  /** Controlled value for the search input. */
  searchValue?: string;
  /** Called when the search input value changes. */
  onSearchChange?: (value: string) => void;
  /** Placeholder text for the search input. Defaults to "Search". */
  searchPlaceholder?: string;

  // ─── Filters: toggle mode ─────────────────────────────────────────────────
  // Use this when you manage filter tags externally with pre-formatted labels.

  /**
   * Whether the filter bar row is visible.
   * The FilterButton toggles this via `onFiltersOpenChange`.
   */
  filtersOpen?: boolean;
  /** Called when the FilterButton is clicked to toggle the filter bar. */
  onFiltersOpenChange?: (open: boolean) => void;
  /**
   * Number of active filters — overrides badge count on the FilterButton.
   * Defaults to `filters.length`.
   */
  filterCount?: number;
  /** Filter tags to render in the filter bar row. Accepts FilterItem or FilterSelectItem. */
  filters?: FilterBarItem[];
  /** Called when a basic filter tag's × button is clicked. */
  onFilterRemove?: (id: string) => void;
  /** Called when the "Clear all" link is clicked. */
  onFilterClearAll?: () => void;

  // ─── Filters: category-select mode ───────────────────────────────────────
  // Use this when the FilterButton should open a PopoverSelect to activate
  // filter categories, each of which then opens their own PopoverSelect for values.

  /**
   * Available filter categories. When provided, the FilterButton opens a
   * PopoverSelect where the user picks which categories to activate.
   */
  filterCategories?: FilterCategoryDef[];
  /** IDs of currently active filter categories. */
  activeFilterIds?: string[];
  /** Called when the user toggles filter categories in the FilterButton dropdown. */
  onActiveFilterIdsChange?: (ids: string[]) => void;
  /** Current selected values per filter category (keyed by category id). */
  filterValues?: Record<string, string[]>;
  /** Called when the user changes the selected values within a filter category tag. */
  onFilterValueChange?: (categoryId: string, values: string[]) => void;

  // ─── Actions ─────────────────────────────────────────────────────────────

  /**
   * Action buttons rendered on the right side of the header.
   * Render `<IconButton>` components here. Pass `null` to hide the slot.
   */
  actions?: ReactNode;
}
