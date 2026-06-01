import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

export interface EmailPasswordScreenProps {
  email?: string
  onBack?: () => void
  onForgot?: () => void
  onLogin?: () => void
  onLoginWithCode?: () => void
}

export function EmailPasswordScreen({
  email = 'user@example.com',
  onBack,
  onForgot,
  onLogin,
  onLoginWithCode,
}: EmailPasswordScreenProps) {
  const [showPassword, setShowPassword] = useState(false)

  const inputCls = [
    'w-full rounded-[8px] border outline-none',
    'transition-all duration-100',
    'bg-surface border-surface text-surface cursor-text',
    'hover:border-surface-strong',
    'focus:border-accent focus:shadow-[0_0_0_3px_rgba(101,89,255,0.15)]',
  ].join(' ')

  return (
    <div className="h-full flex flex-col bg-base">

      {/* ── HEADER ── */}
      <header className="shrink-0 bg-surface">
        <div className="flex items-center px-4 h-10">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-6 h-6 bg-transparent border-0 cursor-pointer text-surface"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="flex flex-col w-[370px]" style={{ gap: 24 }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 24 }}>
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="6" fill="#6559ff"/>
              <path d="M8 14C8 10.686 10.686 8 14 8C15.657 8 17.157 8.672 18.243 9.757L20.364 7.636C18.743 6.015 16.485 5 14 5C9.029 5 5 9.029 5 14C5 18.971 9.029 23 14 23C16.485 23 18.743 21.985 20.364 20.364L18.243 18.243C17.157 19.328 15.657 20 14 20C10.686 20 8 17.314 8 14Z" fill="white"/>
              <circle cx="19.5" cy="14" r="3.5" fill="white"/>
            </svg>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1f2533', letterSpacing: '-0.3px' }}>SafetyCulture</span>
          </div>

          {/* Card */}
          <div
            className="bg-surface rounded-[12px] flex flex-col w-full"
            style={{
              paddingTop: 24,
              paddingBottom: 40,
              paddingLeft: 16,
              paddingRight: 16,
              gap: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
            }}
          >

            {/* 1. Back button + Log in heading */}
            <div className="flex items-center" style={{ gap: 8 }}>
              <button
                onClick={onBack}
                className="flex items-center justify-center bg-transparent border-0 cursor-pointer text-accent shrink-0"
                style={{ width: 24, height: 24 }}
                aria-label="Go back"
              >
                <ArrowLeft size={20} strokeWidth={2} />
              </button>
              <span
                className="text-surface font-bold"
                style={{ fontSize: 24, lineHeight: '32px', letterSpacing: '-0.5px' }}
              >
                Log in
              </span>
            </div>

            {/* 2. Log in with <email> */}
            <p
              className="text-surface-weaker"
              style={{ fontSize: 14, lineHeight: '20px', margin: 0 }}
            >
              Log in with{' '}
              <span className="text-surface font-medium">{email}</span>
            </p>

            {/* 3. Password field */}
            <div className="flex flex-col w-full" style={{ gap: 4 }}>
              <label
                htmlFor="email-password"
                className="font-medium text-surface"
                style={{ fontSize: 14, lineHeight: '20px' }}
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  id="email-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder=""
                  className={inputCls}
                  style={{
                    height: 40,
                    paddingLeft: 12,
                    paddingRight: 40,
                    fontSize: 14,
                    lineHeight: '20px',
                  }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 bg-transparent border-0 cursor-pointer"
                  style={{ color: 'var(--text-color-surface-weaker)' }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* 4. Log in with password — primary CTA */}
            <button
              onClick={onLogin}
              className="w-full rounded-[6px] font-medium text-on-accent bg-accent hover:bg-accent-hover active:bg-accent-active border-0 cursor-pointer transition-all duration-100"
              style={{ height: 40, fontSize: 14, lineHeight: '20px' }}
            >
              Log in with password
            </button>

            {/* 5. Forgot password — tertiary CTA */}
            <button
              onClick={onForgot}
              className="w-full rounded-[6px] bg-transparent border-0 font-medium text-accent hover:bg-accent-weakest cursor-pointer transition-all duration-100"
              style={{ height: 40, fontSize: 14, lineHeight: '20px' }}
            >
              Forgot password?
            </button>

            {/* 6. Divider */}
            <div className="flex items-center" style={{ gap: 12 }}>
              <div className="flex-1 h-px bg-surface-strong" />
              <span
                className="text-surface-weaker font-medium"
                style={{ fontSize: 14, lineHeight: '20px' }}
              >
                or
              </span>
              <div className="flex-1 h-px bg-surface-strong" />
            </div>

            {/* 7. Log in with code — secondary CTA */}
            <button
              onClick={onLoginWithCode}
              className="w-full rounded-[6px] font-medium text-accent bg-surface border border-accent hover:bg-accent-weakest cursor-pointer transition-all duration-100"
              style={{ height: 40, fontSize: 14, lineHeight: '20px' }}
            >
              Log in with code
            </button>

            {/* 8. Help text */}
            <p
              className="text-surface-weaker text-center"
              style={{ fontSize: 14, lineHeight: '20px', margin: 0 }}
            >
              We'll send a temporary login code to your email.
            </p>

          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="shrink-0 flex flex-col items-center py-4" style={{ gap: 16 }}>
        <div
          className="flex items-center justify-between w-full px-4 font-medium text-surface-weaker"
          style={{ fontSize: 14, lineHeight: '20px' }}
        >
          <span className="cursor-pointer">Privacy</span>
          <span className="cursor-pointer">Terms</span>
          <span className="cursor-pointer">Status</span>
          <span className="cursor-pointer">Support</span>
        </div>
        <div
          className="rounded-full bg-black opacity-40"
          style={{ width: 134, height: 5 }}
        />
      </footer>

    </div>
  )
}
