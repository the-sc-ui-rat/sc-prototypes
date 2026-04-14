import React, { useState } from "react";
import type { Story } from "@ladle/react";
import {
  House,
  Layout,
  ClipboardLines,
  CalendarEllipses,
  SquareCheckSquare,
  GraduationCap,
  Cube,
  MessageMiddleExclamation,
  ChartPie,
  Grid,
} from "@safetyculture/icons-react";
import { AppShell } from "./app-shell";
import type { NavItemConfig } from "../sidebar/types";

const defaultNav: NavItemConfig[] = [
  { id: "home",        label: "Home",        icon: <House /> },
  { id: "templates",   label: "Templates",   icon: <Layout /> },
  { id: "inspections", label: "Inspections", icon: <ClipboardLines /> },
  { id: "schedules",   label: "Schedules",   icon: <CalendarEllipses /> },
  { id: "actions",     label: "Actions",     icon: <SquareCheckSquare /> },
  { id: "training",    label: "Training",    icon: <GraduationCap /> },
  { id: "assets",      label: "Assets",      icon: <Cube /> },
  { id: "issues",      label: "Issues",      icon: <MessageMiddleExclamation /> },
  { id: "analytics",   label: "Analytics",   icon: <ChartPie /> },
  { id: "more",        label: "More",        icon: <Grid />, chevron: true },
];

const shellArgs = {
  orgName: "North Logistics",
  orgInitials: "NL",
  userName: "M Hewitts",
};

function ControlledShell({ initialItem = "home", hasNotification = false }) {
  const [activeItem, setActiveItem] = useState(initialItem);
  return (
    <AppShell
      {...shellArgs}
      navItems={defaultNav}
      activeItem={activeItem}
      onItemSelect={setActiveItem}
      hasNotification={hasNotification}
    >
      <div className="p-6 text-surface-weaker text-sm">
        Active page: <strong>{activeItem}</strong>
      </div>
    </AppShell>
  );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = () => <ControlledShell />;
Default.storyName = "AppShell / Default";

export const WithNotification: Story = () => (
  <ControlledShell initialItem="inspections" hasNotification />
);
WithNotification.storyName = "AppShell / Notification + Active item";
