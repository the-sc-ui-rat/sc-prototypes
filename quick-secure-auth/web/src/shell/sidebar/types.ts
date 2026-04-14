import type { ReactElement } from "react";

export interface NavItemConfig {
  id: string;
  label: string;
  icon: ReactElement;
  /** Show a chevron-right on the right side (e.g. "More") */
  chevron?: boolean;
}

export interface NavItemProps {
  icon: ReactElement;
  label: string;
  active?: boolean;
  chevron?: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  items: NavItemConfig[];
  /** id of the active nav item */
  activeItem?: string;
  open?: boolean;
  userName: string;
  orgName: string;
  onItemSelect?: (id: string) => void;
}
