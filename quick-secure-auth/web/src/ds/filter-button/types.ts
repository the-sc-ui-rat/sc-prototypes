import type { ButtonHTMLAttributes } from "react";
import type React from "react";

export interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Size of the button. Defaults to `md`. */
  size?: "sm" | "md";
  /**
   * Whether any filters are currently active/applied.
   * Switches to accent background and border. Defaults to `false`.
   */
  active?: boolean;
  /**
   * When `true`, hides the label and renders an icon-only square button.
   * The count badge still shows when present. Defaults to `false`.
   */
  collapsed?: boolean;
  /**
   * Number of active filters to display in a badge on the top-right corner.
   * Hidden when `0` or `undefined`.
   */
  count?: number;
  /**
   * Custom icon element. Receives a `size` prop automatically.
   * Defaults to the `BarsFilter` icon.
   */
  icon?: React.ReactElement;
}
