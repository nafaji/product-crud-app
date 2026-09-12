import { AlertTriangle } from 'lucide-react'

export default function ConfirmDialog({ open, product, onCancel, onConfirm, isDeleting }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-sm bg-white border border-stone/20 shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-5 w-5 text-rust" />
            <h2 className="font-serif text-lg text-ink">Remove this item?</h2>
          </div>
          <p className="text-sm text-stone">
            {product?.name} will be permanently removed from the ledger. This cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-2 border-t border-stone/15 px-6 py-4">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 text-sm text-ink border border-stone/30 hover:bg-paper transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-sm text-white bg-rust hover:bg-rust/90 transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Removing…' : 'Remove item'}
          </button>
        </div>
      </div>
    </div>
  )
}
