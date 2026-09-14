import { Plus, FolderX } from 'lucide-react'
import CategoryTable from '../components/CategoryTable.jsx'
import React from 'react'

export default function CategoriesPage({ categories, isLoading, search, onAdd, onEdit, onDelete }) {
  const filteredCategories = React.useMemo(() => {
    if (!search.trim()) return categories
    const q = search.trim().toLowerCase()
    return categories.filter((c) => c.name.toLowerCase().includes(q) || (c.description ?? '').toLowerCase().includes(q))
  }, [categories, search])

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-ink">Categories</h2>
          <p className="text-sm text-stone">Organize products into logical groups.</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-ledger hover:bg-ledgerDark transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add category
        </button>
      </div>

      {filteredCategories.length === 0 && !isLoading ? (
        <div className="border border-dashed border-stone/30 py-16 flex flex-col items-center text-center">
          <FolderX className="h-8 w-8 text-stone mb-3" />
          <p className="text-ink font-medium">No categories found</p>
          <p className="text-sm text-stone mt-1">Create a new category to organize products.</p>
        </div>
      ) : (
        <CategoryTable categories={filteredCategories} isLoading={isLoading} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  )
}
