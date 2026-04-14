import type { InputHTMLAttributes, ReactElement, ReactNode } from "react";
import type { Input as BaseInput } from "@base-ui/react";

export type Size = "medium" | "large";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: Size;
  /** Marks the input as invalid — switches border and focus ring to negative colour. */
  error?: boolean;
  /** Decorative icon inside the left edge. Absolutely positioned; input padding adjusts automatically. */
  leftIcon?: ReactElement;
  /** Decorative icon inside the right edge. Absolutely positioned; input padding adjusts automatically. */
  rightIcon?: ReactElement;
  /** Arbitrary content (button, badge, etc.) rendered as a flex item on the left. */
  leftAddOn?: ReactElement;
  /** Arbitrary content (button, badge, etc.) rendered as a flex item on the right. */
  rightAddOn?: ReactElement;
  /** "full" for 100% width, or any CSS width value e.g. "200px". */
  width?: "full" | (string & {});
  /** Content rendered inline before the input — used for tag chips (InputTag). */
  children?: ReactNode;
  /**
   * Callback fired when the value changes. Receives the new string value and
   * event details. Prefer this over `onChange` when using with Field.
   */
  onValueChange?: BaseInput.Props["onValueChange"];
}
