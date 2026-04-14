import type { HTMLAttributes, ReactNode } from "react";

export interface InlineBannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Semantic status — controls background and text colour. Defaults to `neutral`. */
  status?: "neutral" | "information" | "success" | "warning" | "error";
  /** Layout direction. `row` keeps content inline; `column` stacks description and action below the title. Defaults to `row`. */
  direction?: "row" | "column";
  /** Bold title text. */
  title: ReactNode;
  /** Optional supporting description below the title. */
  description?: ReactNode;
  /** Optional action element (e.g. an anchor or button). Rendered after description. */
  action?: ReactNode;
  /** When provided, renders a dismiss (×) button that calls this on click. */
  onDismiss?: () => void;
}
