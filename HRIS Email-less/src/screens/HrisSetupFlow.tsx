import { useState } from 'react'
import {
  Check, Lock, Pencil, ChevronDown,
  Home, Bell, HelpCircle, Settings, Search,
  ClipboardList, Calendar, SquareCheck, GraduationCap,
  Box, Shield, MapPin, Users, SlidersHorizontal,
  ArrowLeft, Play, Plus, X,
} from 'lucide-react'

const T = {
  base: '#e9edf6',
  bgWeak: '#f8f9fc',
  surface: '#ffffff',
  accent: '#6559ff',
  accentText: '#4740d4',
  accentBg: '#675df4',
  text: '#1f2533',
  textWeak: '#3f495a',
  textWeaker: '#545f70',
  textWeakest: '#828ea0',
  border: '#bfc6d4',
  borderWeak: '#e0e5f0',
}

const PROVIDERS = [
  { id: 'mock',           name: 'Mock HRIS (Dev)',       desc: 'A mock HRIS provider for development and testing. No real credentials required.' },
  { id: '7shifts',        name: '7shifts',               desc: 'Automatically sync employees from 7shifts into SafetyCulture.' },
  { id: 'adp',            name: 'ADP Workforce Now',     desc: 'Automatically sync employees from ADP Workforce Now into SafetyCulture.' },
  { id: 'bamboohr',       name: 'BambooHR',              desc: 'Automatically sync employees from BambooHR into SafetyCulture.' },
  { id: 'dayforce',       name: 'Dayforce',              desc: 'Automatically sync employees from Dayforce into SafetyCulture.' },
  { id: 'employmenthero', name: 'Employment Hero',       desc: 'Automatically sync employees from Employment Hero into SafetyCulture.' },
  { id: 'hibob',          name: 'HiBob',                 desc: 'Automatically sync employees from HiBob into SafetyCulture.' },
  { id: 'oracle',         name: 'Oracle Cloud HCM',      desc: 'Automatically sync employees from Oracle Cloud HCM into SafetyCulture.' },
  { id: 'sap',            name: 'SAP SuccessFactors',    desc: 'Automatically sync employees from SAP SuccessFactors into SafetyCulture.' },
  { id: 'ukgpro',         name: 'UKG Pro',               desc: 'Automatically sync employees from UKG Pro into SafetyCulture.' },
  { id: 'ukgready',       name: 'UKG Ready',             desc: 'Automatically sync employees from UKG Ready into SafetyCulture.' },
  { id: 'workday',        name: 'Workday',               desc: 'Automatically sync employees from Workday into SafetyCulture.' },
]

const STEPS = [
  { id: 0, title: 'Connect to Mock HRIS',           desc: 'Authenticate with Mock HRIS so SafetyCulture can access your employee data.',          action: 'Connect Mock HRIS' },
  { id: 1, title: 'Select employees',               desc: 'Choose which employees to import using filter rules based on employee attributes.',     action: 'Save' },
  { id: 2, title: 'Map employee fields',            desc: 'Match Mock HRIS fields to SafetyCulture user fields.',                                  action: 'Done' },
  { id: 3, title: 'Select seat type and permissions', desc: 'Choose a default seat type and permission set for newly imported users.',             action: 'Done' },
  { id: 4, title: 'Review users',                   desc: 'Check the employee list before creating users in SafetyCulture.',                       action: 'Done' },
  { id: 5, title: 'Set up automatic sync',          desc: 'Set a daily time for SafetyCulture to sync and apply changes from your HR system.',     action: 'Save' },
]

const SIDEBAR_TOP = [
  { icon: <Home size={18} />,   label: 'Home' },
  { icon: <Search size={18} />, label: 'Search' },
  { icon: <Bell size={18} />,   label: 'Notifications' },
]
const SIDEBAR_NAV = [
  { icon: <ClipboardList size={18} />,   label: 'Templates' },
  { icon: <ClipboardList size={18} />,   label: 'Inspections' },
  { icon: <Calendar size={18} />,        label: 'Schedule' },
  { icon: <SquareCheck size={18} />,     label: 'Actions' },
  { icon: <Box size={18} />,             label: 'Assets' },
  { icon: <Shield size={18} />,          label: 'Issues' },
  { icon: <Bell size={18} />,            label: 'Heads Up' },
  { icon: <GraduationCap size={18} />,   label: 'Training' },
  { icon: <MapPin size={18} />,          label: 'Sensors' },
  { icon: <SlidersHorizontal size={18} />, label: 'Analytics' },
  { icon: <Users size={18} />,           label: 'Marketplace' },
]

