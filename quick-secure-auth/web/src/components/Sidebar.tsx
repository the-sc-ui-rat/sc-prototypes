import {
  Home, Search, Bell, ClipboardList, ScanLine, CalendarClock,
  CircleCheckBig, GraduationCap, Box, Library, FileText,
  CircleAlert, SearchSlash, UserRound, Megaphone, Thermometer,
  Store, BarChart3, HelpCircle, ChevronDown, ChevronRight, Settings,
} from "lucide-react"

const NAV_MAIN = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: Bell, label: "Notifications" },
]

const NAV_FEATURES = [
  { icon: ClipboardList, label: "Templates" },
  { icon: ScanLine, label: "Inspections" },
  { icon: CalendarClock, label: "Schedules" },
  { icon: CircleCheckBig, label: "Actions" },
  { icon: GraduationCap, label: "Training" },
  { icon: Box, label: "Assets" },
  { icon: Library, label: "Library" },
  { icon: FileText, label: "Documents" },
  { icon: CircleAlert, label: "Issues" },
  { icon: SearchSlash, label: "Investigations" },
  { icon: UserRound, label: "Lone Worker" },
  { icon: Megaphone, label: "Heads Up" },
  { icon: Thermometer, label: "Sensors" },
  { icon: Store, label: "Marketplace" },
]

const NAV_ANALYTICS = [{ icon: BarChart3, label: "Analytics" }]

function NavItem({ icon: Icon, label }: { icon: typeof Home; label: string }) {
  return (
    <button className="flex w-full items-center gap-3 px-4 py-2 h-12 text-sm text-text-weak tracking-[0.4px] hover:bg-bg/50 transition-colors">
      <Icon size={21} strokeWidth={1.5} />
      <span>{label}</span>
    </button>
  )
}

function NavDivider() {
  return <div className="mx-4 my-1 h-px bg-border" />
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[220px] bg-sidebar-bg border-r border-border flex flex-col z-10">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="h-10 w-10 rounded-lg bg-[#DA291C] flex items-center justify-center text-white font-bold text-sm shrink-0">
          M
        </div>
        <span className="text-base font-medium text-text-default truncate">
          McDonald's
        </span>
        <ChevronDown size={14} className="text-text-weak shrink-0 ml-auto" />
      </div>

      <nav className="flex-1 overflow-y-auto">
        {NAV_MAIN.map((item) => <NavItem key={item.label} {...item} />)}
        <NavDivider />
        {NAV_FEATURES.map((item) => <NavItem key={item.label} {...item} />)}
        <NavDivider />
        {NAV_ANALYTICS.map((item) => <NavItem key={item.label} {...item} />)}
      </nav>

      <div className="border-t border-border">
        <button className="flex w-full items-center gap-3 px-4 py-2 h-12 text-sm text-text-weak tracking-[0.4px] hover:bg-bg/50">
          <HelpCircle size={21} strokeWidth={1.5} />
          <span>Help</span>
          <ChevronRight size={14} className="ml-auto text-text-weak" />
        </button>
        <button className="flex w-full items-center gap-3 px-4 py-3 h-16 text-sm text-text-weak hover:bg-bg/50">
          <Settings size={21} strokeWidth={1.5} className="shrink-0" />
          <div className="text-left truncate">
            <div className="text-xs font-medium text-text-default">SC Playground</div>
            <div className="text-xs text-text-weak">Josh Rat</div>
          </div>
          <ChevronRight size={14} className="ml-auto shrink-0 text-text-weak" />
        </button>
      </div>
    </aside>
  )
}
