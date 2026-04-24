import { useState } from 'react'
import { PencilLine, X, Check } from 'lucide-react'

type ScenarioId =
  | 'emailless-with-pwd' | 'emailless-default-pwd' | 'emailless-typed-pwd'
  | 'emailfull-with-pwd' | 'emailfull-no-pwd' | 'emailfull-typed-pwd'
  | 'mixed-default-pwd'

type Scenario = {
  id: ScenarioId; label: string; group: string
  total: number; withEmail: number; withoutEmail: number; updated: number
  showEmail: boolean
  cpnlToggle: boolean; cpnlCount: number; cpnlLabel: string
  forcedRow: boolean; forcedCount: number
}

const SCENARIOS: Scenario[] = [
  { id: 'emailless-with-pwd',    label: 'With initial password',           group: 'Email-less',
    total: 8, withEmail: 0, withoutEmail: 8, updated: 3,
    showEmail: false, cpnlToggle: true,  cpnlCount: 8, cpnlLabel: 'Require password reset on first login',                           forcedRow: false, forcedCount: 0 },
  { id: 'emailless-default-pwd', label: 'No pwd + default password',       group: 'Email-less',
    total: 8, withEmail: 0, withoutEmail: 8, updated: 3,
    showEmail: false, cpnlToggle: false, cpnlCount: 0, cpnlLabel: '',                                                                  forcedRow: true,  forcedCount: 8 },
  { id: 'emailless-typed-pwd',   label: 'No pwd + typed password',         group: 'Email-less',
    total: 8, withEmail: 0, withoutEmail: 8, updated: 3,
    showEmail: false, cpnlToggle: true,  cpnlCount: 8, cpnlLabel: 'Require password reset on first login',                           forcedRow: false, forcedCount: 0 },
  { id: 'emailfull-with-pwd',    label: 'With initial password',           group: 'Email',
    total: 8, withEmail: 8, withoutEmail: 0, updated: 3,
    showEmail: true,  cpnlToggle: true,  cpnlCount: 8, cpnlLabel: 'Require password reset on first login',                           forcedRow: false, forcedCount: 0 },
  { id: 'emailfull-no-pwd',      label: 'Without initial password',        group: 'Email',
    total: 8, withEmail: 8, withoutEmail: 0, updated: 3,
    showEmail: true,  cpnlToggle: false, cpnlCount: 0, cpnlLabel: '',                                                                  forcedRow: false, forcedCount: 0 },
  { id: 'emailfull-typed-pwd',   label: 'No pwd + typed password',         group: 'Email',
    total: 8, withEmail: 8, withoutEmail: 0, updated: 3,
    showEmail: true,  cpnlToggle: true,  cpnlCount: 8, cpnlLabel: 'Require password reset on first login',                           forcedRow: false, forcedCount: 0 },
  { id: 'mixed-default-pwd',     label: 'Email + email-less (default pwd)', group: 'Mixed',
    total: 8, withEmail: 6, withoutEmail: 2, updated: 3,
    showEmail: true,  cpnlToggle: true,  cpnlCount: 4, cpnlLabel: 'Require password reset on first login for users with email',      forcedRow: true,  forcedCount: 2 },
]

const GROUPS = ['Email-less', 'Email', 'Mixed'] as const

