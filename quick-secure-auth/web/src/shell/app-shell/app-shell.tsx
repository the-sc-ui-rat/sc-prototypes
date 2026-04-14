import React, { useState } from "react";
import { GlobalHeader } from "../global-header";
import { Sidebar } from "../sidebar";
import type { AppShellProps } from "./types";

export function AppShell({
  navItems,
  activeItem,
  onItemSelect,
  orgName,
  orgInitials,
  userName,
  hasNotification,
  children,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-default overflow-hidden">
      <GlobalHeader
        orgName={orgName}
        orgInitials={orgInitials}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        hasNotification={hasNotification}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          items={navItems}
          activeItem={activeItem}
          open={sidebarOpen}
          userName={userName}
          orgName={orgName}
          onItemSelect={onItemSelect}
        />
        <main className="flex-1 overflow-auto bg-default">
          {children}
        </main>
      </div>
    </div>
  );
}
