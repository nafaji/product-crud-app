import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const emptyForm = { name: '', shortName: '', isActive: true }

export default function UnitForm({ open, unit, onClose, onSubmit, isSaving }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (unit) {
      setForm({
        name: unit.name ?? '',
        shortName: unit.shortName ?? '',
        isActive: unit.isActive ?? true,
      })
    } else {
      setForm(emptyForm)
    }
    setErrors({})
  }, [unit, open])

  if (!open) return null

  const isEditing = Boolean(unit)

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.shortName.trim()) next.shortName = 'Short name is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    onSubmit({
      name: form.name.trim(),
      shortName: form.shortName.trim(),
      isActive: form.isActive,
    })
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-md bg-white border border-stone/20 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone/15 px-6 py-4">
          <h2 className="font-serif text-lg text-ink">
            {isEditing ? 'Edit unit' : 'Add unit'}
          </h2>
          <button onClick={onClose} className="text-stone hover:text-ink">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="unit-name">
              Unit name
            </label>
            <input
              id="unit-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
            />
            {errors.name && <p className="mt-1 text-xs text-rust">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="unit-short-name">
              Short name
            </label>
            <input
              id="unit-short-name"
              type="text"
              value={form.shortName}
              onChange={(e) => setForm({ ...form, shortName: e.target.value })}
              className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
            />
            {errors.shortName && <p className="mt-1 text-xs text-rust">{errors.shortName}</p>}
          </div>

          <div className="flex items-center justify-between rounded border border-stone/20 px-3 py-2">
            <span className="text-sm text-ink">Active</span>
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="h-4 w-4"
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
              {isSaving ? 'Saving…' : isEditing ? 'Save changes' : 'Add unit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
