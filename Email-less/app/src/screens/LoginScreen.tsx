import { useState } from 'react'
import { X } from 'lucide-react'

export interface LoginScreenProps {
  onContinue?: (username: string) => void
  onForgot?: () => void
  demoError?: boolean
  demoDisabled?: boolean
}

export function LoginScreen({ onContinue, onForgot, demoError = false, demoDisabled = false }: LoginScreenProps) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  function handleContinue() {
    if (!username || loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onContinue?.(username)
    }, 1000)
  }

  const inputCls = [
    'w-full rounded-[6px] border outline-none',
    'transition-all duration-100',
    'placeholder:text-surface-placeholder',
    demoDisabled
      ? 'bg-surface-disabled border-surface-disabled text-surface-disabled cursor-not-allowed'
      : demoError
        ? 'bg-surface border-negative text-surface cursor-text hover:border-negative focus:border-negative focus:shadow-[0_0_0_3px_rgba(204,51,64,0.15)]'
        : 'bg-surface border-surface text-surface cursor-text hover:border-surface-strong focus:border-accent focus:shadow-[0_0_0_3px_rgba(101,89,255,0.15)]',
  ].join(' ')

  const primaryCls = [
    'w-full rounded-[6px] font-medium text-on-accent border-0',
    'transition-all duration-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'flex items-center justify-center',
    demoDisabled
      ? 'bg-surface-placeholder cursor-not-allowed'
      : loading
        ? 'bg-accent-weakest cursor-not-allowed'
        : demoError
          ? 'bg-negative hover:bg-negative-hover cursor-pointer active:bg-negative-active focus-visible:ring-negative'
          : 'bg-accent hover:bg-accent-hover cursor-pointer active:bg-accent-active focus-visible:ring-focus',
  ].join(' ')

  const tertiaryCls = [
    'w-full rounded-[6px] bg-transparent border-0 font-medium',
    'transition-all duration-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    demoDisabled
      ? 'text-surface-placeholder cursor-not-allowed'
      : demoError
        ? 'text-negative hover:bg-negative-weakest cursor-pointer focus-visible:ring-negative'
        : 'text-accent hover:bg-accent-weakest cursor-pointer focus-visible:ring-focus',
  ].join(' ')

  return (
    <div className="min-h-screen flex flex-col bg-base">
      <header className="shrink-0 bg-surface">
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
        <div className="flex items-center px-4 h-10">
          <button className="flex items-center justify-center w-6 h-6 bg-transparent border-0 cursor-pointer text-surface" aria-label="Close">
            <X size={20} strokeWidth={2} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="flex flex-col w-[370px]" style={{ gap: 24 }}>
          <img src="/Logo.png" alt="SafetyCulture" style={{ width: 137, height: 24, objectFit: 'contain', objectPosition: 'left' }} />
          <div className="bg-surface rounded-[8px] flex flex-col w-full" style={{ paddingTop: 24, paddingBottom: 40, paddingLeft: 16, paddingRight: 16, gap: 24, boxShadow: '0px 2.4px 8px rgba(0,0,0,0.06), 0px 14px 28px rgba(0,0,0,0.16)' }}>
            <h1 className="text-surface font-bold w-full" style={{ fontSize: 24, lineHeight: '32px', letterSpacing: '-0.5px' }}>Log in</h1>
            <div className="flex flex-col w-full" style={{ gap: 4 }}>
              <label htmlFor="identifier" className="font-medium" style={{ fontSize: 14, lineHeight: '20px', color: demoError ? 'var(--text-color-negative)' : 'var(--text-color-surface)' }}>Email or username</label>
              <input id="identifier" type="text" disabled={demoDisabled} placeholder="" value={username} onChange={e => setUsername(e.target.value)} className={inputCls} style={{ height: 40, paddingLeft: 12, paddingRight: 12, fontSize: 14, lineHeight: '20px' }} />
              {demoError && <p className="text-negative font-normal" style={{ fontSize: 12, lineHeight: '16px', margin: 0 }}>Please enter a valid email or username</p>}
            </div>
            <button disabled={demoDisabled || loading} onClick={handleContinue} className={primaryCls} style={{ height: 40, fontSize: 14, lineHeight: '20px' }}>
              {loading ? (
                <span className="flex items-center justify-center gap-[5px]" aria-label="Loading">
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ display: 'block', borderRadius: '50%', backgroundColor: 'var(--color-accent)', width: i === 0 ? 6 : i === 1 ? 9 : 12, height: i === 0 ? 6 : i === 1 ? 9 : 12, animation: 'loading-dot 1s ease-in-out infinite', animationDelay: `${i * 0.15}s` }} />
                  ))}
                </span>
              ) : 'Continue'}
            </button>
            <button disabled={demoDisabled} onClick={onForgot} className={tertiaryCls} style={{ height: 40, fontSize: 14, lineHeight: '20px' }}>Forgot username?</button>
          </div>
        </div>
      </main>

      <footer className="shrink-0 flex flex-col items-center py-4" style={{ gap: 16 }}>
        <div className="flex items-center justify-between w-full px-4 font-medium text-surface-weaker" style={{ fontSize: 14, lineHeight: '20px' }}>
          <span className="cursor-pointer">Privacy</span>
          <span className="cursor-pointer">Terms</span>
          <span className="cursor-pointer">Status</span>
          <span className="cursor-pointer">Support</span>
        </div>
        <div className="rounded-full bg-black opacity-40" style={{ width: 134, height: 5 }} />
      </footer>
    </div>
  )
}
