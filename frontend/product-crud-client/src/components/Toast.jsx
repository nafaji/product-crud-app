import { useEffect } from 'react'
import { AlertTriangle, CheckCircle2, XCircle, X } from 'lucide-react'

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => onDismiss(), 3200)
    return () => clearTimeout(timer)
  }, [toast, onDismiss])

  if (!toast) return null

  const isError = toast.type === 'error'
  const isWarning = toast.type === 'warning'

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`flex items-start gap-3 rounded-sm border px-4 py-3 shadow-lg max-w-sm bg-white ${
          isError ? 'border-rust/40' : isWarning ? 'border-amber-400' : 'border-ledger/40'
        }`}
      >
        {isError ? (
          <XCircle className="h-5 w-5 shrink-0 text-rust" />
        ) : isWarning ? (
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
        ) : (
          <CheckCircle2 className="h-5 w-5 shrink-0 text-ledger" />
        )}
        <p className="text-sm text-ink leading-snug">{toast.message}</p>
        <button onClick={onDismiss} className="ml-auto text-stone hover:text-ink">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