type Page = 'list' | 'config'

export function HrisSetupFlow() {
  const [page, setPage] = useState<Page>('list')
  const [completed, setCompleted] = useState<Set<number>>(new Set())
  const [expanded, setExpanded] = useState<number | null>(0)

  function completeStep(step: number) {
    setCompleted(prev => new Set([...prev, step]))
    const next = step + 1
    setExpanded(next < STEPS.length ? next : null)
  }

  return page === 'list'
    ? <ProviderList onConnect={() => setPage('config')} />
    : <ConfigPage
        completed={completed}
        expanded={expanded}
        onExpand={setExpanded}
        onComplete={completeStep}
        onBack={() => { setPage('list'); setCompleted(new Set()); setExpanded(0) }}
      />
}

// ── Provider list ─────────────────────────────────────────────────────────────

function ProviderList({ onConnect }: { onConnect: () => void }) {
  return (
    <AppShell breadcrumb="Integrations / HRIS">
      <div style={{ padding: '32px 40px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: T.text, marginBottom: 6, letterSpacing: '-0.5px' }}>
          HR integrations
        </h1>
        <p style={{ fontSize: 14, color: T.textWeaker, marginBottom: 28, maxWidth: 540, lineHeight: '20px' }}>
          Connect your HR system to automatically create and update users in SafetyCulture.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))', gap: 16, maxWidth: 1040 }}>
          {PROVIDERS.map(p => (
            <ProviderCard key={p.id} provider={p} onConnect={p.id === 'mock' ? onConnect : undefined} />
          ))}
        </div>
      </div>
    </AppShell>
  )
}

