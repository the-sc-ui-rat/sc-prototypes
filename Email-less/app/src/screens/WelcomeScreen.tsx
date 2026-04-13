export interface WelcomeScreenProps {
  onSignUp?: () => void
  onLogin?: () => void
}

// Figma asset URLs (expires in 7 days — replace with vendored assets if needed)
const IMG_ELLIPSE   = 'https://www.figma.com/api/mcp/asset/b9869f7a-3a25-4075-8f0e-ef284dbb18cf'
const IMG_CHAT_1    = 'https://www.figma.com/api/mcp/asset/455aace0-77c7-4d0d-8739-4c746ce49538'
const IMG_CHAT_2    = 'https://www.figma.com/api/mcp/asset/9a4df14f-9bba-4867-ab0c-3ed1ff3d075e'
const IMG_PERSON_1  = 'https://www.figma.com/api/mcp/asset/b2d35c78-986f-4af0-b95f-cd4a34239c3d'
const IMG_PERSON_2  = 'https://www.figma.com/api/mcp/asset/4bed7c14-bb0c-4414-9dfa-031dca9c1b2e'
const IMG_ORBIT     = 'https://www.figma.com/api/mcp/asset/09aa9eee-ff8b-465b-a76b-c7d068958b55'
const IMG_PLANE     = 'https://www.figma.com/api/mcp/asset/ee1e0c30-f96d-4246-896a-d40de7317245'

export function WelcomeScreen({ onSignUp, onLogin }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-base">

      {/* ── iOS status bar ─────────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between px-4 bg-base" style={{ height: 44, paddingTop: 14, paddingBottom: 14 }}>
        <span className="font-semibold text-black" style={{ fontSize: 15, lineHeight: '20px' }}>9:41</span>
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

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <div className="flex flex-col items-center w-full" style={{ gap: 16 }}>

          {/* Headline */}
          <h1
            className="text-center text-surface font-bold w-full"
            style={{ fontSize: 24, lineHeight: '32px', letterSpacing: '-0.5px', margin: 0 }}
          >
            Create checklists.<br />
            Conduct inspections<br />
            Generate and<br />
            share reports.
          </h1>

          {/* Illustration — fills the 16px-margin content width, square aspect ratio */}
          <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
            <img alt="" src={IMG_ELLIPSE} className="absolute" style={{ inset: '10.92% 10.92% 10.5% 10.5%' }} />
            <img alt="" src={IMG_CHAT_1} className="absolute" style={{ top: '8.82%', left: '16.81%', right: '73.15%', bottom: '82.17%' }} />
            <div className="absolute flex items-center justify-center" style={{ top: '17.29%', left: '71.34%', right: '18.61%', bottom: '73.7%' }}>
              <img alt="" src={IMG_CHAT_2} className="w-full h-full" style={{ transform: 'scaleY(-1) rotate(180deg)' }} />
            </div>
            <img alt="" src={IMG_PERSON_1} className="absolute" style={{ top: '13.16%', left: '9.24%', right: '25.05%', bottom: '10.5%' }} />
            <img alt="" src={IMG_PERSON_2} className="absolute" style={{ top: '22.04%', left: '46.22%', right: '8.59%', bottom: '10.5%' }} />
            <img alt="" src={IMG_ORBIT} className="absolute" style={{ top: '62.6%', left: '8.4%', right: '20.16%', bottom: '22.92%' }} />
            <div className="absolute flex items-center justify-center" style={{ top: '53.78%', left: '78.57%', right: '4.33%', bottom: '35.55%' }}>
              <img alt="" src={IMG_PLANE} className="w-full h-full object-contain" style={{ transform: 'rotate(-13.45deg)' }} />
            </div>
          </div>

        </div>
      </main>

      {/* ── CTAs ─────────────────────────────────────────────────────────────── */}
      <footer className="shrink-0 flex flex-col items-center py-4 px-4" style={{ gap: 16 }}>
        <div className="flex flex-col w-full" style={{ gap: 11 }}>
          <button
            onClick={onSignUp}
            className="w-full rounded-[6px] font-medium text-on-accent bg-accent hover:bg-accent-hover active:bg-accent-active border-0 cursor-pointer transition-all duration-100"
            style={{ height: 40, fontSize: 14, lineHeight: '20px' }}
          >
            Sign up for free
          </button>
          <button
            onClick={onLogin}
            className="w-full rounded-[6px] font-medium text-accent bg-surface border border-surface hover:bg-base cursor-pointer transition-all duration-100"
            style={{ height: 40, fontSize: 14, lineHeight: '20px' }}
          >
            Log in
          </button>
        </div>
        <div className="rounded-full bg-black opacity-40" style={{ width: 134, height: 5 }} />
      </footer>

    </div>
  )
}
