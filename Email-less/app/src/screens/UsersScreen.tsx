import { useState } from 'react'
import {
  Search, X, Plus, MoreHorizontal,
  Home, Bell, HelpCircle, Settings, ArrowUp,
  ClipboardList, SquareCheck, GraduationCap, Box,
  Calendar, Users, MapPin, Shield, ChevronRight,
  Download, SlidersHorizontal, ChevronLeft,
} from 'lucide-react'

// ── Tokens ────────────────────────────────────────────────────────────────────
const T = {
  base:             '#e9edf6',
  bgWeak:           '#f8f9fc',   // sidebar, seat cards, table header
  surface:          '#ffffff',
  accent:           '#6559ff',
  accentText:       '#4740d4',
  accentBg:         '#ecedfe',
  text:             '#1f2533',
  textWeak:         '#3f495a',
  textWeaker:       '#545f70',
  textWeakest:      '#828ea0',
  border:           '#bfc6d4',
  borderWeak:       '#e0e5f0',
  positiveBg:       '#e8fcf5',
  positiveText:     '#007a52',
}

// ── Avatar colours ────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  { bg: '#dbeafe', text: '#1e40af' },
  { bg: '#fce7f3', text: '#9d174d' },
  { bg: '#d1fae5', text: '#065f46' },
  { bg: '#ede9fe', text: '#5b21b6' },
  { bg: '#fef3c7', text: '#92400e' },
  { bg: '#fee2e2', text: '#991b1b' },
  { bg: '#e0f2fe', text: '#0369a1' },
  { bg: '#f0fdf4', text: '#14532d' },
  { bg: '#fef9c3', text: '#713f12' },
  { bg: '#f3e8ff', text: '#6b21a8' },
  { bg: '#fff7ed', text: '#9a3412' },
  { bg: '#ecfdf5', text: '#065f46' },
]

// ── Mock data ─────────────────────────────────────────────────────────────────
const ALL_USERS = [
  { id: 1,  name: 'Anne Law',        username: '113413413', permission: 'Administrator', seat: 'Full',  lastSeen: 'Unknown' },
  { id: 2,  name: 'Rosalie Reeves',  username: '113413413', permission: 'Basic',         seat: 'Full',  lastSeen: 'Unknown' },
  { id: 3,  name: 'Felix Wilkins',   username: '113413413', permission: 'Guest',         seat: 'Full',  lastSeen: 'Unknown' },
  { id: 4,  name: 'Rico Caldwell',   username: '113413413', permission: 'Basic',         seat: 'Full',  lastSeen: 'Unknown' },
  { id: 5,  name: 'Aiza Shaw',       username: '113413413', permission: 'Basic',         seat: 'Full',  lastSeen: 'Unknown' },
  { id: 6,  name: 'Stevie Terrell',  username: '113413413', permission: 'Guest',         seat: 'Full',  lastSeen: 'Unknown' },
  { id: 7,  name: 'Zarah Bush',      username: '113413413', permission: 'Guest',         seat: 'Full',  lastSeen: 'Unknown' },
  { id: 8,  name: 'Katrina Connor',  username: '113413413', permission: 'Basic',         seat: 'Full',  lastSeen: 'Unknown' },
  { id: 9,  name: 'Blake Thompson',  username: '113413414', permission: 'Basic',         seat: 'Lite',  lastSeen: 'Unknown' },
  { id: 10, name: 'Casey Liu',       username: '113413415', permission: 'Basic',         seat: 'Lite',  lastSeen: 'Unknown' },
  { id: 11, name: 'Diego Martinez',  username: '113413416', permission: 'Basic',         seat: 'Full',  lastSeen: 'Unknown' },
  { id: 12, name: 'Emma Kim',        username: '113413417', permission: 'Basic',         seat: 'Lite',  lastSeen: 'Unknown' },
]

const TABS = ['Users', 'Groups', 'Sites', 'Companies', 'Permissions', 'Credentials']

