import React from "react";
import { Avatar as BaseAvatar } from "@base-ui/react";
import { tv } from "../../utils/variants";
import type { AvatarRootProps, AvatarImageProps, AvatarFallbackProps } from "./types";

const rootVariants = tv({
  base: "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
  variants: {
    size: {
      sm: "w-6 h-6 body-xs",
      md: "w-8 h-8 body-sm",
      lg: "w-10 h-10 body-md",
      xl: "w-12 h-12 title-sm",
    },
  },
  defaultVariants: { size: "md" },
});

const imageVariants = tv({ base: "w-full h-full object-cover" });

const fallbackVariants = tv({
  base: "flex w-full h-full items-center justify-center bg-accent-weaker text-accent-default font-[500] uppercase",
});

const Root = React.forwardRef<HTMLSpanElement, AvatarRootProps>(
  ({ size, className, ...props }, ref) => (
    <BaseAvatar.Root ref={ref} className={rootVariants({ size, className: className as string | undefined })} {...props} />
  )
);
Root.displayName = "Avatar.Root";

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <BaseAvatar.Image ref={ref} className={imageVariants({ className: className as string | undefined })} {...props} />
  )
);
AvatarImage.displayName = "Avatar.Image";

const Fallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <BaseAvatar.Fallback ref={ref} className={fallbackVariants({ className: className as string | undefined })} {...props} />
  )
);
Fallback.displayName = "Avatar.Fallback";

export const Avatar = { Root, Image: AvatarImage, Fallback };
