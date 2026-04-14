import React, { useState } from "react";
import type { ComponentType, ReactElement } from "react";
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
  Cog,
} from "@safetyculture/icons-react";
import { AppShell } from "../../src/shell/app-shell";
import { HomePage } from "./pages/HomePage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { InspectionsPage } from "./pages/InspectionsPage";
import { SchedulesPage } from "./pages/SchedulesPage";
import { ActionsPage } from "./pages/ActionsPage";
import { TrainingPage } from "./pages/TrainingPage";
import { AssetsPage } from "./pages/AssetsPage";
import { IssuesPage } from "./pages/IssuesPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { OrgSettingsPage } from "./pages/org-settings/OrgSettingsPage";

type PageEntry = {
  id: string;
  label: string;
  icon: ReactElement;
  chevron?: boolean;
  component?: ComponentType;
};

const pages: PageEntry[] = [
  { id: "home",        label: "Home",        icon: <House />,                    component: HomePage },
  { id: "templates",   label: "Templates",   icon: <Layout />,                   component: TemplatesPage },
  { id: "inspections", label: "Inspections", icon: <ClipboardLines />,           component: InspectionsPage },
  { id: "schedules",   label: "Schedules",   icon: <CalendarEllipses />,         component: SchedulesPage },
  { id: "actions",     label: "Actions",     icon: <SquareCheckSquare />,        component: ActionsPage },
  { id: "training",    label: "Training",    icon: <GraduationCap />,            component: TrainingPage },
  { id: "assets",      label: "Assets",      icon: <Cube />,                     component: AssetsPage },
  { id: "issues",      label: "Issues",      icon: <MessageMiddleExclamation />, component: IssuesPage },
  { id: "analytics",   label: "Analytics",   icon: <ChartPie />,                 component: AnalyticsPage },
  { id: "more",        label: "More",        icon: <Grid />,                     chevron: true },
  { id: "settings",    label: "Settings",    icon: <Cog />,                      component: OrgSettingsPage },
];

const navItems = pages.map(({ id, label, icon, chevron }) => ({ id, label, icon, chevron }));

function PageRouter({ activeItem }: { activeItem: string }) {
  const entry = pages.find((p) => p.id === activeItem);
  const Component = entry?.component ?? HomePage;
  return <Component />;
}

export function App() {
  const [activeItem, setActiveItem] = useState("settings");

  return (
    <AppShell
      navItems={navItems}
      activeItem={activeItem}
      onItemSelect={setActiveItem}
      orgName="Woolworths"
      orgInitials="W"
      userName="Sam Admin"
      hasNotification
    >
      <PageRouter activeItem={activeItem} />
    </AppShell>
  );
}