function ProviderCard({ provider, onConnect }: { provider: typeof PROVIDERS[0]; onConnect?: () => void }) {
  const isMock = provider.id === 'mock'
  return (
    <div style={{ background: T.surface, border: `1px solid ${isMock ? T.accent : T.borderWeak}`, borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ width: 44, height: 44, borderRadius: 8, background: isMock ? '#eeecff' : T.base, border: `1px solid ${isMock ? '#c8c4fb' : T.borderWeak}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: isMock ? T.accentText : T.textWeaker, letterSpacing: 0.5 }}>
        {provider.name.slice(0, 2).toUpperCase()}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 4 }}>{provider.name}</div>
        <div style={{ fontSize: 13, color: T.textWeaker, lineHeight: '18px' }}>{provider.desc}</div>
      </div>
      <button
        onClick={onConnect}
        style={{ alignSelf: 'flex-start', padding: '7px 16px', fontSize: 13, fontWeight: 600, color: isMock ? '#fff' : T.textWeak, background: isMock ? T.accentBg : T.bgWeak, border: isMock ? 'none' : `1px solid ${T.border}`, borderRadius: 8, cursor: 'pointer' }}
      >
        Connect
      </button>
    </div>
  )
}

// ── Config page ───────────────────────────────────────────────────────────────

function ConfigPage({ completed, expanded, onExpand, onComplete, onBack }: {
  completed: Set<number>
  expanded: number | null
  onExpand: (n: number | null) => void
  onComplete: (n: number) => void
  onBack: () => void
}) {
  const allDone = completed.size === STEPS.length
  const pct = Math.round((completed.size / STEPS.length) * 100)

  return (
    <AppShell breadcrumb="Integrations / HRIS / Mock HRIS (Dev)">
      <div style={{ padding: '32px 40px', maxWidth: 800 }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: T.accentText, fontSize: 13, fontWeight: 500, marginBottom: 20, padding: 0 }}>
          <ArrowLeft size={14} /> Back to integrations
        </button>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 12, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: T.text, marginBottom: 4, letterSpacing: '-0.5px' }}>Mock HRIS (Dev)</h1>
            <p style={{ fontSize: 14, color: T.textWeaker }}>Sync employees from Mock HRIS into SafetyCulture automatically.</p>
          </div>
          {allDone && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, background: '#e8fcf5', color: '#007a52', fontSize: 13, fontWeight: 600 }}>
              <Check size={13} strokeWidth={2.5} /> Active
            </span>
          )}
        </div>

        {/* Progress card */}
        <div style={{ background: T.surface, border: `1px solid ${T.borderWeak}`, borderRadius: 10, padding: 20, marginBottom: 20 }}>
          {allDone ? (
            <p style={{ margin: 0, fontSize: 14, color: T.textWeaker }}>Last synced: <strong style={{ color: T.text }}>Today, 9:00 AM AEST</strong></p>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: T.text }}>{completed.size} of {STEPS.length} steps completed</span>
                <span style={{ fontSize: 13, color: T.textWeaker }}>{pct}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 999, background: T.base, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: T.accentBg, borderRadius: 999, transition: 'width 0.3s ease' }} />
              </div>
            </>
          )}
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {STEPS.map((step, i) => {
            const locked = i > 0 && !completed.has(i - 1)
            const done = completed.has(i)
            const isOpen = expanded === i
            return (
              <StepCard
                key={step.id}
                step={step}
                index={i}
                locked={locked}
                done={done}
                isOpen={isOpen}
                onToggle={() => !locked && onExpand(isOpen ? null : i)}
                onComplete={() => onComplete(i)}
              />
            )
          })}
        </div>

        {/* Run button */}
        <div style={{ marginTop: 24 }}>
          <button
            disabled={!allDone}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, color: allDone ? '#fff' : T.textWeakest, background: allDone ? T.accentBg : T.bgWeak, border: allDone ? 'none' : `1px solid ${T.border}`, borderRadius: 8, cursor: allDone ? 'pointer' : 'not-allowed' }}
          >
            <Play size={14} />
            {allDone ? 'View import history' : 'Run integration'}
          </button>
          {!allDone && <p style={{ fontSize: 12, color: T.textWeakest, marginTop: 6 }}>Complete all steps above to run the integration</p>}
        </div>
      </div>
    </AppShell>
  )
}

function StepCard({ step, index, locked, done, isOpen, onToggle, onComplete }: {
  step: typeof STEPS[0]; index: number; locked: boolean; done: boolean
  isOpen: boolean; onToggle: () => void; onComplete: () => void
}) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${isOpen ? T.accent : T.borderWeak}`, borderRadius: 10, overflow: 'hidden', opacity: locked ? 0.5 : 1, transition: 'border-color 0.15s' }}>
      <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', cursor: locked ? 'not-allowed' : 'pointer', gap: 14 }}>
        <StepBadge index={index} done={done} locked={locked} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.text }}>{step.title}</div>
          {!isOpen && <div style={{ fontSize: 13, color: T.textWeaker, marginTop: 2 }}>{step.desc}</div>}
        </div>
        <div style={{ flexShrink: 0 }}>
          {locked
            ? <Lock size={15} color={T.border} />
            : done
              ? <button onClick={e => { e.stopPropagation(); onToggle() }} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', fontSize: 13, fontWeight: 500, color: T.textWeak, background: T.bgWeak, border: `1px solid ${T.border}`, borderRadius: 8, cursor: 'pointer' }}>
                  <Pencil size={12} /> Edit
                </button>
              : <ChevronDown size={16} color={T.textWeaker} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
          }
        </div>
      </div>
      {isOpen && (
        <div style={{ padding: '0 20px 20px', borderTop: `1px solid ${T.borderWeak}` }}>
          <div style={{ paddingTop: 20 }}>
            {index === 0 && <ConnectContent />}
            {index === 1 && <SelectContent />}
            {index === 2 && <MapContent />}
            {index === 3 && <AssignContent />}
            {index === 4 && <ReviewContent />}
            {index === 5 && <ScheduleContent />}
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button onClick={onToggle} style={{ padding: '8px 16px', fontSize: 13, fontWeight: 500, color: T.textWeak, background: T.bgWeak, border: `1px solid ${T.border}`, borderRadius: 8, cursor: 'pointer' }}>Close</button>
              <button onClick={onComplete} style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, color: '#fff', background: T.accentBg, border: 'none', borderRadius: 8, cursor: 'pointer' }}>{step.action}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StepBadge({ index, done, locked }: { index: number; done: boolean; locked: boolean }) {
  return (
    <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? T.accentBg : T.base, border: done ? 'none' : `1.5px solid ${locked ? T.border : T.accentBg}`, fontSize: 11, fontWeight: 700, color: done ? '#fff' : locked ? T.border : T.accentText }}>
      {done ? <Check size={13} strokeWidth={2.5} /> : index + 1}
    </div>
  )
}

