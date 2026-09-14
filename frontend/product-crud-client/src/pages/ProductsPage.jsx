import React from 'react'
import { Plus, PackageX } from 'lucide-react'
import ProductTable from '../components/ProductTable.jsx'

export default function ProductsPage({ products, isLoading, search, onAdd, onEdit, onDelete }) {
  const filteredProducts = React.useMemo(() => {
    if (!search.trim()) return products
    const q = search.trim().toLowerCase()
    return products.filter((p) => {
      const categoryName = p.category?.name ?? ''
      const unitName = p.unit?.name ?? ''
      const supplierName = p.supplier?.name ?? ''
      return (
        p.name.toLowerCase().includes(q) ||
        (p.productCode ?? '').toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q) ||
        categoryName.toLowerCase().includes(q) ||
        unitName.toLowerCase().includes(q) ||
        supplierName.toLowerCase().includes(q)
      )
    })
  }, [products, search])

  const lowStockItems = React.useMemo(
    () =>
      products.filter(
        (p) => Number(p.openingStock ?? 0) <= Number(p.minimumStockLevel ?? 0),
      ),
    [products],
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-ink">Products</h2>
          <p className="text-sm text-stone">Manage inventory items and stock levels.</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-ledger hover:bg-ledgerDark transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add product
        </button>
      </div>

      {lowStockItems.length > 0 && !isLoading && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-800">Low-stock alerts</p>
              <p className="text-xs text-amber-700">
                {lowStockItems.length} item{lowStockItems.length > 1 ? 's are' : ' is'} below their minimum stock level.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-amber-800">
              {lowStockItems.slice(0, 5).map((item) => (
                <span key={item.id} className="rounded-full border border-amber-200 bg-white px-2 py-1">
                  {item.name} ({item.openingStock ?? 0})
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 && !isLoading ? (
        <div className="border border-dashed border-stone/30 py-16 flex flex-col items-center text-center">
          <PackageX className="h-8 w-8 text-stone mb-3" />
          <p className="text-ink font-medium">No products match this view</p>
          <p className="text-sm text-stone mt-1">Add a product or adjust your search.</p>
        </div>
      ) : (
        <ProductTable products={filteredProducts} isLoading={isLoading} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  )
}
