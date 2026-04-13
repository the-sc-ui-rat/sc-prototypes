import { useState } from 'react'
import {
  Home, Search, Bell, FileText, ClipboardList, Calendar,
  CheckSquare, GraduationCap, Box, BookOpen, FileIcon,
  AlertCircle, Triangle, UserCircle, Megaphone, Radio,
  ShoppingBag, BarChart2, HelpCircle, Settings,
  ChevronDown, ChevronRight, Copy, Check, Download,
} from 'lucide-react'

// ── Design tokens (from Figma variable defs) ──────────────────────────────
const T = {
  bgDefault:       '#e9edf6',  // Background -> Default
  bgWeak:          '#f8f9fc',  // Background -> Weak
  surfaceBg:       '#ffffff',  // Surface/Background -> Default
  surfaceBgDisabled: '#f8f9fc',// Surface/Background -> Disabled
  surfaceBorderDisabled: '#e9edf6', // Surface/Border -> Disabled
  textDefault:     '#1f2533',  // Surface/Text -> Default
  textWeak:        '#3f495a',  // Surface/Text -> Weak (nav)
  textWeaker:      '#545f70',  // Surface/Text -> Weaker
  accentText:      '#4740d4',  // Accent/Text -> Default
  accentBg:        '#675df4',  // Accent/Background -> Default
  accentOnBg:      '#ffffff',  // Accent/Text -> On Default
  border:          '#bfc6d4',  // Surface/Border -> Default
}

const SHADOW_SMALL = '0px 4px 12px rgba(0,0,0,0.122), 0px 2px 2px rgba(0,0,0,0.059)'
const INVITE_URL   = 'https://app-two-vert.vercel.app/?flow=invite'
const ORG_ID       = '93463472'
const QR_URL       = `https://api.qrserver.com/v1/create-qr-code/?size=113x113&data=${encodeURIComponent(INVITE_URL)}`

const TABS = ['Global settings', 'Features', 'Activity log', 'Security', 'SafetyCulture AI', 'Login']

type NavItem = { icon: React.ReactNode; label: string } | 'divider'
const NAV_ITEMS: NavItem[] = [
  { icon: <Home size={21} />,          label: 'Home' },
  { icon: <Search size={21} />,        label: 'Search' },
  { icon: <Bell size={21} />,          label: 'Notifications' },
  'divider',
  { icon: <FileText size={21} />,      label: 'Templates' },
  { icon: <ClipboardList size={21} />, label: 'Inspections' },
  { icon: <Calendar size={21} />,      label: 'Schedules' },
  { icon: <CheckSquare size={21} />,   label: 'Actions' },
  { icon: <GraduationCap size={21} />, label: 'Training' },
  { icon: <Box size={21} />,           label: 'Assets' },
  { icon: <BookOpen size={21} />,      label: 'Library' },
  { icon: <FileIcon size={21} />,      label: 'Documents' },
  { icon: <AlertCircle size={21} />,   label: 'Issues' },
  { icon: <Triangle size={21} />,      label: 'Investigations' },
  { icon: <UserCircle size={21} />,    label: 'Lone Worker' },
  { icon: <Megaphone size={21} />,     label: 'Heads Up' },
  { icon: <Radio size={21} />,         label: 'Sensors' },
  { icon: <ShoppingBag size={21} />,   label: 'Marketplace' },
  'divider',
  { icon: <BarChart2 size={21} />,     label: 'Analytics' },
]