const NAV_ITEMS = [
  { icon: <Home size={18} />,        label: 'Home' },
  { icon: <Search size={18} />,      label: 'Search' },
  { icon: <Bell size={18} />,        label: 'Notifications' },
]
const NAV_ITEMS_2 = [
  { icon: <ClipboardList size={18} />, label: 'Templates' },
  { icon: <ClipboardList size={18} />, label: 'Inspections' },
  { icon: <Calendar size={18} />,      label: 'Schedule' },
  { icon: <SquareCheck size={18} />,   label: 'Actions' },
  { icon: <Box size={18} />,           label: 'Assets' },
  { icon: <Shield size={18} />,        label: 'Issues' },
  { icon: <Bell size={18} />,          label: 'Heads up' },
  { icon: <GraduationCap size={18} />, label: 'Training' },
  { icon: <MapPin size={18} />,        label: 'Sensors' },
  { icon: <SlidersHorizontal size={18} />, label: 'Analytics' },
  { icon: <Users size={18} />,         label: 'Marketplace' },
]

// ── Sub-components ────────────────────────────────────────────────────────────
function initials(name: string) {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
}

function Avatar({ name, index }: { name: string; index: number }) {
  const c = AVATAR_COLORS[index % AVATAR_COLORS.length]
  return (
    <div
      className="shrink-0 rounded-full flex items-center justify-center font-semibold select-none"
      style={{ width: 32, height: 32, background: c.bg, color: c.text, fontSize: 12, letterSpacing: 0.3 }}
    >
      {initials(name)}
    </div>
  )
}

function NavButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="w-full flex items-center gap-2.5 bg-transparent border-0 cursor-pointer rounded-md text-left transition-colors"
      style={{ padding: '9px 12px', fontSize: 14, color: T.textWeak, fontWeight: 400 }}
      onMouseEnter={e => (e.currentTarget.style.background = T.base)}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <span style={{ color: T.textWeakest, display: 'flex' }}>{icon}</span>
      {label}
    </button>
  )
}

