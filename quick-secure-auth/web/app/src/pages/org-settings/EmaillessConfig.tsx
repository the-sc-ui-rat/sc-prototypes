import React, { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Copy, Check, ArrowDownToBracket } from "@safetyculture/icons-react"
import { toast } from "sonner"
import { Button } from "../../../../src/ds/button"
import type { ORG_LOGIN_URL } from "./config"

type LoginURL = typeof ORG_LOGIN_URL

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

export function EmaillessConfig({ loginURL, disabled }: { loginURL: LoginURL; disabled?: boolean }) {
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
    <div className={`flex flex-col gap-4 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <div>
        <label className="body-xs font-semibold text-surface-weaker mb-1.5 block">
          Organisation ID
        </label>
        <div className="flex items-center gap-2 rounded-sm border border-surface-default bg-surface-default px-3 h-10">
          <span className="flex-1 body-sm text-surface-default">{loginURL.orgId}</span>
          <button
            onClick={handleCopyId}
            disabled={disabled}
            className="text-surface-weaker hover:text-surface-default disabled:pointer-events-none"
          >
            {copiedId ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <p className="body-xs text-surface-weaker mt-1.5 leading-4">
          Share this ID with staff who log in without an email address — they'll enter it on the login screen.
        </p>
      </div>

      <div className="rounded-md border border-surface-weakest p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <div className="body-sm font-semibold text-surface-default">Share login with your users</div>
            <p className="body-xs text-accent-default break-all">{loginURL.url}</p>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="medium"
                leftIcon={copiedLink ? <Check /> : <Copy />}
                onClick={handleCopyLink}
                disabled={disabled}
              >
                {copiedLink ? "Copied!" : "Copy link"}
              </Button>
              <Button
                variant="secondary"
                size="medium"
                leftIcon={<ArrowDownToBracket />}
                onClick={() => downloadQR(loginURL.orgId)}
                disabled={disabled}
              >
                Download QR code
              </Button>
            </div>
          </div>
          <div id="qr-code-preview" className="shrink-0">
            <QRCodeSVG value={loginURL.url} size={80} />
          </div>
        </div>
      </div>

      <a href="#" className="body-xs text-accent-default underline">
        Learn how to deploy this login link to devices via MDM
      </a>
    </div>
  )
}
