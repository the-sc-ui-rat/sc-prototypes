import { useState } from 'react'
import { Info, PencilLine } from 'lucide-react'

type Scenario =
  | 'email-only'          // no password users — no reset toggle, no banner
  | 'with-passwords'      // has password users + reset toggle OFF
  | 'reset-on'            // has password users + reset toggle ON → banner A
  | 'default-password'    // email-less users got default password → banner B

const SCENARIOS: { id: Scenario; label: string }[] = [
  { id: 'email-only',       label: 'Email users only (no passwords)' },
  { id: 'with-passwords',   label: 'Has password users — reset OFF' },
  { id: 'reset-on',         label: 'Has password users — reset ON → Banner A' },
  { id: 'default-password', label: 'Email-less + default password → Banner B' },
]

export function SummaryPreview() {
  const [scenario, setScenario] = useState<Scenario>('with-passwords')
  const [sendEmail, setSendEmail] = useState(true)

  const showResetToggle = scenario === 'with-passwords' || scenario === 'reset-on'
  const resetOn = scenario === 'reset-on'
  const showBannerA = scenario === 'reset-on'
  const showBannerB = scenario === 'default-password'

  const newUsersWithPassword = 3
  const totalNewUsers = 5
  const emaillessCount = 4

  return (
    <div className="min-h-screen bg-[#e9edf6] p-8">

      {/* Scenario picker */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-[#3f495a] mr-1">Scenario:</span>
        {SCENARIOS.map(s => (
          <button
            key={s.id}
            onClick={() => setScenario(s.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              scenario === s.id
                ? 'bg-[#6559ff] text-white'
                : 'bg-white text-[#3f495a] border border-[#bfc6d4] hover:border-[#8a94a8]'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Summary card */}
      <div className="max-w-[35rem] mx-auto">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-[#1f2533]">Summary</h1>
          <p className="text-sm text-[#3f495a] mt-1">
            Once you submit the changes, we'll start processing your file. You'll receive an email once it's done.
          </p>
        </div>

        {/* New users count */}
        <p className="text-sm font-semibold text-[#1f2533] mb-4">
          {totalNewUsers} new users
        </p>

        {/* New users section card */}
        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">

          {/* ── Email toggle ── */}
          <div className="flex items-start gap-3">
            {/* Toggle */}
            <button
              role="switch"
              aria-checked={sendEmail}
              onClick={() => setSendEmail(v => !v)}
              className={`relative mt-0.5 shrink-0 w-9 h-5 rounded-full transition-colors ${sendEmail ? 'bg-[#6559ff]' : 'bg-[#bfc6d4]'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${sendEmail ? 'translate-x-4' : ''}`} />
            </button>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1f2533] leading-snug">
                Send welcome email to new users
              </p>
              <p className="text-xs text-[#3f495a] mt-0.5">
                New users will receive an email to activate and finish setting up their account.
              </p>
            </div>

            {/* Edit button */}
            <button
              disabled={!sendEmail}
              className={`shrink-0 p-1.5 rounded-md border transition-colors ${
                sendEmail
                  ? 'border-[#bfc6d4] text-[#3f495a] hover:bg-[#f8f9fc]'
                  : 'border-[#e9edf6] text-[#bfc6d4] cursor-not-allowed'
              }`}
            >
              <PencilLine size={14} />
            </button>
          </div>

          {/* ── Password reset toggle (conditional) ── */}
          {showResetToggle && (
            <>
              <div className="border-t border-[#e9edf6]" />

              <div className="flex items-start gap-3">
                {/* Toggle */}
                <button
                  role="switch"
                  aria-checked={resetOn}
                  onClick={() => setScenario(resetOn ? 'with-passwords' : 'reset-on')}
                  className={`relative mt-0.5 shrink-0 w-9 h-5 rounded-full transition-colors ${resetOn ? 'bg-[#6559ff]' : 'bg-[#bfc6d4]'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${resetOn ? 'translate-x-4' : ''}`} />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#1f2533] leading-snug">
                      Require password reset on first login
                    </p>
                    {/* NEW badge */}
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#dde1ff] text-[#4740d4] uppercase tracking-wide shrink-0">
                      NEW
                    </span>
                  </div>
                  <p className="text-xs text-[#3f495a] mt-0.5">
                    {newUsersWithPassword} of {totalNewUsers} new users have passwords set
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ── Info banner A: reset required ── */}
          {showBannerA && (
            <div className="flex items-start gap-3 bg-[#eef3ff] border border-[#8fa3f5] rounded-lg px-4 py-3">
              <Info size={16} className="text-[#4740d4] shrink-0 mt-0.5" />
              <p className="text-sm text-[#2d3a8c]">
                New users with passwords will be required to reset their password on first login.
              </p>
            </div>
          )}

          {/* ── Info banner B: default password CPNL note ── */}
          {showBannerB && (
            <div className="flex items-start gap-3 bg-[#eef3ff] border border-[#8fa3f5] rounded-lg px-4 py-3">
              <Info size={16} className="text-[#4740d4] shrink-0 mt-0.5" />
              <p className="text-sm text-[#2d3a8c]">
                <strong>{emaillessCount} email-less users</strong> with a default password will be required to change their password on next login.
              </p>
            </div>
          )}

        </div>

        {/* Updated users count */}
        <p className="text-sm font-semibold text-[#1f2533] mt-4">3 updated users</p>

        {/* Submit button */}
        <div className="mt-6">
          <button className="w-full py-2.5 bg-[#6559ff] hover:bg-[#544af3] text-white text-sm font-semibold rounded-lg transition-colors">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
