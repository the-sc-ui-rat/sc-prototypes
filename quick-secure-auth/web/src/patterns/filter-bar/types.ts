import type { HTMLAttributes } from "react";
import type { PopoverSelectOption } from "../../ds/popover-select/types";

export interface FilterItem {
  id: string;
  label: string;
}

/** A filter category that opens a PopoverSelect when the tag is clicked. */
export interface FilterSelectItem {
  /** Unique identifier for this filter category. */
  id: string;
  /** Label prefix shown in the tag (e.g. "Status"). */
  filterLabel: string;
  /** Available options shown in the dropdown. */
  options: PopoverSelectOption[];
  /** Currently selected option IDs (controlled). */
  value: string[];
  /** Called when the user changes their selection. */
  onValueChange: (value: string[]) => void;
  /** Called when the × button is clicked to remove this filter category entirely. */
  onRemove?: () => void;
  /** When true, the PopoverSelect opens immediately on mount. Used to auto-open a newly added filter tag. */
  autoOpen?: boolean;
}

export type FilterBarItem = FilterItem | FilterSelectItem;

export interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  filters: FilterBarItem[];
  /** Called when the remove (×) button on a basic FilterTag is clicked. Not needed when all items are FilterSelectItem. */
  onRemove?: (id: string) => void;
  /** When provided, renders a "Clear all" link that removes all tags. */
  onClearAll?: () => void;
  size?: "md" | "sm";
}
