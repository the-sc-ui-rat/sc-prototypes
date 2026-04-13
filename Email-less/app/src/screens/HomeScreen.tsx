import { useState } from 'react'
import {
  Bell, ChevronRight, ChevronDown, ChevronUp,
  GraduationCap, Box, Clock, CheckCircle2, Calendar, AlertCircle,
  ClipboardList, SquareCheck, Home, Grid3X3, MapPin, Flag,
} from 'lucide-react'

const AVATAR_URL = 'https://www.figma.com/api/mcp/asset/677e49c2-a343-421d-be3c-f9f126bf0108'

const C = {
  textDefault:  '#1f2533',
  textWeak:     '#3f495a',
  textWeaker:   '#545f70',
  accentText:   '#4740d4',
  accentBg:     '#ecedfe',
  negText:      '#a8242a',
  negBg:        '#fff0f1',
  warnText:     '#9e4a00',
  warnBg:       '#fffae5',
  neutralText:  '#3f495a',
  neutralBg:    '#f5f6fa',
  borderWeak:   '#dbe0eb',
  base:         '#e9edf6',
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-4 h-11">
      <span className="text-black font-semibold" style={{ fontSize: 15, lineHeight: '20px' }}>9:41</span>
      <div className="flex items-center gap-[6px]">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0"    y="7"   width="3" height="5"    rx="0.5" fill="#1d2330" />
          <rect x="4.5"  y="4.5" width="3" height="7.5"  rx="0.5" fill="#1d2330" />
          <rect x="9"    y="2"   width="3" height="10"   rx="0.5" fill="#1d2330" />
          <rect x="13.5" y="0"   width="3" height="12"   rx="0.5" fill="#1d2330" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <circle cx="8" cy="10" r="1.5" fill="#1d2330" />
          <path d="M4.93 7.07a4.3 4.3 0 0 1 6.14 0l1.06-1.06a5.8 5.8 0 0 0-8.26 0l1.06 1.06z" fill="#1d2330" />
          <path d="M2.1 4.24a8.3 8.3 0 0 1 11.8 0l1.06-1.06a9.8 9.8 0 0 0-13.92 0l1.06 1.06z" fill="#1d2330" />
        </svg>
        <div className="flex items-center">
          <div className="rounded-[2px] border border-black p-[1.5px]" style={{ width: 25, height: 12 }}>
            <div className="w-full h-full bg-black rounded-[1px]" />
          </div>
          <div className="w-[1.5px] h-[4px] bg-black rounded-r-[1px] -ml-[0.5px]" />
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, number, label }: { icon: 'training' | 'issues'; number: string; label: string }) {
  return (
    <div className="flex-1 flex items-center justify-between bg-white rounded-[12px]" style={{ border: `1px solid ${C.borderWeak}`, padding: 12 }}>
      <div className="flex flex-col" style={{ gap: 2 }}>
        {icon === 'training' ? <GraduationCap size={20} color={C.textDefault} /> : <Box size={20} color={C.textDefault} />}
        <span style={{ fontSize: 20, fontWeight: 700, lineHeight: '28px', color: C.textDefault }}>{number}</span>
        <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: C.textWeaker }}>{label}</span>
      </div>
      <ChevronRight size={16} color={C.textWeaker} />
    </div>
  )
}

function TypeLabel({ type }: { type: 'inspection' | 'scheduled-inspection' | 'action' }) {
  const label = type === 'scheduled-inspection' ? 'SCHEDULED INSPECTION' : type === 'action' ? 'ACTION' : 'INSPECTION'
  const Icon = type === 'action' ? SquareCheck : ClipboardList
  return (
    <div className="flex items-center" style={{ gap: 4 }}>
      <Icon size={10} color={C.accentText} />
      <span style={{ fontSize: 10, fontWeight: 700, lineHeight: '12px', letterSpacing: 1, color: C.accentText }}>{label}</span>
    </div>
  )
}

function StatusBadge({ label, variant }: { label: string; variant: 'warning' | 'neutral' | 'accent' | 'negative' }) {
  const styles = { warning: { color: C.warnText, background: C.warnBg }, neutral: { color: C.neutralText, background: C.neutralBg }, accent: { color: C.accentText, background: C.accentBg }, negative: { color: C.negText, background: C.negBg } }[variant]
  return <span className="rounded-full font-medium whitespace-nowrap" style={{ ...styles, fontSize: 11, lineHeight: '16px', paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2 }}>{label}</span>
}

function CountBadge({ count, variant }: { count: number; variant: 'negative' | 'warning' | 'accent' | 'neutral' }) {
  const styles = { negative: { color: C.negText, background: C.negBg }, warning: { color: C.warnText, background: C.warnBg }, accent: { color: C.accentText, background: C.accentBg }, neutral: { color: C.neutralText, background: C.neutralBg } }[variant]
  return <span className="rounded-full font-semibold flex items-center justify-center" style={{ ...styles, fontSize: 12, minWidth: 20, height: 20, paddingLeft: 6, paddingRight: 6 }}>{count}</span>
}

