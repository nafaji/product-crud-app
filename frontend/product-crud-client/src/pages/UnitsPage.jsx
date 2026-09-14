import { Plus, Ruler } from 'lucide-react'
import UnitTable from '../components/UnitTable.jsx'
import React from 'react'

export default function UnitsPage({ units, isLoading, search, onAdd, onEdit, onDelete }) {
  const filteredUnits = React.useMemo(() => {
    if (!search.trim()) return units
    const q = search.trim().toLowerCase()
    return units.filter((u) => u.name.toLowerCase().includes(q) || u.shortName.toLowerCase().includes(q))
  }, [units, search])

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-ink">Units</h2>
          <p className="text-sm text-stone">Manage measurement units used by inventory items.</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-ledger hover:bg-ledgerDark transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add unit
        </button>
      </div>

      {filteredUnits.length === 0 && !isLoading ? (
        <div className="border border-dashed border-stone/30 py-16 flex flex-col items-center text-center">
          <Ruler className="h-8 w-8 text-stone mb-3" />
          <p className="text-ink font-medium">No units found</p>
          <p className="text-sm text-stone mt-1">Add a unit such as pcs, box, or kg.</p>
        </div>
      ) : (
        <UnitTable units={filteredUnits} isLoading={isLoading} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  )
}