// ── Step content ──────────────────────────────────────────────────────────────

function ConnectContent() {
  return (
    <div>
      <p style={{ fontSize: 14, color: T.textWeaker, margin: '0 0 16px', lineHeight: '20px' }}>
        Click <strong>Connect Mock HRIS</strong> to authenticate and allow SafetyCulture to read your employee data.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: T.base, borderRadius: 8, border: `1px solid ${T.borderWeak}` }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Mock HRIS (Dev)</div>
          <div style={{ fontSize: 12, color: T.textWeaker, marginTop: 2 }}>Development sandbox — no real credentials required</div>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: '#e8fcf5', color: '#007a52', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
          <Check size={11} strokeWidth={2.5} /> Ready
        </span>
      </div>
    </div>
  )
}

function SelectContent() {
  const [rules, setRules] = useState(['Department EQUALS Engineering'])
  return (
    <div>
      <p style={{ fontSize: 14, color: T.textWeaker, margin: '0 0 16px', lineHeight: '20px' }}>
        Add rules to filter which employees are imported. Without rules, all employees are synced.
      </p>
      {rules.map((rule, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ flex: 1, padding: '8px 12px', background: T.bgWeak, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.text }}>{rule}</div>
          <button onClick={() => setRules(r => r.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.textWeakest, padding: 4, lineHeight: 0 }}>
            <X size={14} />
          </button>
        </div>
      ))}
      <button onClick={() => setRules(r => [...r, 'Employment type EQUALS Full-time'])} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: T.accentText, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
        <Plus size={14} /> Add rule
      </button>
    </div>
  )
}

