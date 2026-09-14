import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const emptyForm = {
  name: '',
  contactPerson: '',
  phone: '',
  email: '',
  address: '',
  isActive: true,
}

export default function SupplierForm({ open, supplier, onClose, onSubmit, isSaving }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (supplier) {
      setForm({
        name: supplier.name ?? '',
        contactPerson: supplier.contactPerson ?? '',
        phone: supplier.phone ?? '',
        email: supplier.email ?? '',
        address: supplier.address ?? '',
        isActive: supplier.isActive ?? true,
      })
    } else {
      setForm(emptyForm)
    }
    setErrors({})
  }, [supplier, open])

  if (!open) return null

  const isEditing = Boolean(supplier)

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Supplier name is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    onSubmit({
      name: form.name.trim(),
      contactPerson: form.contactPerson.trim() || null,
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      address: form.address.trim() || null,
      isActive: form.isActive,
    })
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-lg bg-white border border-stone/20 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone/15 px-6 py-4">
          <h2 className="font-serif text-lg text-ink">
            {isEditing ? 'Edit supplier' : 'Add supplier'}
          </h2>
          <button onClick={onClose} className="text-stone hover:text-ink">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="supplier-name">
              Supplier name
            </label>
            <input
              id="supplier-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
            />
            {errors.name && <p className="mt-1 text-xs text-rust">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-ink mb-1" htmlFor="supplier-contact">
                Contact person
              </label>
              <input
                id="supplier-contact"
                type="text"
                value={form.contactPerson}
                onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
              />
            </div>

            <div>
              <label className="block text-sm text-ink mb-1" htmlFor="supplier-phone">
                Phone
              </label>
              <input
                id="supplier-phone"
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="supplier-email">
              Email
            </label>
            <input
              id="supplier-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
            />
          </div>

          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="supplier-address">
              Address
            </label>
            <textarea
              id="supplier-address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={3}
              className="w-full border border-stone/30 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
            />
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
              {isSaving ? 'Saving…' : isEditing ? 'Save changes' : 'Add supplier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
