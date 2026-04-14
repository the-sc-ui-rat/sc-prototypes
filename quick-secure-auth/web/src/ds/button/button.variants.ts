import { tv } from "../../utils/variants";

/**
 * Button variant definitions using tailwind-variants (tv).
 *
 * Colour classes use semantic Tailwind utilities from the design-token theme
 * (`bg-accent-default`, `text-accent-on-default`, `border-surface-default`, etc.) which automatically
 * resolve to the correct light/dark values via CSS variable overrides.
 *
 */
export const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center",
    "border border-solid",
    "label-md leading-[22px]",
    "select-none",
    "transition-[background-color,color] duration-[120ms] ease-[0s]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-default focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed",
  ],

  variants: {
    /**
     * Visual style of the button.
     * - primary   — filled accent background
     * - secondary — outline with accent text
     * - tertiary  — no background, accent text
     */
    variant: {
      primary: [
        "text-accent-on-default bg-accent-default border-accent-default",
        "enabled:hover:bg-accent-hover",
        "enabled:active:bg-accent-pressed",
        "disabled:text-surface-disabled disabled:bg-surface-disabled disabled:border-transparent",
      ],
      secondary: [
        "text-accent-default bg-surface-default border-surface-default",
        "enabled:hover:text-accent-on-weaker enabled:hover:bg-accent-weaker",
        "enabled:active:bg-accent-weaker-pressed",
        "disabled:text-surface-disabled disabled:bg-surface-disabled disabled:border-transparent",
      ],
      tertiary: [
        "text-accent-default bg-transparent border-transparent",
        "enabled:hover:text-accent-on-weaker enabled:hover:bg-accent-weaker",
        "enabled:active:bg-accent-weaker-pressed",
        "disabled:text-surface-disabled disabled:bg-transparent disabled:border-transparent",
      ],
    },

    /** Button size — controls height, padding, radius and gap. */
    size: {
      large:  ["h-12 min-w-12", "px-4 py-3", "rounded-md", "gap-2"],
      medium: ["h-10 min-w-10", "px-3 py-2", "rounded-sm", "gap-1"],
      small:  ["h-8 min-w-8",   "px-3 py-1", "rounded-sm", "gap-1"],
    },

    /** Modifier — switches to destructive (negative) colour tokens. */
    modifier: {
      default:     [],
      destructive: [],
    },
  },

  /** Compound variants override colour classes when modifier=destructive. */
  compoundVariants: [
    {
      variant: "primary",
      modifier: "destructive",
      class: [
        "text-negative-on-default bg-negative-default border-negative-default",
        "enabled:hover:bg-negative-hover",
        "enabled:active:bg-negative-pressed",
      ],
    },
    {
      variant: "secondary",
      modifier: "destructive",
      class: [
        "text-negative-default bg-surface-default border-surface-default",
        "enabled:hover:bg-negative-weaker-hover",
        "enabled:active:bg-negative-weaker-pressed",
      ],
    },
    {
      variant: "tertiary",
      modifier: "destructive",
      class: [
        "text-negative-on-weaker bg-transparent border-transparent",
        "enabled:hover:bg-negative-weaker-hover",
        "enabled:active:bg-negative-weaker-pressed",
      ],
    },
  ],

  defaultVariants: {
    variant:  "primary",
    size:     "medium",
    modifier: "default",
  },
});
