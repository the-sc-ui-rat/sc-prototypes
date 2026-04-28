import { useState } from 'react'
import { PencilLine, X, Check, Info } from 'lucide-react'

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
  { id: 'emailless-with-pwd',    label: 'With initial password',            group: 'Email-less',
    total: 8, withEmail: 0, withoutEmail: 8, updated: 3,
    showEmail: false, cpnlToggle: true,  cpnlCount: 8, cpnlLabel: 'Require password reset on first login',
    forcedRow: false, forcedCount: 0 },
  { id: 'emailless-default-pwd', label: 'No pwd + default password',        group: 'Email-less',
    total: 8, withEmail: 0, withoutEmail: 8, updated: 3,
    showEmail: false, cpnlToggle: false, cpnlCount: 0, cpnlLabel: '',
    forcedRow: true, forcedCount: 8 },
  { id: 'emailless-typed-pwd',   label: 'No pwd + typed password',          group: 'Email-less',
    total: 8, withEmail: 0, withoutEmail: 8, updated: 3,
    showEmail: false, cpnlToggle: true,  cpnlCount: 8, cpnlLabel: 'Require password reset on first login',
    forcedRow: false, forcedCount: 0 },
  { id: 'emailfull-with-pwd',    label: 'With initial password',            group: 'Email',
    total: 8, withEmail: 8, withoutEmail: 0, updated: 3,
    showEmail: true, cpnlToggle: true,  cpnlCount: 8, cpnlLabel: 'Require password reset on first login',
    forcedRow: false, forcedCount: 0 },
  { id: 'emailfull-no-pwd',      label: 'Without initial password',         group: 'Email',
    total: 8, withEmail: 8, withoutEmail: 0, updated: 3,
    showEmail: true, cpnlToggle: false, cpnlCount: 0, cpnlLabel: '',
    forcedRow: false, forcedCount: 0 },
  { id: 'emailfull-typed-pwd',   label: 'No pwd + typed password',          group: 'Email',
    total: 8, withEmail: 8, withoutEmail: 0, updated: 3,
    showEmail: true, cpnlToggle: true,  cpnlCount: 8, cpnlLabel: 'Require password reset on first login',
    forcedRow: false, forcedCount: 0 },
  { id: 'mixed-default-pwd',     label: 'Email + email-less (default pwd)', group: 'Mixed',
    total: 8, withEmail: 6, withoutEmail: 2, updated: 3,
    showEmail: true, cpnlToggle: true,  cpnlCount: 4, cpnlLabel: 'Require password reset on first login for users with email',
    forcedRow: true, forcedCount: 4 },
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
      <div className="w-full max-w-[720px] mb-6 flex flex-col gap-3">
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

      {/* Modal — rounded-[24px], exact Figma shadow */}
      <div className="w-full max-w-[720px] bg-white rounded-[24px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06),0px_4px_12px_0px_rgba(0,0,0,0.12)] relative">

        {/* Close — top-[16px] right-[16px], 24×24, accent text color */}
        <button className="absolute top-[16px] right-[16px] size-[24px] flex items-center justify-center p-[4px] text-[#4740d4] hover:bg-[#f0f0ff] rounded transition-colors">
          <X size={16} />
        </button>

        {/* Header — pt-[32px] px-[32px] pb-[16px] gap-[8px] */}
        <div className="pt-[32px] px-[32px] pb-[16px] flex flex-col gap-[8px]">
          <h1 className="text-[20px] font-semibold leading-[28px] tracking-[-0.25px] text-[#1f2533] overflow-hidden text-ellipsis">
            Review and submit
          </h1>
          <p className="text-[16px] font-normal leading-[24px] text-[#3f495a]">
            Check the settings below before submitting. This action can't be undone.
          </p>
        </div>

        {/* Body — px-[32px] pb-[32px] */}
        <div className="px-[32px] pb-[32px]">

          {/* Stats container — white, border top/left/right only, rounded top */}
          <div className="bg-white border-t border-l border-r border-[#dbe0eb] rounded-tl-[12px] rounded-tr-[12px] p-[20px]">
            <div className="flex items-center justify-between w-full">
              <StatCol label="New users"     value={sc.total}        accent />
              <div className="w-px h-[57px] bg-[#dbe0eb]" />
              <StatCol label="With email"    value={sc.withEmail}    />
              <div className="w-px h-[57px] bg-[#dbe0eb]" />
              <StatCol label="Without email" value={sc.withoutEmail} />
              <div className="w-px h-[57px] bg-[#dbe0eb]" />
              <StatCol label="Updated"       value={sc.updated}      />
            </div>
          </div>

          {/* Toggles container — grey bg, full border, rounded bottom */}
          <div className="bg-[#f8f9fc] border border-[#dbe0eb] rounded-bl-[12px] rounded-br-[12px] p-[20px] flex flex-col gap-[10px]">

            {sc.showEmail && (
              <>
                {/* Email row — items-end justify-between (Edit email aligns to bottom) */}
                <div className="flex items-end justify-between w-full">
                  <div className="flex flex-col gap-[12px] items-start shrink-0">
                    <div className="flex gap-[8px] items-center">
                      <Toggle checked={sendEmail} onChange={setSendEmail} />
                      <span className="text-[16px] font-medium leading-[24px] text-[#1f2533] whitespace-nowrap">
                        Send invite email to new users
                      </span>
                    </div>
                    <div className="flex items-center justify-center pl-[50px]">
                      <span className="text-[12px] font-medium leading-[16px] text-[#545f70] whitespace-nowrap">
                        {sendEmail
                          ? `${sc.withEmail} email users will receive an activation email.`
                          : "Welcome emails are off. Users won't be notified."}
                      </span>
                    </div>
                  </div>
                  <button
                    disabled={!sendEmail}
                    className={`shrink-0 flex items-center gap-[4px] text-[12px] font-medium leading-[16px] transition-colors ${
                      sendEmail ? 'text-[#4740d4] hover:underline' : 'text-[#bfc6d4] cursor-not-allowed'
                    }`}
                  >
                    <PencilLine size={12} />
                    Edit email
                  </button>
                </div>
                {(sc.cpnlToggle || sc.forcedRow) && <div className="w-full h-px bg-[#dbe0eb]" />}
              </>
            )}

            {sc.cpnlToggle && (
              <div className="flex flex-col gap-[12px] items-start w-full">
                <div className="flex gap-[8px] items-center">
                  <Toggle checked={cpnlOn} onChange={setCpnlOn} />
                  <span className="text-[16px] font-medium leading-[24px] text-[#1f2533] whitespace-nowrap">
                    {sc.cpnlLabel}
                  </span>
                </div>
                <div className="flex items-center justify-center pl-[50px] w-full">
                  <span className="flex-1 min-w-px text-[12px] font-medium leading-[16px] text-[#545f70]">
                    {cpnlOn
                      ? `${sc.cpnlCount} users will be required to set a new password on first login.`
                      : `Password reset on first login is off. ${sc.cpnlCount} users can log in with their existing passwords`}
                  </span>
                </div>
              </div>
            )}

          </div>

          {sc.forcedRow && (
            <div className="mt-[16px] flex items-start gap-[12px] bg-[#ecedfe] rounded-[12px] px-[16px] py-[14px]">
              <Info size={16} className="text-[#4740d4] shrink-0 mt-[2px]" />
              <div className="flex flex-col gap-[4px]">
                <p className="text-[14px] font-medium leading-[20px] text-[#4740d4]">
                  Password resets are required on first login for email-less.
                </p>
                <p className="text-[12px] font-medium leading-[16px] text-[#4740d4]">
                  Email-less users will be required to set a new password on first login.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer — pb-[32px] px-[32px], buttons right-aligned */}
        <div className="pb-[32px] px-[32px] flex justify-end">
          <div className="flex gap-[8px] items-center">
            <button className="px-[16px] h-10 border border-[#bfc6d4] text-[#3f495a] text-[14px] font-medium rounded-lg hover:bg-[#f8f9fc] transition-colors">
              Back
            </button>
            <button className="px-[16px] h-10 bg-[#675DF4] hover:bg-[#5C53DC] text-white text-[14px] font-semibold rounded-lg transition-colors">
              Submit import
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// Toggle: 42×24px, #675DF4 ON (Accent/Background -> Default), #bfc6d4 OFF
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative shrink-0 w-[42px] h-[24px] rounded-full transition-colors ${checked ? 'bg-[#675DF4]' : 'bg-[#bfc6d4]'}`}
    >
      <span className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform flex items-center justify-center ${checked ? 'translate-x-[18px]' : ''}`}>
        {checked && <Check size={10} className="text-[#675DF4]" strokeWidth={2.5} />}
      </span>
    </button>
  )
}

// Stat column: w-[96px], label 14px #3f495a, value 24px bold
// accent (#4740d4) for "New users", weaker (#545f70) for the rest
function StatCol({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-[5px] items-start w-[96px] whitespace-nowrap">
      <span className="text-[14px] font-medium leading-[20px] text-[#3f495a]">{label}</span>
      <span className={`text-[24px] font-bold leading-[32px] tracking-[-0.5px] ${accent ? 'text-[#4740d4]' : 'text-[#545f70]'}`}>
        {value}
      </span>
    </div>
  )
}
