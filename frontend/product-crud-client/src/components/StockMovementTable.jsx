import { ArrowDownLeft, ArrowUpRight, RotateCcw } from 'lucide-react'

const formatDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString()
}

export default function StockMovementTable({ movements, isLoading }) {
  if (isLoading) {
    return (
      <div className="border border-stone/20 divide-y divide-stone/10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-14 animate-pulse bg-stone/5" />
        ))}
      </div>
    )
  }

  if (movements.length === 0) {
    return (
      <div className="border border-dashed border-stone/30 py-16 flex flex-col items-center text-center">
        <RotateCcw className="h-8 w-8 text-stone mb-3" />
        <p className="text-ink font-medium">No stock movements found</p>
        <p className="text-sm text-stone mt-1">Record an inventory movement to track product activity.</p>
      </div>
    )
  }

  const typeStyles = {
    IN: 'bg-emerald-100 text-emerald-700',
    OUT: 'bg-amber-100 text-amber-700',
    ADJUSTMENT: 'bg-sky-100 text-sky-700',
  }

  return (
    <div className="border border-stone/20 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-stone/20 text-left text-stone">
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium text-right">Quantity</th>
            <th className="px-4 py-3 font-medium">Reference</th>
            <th className="px-4 py-3 font-medium hidden lg:table-cell">Notes</th>
            <th className="px-4 py-3 font-medium hidden xl:table-cell">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone/10">
          {movements.map((movement) => {
            const isPositive = Number(movement.quantity) >= 0
            const productCode = movement.product?.productCode ?? ''
            const productName = movement.product?.name ?? '—'
            return (
              <tr key={movement.id} className="hover:bg-ledger/5 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-mono text-stone text-xs uppercase tracking-wide">
                      {productCode || '—'}
                    </span>
                    <span className="font-medium text-ink">{productName}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${typeStyles[movement.type] ?? 'bg-stone-100 text-stone-700'}`}>
                    {movement.type === 'IN' && <ArrowDownLeft className="h-3 w-3" />}
                    {movement.type === 'OUT' && <ArrowUpRight className="h-3 w-3" />}
                    {movement.type === 'ADJUSTMENT' && <RotateCcw className="h-3 w-3" />}
                    {movement.type}
                  </span>
                </td>
                <td className={`px-4 py-3 text-right font-mono ${isPositive ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {isPositive ? '+' : ''}{movement.quantity}
                </td>
                <td className="px-4 py-3 text-stone">{movement.reference || '—'}</td>
                <td className="px-4 py-3 text-stone hidden lg:table-cell">{movement.notes || '—'}</td>
                <td className="px-4 py-3 text-stone hidden xl:table-cell">{formatDate(movement.createdAt)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
