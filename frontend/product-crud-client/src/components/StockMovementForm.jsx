import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const emptyForm = {
  productId: '',
  type: 'IN',
  quantity: '',
  reference: '',
  notes: '',
}

export default function StockMovementForm({ open, products = [], onClose, onSubmit, isSaving }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) {
      setForm({
        ...emptyForm,
        productId: products[0]?.id ?? '',
      })
      setErrors({})
    }
  }, [open, products])

  if (!open) return null

  const validate = () => {
    const next = {}
    if (!form.productId) next.productId = 'Select a product.'
    if (!form.type) next.type = 'Movement type is required.'
    if (form.quantity === '' || Number(form.quantity) <= 0) next.quantity = 'Quantity must be greater than 0.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    onSubmit({
      productId: form.productId,
      type: form.type,
      quantity: Number(form.quantity),
      reference: form.reference.trim() || null,
      notes: form.notes.trim() || null,
    })
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-lg bg-white border border-stone/20 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone/15 px-6 py-4">
          <h2 className="font-serif text-lg text-ink">Record stock movement</h2>
          <button onClick={onClose} className="text-stone hover:text-ink">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="movement-product">
              Product
            </label>
            <select
              id="movement-product"
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: e.target.value })}
              className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
            >
              <option value="">Select product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.productCode ? `${product.productCode} - ${product.name}` : product.name}
                </option>
              ))}
            </select>
            {errors.productId && <p className="mt-1 text-xs text-rust">{errors.productId}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-ink mb-1" htmlFor="movement-type">
                Type
              </label>
              <select
                id="movement-type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
              >
                <option value="IN">IN</option>
                <option value="OUT">OUT</option>
                <option value="ADJUSTMENT">ADJUSTMENT</option>
              </select>
              {errors.type && <p className="mt-1 text-xs text-rust">{errors.type}</p>}
            </div>

            <div>
              <label className="block text-sm text-ink mb-1" htmlFor="movement-quantity">
                Quantity
              </label>
              <input
                id="movement-quantity"
                type="number"
                min="0.01"
                step="0.01"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
                placeholder="0.00"
              />
              {errors.quantity && <p className="mt-1 text-xs text-rust">{errors.quantity}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="movement-reference">
              Reference
            </label>
            <input
              id="movement-reference"
              type="text"
              value={form.reference}
              onChange={(e) => setForm({ ...form, reference: e.target.value })}
              className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
              placeholder="PO-1054"
            />
          </div>

          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="movement-notes">
              Notes
            </label>
            <textarea
              id="movement-notes"
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full border border-stone/30 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
              placeholder="Optional details"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-ink border border-stone/30 hover:bg-paper transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-sm text-white bg-ledger hover:bg-ledgerDark transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving…' : 'Record movement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
