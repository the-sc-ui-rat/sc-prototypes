import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

const SC_FIELDS = [
  'Email', 'First Name', 'Last Name', 'Password', 'Status',
  'Seat Type', 'Permission Set', 'Groups', 'Sites',
]

const CSV_COLUMNS = [
  'Email', 'Phone Number', 'First Name', 'Last Name', 'Status', 'Password',
  'Language', 'Timezone', 'Seat Type', 'Permission Set', 'Groups', 'Sites',
  'Companies', 'External ID', 'Employee ID', 'Start date', 'Employee type',
  'Job title', 'Locations', 'Teams', 'Cost center', 'Department',
  'Business unit', 'External groups', 'Entities',
]

const AUTO_MAP: Record<string, string> = {
  'Email': 'Email',
  'First Name': 'First Name',
  'Last Name': 'Last Name',
  'Password': 'Password',
  'Status': 'Status',
  'Seat Type': 'Seat Type',
  'Permission Set': 'Permission Set',
  'Groups': 'Groups',
  'Sites': 'Sites',
}

export function MapColumnsStep() {
  const [mappings, setMappings] = useState<Record<string, string>>(AUTO_MAP)

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-[24px] font-semibold text-[#1f2533] mb-2">Map columns</h1>
      <p className="text-[14px] text-[#3f495a] mb-6 max-w-2xl">
        Match the columns in your CSV file to the corresponding labels in SafetyCulture. Blank fields won't be mapped, and updates will not be applied.
      </p>

      <div className="bg-white rounded-xl border border-[#dbe0eb] overflow-hidden">
        <div className="grid grid-cols-2 border-b border-[#dbe0eb] bg-[#f8f9fc] px-4 py-3">
          <span className="text-[11px] font-semibold text-[#545f70] uppercase tracking-wider">
            Label in SafetyCulture
          </span>
          <span className="text-[11px] font-semibold text-[#545f70] uppercase tracking-wider">
            Your column name
          </span>
        </div>

        {SC_FIELDS.map((field, i) => (
          <div
            key={field}
            className={`grid grid-cols-2 items-center px-4 py-3 ${
              i < SC_FIELDS.length - 1 ? 'border-b border-[#dbe0eb]' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <ChevronRight size={14} className="text-[#bfc6d4] shrink-0" />
              <span className="text-[14px] font-medium text-[#1f2533]">{field}</span>
            </div>

            <div className="relative max-w-[260px]">
              <select
                value={mappings[field] ?? ''}
                onChange={e => setMappings(m => ({ ...m, [field]: e.target.value }))}
                className="w-full appearance-none px-3 pr-8 h-9 text-[13px] text-[#1f2533] border border-[#bfc6d4] rounded-lg bg-white cursor-pointer focus:outline-none focus:border-[#675DF4] transition-colors"
              >
                <option value="">— not mapped —</option>
                {CSV_COLUMNS.map(col => (
                  <option key={col} value={col}>{col.toLowerCase()}</option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#909aad] pointer-events-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
