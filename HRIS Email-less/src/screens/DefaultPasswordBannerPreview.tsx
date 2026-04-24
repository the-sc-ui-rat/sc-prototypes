import { useState } from 'react'
import { Lock, Eye, EyeOff, X, Check } from 'lucide-react'

type BannerState = 'warning' | 'success'

export function DefaultPasswordBannerPreview() {
  const [bannerState, setBannerState] = useState<BannerState>('warning')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [hasError, setHasError] = useState(false)
  const userCount = 4

  const validatePassword = (p: string) => {
    return p.length >= 8 &&
      /[A-Z]/.test(p) &&
      /[0-9]/.test(p) &&
      /[^A-Za-z0-9]/.test(p)
  }

  const handleApply = () => {
    if (!validatePassword(password)) {
      setHasError(true)
      return
    }
    setHasError(false)
    setBannerState('success')
  }

  const handleClear = () => {
    setBannerState('warning')
    setPassword('')
    setHasError(false)
  }

  return (
    <div className="min-h-screen bg-[#e9edf6] p-8">

      {/* State toggle */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-sm font-medium text-[#3f495a]">Preview state:</span>
        <button
          onClick={() => { setBannerState('warning'); setPassword(''); setHasError(false) }}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${bannerState === 'warning' ? 'bg-[#6559ff] text-white' : 'bg-white text-[#3f495a] border border-[#bfc6d4]'}`}
        >
          Warning (no password)
        </button>
        <button
          onClick={() => setBannerState('success')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${bannerState === 'success' ? 'bg-[#6559ff] text-white' : 'bg-white text-[#3f495a] border border-[#bfc6d4]'}`}
        >
          Success (applied)
        </button>
      </div>

      {/* Context: preview table header area */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-5xl">
        {/* Simulated breadcrumb/header */}
        <div className="px-6 py-4 border-b border-[#e9edf6]">
          <p className="text-sm text-[#3f495a]">Organisation → Users → Import → <span className="text-[#1f2533] font-medium">Preview</span></p>
        </div>

        {/* Banner area */}
        <div className="px-6 pt-4 pb-2">

          {bannerState === 'warning' ? (
            /* ── WARNING STATE ── */
            <div className="flex items-center gap-3 bg-[#fff8ec] border border-[#f5a623] rounded-lg px-4 py-3">
              <Lock size={16} className="text-[#b47200] shrink-0" />
              <span className="text-sm text-[#7a4f00]">
                <strong>{userCount} email-less users have</strong> no password set
              </span>
              {/* Password input */}
              <div className={`relative flex items-center rounded-md border ${hasError ? 'border-[#cc3340]' : 'border-[#bfc6d4]'} bg-white`} style={{ width: 250, minWidth: 250 }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); if (hasError) setHasError(false) }}
                  placeholder="Default password"
                  autoComplete="new-password"
                  className="flex-1 px-3 py-1.5 text-sm bg-transparent outline-none text-[#1f2533] placeholder:text-[#bfc6d4]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="px-2 text-[#909aad] hover:text-[#3f495a]"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {/* Apply button */}
              <button
                onClick={handleApply}
                className="shrink-0 px-3 py-1.5 bg-[#6559ff] hover:bg-[#544af3] active:bg-[#493ee0] text-white text-sm font-medium rounded-md transition-colors"
              >
                Apply to {userCount} users
              </button>
              {/* Hint text */}
              <span className={`text-xs shrink-0 ${hasError ? 'text-[#cc3340]' : 'text-[#3f495a]'}`}>
                Min. 8 chars, 1 uppercase, 1 number, 1 symbol
              </span>
            </div>
          ) : (
            /* ── SUCCESS STATE ── */
            <div className="flex items-center gap-3 bg-[#f0faf4] border border-[#2e9e5b] rounded-lg px-4 py-3">
              <Lock size={16} className="text-[#1e7a44] shrink-0" />
              <span className="text-sm text-[#1a6b3c]">
                Default password applied to <strong>{userCount} users</strong>
              </span>
              <button
                onClick={handleClear}
                className="shrink-0 px-3 py-1.5 bg-white hover:bg-[#f8f9fc] border border-[#2e9e5b] text-[#1a6b3c] text-sm font-medium rounded-md transition-colors"
              >
                Clear
              </button>
            </div>
          )}

          {/* Validation error hint */}
          {hasError && (
            <p className="mt-1.5 text-xs text-[#cc3340] flex items-center gap-1">
              <X size={12} /> Password doesn't meet requirements
            </p>
          )}
        </div>

        {/* Simulated table to give context */}
        <div className="px-6 pb-6 pt-2">
          <div className="border border-[#e9edf6] rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 bg-[#f8f9fc] px-4 py-2 border-b border-[#e9edf6]">
              {['Name', 'Username', 'Role', 'Password'].map(h => (
                <span key={h} className="text-xs font-semibold text-[#3f495a] uppercase tracking-wide">{h}</span>
              ))}
            </div>
            {[
              { name: 'Alex Torres', username: 'alex.torres', role: 'Operator', hasPassword: false },
              { name: 'Sam Chen', username: 'sam.chen', role: 'Viewer', hasPassword: false },
              { name: 'Jordan Lee', username: 'jordan.lee', role: 'Operator', hasPassword: true },
              { name: 'Riley Park', username: 'riley.park', role: 'Admin', hasPassword: false },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 px-4 py-2.5 border-b border-[#e9edf6] last:border-0 bg-white">
                <span className="text-sm text-[#1f2533]">{row.name}</span>
                <span className="text-sm text-[#3f495a]">{row.username}</span>
                <span className="text-sm text-[#3f495a]">{row.role}</span>
                <span className="text-sm flex items-center gap-1">
                  {row.hasPassword ? (
                    <span className="text-[#3f495a]">••••••••</span>
                  ) : bannerState === 'success' ? (
                    <span className="flex items-center gap-1 text-[#1e7a44]"><Check size={12} /> Default set</span>
                  ) : (
                    <span className="text-[#cc3340]">None</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
