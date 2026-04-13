import { ExternalLink, X } from 'lucide-react'

export interface ForgotScreenProps {
  onReturn?: () => void
}

export function ForgotScreen({ onReturn }: ForgotScreenProps) {
  const primaryCls = [
    'w-full rounded-[6px] font-medium text-on-accent border-0',
    'bg-accent hover:bg-accent-hover cursor-pointer active:bg-accent-active',
    'transition-all duration-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus',
  ].join(' ')

  const tertiaryCls = [
    'w-full rounded-[6px] bg-transparent border-0 font-medium',
    'text-accent hover:bg-accent-weakest cursor-pointer',
    'flex items-center justify-center gap-[6px]',
    'transition-all duration-100',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus',
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
          <button className="flex items-center justify-center w-6 h-6 bg-transparent border-0 cursor-pointer text-accent" aria-label="Close">
            <X size={20} strokeWidth={2} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="flex flex-col w-[370px]" style={{ gap: 24 }}>
          <img src="/Logo.png" alt="SafetyCulture" style={{ width: 137, height: 24, objectFit: 'contain', objectPosition: 'left' }} />
          <div className="bg-surface rounded-[8px] w-full" style={{ paddingTop: 24, paddingBottom: 40, paddingLeft: 16, paddingRight: 16, boxShadow: '0px 2.4px 8px rgba(0,0,0,0.06), 0px 14px 28px rgba(0,0,0,0.16)' }}>
            <div className="flex flex-col" style={{ gap: 24 }}>
              <div className="flex flex-col items-center text-center" style={{ gap: 8 }}>
                <h1 className="text-surface font-bold w-full" style={{ fontSize: 24, lineHeight: '32px', letterSpacing: '-0.5px' }}>Forgot username or password?</h1>
                <p className="font-medium text-surface-weaker w-full" style={{ fontSize: 14, lineHeight: '20px' }}>As you don't have an email associated with your account, please contact your system administrator.</p>
              </div>
              <div className="flex flex-col w-full" style={{ gap: 11 }}>
                <button onClick={onReturn} className={primaryCls} style={{ height: 40, fontSize: 14, lineHeight: '20px' }}>Return to login</button>
                <button className={tertiaryCls} style={{ height: 40, fontSize: 14, lineHeight: '20px' }}>Learn more <ExternalLink size={14} strokeWidth={2} /></button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="shrink-0 flex items-end justify-center pb-2" style={{ height: 34 }}>
        <div className="rounded-full bg-black opacity-40" style={{ width: 134, height: 5 }} />
      </div>
    </div>
  )
}
