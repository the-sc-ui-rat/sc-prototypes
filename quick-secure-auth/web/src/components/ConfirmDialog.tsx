interface ConfirmDialogProps {
  title: string
  body: string
  confirmLabel: string
  confirmVariant: "accent" | "danger"
  onConfirm: () => void
  onCancel: () => void
}

const VARIANT_CLASSES = {
  accent: "bg-accent hover:bg-accent-hover",
  danger: "bg-[#cc3340] hover:bg-[#b32d38]",
}

export function ConfirmDialog({
  title,
  body,
  confirmLabel,
  confirmVariant,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-[12px] shadow-lg w-[480px] p-6 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-text-default">{title}</h2>
        <p className="text-sm text-text-weak mt-2">{body}</p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-[8px] border border-border text-text-weak text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-[8px] text-white text-sm font-medium ${VARIANT_CLASSES[confirmVariant]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
