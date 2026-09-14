import { Plus, Truck } from 'lucide-react'
import SupplierTable from '../components/SupplierTable.jsx'
import React from 'react'

export default function SuppliersPage({ suppliers, isLoading, search, onAdd, onEdit, onDelete }) {
  const filteredSuppliers = React.useMemo(() => {
    if (!search.trim()) return suppliers
    const q = search.trim().toLowerCase()
    return suppliers.filter((s) => s.name.toLowerCase().includes(q) || (s.contactPerson ?? '').toLowerCase().includes(q))
  }, [suppliers, search])

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-ink">Suppliers</h2>
          <p className="text-sm text-stone">Track vendor contact information and active relationships.</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-ledger hover:bg-ledgerDark transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add supplier
        </button>
      </div>

      {filteredSuppliers.length === 0 && !isLoading ? (
        <div className="border border-dashed border-stone/30 py-16 flex flex-col items-center text-center">
          <Truck className="h-8 w-8 text-stone mb-3" />
          <p className="text-ink font-medium">No suppliers found</p>
          <p className="text-sm text-stone mt-1">Add a supplier to manage purchases and stock input.</p>
        </div>
      ) : (
        <SupplierTable suppliers={filteredSuppliers} isLoading={isLoading} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  )
}
