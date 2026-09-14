import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const emptyForm = {
  productCode: '',
  name: '',
  description: '',
  categoryId: '',
  unitId: '',
  supplierId: '',
  purchasePrice: '',
  sellingPrice: '',
  openingStock: '',
  minimumStockLevel: '',
  isActive: true,
}

export default function ProductForm({ open, product, categories = [], units = [], suppliers = [], onClose, onSubmit, isSaving }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (product) {
      setForm({
        productCode: product.productCode ?? '',
        name: product.name ?? '',
        description: product.description ?? '',
        categoryId: product.categoryId ?? '',
        unitId: product.unitId ?? '',
        supplierId: product.supplierId ?? product.supplier?.id ?? '',
        purchasePrice: product.purchasePrice != null ? String(product.purchasePrice) : '',
        sellingPrice: product.sellingPrice != null ? String(product.sellingPrice) : '',
        openingStock: product.openingStock != null ? String(product.openingStock) : '',
        minimumStockLevel: product.minimumStockLevel != null ? String(product.minimumStockLevel) : '',
        isActive: product.isActive ?? true,
      })
    } else {
      setForm({
        ...emptyForm,
        categoryId: categories[0]?.id ?? '',
        unitId: units[0]?.id ?? '',
        supplierId: suppliers[0]?.id ?? '',
      })
    }
    setErrors({})
  }, [product, open, categories, units, suppliers])

  if (!open) return null

  const isEditing = Boolean(product)

  const validate = () => {
    const next = {}
    if (!form.productCode.trim()) next.productCode = 'Product code is required.'
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.categoryId) next.categoryId = 'Select a category.'
    if (!form.unitId) next.unitId = 'Select a unit.'
    if (form.purchasePrice === '' || Number(form.purchasePrice) < 0) next.purchasePrice = 'Enter a valid purchase price.'
    if (form.sellingPrice === '' || Number(form.sellingPrice) < 0) next.sellingPrice = 'Enter a valid selling price.'
    if (form.openingStock === '' || Number(form.openingStock) < 0) next.openingStock = 'Enter a valid opening stock.'
    if (form.minimumStockLevel === '' || Number(form.minimumStockLevel) < 0) next.minimumStockLevel = 'Enter a valid minimum stock level.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    onSubmit({
      productCode: form.productCode.trim(),
      name: form.name.trim(),
      description: form.description.trim() || null,
      categoryId: form.categoryId,
      unitId: form.unitId,
      supplierId: form.supplierId || null,
      purchasePrice: Number(form.purchasePrice),
      sellingPrice: Number(form.sellingPrice),
      openingStock: Number(form.openingStock),
      minimumStockLevel: Number(form.minimumStockLevel),
      isActive: form.isActive,
    })
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 px-4 overflow-y-auto py-8">
      <div className="w-full max-w-2xl bg-white border border-stone/20 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone/15 px-6 py-4">
          <h2 className="font-serif text-lg text-ink">
            {isEditing ? 'Edit product' : 'Add product'}
          </h2>
          <button onClick={onClose} className="text-stone hover:text-ink">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-ink mb-1" htmlFor="productCode">
                Product code
              </label>
              <input
                id="productCode"
                type="text"
                value={form.productCode}
                onChange={(e) => setForm({ ...form, productCode: e.target.value })}
                className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
                placeholder="P-1005"
              />
              {errors.productCode && <p className="mt-1 text-xs text-rust">{errors.productCode}</p>}
            </div>

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
                placeholder="Wireless Mouse"
              />
              {errors.name && <p className="mt-1 text-xs text-rust">{errors.name}</p>}
            </div>
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
              placeholder="Optional details"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-ink mb-1" htmlFor="categoryId">
                Category
              </label>
              <select
                id="categoryId"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              {errors.categoryId && <p className="mt-1 text-xs text-rust">{errors.categoryId}</p>}
            </div>

            <div>
              <label className="block text-sm text-ink mb-1" htmlFor="unitId">
                Unit
              </label>
              <select
                id="unitId"
                value={form.unitId}
                onChange={(e) => setForm({ ...form, unitId: e.target.value })}
                className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
              >
                <option value="">Select unit</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.shortName})</option>
                ))}
              </select>
              {errors.unitId && <p className="mt-1 text-xs text-rust">{errors.unitId}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm text-ink mb-1" htmlFor="supplierId">
              Supplier
            </label>
            <select
              id="supplierId"
              value={form.supplierId}
              onChange={(e) => setForm({ ...form, supplierId: e.target.value })}
              className="w-full border border-stone/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
            >
              <option value="">No supplier selected</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-ink mb-1" htmlFor="purchasePrice">
                Purchase price
              </label>
              <input
                id="purchasePrice"
                type="number"
                step="0.01"
                min="0"
                value={form.purchasePrice}
                onChange={(e) => setForm({ ...form, purchasePrice: e.target.value })}
                className="w-full border border-stone/30 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
                placeholder="0.00"
              />
              {errors.purchasePrice && <p className="mt-1 text-xs text-rust">{errors.purchasePrice}</p>}
            </div>

            <div>
              <label className="block text-sm text-ink mb-1" htmlFor="sellingPrice">
                Selling price
              </label>
              <input
                id="sellingPrice"
                type="number"
                step="0.01"
                min="0"
                value={form.sellingPrice}
                onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })}
                className="w-full border border-stone/30 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
                placeholder="0.00"
              />
              {errors.sellingPrice && <p className="mt-1 text-xs text-rust">{errors.sellingPrice}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-ink mb-1" htmlFor="openingStock">
                Opening stock
              </label>
              <input
                id="openingStock"
                type="number"
                step="0.01"
                min="0"
                value={form.openingStock}
                onChange={(e) => setForm({ ...form, openingStock: e.target.value })}
                className="w-full border border-stone/30 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
                placeholder="0"
              />
              {errors.openingStock && <p className="mt-1 text-xs text-rust">{errors.openingStock}</p>}
            </div>

            <div>
              <label className="block text-sm text-ink mb-1" htmlFor="minimumStockLevel">
                Minimum stock level
              </label>
              <input
                id="minimumStockLevel"
                type="number"
                step="0.01"
                min="0"
                value={form.minimumStockLevel}
                onChange={(e) => setForm({ ...form, minimumStockLevel: e.target.value })}
                className="w-full border border-stone/30 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
                placeholder="0"
              />
              {errors.minimumStockLevel && <p className="mt-1 text-xs text-rust">{errors.minimumStockLevel}</p>}
            </div>
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
              {isSaving ? 'Saving…' : isEditing ? 'Save changes' : 'Add product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
