import { Pencil, Trash2, PackageX } from 'lucide-react'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default function ProductTable({ products, isLoading, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className="border border-stone/20 divide-y divide-stone/10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-14 animate-pulse bg-stone/5" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="border border-dashed border-stone/30 py-16 flex flex-col items-center text-center">
        <PackageX className="h-8 w-8 text-stone mb-3" />
        <p className="text-ink font-medium">No items match this view</p>
        <p className="text-sm text-stone mt-1">Add a product or adjust your search.</p>
      </div>
    )
  }

  return (
    <div className="border border-stone/20 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-stone/20 text-left text-stone">
            <th className="px-4 py-3 font-medium">Code</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
            <th className="px-4 py-3 font-medium hidden lg:table-cell">Unit</th>
            <th className="px-4 py-3 font-medium hidden xl:table-cell">Supplier</th>
            <th className="px-4 py-3 font-medium text-right">Purchase</th>
            <th className="px-4 py-3 font-medium text-right">Selling</th>
            <th className="px-4 py-3 font-medium text-right">Stock</th>
            <th className="px-4 py-3 font-medium w-24 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone/10">
          {products.map((p) => {
            const stockLevel = Number(p.openingStock ?? 0)
            const minimumStock = Number(p.minimumStockLevel ?? 0)
            const isLowStock = stockLevel <= minimumStock

            return (
              <tr key={p.id} className="hover:bg-ledger/5 transition-colors">
                <td className="px-4 py-3 font-mono text-stone">{p.productCode}</td>
                <td className="px-4 py-3 text-ink font-medium">{p.name}</td>
                <td className="px-4 py-3 text-stone hidden md:table-cell">{p.category?.name ?? '—'}</td>
                <td className="px-4 py-3 text-stone hidden lg:table-cell">{p.unit?.shortName ?? '—'}</td>
                <td className="px-4 py-3 text-stone hidden xl:table-cell">{p.supplier?.name ?? '—'}</td>
                <td className="px-4 py-3 text-right font-mono text-ink">{currency.format(p.purchasePrice ?? 0)}</td>
                <td className="px-4 py-3 text-right font-mono text-ink">{currency.format(p.sellingPrice ?? 0)}</td>
                <td className="px-4 py-3 text-right font-mono">
                  <div className="flex items-center justify-end gap-2">
                    <span
                      className={
                        stockLevel === 0
                          ? 'text-rust'
                          : isLowStock
                          ? 'text-amber-600'
                          : 'text-ink'
                      }
                    >
                      {p.openingStock ?? 0}
                    </span>
                    {isLowStock && (
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                        Low
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => onEdit(p)}
                    className="p-1.5 text-stone hover:text-ledger hover:bg-ledger/10 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    className="p-1.5 text-stone hover:text-rust hover:bg-rust/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
