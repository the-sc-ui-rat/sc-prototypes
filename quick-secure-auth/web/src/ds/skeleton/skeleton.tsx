import React from "react";
import { tv } from "../../utils/variants";
import type { SkeletonProps } from "./types";

const skeletonVariants = tv({
  base: "animate-pulse rounded bg-default",
});

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={skeletonVariants({ className })} {...props} />
  )
);
Skeleton.displayName = "Skeleton";
