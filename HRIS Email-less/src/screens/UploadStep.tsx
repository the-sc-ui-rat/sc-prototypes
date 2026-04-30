import { useState } from 'react'
import { Upload, FileText, ChevronDown, Check } from 'lucide-react'

type Props = { fileSelected: boolean; onSelect: () => void; onNext: () => void }

export function UploadStep({ fileSelected, onSelect, onNext }: Props) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-[24px] font-semibold text-[#1f2533] mb-2">Add or update users in bulk</h1>
      <p className="text-[14px] text-[#3f495a] mb-1 max-w-2xl">
        Upload a file to add new users or update existing ones. You can download your current user list to make changes, or start with a blank template.
      </p>
      <a href="#" className="text-[14px] text-[#4740d4] font-medium hover:underline mb-6 inline-block">
        Learn more
      </a>

      <div className="flex gap-3 mb-6">
        <button className="flex items-center gap-2 px-4 h-9 bg-[#675DF4] hover:bg-[#5C53DC] text-white text-[13px] font-semibold rounded-lg transition-colors">
          Download current users <ChevronDown size={14} />
        </button>
        <button className="flex items-center gap-2 px-4 h-9 border border-[#bfc6d4] text-[#3f495a] text-[13px] font-medium rounded-lg hover:bg-white transition-colors">
          Download empty template <ChevronDown size={14} />
        </button>
      </div>

      {fileSelected ? (
        <FileReady onNext={onNext} />
      ) : (
        <DropZone onSelect={onSelect} />
      )}
    </div>
  )
}

function DropZone({ onSelect }: { onSelect: () => void }) {
  const [dragging, setDragging] = useState(false)

  return (
    <div
      onClick={onSelect}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); onSelect() }}
      className={`cursor-pointer bg-white rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-20 gap-3 transition-colors ${
        dragging ? 'border-[#675DF4] bg-[#f4f3ff]' : 'border-[#dbe0eb] hover:border-[#675DF4]'
      }`}
    >
      <Upload size={36} className="text-[#675DF4]" strokeWidth={1.5} />
      <p className="text-[14px] text-[#3f495a]">
        Drag your file here{' '}
        <span className="text-[#4740d4] font-medium">or browse</span>
      </p>
    </div>
  )
}

function FileReady({ onNext }: { onNext: () => void }) {
  return (
    <div className="bg-white rounded-xl border-2 border-[#675DF4] flex flex-col items-center justify-center py-20 gap-4">
      <div className="flex items-center gap-3 px-5 py-3 bg-[#f4f3ff] rounded-xl border border-[#d4d0fc]">
        <FileText size={18} className="text-[#675DF4] shrink-0" />
        <span className="text-[13px] font-medium text-[#1f2533]">
          users_export_Mon Apr 20 2026.csv
        </span>
        <span className="text-[12px] text-[#909aad]">24 KB</span>
        <div className="w-5 h-5 rounded-full bg-[#675DF4] flex items-center justify-center shrink-0">
          <Check size={11} className="text-white" strokeWidth={2.5} />
        </div>
      </div>
      <p className="text-[13px] text-[#545f70]">File ready — click <strong>Next</strong> to continue</p>
    </div>
  )
}