function MapContent() {
  const rows = [
    { sc: 'First Name', hr: 'first_name', required: true },
    { sc: 'Last Name',  hr: 'last_name',  required: true },
    { sc: 'Username',   hr: 'employee_id', required: false },
    { sc: 'Job Title',  hr: 'job_title',  required: false },
    { sc: 'Department', hr: 'department', required: false },
  ]
  return (
    <div>
      <p style={{ fontSize: 14, color: T.textWeaker, margin: '0 0 16px', lineHeight: '20px' }}>
        Match Mock HRIS fields to SafetyCulture user fields. Blank fields won't be mapped.
      </p>
      <div style={{ border: `1px solid ${T.borderWeak}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '10px 16px', background: T.bgWeak, borderBottom: `1px solid ${T.borderWeak}` }}>
          {['SafetyCulture field', 'Mock HRIS field'].map(h => <span key={h} style={{ fontSize: 11, fontWeight: 700, color: T.textWeaker, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>{h}</span>)}
        </div>
        {rows.map((r, i) => (
          <div key={r.sc} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '12px 16px', background: T.surface, borderBottom: i < rows.length - 1 ? `1px solid ${T.borderWeak}` : 'none', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{r.sc}{r.required && <span style={{ color: '#cc3340', marginLeft: 2 }}>*</span>}</span>
            <span style={{ fontSize: 13, color: T.accentText, fontFamily: 'monospace' }}>{r.hr}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AssignContent() {
  const [seat, setSeat] = useState('Full')
  const [permission, setPermission] = useState('Basic member')
  const sel = { width: '100%', maxWidth: 280, height: 38, padding: '0 12px', fontSize: 13, color: T.text, border: `1px solid ${T.border}`, borderRadius: 8, background: T.surface }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={{ fontSize: 13, fontWeight: 500, color: T.text, display: 'block', marginBottom: 6 }}>Default seat type <span style={{ color: '#cc3340' }}>*</span></label>
        <select value={seat} onChange={e => setSeat(e.target.value)} style={sel}>
          <option>Full</option><option>Lite</option><option>Guest</option>
        </select>
      </div>
      <div>
        <label style={{ fontSize: 13, fontWeight: 500, color: T.text, display: 'block', marginBottom: 6 }}>Default permission set <span style={{ color: '#cc3340' }}>*</span></label>
        <select value={permission} onChange={e => setPermission(e.target.value)} style={sel}>
          <option>Basic member</option><option>Administrator</option><option>Limited member</option>
        </select>
      </div>
    </div>
  )
}

function ReviewContent() {
  const users = [
    { name: 'Alice Chen',  username: '10042', dept: 'Engineering', seat: 'Full' },
    { name: 'Bob Marsh',   username: '10043', dept: 'Engineering', seat: 'Full' },
    { name: 'Carol Wu',    username: '10044', dept: 'Engineering', seat: 'Lite' },
    { name: 'Dave Park',   username: 'dave@co.com', dept: 'Engineering', seat: 'Full' },
  ]
  return (
    <div>
      <p style={{ fontSize: 14, color: T.textWeaker, margin: '0 0 16px', lineHeight: '20px' }}>
        {users.length} employees will be created as users in SafetyCulture.
      </p>
      <div style={{ border: `1px solid ${T.borderWeak}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 80px', padding: '10px 16px', background: T.bgWeak, borderBottom: `1px solid ${T.borderWeak}` }}>
          {['Name / Username', 'Department', 'Seat'].map(h => <span key={h} style={{ fontSize: 11, fontWeight: 700, color: T.textWeaker, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>{h}</span>)}
        </div>
        {users.map((u, i) => (
          <div key={u.username} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 80px', padding: '10px 16px', background: T.surface, borderBottom: i < users.length - 1 ? `1px solid ${T.borderWeak}` : 'none', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{u.name}</div>
              <div style={{ fontSize: 11, color: T.textWeakest }}>{u.username}</div>
            </div>
            <span style={{ fontSize: 13, color: T.textWeaker }}>{u.dept}</span>
            <span style={{ fontSize: 13, color: T.textWeaker }}>{u.seat}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScheduleContent() {
  const [time, setTime] = useState('09:00 AM')
  const [tz, setTz] = useState('Australia/Sydney')
  const sel = { height: 38, padding: '0 12px', fontSize: 13, color: T.text, border: `1px solid ${T.border}`, borderRadius: 8, background: T.surface }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={{ fontSize: 13, fontWeight: 500, color: T.text, display: 'block', marginBottom: 6 }}>Daily sync time</label>
        <select value={time} onChange={e => setTime(e.target.value)} style={{ ...sel, width: 180 }}>
          {['06:00 AM','07:00 AM','08:00 AM','09:00 AM','10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM'].map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label style={{ fontSize: 13, fontWeight: 500, color: T.text, display: 'block', marginBottom: 6 }}>Timezone</label>
        <select value={tz} onChange={e => setTz(e.target.value)} style={{ ...sel, width: 260 }}>
          <option>Australia/Sydney</option>
          <option>America/New_York</option>
          <option>America/Los_Angeles</option>
          <option>Europe/London</option>
          <option>Asia/Tokyo</option>
        </select>
      </div>
    </div>
  )
}

// ── Shared shell ──────────────────────────────────────────────────────────────

function AppShell({ children, breadcrumb }: { children: React.ReactNode; breadcrumb: string }) {
  return (
    <div style={{ display: 'flex', height: '100dvh', overflow: 'hidden', fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
      <aside style={{ width: 220, background: T.bgWeak, borderRight: `1px solid ${T.borderWeak}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '14px 16px 12px', borderBottom: `1px solid ${T.borderWeak}` }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: T.text, letterSpacing: '-0.3px' }}>SafetyCulture</span>
        </div>
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 8px 0' }}>
          {SIDEBAR_TOP.map(n => <NavBtn key={n.label} icon={n.icon} label={n.label} />)}
          <div style={{ height: 1, background: T.borderWeak, margin: '8px 4px' }} />
          {SIDEBAR_NAV.map(n => <NavBtn key={n.label} icon={n.icon} label={n.label} />)}
        </nav>
        <div style={{ borderTop: `1px solid ${T.borderWeak}`, padding: '4px 8px 8px' }}>
          <NavBtn icon={<HelpCircle size={18} />} label="Help" />
          <NavBtn icon={<Settings size={18} />} label="SC Playground" />
        </div>
      </aside>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ height: 44, padding: '0 24px', display: 'flex', alignItems: 'center', borderBottom: `1px solid ${T.borderWeak}`, background: T.surface, flexShrink: 0 }}>
          <span style={{ fontSize: 13, color: T.textWeaker }}>{breadcrumb}</span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', background: T.base }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function NavBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', fontSize: 14, color: T.textWeak, background: 'none', border: 'none', cursor: 'pointer', borderRadius: 6, textAlign: 'left' }}>
      <span style={{ color: T.textWeakest, display: 'flex' }}>{icon}</span>
      {label}
    </button>
  )
}
