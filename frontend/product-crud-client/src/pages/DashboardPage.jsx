import React from 'react'
import { Package, Tags, Warehouse, TrendingUp } from 'lucide-react'
import StockMovementChart from '../components/StockMovementChart.jsx'

export default function DashboardPage({ products = [], categories = [], suppliers = [], stockMovements = [], isLoading }) {
  const lowStockProducts = React.useMemo(
    () => products.filter((product) => Number(product.openingStock ?? 0) <= Number(product.minimumStockLevel ?? 0)),
    [products],
  )

  const reorderSuggestions = React.useMemo(
    () =>
      products
        .filter((product) => Number(product.openingStock ?? 0) <= Number(product.minimumStockLevel ?? 0))
        .map((product) => ({
          id: product.id,
          name: product.name,
          code: product.productCode,
          current: Number(product.openingStock ?? 0),
          minimum: Number(product.minimumStockLevel ?? 0),
          suggestedQty: Math.max(Number(product.minimumStockLevel ?? 0) - Number(product.openingStock ?? 0) + 10, 10),
        })),
    [products],
  )

  const dashboardStats = React.useMemo(
    () => [
      {
        label: 'Total products',
        value: products.length,
        icon: Package,
        accent: 'bg-ledger/10 text-ledger',
      },
      {
        label: 'Low stock',
        value: lowStockProducts.length,
        icon: TrendingUp,
        accent: 'bg-amber-100 text-amber-700',
      },
      {
        label: 'Categories',
        value: categories.length,
        icon: Tags,
        accent: 'bg-sky-100 text-sky-700',
      },
      {
        label: 'Suppliers',
        value: suppliers.length,
        icon: Warehouse,
        accent: 'bg-violet-100 text-violet-700',
      },
    ],
    [categories.length, lowStockProducts.length, products.length, suppliers.length],
  )

  const stockMovementSummary = React.useMemo(() => {
    const totals = { IN: 0, OUT: 0, ADJUSTMENT: 0 }

    stockMovements.forEach((movement) => {
      const type = movement.type ?? 'ADJUSTMENT'
      if (totals[type] !== undefined) {
        totals[type] += Number(movement.quantity ?? 0)
      }
    })

    return [
      { label: 'IN', value: totals.IN },
      { label: 'OUT', value: totals.OUT },
      { label: 'ADJUSTMENT', value: totals.ADJUSTMENT },
    ]
  }, [stockMovements])

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl border border-stone/20 bg-stone/5" />
          ))}
        </div>
        <div className="h-48 animate-pulse rounded-2xl border border-stone/20 bg-stone/5" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map(({ label, value, icon: Icon, accent }) => (
          <div key={label} className="rounded-2xl border border-stone/20 bg-paper p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">{label}</p>
                <p className="mt-3 text-2xl font-semibold text-ink">{value}</p>
              </div>
              <div className={`rounded-xl p-2.5 ${accent}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {reorderSuggestions.length > 0 && (
        <div className="mb-5 rounded-2xl border border-sky-200 bg-sky-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-700">Reorder suggestions</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">Restock recommendations</h3>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {reorderSuggestions.slice(0, 6).map((item) => (
              <div key={item.id} className="rounded-xl border border-sky-200 bg-white p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.name}</p>
                    <p className="text-xs text-stone">{item.code}</p>
                  </div>
                  <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-700">
                    Reorder
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-stone">
                  <span>Current: {item.current}</span>
                  <span>Min: {item.minimum}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">Suggested: +{item.suggestedQty}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5">
        <StockMovementChart data={stockMovementSummary} />
      </div>
    </div>
  )
}
