import type { ReactElement } from "react";

export interface PopoverSelectOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface PopoverSelectProps {
  /** Available options shown in the dropdown list. */
  options: PopoverSelectOption[];
  /** Selected option IDs (controlled). */
  value: string[];
  /** Called on every selection change (immediate — no commit step). */
  onValueChange: (value: string[]) => void;
  /**
   * The element that triggers the popup.
   * For simple buttons (FilterButton), pass as-is — Popover.Trigger wires open/close automatically.
   * For compound elements (FilterTag), use controlled mode via `open`/`onOpenChange`.
   */
  trigger: ReactElement;
  /** Placeholder text for the search input. Defaults to "Search". */
  searchPlaceholder?: string;
  /** Allow multiple selections. Defaults to true. */
  multiple?: boolean;
  /** Controlled open state. Leave unset for uncontrolled (Base UI manages open/close). */
  open?: boolean;
  /** Called when the popup open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Side to position the popup relative to the trigger. Defaults to "bottom". */
  side?: "top" | "bottom" | "left" | "right";
  /** Alignment of the popup relative to the trigger. Defaults to "start". */
  align?: "start" | "center" | "end";
  /** Gap between trigger and popup in px. Defaults to 4. */
  sideOffset?: number;
}
