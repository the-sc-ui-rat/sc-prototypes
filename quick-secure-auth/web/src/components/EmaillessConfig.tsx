import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Copy, Check, Download } from "lucide-react"
import { toast } from "sonner"
import type { LoginURL } from "../state/org-config"

interface EmaillessConfigProps {
  loginURL: LoginURL
  disabled?: boolean
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  toast.success("Copied!")
}

function downloadQR(orgId: string) {
  const svg = document.querySelector("#qr-code-preview svg")
  if (!svg) return
  const svgStr = new XMLSerializer().serializeToString(svg)
  const blob = new Blob([svgStr], { type: "image/svg+xml" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `login-qr-${orgId}.svg`
  a.click()
  URL.revokeObjectURL(url)
  toast.success("QR code downloaded")
}

export function EmaillessConfig({ loginURL, disabled }: EmaillessConfigProps) {
  const [copiedId, setCopiedId] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleCopyId = () => {
    copyToClipboard(loginURL.orgId)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  const handleCopyLink = () => {
    copyToClipboard(loginURL.url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className={`space-y-4 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <div>
        <label className="text-xs font-semibold text-text-weak mb-1.5 block">
          Organisation ID
        </label>
        <div className="flex items-center gap-2 rounded-[6px] border border-border bg-surface px-3 h-9">
          <span className="flex-1 text-sm text-text-default">{loginURL.orgId}</span>
          <button
            onClick={handleCopyId}
            disabled={disabled}
            className={`text-text-weak hover:text-text-default ${disabled ? "pointer-events-none" : ""}`}
          >
            {copiedId ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <p className="text-xs text-text-weak mt-1.5 leading-4">
          Add this ID to your MDM provisioning profile, or share it with workers who set up their own devices.
        </p>
      </div>

      <div className="rounded-lg border border-card-border p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="text-sm font-semibold text-text-default">
              Share with your front-line workers
            </div>
            <p className="text-[13px] text-accent break-all">{loginURL.url}</p>
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                disabled={disabled}
                className={`inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors ${disabled ? "pointer-events-none" : ""}`}
              >
                {copiedLink ? <Check size={16} /> : <Copy size={16} />}
                {copiedLink ? "Copied!" : "Copy link"}
              </button>
              <button
                onClick={() => downloadQR(loginURL.orgId)}
                disabled={disabled}
                className={`inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-default hover:bg-bg transition-colors ${disabled ? "pointer-events-none" : ""}`}
              >
                <Download size={16} />
                Download QR code
              </button>
            </div>
          </div>
          <div id="qr-code-preview" className="shrink-0 max-w-[80px] max-h-[80px]">
            <QRCodeSVG value={loginURL.url} size={80} className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}