export function SummaryRedesign() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('mixed-default-pwd')
  const [sendEmail, setSendEmail] = useState(true)
  const [cpnlOn, setCpnlOn] = useState(false)

  const sc = SCENARIOS.find(s => s.id === scenarioId)!

  const handleScenario = (id: ScenarioId) => {
    setScenarioId(id)
    setSendEmail(true)
    setCpnlOn(false)
  }

  return (
    <div className="min-h-screen bg-[#e9edf6] flex flex-col items-center p-8">

      {/* Scenario picker */}
      <div className="w-full max-w-[520px] mb-6 flex flex-col gap-3">
        {GROUPS.map(group => (
          <div key={group}>
            <p className="text-[11px] font-semibold text-[#909aad] uppercase tracking-wider mb-2">{group}</p>
            <div className="flex flex-wrap gap-2">
              {SCENARIOS.filter(s => s.group === group).map(s => (
                <button
                  key={s.id}
                  onClick={() => handleScenario(s.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    scenarioId === s.id
                      ? 'bg-[#1f2533] text-white'
                      : 'bg-white text-[#3f495a] border border-[#bfc6d4] hover:border-[#8a94a8]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-lg">

        {/* Header */}
        <div className="px-8 pt-8 pb-5 relative">
          <button className="absolute top-6 right-6 p-1 rounded text-[#6559ff] hover:bg-[#f0f0ff] transition-colors">
            <X size={16} />
          </button>
          <h1 className="text-xl font-semibold text-[#1f2533] pr-8">Review and submit</h1>
          <p className="text-sm text-[#3f495a] mt-1">Check the settings below before submitting. This action can't be undone.</p>
        </div>

        {/* Stats */}
        <div className="px-8 pb-6">
          <div className="border border-[#e2e8f0] rounded-xl grid grid-cols-4 overflow-hidden">
            <Stat label="New users"     value={sc.total}        />
            <Stat label="With email"    value={sc.withEmail}    divider />
            <Stat label="Without email" value={sc.withoutEmail} divider />
            <Stat label="Updated"       value={sc.updated}      divider />
          </div>
        </div>

        <div className="border-t border-[#e9edf6]" />

        {/* Body */}
        <div className="divide-y divide-[#e9edf6]">

          {sc.showEmail && (
            <div className="px-8 py-5 flex items-start gap-3">
              <Toggle checked={sendEmail} onChange={setSendEmail} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1f2533]">Send invite email to new users</p>
                <p className="text-xs text-[#3f495a] mt-0.5">
                  {sendEmail
                    ? `${sc.withEmail} email users will receive an activation email.`
                    : "Welcome emails are off. Users won't be notified."}
                </p>
              </div>
              <button
                disabled={!sendEmail}
                className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                  sendEmail ? 'text-[#6559ff] hover:underline' : 'text-[#bfc6d4] cursor-not-allowed'
                }`}
              >
                <PencilLine size={12} />
                Edit email
              </button>
            </div>
          )}

          {sc.cpnlToggle && (
            <div className="px-8 py-5 flex items-start gap-3">
              <Toggle checked={cpnlOn} onChange={setCpnlOn} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#1f2533]">{sc.cpnlLabel}</p>
                <p className="text-xs text-[#3f495a] mt-0.5">
                  {cpnlOn
                    ? `${sc.cpnlCount} users will be required to set a new password on first login.`
                    : `Password reset on first login is off. ${sc.cpnlCount} users can log in with their existing passwords.`}
                </p>
              </div>
            </div>
          )}

          {sc.forcedRow && (
            <div className="px-8 py-5 flex items-start gap-3">
              <LockedToggle />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#1f2533]">Password resets are required on first login for email-less users</p>
                <p className="text-xs text-[#3f495a] mt-0.5">
                  {sc.forcedCount} email-less users with a default password must set a new password on first login.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#e9edf6] px-8 py-5 flex gap-3">
          <button className="flex-1 py-2.5 border border-[#bfc6d4] text-[#3f495a] text-sm font-medium rounded-lg hover:bg-[#f8f9fc] transition-colors">
            Back
          </button>
          <button className="flex-1 py-2.5 bg-[#6559ff] hover:bg-[#544af3] text-white text-sm font-semibold rounded-lg transition-colors">
            Submit import
          </button>
        </div>

      </div>
    </div>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative mt-0.5 shrink-0 w-11 h-6 rounded-full transition-colors ${checked ? 'bg-[#6559ff]' : 'bg-[#d0d5df]'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform flex items-center justify-center ${checked ? 'translate-x-5' : ''}`}>
        {checked && <Check size={11} className="text-[#6559ff]" strokeWidth={2.5} />}
      </span>
    </button>
  )
}

function LockedToggle() {
  return (
    <div className="relative mt-0.5 shrink-0 w-11 h-6 rounded-full bg-[#bfc6d4] cursor-not-allowed">
      <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow-sm flex items-center justify-center">
        <Check size={11} className="text-[#bfc6d4]" strokeWidth={2.5} />
      </span>
    </div>
  )
}

function Stat({ label, value, divider }: { label: string; value: number; divider?: boolean }) {
  return (
    <div className={`p-4 flex flex-col gap-1 ${divider ? 'border-l border-[#e9edf6]' : ''}`}>
      <span className="text-xs text-[#909aad] font-medium">{label}</span>
      <span className="text-2xl font-bold text-[#6559ff] leading-none">{value}</span>
    </div>
  )
}
