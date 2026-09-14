import { Plus, RotateCcw } from 'lucide-react'
import StockMovementTable from '../components/StockMovementTable.jsx'
import React from 'react'

export default function StockMovementsPage({ movements, isLoading, search, onAdd }) {
  const filteredMovements = React.useMemo(() => {
    if (!search.trim()) return movements
    const q = search.trim().toLowerCase()
    return movements.filter((movement) => {
      const productCode = movement.product?.productCode ?? ''
      const productName = movement.product?.name ?? ''
      const reference = movement.reference ?? ''
      const notes = movement.notes ?? ''
      return (
        productCode.toLowerCase().includes(q) ||
        productName.toLowerCase().includes(q) ||
        movement.type.toLowerCase().includes(q) ||
        reference.toLowerCase().includes(q) ||
        notes.toLowerCase().includes(q)
      )
    })
  }, [movements, search])

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-ink">Stock Movements</h2>
          <p className="text-sm text-stone">Track inventory inflow, outflow, and adjustments.</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-ledger hover:bg-ledgerDark transition-colors"
        >
          <Plus className="h-4 w-4" />
          Record movement
        </button>
      </div>

      {filteredMovements.length === 0 && !isLoading ? (
        <div className="border border-dashed border-stone/30 py-16 flex flex-col items-center text-center">
          <RotateCcw className="h-8 w-8 text-stone mb-3" />
          <p className="text-ink font-medium">No stock movements found</p>
          <p className="text-sm text-stone mt-1">Record an inventory movement to track product activity.</p>
        </div>
      ) : (
        <StockMovementTable movements={filteredMovements} isLoading={isLoading} />
      )}
    </div>
  )
}
