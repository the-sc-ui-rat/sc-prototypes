export interface GlobalHeaderProps {
  orgName: string;
  orgInitials: string;
  onToggleSidebar?: () => void;
  /** Show notification dot on the bell icon */
  hasNotification?: boolean;
}
