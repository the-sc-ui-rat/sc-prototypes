import { useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { UploadStep } from './UploadStep'
import { MapColumnsStep } from './MapColumnsStep'
import { ReviewStep } from './ReviewStep'
import { SummaryRedesign } from './SummaryRedesign'

type Step = 1 | 2 | 3 | 4

const LABELS = ['Upload', 'Map columns', 'Review', 'Summary'] as const

export function ImportFlow() {
  const [step, setStep] = useState<Step>(1)
  const [fileSelected, setFileSelected] = useState(false)

  const next = () => setStep(s => (s < 4 ? s + 1 : 4) as Step)
  const back = () => setStep(s => (s > 1 ? s - 1 : 1) as Step)

  if (step === 4) return <SummaryRedesign onBack={back} />

  return (
    <div className="min-h-screen bg-[#e9edf6] flex flex-col">
      <TopNav
        step={step}
        onBack={back}
        onNext={next}
        nextDisabled={step === 1 && !fileSelected}
      />
      <div className="flex-1">
        {step === 1 && (
          <UploadStep fileSelected={fileSelected} onSelect={() => setFileSelected(true)} onNext={next} />
        )}
        {step === 2 && <MapColumnsStep />}
        {step === 3 && <ReviewStep />}
      </div>
    </div>
  )
}

function TopNav({ step, onBack, onNext, nextDisabled }: {
  step: Step; onBack: () => void; onNext: () => void; nextDisabled: boolean
}) {
  return (
    <div className="bg-white border-b border-[#dbe0eb] h-[56px] flex items-center px-6 shrink-0">
      <button className="text-[14px] font-medium text-[#3f495a] hover:text-[#1f2533] transition-colors w-[72px]">
        Cancel
      </button>
      <div className="flex-1 flex justify-center">
        <Stepper step={step} />
      </div>
      <div className="flex items-center gap-2 w-[144px] justify-end">
        <button
          onClick={onBack}
          disabled={step === 1}
          className="px-4 h-8 text-[13px] font-medium text-[#3f495a] border border-[#bfc6d4] rounded-lg hover:bg-[#f8f9fc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="px-4 h-8 bg-[#675DF4] hover:bg-[#5C53DC] disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13px] font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
        >
          Next <ArrowRight size={13} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

function Stepper({ step }: { step: Step }) {
  return (
    <div className="flex items-center">
      {LABELS.map((label, i) => {
        const n = (i + 1) as Step
        const done = step > n
        const active = step === n
        return (
          <div key={n} className="flex items-center">
            {i > 0 && (
              <div className={`w-10 h-px mx-2 ${step > i ? 'bg-[#675DF4]' : 'bg-[#dbe0eb]'}`} />
            )}
            <div className="flex flex-col items-center gap-[3px]">
              <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                done || active ? 'bg-[#675DF4] text-white' : 'border-[1.5px] border-[#bfc6d4] text-[#909aad]'
              }`}>
                {done ? <Check size={11} strokeWidth={2.5} /> : n}
              </div>
              <span className={`text-[9px] font-semibold whitespace-nowrap uppercase tracking-wide ${
                active ? 'text-[#1f2533]' : done ? 'text-[#675DF4]' : 'text-[#909aad]'
              }`}>
                {label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
