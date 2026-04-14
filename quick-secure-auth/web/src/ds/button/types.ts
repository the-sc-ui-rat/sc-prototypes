import type { ComponentProps, ReactElement } from "react";
import type { VariantProps } from "../../utils/variants";
import type { Button as BaseButton } from "@base-ui/react";
import type { buttonVariants } from "./button.variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Custom element or render function for polymorphic rendering.
   * Replaces the default <button> element.
   * @example render={<a href="/dashboard" />}
   * @example render={(props) => <RouterLink {...props} to="/dashboard" />}
   */
  render?: ComponentProps<typeof BaseButton>["render"];
  /**
   * Icon rendered before the button label.
   * Accepts a component from `@safetyculture/icons-react`.
   */
  leftIcon?: ReactElement;
  /**
   * Icon rendered after the button label.
   * Accepts a component from `@safetyculture/icons-react`.
   */
  rightIcon?: ReactElement;
  /** Puts the button in a loading state and replaces content with a spinner. */
  isLoading?: boolean;
}