function InspectionCard({ title, subtitle, meta }: { title: string; subtitle: string; meta: string }) {
  return (
    <div className="shrink-0 bg-white rounded-[12px] flex flex-col justify-between" style={{ width: 280, border: `1px solid ${C.borderWeak}`, padding: 16, gap: 8 }}>
      <div className="flex flex-col" style={{ gap: 4 }}>
        <TypeLabel type="inspection" />
        <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: C.textDefault }}>{title}</span>
        <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: C.textWeaker }}>{subtitle}</span>
      </div>
      <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: C.textWeaker }}>🕐 {meta}</span>
    </div>
  )
}

interface AgendaItemProps {
  type: 'inspection' | 'scheduled-inspection' | 'action'
  code?: string
  title: string
  meta: React.ReactNode
  badge: { label: string; variant: 'warning' | 'neutral' }
}
function AgendaItem({ type, code, title, meta, badge }: AgendaItemProps) {
  return (
    <div className="flex flex-col" style={{ gap: 4, paddingTop: 12, paddingBottom: 12 }}>
      <div className="flex items-center justify-between">
        <TypeLabel type={type} />
        {code && <span style={{ fontSize: 12, fontWeight: 500, color: C.textWeaker }}>{code}</span>}
      </div>
      <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: C.textDefault }}>{title}</span>
      <div className="flex items-center justify-between">
        <div style={{ fontSize: 12, color: C.textWeaker, lineHeight: '16px' }}>{meta}</div>
        <StatusBadge label={badge.label} variant={badge.variant} />
      </div>
    </div>
  )
}

