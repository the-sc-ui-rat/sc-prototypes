import type { ComponentPropsWithoutRef } from "react";
import type { Avatar as BaseAvatar } from "@base-ui/react";

const rootVariantsDummy = {} as { size?: "sm" | "md" | "lg" | "xl" };

export interface AvatarRootProps extends ComponentPropsWithoutRef<typeof BaseAvatar.Root> {
  size?: "sm" | "md" | "lg" | "xl";
}
export interface AvatarImageProps extends ComponentPropsWithoutRef<typeof BaseAvatar.Image> {}
export interface AvatarFallbackProps extends ComponentPropsWithoutRef<typeof BaseAvatar.Fallback> {}
