import { useState } from 'react'
import { AlertCircle, PencilLine, Download, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react'

type User = {
  row: number; username: string; first: string; last: string
  hasPassword: boolean; status: string; seat: string
  emailless: boolean; error?: string
}

const USERS: User[] = [
  { row: 1, username: 'initial_pass_2',        first: 'N', last: 'S', hasPassword: true,  status: 'Active', seat: 'Full', emailless: true },
  { row: 2, username: 'default_pass_2',         first: 'N', last: 'S', hasPassword: false, status: 'Active', seat: 'Full', emailless: true,  error: 'Password: A required field is missing for user creation.' },
  { row: 3, username: 'typed_pass_2',           first: 'N', last: 'S', hasPassword: false, status: 'Active', seat: 'Full', emailless: true },
  { row: 4, username: 'initial_pass_3',         first: 'N', last: 'S', hasPassword: true,  status: 'Active', seat: 'Full', emailless: true },
  { row: 5, username: 'default_pass_3',         first: 'N', last: 'S', hasPassword: false, status: 'Active', seat: 'Full', emailless: true,  error: 'Password: A required field is missing for user creation.' },
  { row: 6, username: 'typed_pass_3',           first: 'N', last: 'S', hasPassword: false, status: 'Active', seat: 'Full', emailless: true },
  { row: 7, username: 'neo4@safetyculture.io',  first: 'N', last: 'S', hasPassword: false, status: 'Active', seat: 'Full', emailless: false },
]

export function ReviewStep() {
  const [errorIdx, setErrorIdx] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [defaultPwd, setDefaultPwd] = useState('')
  const [showPwd, setShowPwd] = useState(false)

  const errors = USERS.filter(u => u.error)
  const emaillessNoPwd = USERS.filter(u => u.emailless && !u.hasPassword)
  const currentError = errors[errorIdx % errors.length]
  const displayed = showErrors ? USERS.filter(u => u.error) : USERS

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-[24px] font-semibold text-[#1f2533] mb-5">Review upload</h1>

      {!dismissed && (
        <div className="bg-[#fff5f5] border border-[#f5c0c0] rounded-xl px-4 py-3 mb-3 flex items-start justify-between gap-4">
          <div className="flex items-start gap-2">
            <AlertCircle size={15} className="text-[#cc3340] shrink-0 mt-[2px]" />
            <div>
              <span className="text-[13px] font-semibold text-[#cc3340]">
                Row {currentError.row} · {currentError.username}
              </span>
              <p className="text-[13px] text-[#cc3340]">{currentError.error}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 text-[12px] font-medium text-[#cc3340]">
              <button onClick={() => setErrorIdx(i => (i - 1 + errors.length) % errors.length)}>
                <ChevronLeft size={13} />
              </button>
              {errorIdx + 1} of {errors.length} errors
              <button onClick={() => setErrorIdx(i => (i + 1) % errors.length)}>
                <ChevronRight size={13} />
              </button>
            </div>
            <button onClick={() => setDismissed(true)} className="text-[12px] font-medium text-[#cc3340] hover:underline">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {emaillessNoPwd.length > 0 && (
        <div className="bg-[#fffbeb] border border-[#f0d080] rounded-xl px-4 py-3 mb-4 flex items-center gap-3 flex-wrap">
          <AlertCircle size={15} className="text-[#b45309] shrink-0" />
          <span className="text-[13px] text-[#92400e] flex-1 min-w-[200px]">
            {emaillessNoPwd.length} email-less users have no password set. Set individual passwords or apply one default.
          </span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={defaultPwd}
                onChange={e => setDefaultPwd(e.target.value)}
                placeholder="Set default password"
                className="px-3 pr-8 h-8 text-[13px] border border-[#d6b36a] rounded-lg w-44 bg-white focus:outline-none focus:border-[#675DF4]"
              />
              <button
                onClick={() => setShowPwd(v => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#909aad]"
              >
                {showPwd ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
            <button className="px-3 h-8 bg-white border border-[#bfc6d4] text-[#3f495a] text-[12px] font-medium rounded-lg hover:bg-[#f8f9fc] transition-colors whitespace-nowrap">
              Apply to {emaillessNoPwd.length} users
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-5 mb-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={showErrors} onChange={e => setShowErrors(e.target.checked)} className="accent-[#675DF4] w-4 h-4 rounded" />
          <span className="text-[13px] text-[#3f495a]">Show only rows with errors</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={showNewOnly} onChange={e => setShowNewOnly(e.target.checked)} className="accent-[#675DF4] w-4 h-4 rounded" />
          <span className="text-[13px] text-[#3f495a]">Show only new and updated users</span>
        </label>
        <button className="ml-auto p-2 text-[#545f70] hover:text-[#1f2533] hover:bg-white rounded-lg transition-colors">
          <Download size={15} />
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#dbe0eb] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#dbe0eb] bg-[#f8f9fc]">
              {['', 'Username', 'First name', 'Last name', 'Password', 'Status', 'Seat type'].map(h => (
                <th key={h} className="px-4 py-3 text-[11px] font-semibold text-[#545f70] uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayed.map(user => (
              <tr key={user.username} className={`border-b border-[#dbe0eb] last:border-0 ${user.error ? 'bg-[#fff8f8]' : ''}`}>
                <td className="px-4 py-3 text-[12px] text-[#909aad] w-8">{user.row}</td>
                <td className="px-4 py-3 text-[13px] font-medium text-[#1f2533]">{user.username}</td>
                <td className="px-4 py-3 text-[13px] text-[#3f495a]">{user.first}</td>
                <td className="px-4 py-3 text-[13px] text-[#3f495a]">{user.last}</td>
                <td className="px-4 py-3 text-[13px]">
                  {user.hasPassword
                    ? <span className="tracking-widest text-[#1f2533] text-[10px]">••••••••••</span>
                    : <button className="text-[#675DF4] hover:text-[#4740d4]"><PencilLine size={14} /></button>
                  }
                </td>
                <td className="px-4 py-3">
                  <span className="text-[12px] font-medium text-[#007a52] bg-[#e8fcf5] px-2 py-0.5 rounded-full">
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[13px] text-[#3f495a]">{user.seat}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 flex items-center justify-between border-t border-[#dbe0eb]">
          <span className="text-[12px] text-[#545f70]">1–{displayed.length} of {USERS.length} results</span>
          <div className="flex items-center gap-2">
            <button disabled className="w-7 h-7 flex items-center justify-center rounded border border-[#bfc6d4] text-[#545f70] disabled:opacity-30">
              <ChevronLeft size={13} />
            </button>
            <span className="text-[12px] font-medium text-[#1f2533]">1</span>
            <span className="text-[12px] text-[#909aad]">/ 1</span>
            <button disabled className="w-7 h-7 flex items-center justify-center rounded border border-[#bfc6d4] text-[#545f70] disabled:opacity-30">
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