function SeatCard({ label, value, used, total, unlimited = false }: {
  label: string; value?: string; used: string; total?: string; unlimited?: boolean
}) {
  return (
    <div
      className="flex flex-col"
      style={{
        flex: '1 1 0', maxWidth: 300,
        background: T.bgWeak,
        border: `1px solid ${T.border}`,
        borderRadius: 4,
        padding: 12,
        gap: 8,
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 500, color: T.textWeak }}>{label}</span>
      <div className="flex items-end justify-between">
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: T.text, lineHeight: '30px' }}>
            {unlimited ? 'Unlimited' : value}
          </div>
          <div style={{ fontSize: 12, color: T.textWeakest, marginTop: 2 }}>Available</div>
        </div>
        <div className="text-right" style={{ paddingBottom: 2 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: T.textWeak }}>{used} used</div>
          {total && <div style={{ fontSize: 12, color: T.textWeakest }}>{total} total</div>}
        </div>
      </div>
    </div>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export function UsersScreen() {
  const [activeTab, setActiveTab]       = useState('Users')
  const [search, setSearch]             = useState('')
  const [filterActive, setFilterActive] = useState(true)
  const [selected, setSelected]         = useState<number[]>([])
  const [page, setPage]                 = useState(1)
  const TOTAL_PAGES = 10

  const filtered = filterActive
    ? ALL_USERS.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.username.includes(search)
      )
    : ALL_USERS

  const allSelected = filtered.length > 0 && filtered.every(u => selected.includes(u.id))

  function toggleAll() {
    setSelected(allSelected ? [] : filtered.map(u => u.id))
  }
  function toggleRow(id: number) {
    setSelected(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])
  }

  return (
    <div className="flex overflow-hidden" style={{ height: '100dvh' }}>

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside
        className="shrink-0 flex flex-col h-full overflow-hidden"
        style={{ width: 220, background: T.bgWeak, borderRight: `1px solid ${T.borderWeak}` }}
      >
        {/* Logo */}
        <div style={{ padding: '14px 16px 12px', borderBottom: `1px solid ${T.borderWeak}` }}>
          <SCLogo />
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto" style={{ padding: '8px 8px 0' }}>
          {NAV_ITEMS.map(n => <NavButton key={n.label} {...n} />)}
          <div style={{ height: 1, background: T.borderWeak, margin: '8px 4px' }} />
          {NAV_ITEMS_2.map(n => <NavButton key={n.label} {...n} />)}
        </nav>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${T.borderWeak}`, padding: '4px 8px 8px' }}>
          <button
            className="w-full flex items-center justify-between bg-transparent border-0 cursor-pointer rounded-md"
            style={{ padding: '9px 12px', fontSize: 14, color: T.textWeak }}
            onMouseEnter={e => (e.currentTarget.style.background = T.base)}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle size={18} style={{ color: T.textWeakest }} />
              <span>Help</span>
            </div>
            <ChevronRight size={14} style={{ color: T.textWeakest }} />
          </button>
          <button
            className="w-full flex items-center justify-between bg-transparent border-0 cursor-pointer rounded-md"
            style={{ padding: '9px 12px', fontSize: 14, color: T.textWeak }}
            onMouseEnter={e => (e.currentTarget.style.background = T.base)}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div className="flex items-center gap-2.5">
              <Settings size={18} style={{ color: T.textWeakest }} />
              <div className="text-left">
                <div style={{ fontSize: 13, fontWeight: 500, color: T.text, lineHeight: '18px' }}>Company</div>
                <div style={{ fontSize: 12, color: T.textWeakest, lineHeight: '16px' }}>Bob Dylan</div>
              </div>
            </div>
            <ChevronRight size={14} style={{ color: T.textWeakest }} />
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden" style={{ background: T.surface }}>

        {/* Tab bar */}
        <div
          className="shrink-0 flex items-end"
          style={{ paddingLeft: 24, borderBottom: `1px solid ${T.borderWeak}`, background: T.surface }}
        >
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="bg-transparent border-0 cursor-pointer whitespace-nowrap"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: activeTab === tab ? T.accentText : T.textWeak,
                padding: '12px 14px 10px',
                borderBottom: `2px solid ${activeTab === tab ? T.accent : 'transparent'}`,
                marginBottom: -1,
                transition: 'color 0.12s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto" style={{ background: T.base, padding: '24px 28px 40px' }}>

          {/* Page header */}
          <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: T.text, letterSpacing: '-0.5px', margin: 0 }}>
              Users
            </h1>
            <div className="flex items-center" style={{ gap: 8 }}>
              <button
                className="flex items-center rounded-lg"
                style={{ gap: 6, padding: '7px 14px', fontSize: 13, fontWeight: 500, color: T.textWeak, border: `1px solid ${T.border}`, background: T.surface, cursor: 'pointer' }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M2 8h12M8 2v12M4.5 4.5l7 7M11.5 4.5l-7 7" />
                </svg>
                Manage invites
              </button>
              <button
                className="flex items-center rounded-lg"
                style={{ gap: 6, padding: '7px 14px', fontSize: 13, fontWeight: 600, color: '#fff', background: T.accent, border: 'none', cursor: 'pointer' }}
              >
                <Plus size={14} />
                Add users
              </button>
              <button
                className="flex items-center justify-center rounded-lg"
                style={{ width: 34, height: 34, background: T.surface, border: `1px solid ${T.border}`, cursor: 'pointer', color: T.textWeak }}
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Seat cards */}
          <div className="flex" style={{ gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
            <SeatCard label="Full seats"  value="2141" used="858"  total="2,999" />
            <SeatCard label="Lite seats"  value="2972" used="27"   total="2,999" />
            <SeatCard label="Guest seats" unlimited    used="481" />
          </div>

          {/* Filter + table wrapper */}
          <div style={{ background: T.surface, border: `1px solid ${T.borderWeak}`, borderRadius: 8, overflow: 'hidden' }}>

            {/* Filter bar */}
            <div
              className="flex items-center justify-between"
              style={{ padding: '10px 14px', borderBottom: `1px solid ${T.borderWeak}` }}
            >
              <div className="flex items-center" style={{ gap: 8 }}>
                {/* Search */}
                <div
                  className="flex items-center rounded-lg"
                  style={{ gap: 8, padding: '6px 10px', border: `1px solid ${T.border}`, background: T.surface, minWidth: 200 }}
                >
                  <Search size={13} color={T.textWeakest} />
                  <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="bg-transparent border-0 outline-none flex-1"
                    style={{ fontSize: 13, color: T.text, fontFamily: 'inherit' }}
                  />
                </div>

                {/* Filter chip */}
                {filterActive && (
                  <div
                    className="flex items-center rounded-lg"
                    style={{ gap: 6, padding: '5px 10px', border: `1px solid ${T.border}`, background: T.surface, fontSize: 13, fontWeight: 500, color: T.text }}
                  >
                    Email-less users
                    <button
                      onClick={() => { setFilterActive(false); setSearch('') }}
                      className="flex items-center justify-center bg-transparent border-0 cursor-pointer rounded"
                      style={{ padding: 1, color: T.textWeaker, lineHeight: 0 }}
                      aria-label="Remove filter"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}

                <button
                  className="flex items-center bg-transparent border-0 cursor-pointer"
                  style={{ gap: 4, fontSize: 13, fontWeight: 500, color: T.accentText, padding: '5px 2px', whiteSpace: 'nowrap' }}
                >
                  <Plus size={13} />
                  Add Filter
                </button>
              </div>

              {/* Result count + actions */}
              <div className="flex items-center" style={{ gap: 8 }}>
                <span style={{ fontSize: 13, color: T.textWeaker, whiteSpace: 'nowrap' }}>
                  1–{filtered.length} of 150,000 results
                </span>
                <button className="bg-transparent border-0 cursor-pointer" style={{ color: T.textWeakest, lineHeight: 0, padding: 2 }}>
                  <MoreHorizontal size={16} />
                </button>
                <button className="bg-transparent border-0 cursor-pointer" style={{ color: T.textWeakest, lineHeight: 0, padding: 2 }}>
                  <Download size={16} />
                </button>
              </div>
            </div>

            {/* Table header */}
            <div
              className="flex items-center"
              style={{ padding: '0 14px', height: 44, background: T.bgWeak, borderBottom: `1px solid ${T.borderWeak}` }}
            >
              <div style={{ width: 36, display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  style={{ width: 16, height: 16, cursor: 'pointer', accentColor: T.accent }}
                />
              </div>
              <div
                className="flex-1 flex items-center"
                style={{ gap: 4, fontSize: 13, fontWeight: 600, color: T.textWeak, cursor: 'pointer', userSelect: 'none' }}
              >
                Name
                <ArrowUp size={12} color={T.accent} />
              </div>
              <div style={{ width: 200, fontSize: 13, fontWeight: 600, color: T.textWeak }}>Permission set</div>
              <div style={{ width: 110, fontSize: 13, fontWeight: 600, color: T.textWeak }}>Seat type</div>
              <div style={{ width: 100, fontSize: 13, fontWeight: 600, color: T.textWeak }}>Status</div>
              <div style={{ width: 120, fontSize: 13, fontWeight: 600, color: T.textWeak }}>Last seen</div>
              <div style={{ width: 28 }} />
            </div>

            {/* Rows */}
            {filtered.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center"
                style={{ padding: '48px 24px', color: T.textWeaker, gap: 8 }}
              >
                <Users size={32} color={T.border} />
                <span style={{ fontSize: 14, fontWeight: 500, color: T.textWeak }}>No users found</span>
                <span style={{ fontSize: 13, color: T.textWeakest }}>
                  {search ? `No results for "${search}"` : 'No email-less users in this organisation'}
                </span>
              </div>
            ) : (
              filtered.map((user, idx) => {
                const isSelected = selected.includes(user.id)
                return (
                  <div
                    key={user.id}
                    className="flex items-center group"
                    style={{
                      padding: '0 14px',
                      height: 48,
                      borderBottom: idx < filtered.length - 1 ? `1px solid ${T.borderWeak}` : 'none',
                      background: isSelected ? '#f5f4ff' : T.surface,
                      transition: 'background 0.1s',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = T.bgWeak }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isSelected ? '#f5f4ff' : T.surface }}
                  >
                    <div style={{ width: 36, display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(user.id)}
                        style={{ width: 16, height: 16, cursor: 'pointer', accentColor: T.accent }}
                      />
                    </div>
                    <div className="flex-1 flex items-center" style={{ gap: 10, minWidth: 0 }}>
                      <Avatar name={user.name} index={idx} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, color: T.text, lineHeight: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {user.name}
                        </div>
                        <div style={{ fontSize: 12, color: T.textWeaker, lineHeight: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {user.username}
                        </div>
                      </div>
                    </div>
                    <div style={{ width: 200, fontSize: 13, color: T.textWeak, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.permission}
                    </div>
                    <div style={{ width: 110, fontSize: 13, color: T.textWeak }}>
                      {user.seat}
                    </div>
                    <div style={{ width: 100 }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 10px',
                          fontSize: 12,
                          fontWeight: 500,
                          color: T.positiveText,
                          background: T.positiveBg,
                          borderRadius: 999,
                          lineHeight: '18px',
                        }}
                      >
                        Active
                      </span>
                    </div>
                    <div style={{ width: 120, fontSize: 13, color: T.textWeaker }}>
                      {user.lastSeen}
                    </div>
                    <div style={{ width: 28, display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        className="bg-transparent border-0 cursor-pointer rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: T.textWeaker, padding: 2, lineHeight: 0 }}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                )
              })
            )}

            {/* Pagination */}
            <div
              className="flex items-center justify-end"
              style={{ padding: '10px 14px', borderTop: `1px solid ${T.borderWeak}`, gap: 8 }}
            >
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center justify-center rounded-md border bg-transparent cursor-pointer transition-colors"
                style={{ width: 28, height: 28, border: `1px solid ${T.border}`, color: page === 1 ? T.textWeakest : T.textWeak, background: T.surface }}
              >
                <ChevronLeft size={14} />
              </button>
              <div
                className="flex items-center justify-center rounded-md border"
                style={{ width: 36, height: 28, border: `1px solid ${T.border}`, fontSize: 13, fontWeight: 500, color: T.text, background: T.surface }}
              >
                {page}
              </div>
              <span style={{ fontSize: 13, color: T.textWeaker }}>/ {TOTAL_PAGES}</span>
              <button
                onClick={() => setPage(p => Math.min(TOTAL_PAGES, p + 1))}
                disabled={page === TOTAL_PAGES}
                className="flex items-center justify-center rounded-md border bg-transparent cursor-pointer transition-colors"
                style={{ width: 28, height: 28, border: `1px solid ${T.border}`, color: page === TOTAL_PAGES ? T.textWeakest : T.textWeak, background: T.surface }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── SafetyCulture wordmark ────────────────────────────────────────────────────
function SCLogo() {
  return (
    <svg width="140" height="24" viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* SC mark */}
      <rect x="0" y="0" width="22" height="22" rx="4" fill="#1f2533" />
      <path
        d="M6 14.5c0-1.2.9-2 2.2-2 .8 0 1.5.3 2 .8l1-1.1C10.4 11.4 9.4 11 8.2 11 6 11 4.5 12.5 4.5 14.5s1.5 3.5 3.7 3.5c1.2 0 2.2-.5 2.9-1.2l-1-1.1c-.5.5-1.1.8-1.9.8C6.9 16.5 6 15.7 6 14.5zm7.5 3.3h1.5v-4.7h2V12h-5.5v1.1h2v4.7z"
        fill="white"
      />
      {/* Wordmark */}
      <text
        x="28"
        y="16"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 15, fontWeight: 700, fill: '#1f2533', letterSpacing: '-0.3px' }}
      >
        SafetyCulture
      </text>
    </svg>
  )
}
