import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const emptyForm = { name: '', description: '', price: '', stock: '' }

export default function ProductForm({ open, product, onClose, onSubmit, isSaving }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name ?? '',
        description: product.description ?? '',
        price: String(product.price ?? ''),
        stock: String(product.stock ?? ''),
      })
    } else {
      setForm(emptyForm)
    }
    setErrors({})
  }, [product, open])

  if (!open) return null

  const isEditing = Boolean(product)

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (form.price === '' || Number(form.price) < 0) next.price = 'Enter a valid price.'
    if (form.stock === '' || Number(form.stock) < 0 || !Number.isInteger(Number(form.stock)))
      next.stock = 'Enter a whole number for stock.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      name: form.name.trim(),
      description: form.description.trim() || null,
      price: Number(form.price),
      stock: Number(form.stock),
    })
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-md bg-white border border-stone/20 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone/15 px-6 py-4">
          <h2 className="font-serif text-lg text-ink">
            {isEditing ? 'Edit item' : 'Add item to ledger'}
          </h2>
          <button onClick={onClose} className="text-stone hover:text-ink">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
              placeholder="e.g. Wireless Mouse"
            />
            {errors.name && <p className="mt-1 text-xs text-rust">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger resize-none"
              placeholder="Optional details about this item"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-ink mb-1" htmlFor="price">
                Price ($)
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border border-stone/30 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-xs text-rust">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm text-ink mb-1" htmlFor="stock">
                Stock
              </label>
              <input
                id="stock"
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full border border-stone/30 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
                placeholder="0"
              />
              {errors.stock && <p className="mt-1 text-xs text-rust">{errors.stock}</p>}
            </div>
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
              {isSaving ? 'Saving…' : isEditing ? 'Save changes' : 'Add item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