function AccordionSection({ icon, label, count, countVariant, expanded, onToggle, children }: { icon: React.ReactNode; label: string; count: number; countVariant: 'negative' | 'warning' | 'accent' | 'neutral'; expanded: boolean; onToggle: () => void; children?: React.ReactNode }) {
  return (
    <div>
      <button onClick={onToggle} className="w-full flex items-center justify-between bg-transparent border-0 cursor-pointer" style={{ paddingTop: 12, paddingBottom: 12 }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          {icon}
          <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', color: C.textDefault }}>{label}</span>
          <CountBadge count={count} variant={countVariant} />
        </div>
        {expanded ? <ChevronUp size={16} color={C.textWeaker} /> : <ChevronDown size={16} color={C.textWeaker} />}
      </button>
      {expanded && children && <div style={{ borderTop: `1px solid ${C.borderWeak}` }}>{children}</div>}
    </div>
  )
}

const AGENDA_TABS = ['All', 'Inspections', 'Actions', 'Issues', 'Training']

export function HomeScreen() {
  const [activeTab, setActiveTab] = useState('All')
  const [todayOpen, setTodayOpen] = useState(true)
  const [overdueOpen, setOverdueOpen] = useState(false)
  const [upcomingOpen, setUpcomingOpen] = useState(false)
  const [nodateOpen, setNodeateOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.base }}>
      <div className="shrink-0 bg-white">
        <StatusBar />
        <div className="flex items-center justify-between" style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8 }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <div className="flex items-center justify-center rounded-[8px]" style={{ width: 30, height: 30, background: '#f1f1f1' }}>
              <span style={{ fontFamily: 'serif', fontSize: 13, fontWeight: 700, color: C.textDefault }}>SL</span>
            </div>
            <div className="flex items-center" style={{ gap: 4 }}>
              <span style={{ fontSize: 17, fontWeight: 600, lineHeight: '24px', color: '#000' }}>Southern Logistics</span>
              <ChevronDown size={16} color={C.textDefault} />
            </div>
          </div>
          <div className="flex items-center" style={{ gap: 12 }}>
            <Bell size={24} color={C.textDefault} />
            <div className="rounded-full overflow-hidden" style={{ width: 28, height: 28 }}>
              <img src={AVATAR_URL} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ padding: '16px 16px 30px' }}>
        <div className="flex flex-col" style={{ gap: 20 }}>
          <div className="flex" style={{ gap: 8 }}>
            <StatCard icon="training" number="4" label="Training" />
            <StatCard icon="issues" number="3" label="Issues" />
          </div>
          <div className="flex flex-col" style={{ gap: 8 }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: 8 }}>
                <span style={{ fontSize: 18, fontWeight: 600, lineHeight: '24px', color: C.textDefault }}>In progress</span>
                <CountBadge count={10} variant="accent" />
              </div>
              <button className="bg-transparent border-0 cursor-pointer font-medium" style={{ fontSize: 12, color: C.accentText }}>View all</button>
            </div>
            <div className="flex overflow-x-auto" style={{ gap: 8, paddingBottom: 4, scrollbarWidth: 'none' }}>
              <InspectionCard title="00101 / Ari Bautista / 5 Oct 2023 / Asset 5682 / Sydney Cafe" subtitle="F10 Food Safety Instructions" meta="Updated 12 days ago" />
              <InspectionCard title="0079 / Ari Bautista / 4 Oct 2023 / Site Sydney 03 / Sydney Cafe" subtitle="Site Audit" meta="Updated 14 days ago" />
            </div>
          </div>
          <div className="flex flex-col" style={{ gap: 8 }}>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 18, fontWeight: 600, lineHeight: '24px', color: C.textDefault }}>Agenda</span>
              <button className="bg-transparent border-0 cursor-pointer font-medium" style={{ fontSize: 12, color: C.accentText }}>View all</button>
            </div>
            <div className="flex" style={{ gap: 8 }}>
              {AGENDA_TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className="rounded-full border-0 cursor-pointer font-medium whitespace-nowrap" style={{ fontSize: 12, lineHeight: '16px', paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6, background: activeTab === tab ? C.accentBg : 'white', color: activeTab === tab ? C.accentText : C.textWeaker, border: `1px solid ${activeTab === tab ? C.accentText : C.borderWeak}` }}>{tab}</button>
              ))}
            </div>
            <div className="bg-white rounded-[12px] flex flex-col" style={{ border: `1px solid ${C.borderWeak}`, paddingLeft: 16, paddingRight: 16 }}>
              <AccordionSection icon={<AlertCircle size={18} color={C.negText} />} label="Overdue" count={3} countVariant="negative" expanded={overdueOpen} onToggle={() => setOverdueOpen(o => !o)} />
              <div style={{ borderTop: `1px solid ${C.borderWeak}` }} />
              <AccordionSection icon={<Clock size={18} color={C.warnText} />} label="Today" count={6} countVariant="warning" expanded={todayOpen} onToggle={() => setTodayOpen(o => !o)}>
                <div className="flex flex-col">
                  <AgendaItem type="scheduled-inspection" title="Food and safety 101" meta={<span>Due in 6 hours &nbsp;·&nbsp; <MapPin size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> Site Name</span>} badge={{ label: 'To do', variant: 'warning' }} />
                  <div style={{ borderTop: `1px solid ${C.borderWeak}` }} />
                  <AgendaItem type="inspection" title="Food and safety 101" meta={<span>Due in 6 hours &nbsp;·&nbsp; <MapPin size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> Site Name</span>} badge={{ label: 'Pending approval', variant: 'neutral' }} />
                  <div style={{ borderTop: `1px solid ${C.borderWeak}` }} />
                  <AgendaItem type="action" code="WB-21231" title="Tidy up bottom floor cables" meta={<span>Dec 21 &nbsp;·&nbsp; <Flag size={10} style={{ display: 'inline', verticalAlign: 'middle' }} color={C.negText} /> <span style={{ color: C.negText }}>High</span> &nbsp;·&nbsp; Surry Hills Office</span>} badge={{ label: 'To Do', variant: 'warning' }} />
                  <button className="bg-transparent border-0 cursor-pointer font-medium w-full text-center" style={{ fontSize: 12, color: C.accentText, paddingTop: 12, paddingBottom: 12 }}>View all 6 items</button>
                </div>
              </AccordionSection>
              <div style={{ borderTop: `1px solid ${C.borderWeak}` }} />
              <AccordionSection icon={<CheckCircle2 size={18} color={C.accentText} />} label="Upcoming" count={6} countVariant="accent" expanded={upcomingOpen} onToggle={() => setUpcomingOpen(o => !o)} />
              <div style={{ borderTop: `1px solid ${C.borderWeak}` }} />
              <AccordionSection icon={<Calendar size={18} color={C.accentText} />} label="No date" count={3} countVariant="neutral" expanded={nodateOpen} onToggle={() => setNodeateOpen(o => !o)} />
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 bg-white" style={{ boxShadow: '0px -4px 12px rgba(0,0,0,0.08)' }}>
        <div style={{ borderTop: `1px solid ${C.borderWeak}` }} />
        <div className="flex items-center" style={{ paddingTop: 8, paddingBottom: 3, paddingLeft: 8, paddingRight: 8 }}>
          {[
            { icon: <Home size={24} />, label: 'Home', active: true },
            { icon: <ClipboardList size={24} />, label: 'Inspections', active: false },
            { icon: <SquareCheck size={24} />, label: 'Actions', active: false },
            { icon: <GraduationCap size={24} />, label: 'Training', active: false },
            { icon: <Grid3X3 size={24} />, label: 'More', active: false },
          ].map(({ icon, label, active }) => (
            <div key={label} className="flex-1 flex flex-col items-center" style={{ gap: 4 }}>
              <div style={{ color: active ? C.accentText : C.textWeaker }}>{icon}</div>
              <span style={{ fontSize: 11, fontWeight: 500, lineHeight: '16px', color: active ? C.accentText : C.textWeaker }}>{label}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center" style={{ paddingTop: 4, paddingBottom: 8 }}>
          <div className="rounded-full bg-black opacity-40" style={{ width: 134, height: 5 }} />
        </div>
      </div>
    </div>
  )
}