export function AdminSettingsScreen(_props?: { onToggle?: () => void }) {
  const [enabled, setEnabled]   = useState(false)
  const [copied, setCopied]     = useState(false)
  const [copiedId, setCopiedId] = useState(false)

  function handleCopyLink() {
    navigator.clipboard.writeText(INVITE_URL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  function handleCopyId() {
    navigator.clipboard.writeText(ORG_ID).then(() => {
      setCopiedId(true)
      setTimeout(() => setCopiedId(false), 1800)
    })
  }

  return (
    <div
      className="flex h-[100dvh] overflow-hidden"
      style={{ background: T.bgDefault, fontFamily: "'Noto Sans', sans-serif" }}
    >

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col shrink-0 overflow-y-auto"
        style={{ width: 220, background: T.bgWeak, borderRight: `1px solid ${T.border}` }}
      >
        {/* Org switcher */}
        <div className="flex items-center shrink-0"
          style={{ paddingLeft: 16, paddingRight: 12, paddingTop: 28, paddingBottom: 8 }}>
          <div className="shrink-0 flex items-center justify-center rounded-[8px]"
            style={{ width: 40, height: 40, background: '#fff', border: `1px solid ${T.border}`, fontSize: 13, fontWeight: 700, color: T.textDefault }}>
            SC
          </div>
          <div className="flex-1 min-w-0 truncate"
            style={{ paddingLeft: 8, fontSize: 16, fontWeight: 500, lineHeight: '24px', color: T.textDefault }}>
            SC Playground
          </div>
          <div className="flex items-center justify-center shrink-0 rounded-[8px] cursor-pointer"
            style={{ width: 32, height: 32 }}>
            <ChevronDown size={18} color={T.textWeak} />
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto" style={{ background: T.bgWeak }}>
          {NAV_ITEMS.map((item, i) => {
            if (item === 'divider') {
              return (
                <div key={i} style={{ paddingLeft: 23.2, paddingRight: 23.2, paddingTop: 16, paddingBottom: 16 }}>
                  <div style={{ height: 1, background: T.border }} />
                </div>
              )
            }
            return (
              <div key={item.label} className="flex items-center cursor-pointer"
                style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 }}>
                <div className="flex items-center justify-center shrink-0"
                  style={{ width: 40, height: 32, paddingRight: 8 }}>
                  <span style={{ color: T.textWeak }}>{item.icon}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '32px', letterSpacing: '0.4px', color: T.textWeak, whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="shrink-0" style={{ background: T.bgWeak }}>
          <div style={{ height: 17, borderTop: `1px solid ${T.border}` }} />
          <div className="flex items-center justify-between cursor-pointer"
            style={{ height: 48, paddingLeft: 12, paddingRight: 12 }}>
            <div className="flex items-center">
              <div style={{ paddingLeft: 10, paddingRight: 12, paddingBottom: 2 }}>
                <HelpCircle size={22} color={T.textWeak} />
              </div>
              <span style={{ fontSize: 14, color: T.textWeak }}>Help</span>
            </div>
            <ChevronRight size={21} color={T.textWeak} />
          </div>
          <div className="flex items-center justify-between cursor-pointer"
            style={{ height: 64, paddingLeft: 12, paddingRight: 12, paddingBottom: 12 }}>
            <div className="flex items-center">
              <div style={{ paddingLeft: 10, paddingRight: 12, paddingBottom: 2 }}>
                <Settings size={22} color={T.textWeak} />
              </div>
              <div className="flex flex-col">
                <span style={{ fontSize: 14, color: T.textWeak }}>SC Playground</span>
                <span style={{ fontSize: 14, color: T.textWeak }}>Josh Rat</span>
              </div>
            </div>
            <ChevronRight size={21} color={T.textWeak} />
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <main className="flex-1 min-w-0 overflow-y-auto" style={{ background: T.bgDefault }}>
        <div style={{ height: 64 }} />

        <div className="flex flex-col" style={{ gap: 24, paddingLeft: 64, paddingRight: 64, paddingBottom: 48 }}>

          {/* Heading */}
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: '36px', letterSpacing: '-0.75px', color: T.textDefault }}>
            Organization settings
          </h1>

          {/* Tab bar */}
          <div style={{ borderBottom: `1px solid ${T.border}` }}>
            <div className="flex overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {TABS.map(tab => {
                const active = tab === 'Login'
                return (
                  <button key={tab}
                    className="shrink-0 bg-transparent border-0 cursor-pointer whitespace-nowrap"
                    style={{
                      fontSize: 14, fontWeight: 500, lineHeight: '20px',
                      color: active ? T.accentText : T.textWeak,
                      padding: '8px 12px 12px',
                      borderBottom: active ? `2px solid ${T.accentText}` : '2px solid transparent',
                      marginBottom: -1,
                    }}>
                    {tab}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── List-item-exposed card ───────────────────────────────────── */}
          {/* Figma: bg white, rounded-12, gap-12, no shadow on outer card */}
          <div
            className="flex flex-col"
            style={{
              background: T.surfaceBg,
              borderRadius: 12,
              boxShadow: SHADOW_SMALL,
              gap: 0,
            }}
          >

            {/* List item row — same as screen 1 but toggle flips */}
            <div className="flex items-start justify-between"
              style={{ padding: '16px 20px', gap: 16 }}>
              <div className="flex flex-col min-w-0" style={{ gap: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', color: T.textDefault }}>
                  Log in without email
                </span>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 400, lineHeight: '16px', color: T.textWeaker }}>
                  Enable login without an email address. Perfect for shared devices and frontline workers.{' '}
                  <span style={{ color: T.accentText, cursor: 'pointer' }}>
                    Learn more about email-less login
                  </span>
                </p>
              </div>

              {/* Toggle — off: grey thumb-left / on: accent thumb-right */}
              <button
                onClick={() => setEnabled(v => !v)}
                role="switch"
                aria-checked={enabled}
                aria-label="Enable login without email"
                className="shrink-0 cursor-pointer border-0 p-0"
                style={{ background: 'transparent' }}
              >
                <div
                  className="relative rounded-full transition-colors duration-200"
                  style={{ width: 44, height: 26, background: enabled ? T.accentBg : T.border }}
                >
                  <div
                    className="absolute rounded-full bg-white transition-transform duration-200"
                    style={{
                      width: 20, height: 20,
                      top: 3,
                      left: enabled ? 21 : 3,
                      boxShadow: '0px 1px 3px rgba(0,0,0,0.2)',
                    }}
                  />
                </div>
              </button>
            </div>

            {/* Expanded section — visible when enabled */}
            {enabled && (
              <div
                className="flex flex-col"
                style={{ padding: 12, gap: 24, borderTop: `1px solid ${T.border}` }}
              >

                {/* Org ID form field */}
                <div className="flex flex-col" style={{ gap: 4 }}>
                  {/* Label — Label/Medium: 14px Medium */}
                  <label style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: T.textDefault }}>
                    Organisation ID
                  </label>
                  {/* Input row */}
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      disabled
                      value={ORG_ID}
                      style={{
                        width: '100%',
                        height: 40,
                        paddingLeft: 12,
                        paddingRight: 40,
                        fontSize: 14,
                        lineHeight: '20px',
                        color: T.textWeaker,
                        background: T.surfaceBgDisabled,
                        border: `1px solid ${T.surfaceBorderDisabled}`,
                        borderRadius: 8,
                        outline: 'none',
                        boxSizing: 'border-box',
                        cursor: 'default',
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleCopyId}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 bg-transparent border-0 cursor-pointer transition-colors duration-100"
                      style={{ color: copiedId ? T.accentText : T.textWeaker }}
                      aria-label="Copy organisation ID"
                    >
                      {copiedId ? <Check size={15} strokeWidth={2.5} /> : <Copy size={15} strokeWidth={1.8} />}
                    </button>
                  </div>
                  {/* Help text — Body/xSmall: 12px Regular, lineHeight 16px */}
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 400, lineHeight: '16px', color: T.textWeaker }}>
                    Share this ID with staff who log in without an email address — they'll enter it on the login screen.
                  </p>
                </div>

                {/* Share card — bg white, border, rounded-large (16), p-[space-3=12], overflow-clip */}
                <div
                  style={{
                    background: T.surfaceBg,
                    border: `1px solid ${T.border}`,
                    borderRadius: 16,
                    padding: 12,
                    overflow: 'hidden',
                  }}
                >
                  {/* Section row: gap-[space-2=8] between left content and QR */}
                  <div className="flex items-start" style={{ gap: 8 }}>

                    {/* Left col: flex-1, justify-between, self-stretch — title/URL/buttons spaced evenly */}
                    <div
                      className="flex flex-col flex-1 min-w-0 items-start justify-between"
                      style={{ alignSelf: 'stretch', minHeight: 1 }}
                    >
                      {/* Title — Label/Large: 16px Medium */}
                      <p style={{ margin: 0, fontSize: 16, fontWeight: 500, lineHeight: '24px', color: T.textDefault }}>
                        Share login with your users
                      </p>
                      {/* URL — Body/Small: 14px Regular, #545f70 */}
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 400, lineHeight: '20px', color: T.textWeaker, wordBreak: 'break-all' }}>
                        {INVITE_URL}
                      </p>
                      {/* Buttons — gap-[space-3=12], items-start */}
                      <div className="flex items-start" style={{ gap: 12 }}>
                        {/* Copy link — primary */}
                        <button
                          onClick={handleCopyLink}
                          className="flex items-center cursor-pointer border-0 transition-colors duration-100"
                          style={{
                            height: 36,
                            paddingLeft: 12, paddingRight: 12,
                            gap: 6,
                            borderRadius: 8,
                            background: T.accentBg,
                            color: T.accentOnBg,
                            fontSize: 14, fontWeight: 500, lineHeight: '20px',
                          }}
                        >
                          {copied
                            ? <><Check size={16} strokeWidth={2.5} /> Copied!</>
                            : <><Copy size={16} strokeWidth={1.8} /> Copy link</>
                          }
                        </button>
                        {/* Download QR code — secondary */}
                        <button
                          onClick={() => window.open(QR_URL, '_blank')}
                          className="flex items-center cursor-pointer transition-colors duration-100"
                          style={{
                            height: 36,
                            paddingLeft: 12, paddingRight: 12,
                            gap: 6,
                            borderRadius: 8,
                            background: T.surfaceBg,
                            color: T.accentText,
                            border: `1px solid ${T.border}`,
                            fontSize: 14, fontWeight: 500, lineHeight: '20px',
                          }}
                        >
                          <Download size={16} strokeWidth={1.8} />
                          Download QR code
                        </button>
                      </div>
                    </div>

                    {/* QR code — 113×114 rounded-16 */}
                    <img
                      src={QR_URL}
                      alt="Login QR code"
                      style={{ width: 113, height: 114, borderRadius: 16, flexShrink: 0 }}
                    />

                  </div>
                </div>

                {/* MDM link — Label/Medium: 14px Medium, accent */}
                <p
                  style={{ margin: 0, fontSize: 14, fontWeight: 500, lineHeight: '20px', color: T.accentText, cursor: 'pointer' }}
                >
                  Learn how to deploy this login link to devices via MDM
                </p>

              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  )
}
