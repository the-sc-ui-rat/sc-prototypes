import type { ReactNode } from "react";
import type { NavItemConfig } from "../sidebar/types";

export interface AppShellProps {
  navItems: NavItemConfig[];
  activeItem?: string;
  onItemSelect?: (id: string) => void;
  orgName: string;
  orgInitials: string;
  userName: string;
  hasNotification?: boolean;
  children?: ReactNode;
}
