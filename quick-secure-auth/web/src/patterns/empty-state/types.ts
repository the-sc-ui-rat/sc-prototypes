import type { HTMLAttributes, ReactNode } from "react";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Illustration rendered at the top of the empty state.
   * Pass a component from `@safetyculture/illustrations-react`.
   * @example illustration={<Folder />}
   */
  illustration?: ReactNode;
  /** Main heading. */
  title: ReactNode;
  /** Supporting text shown below the title. */
  description?: ReactNode;
  /**
   * Controls the size of the illustration container and spacing.
   * @default "md"
   */
  size?: "sm" | "md";
  /** Primary CTA — render a `<Button variant="primary">` here. */
  primaryAction?: ReactNode;
  /** Secondary CTA — render a `<Button variant="secondary">` here. */
  secondaryAction?: ReactNode;
  /** Tertiary / text CTA — render a `<Button variant="tertiary">` here. */
  tertiaryAction?: ReactNode;
}
