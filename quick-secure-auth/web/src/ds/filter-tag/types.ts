import type { HTMLAttributes } from "react";

export interface FilterTagProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the tag. Defaults to `md`. */
  size?: "md" | "sm";
  /** Whether the tag is in the selected/active state. */
  selected?: boolean;
  /** Called when the label is clicked to toggle selection. */
  onSelectedChange?: (selected: boolean) => void;
  /** When provided, renders a remove (×) button and calls this on click. */
  onRemove?: () => void;
  /** Disables both the label toggle and remove button. */
  disabled?: boolean;
}
