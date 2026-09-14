import { Pencil, Trash2, FolderX } from 'lucide-react'

export default function CategoryTable({ categories, isLoading, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className="border border-stone/20 divide-y divide-stone/10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-14 animate-pulse bg-stone/5" />
        ))}
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="border border-dashed border-stone/30 py-16 flex flex-col items-center text-center">
        <FolderX className="h-8 w-8 text-stone mb-3" />
        <p className="text-ink font-medium">No categories found</p>
        <p className="text-sm text-stone mt-1">Create a new category to organize products.</p>
      </div>
    )
  }

  return (
    <div className="border border-stone/20 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-stone/20 text-left text-stone">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Description</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium w-24 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone/10">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-ledger/5 transition-colors">
              <td className="px-4 py-3 font-medium text-ink">{category.name}</td>
              <td className="px-4 py-3 text-stone">{category.description || '—'}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex rounded-full px-2 py-1 text-xs ${category.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-600'}`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <button onClick={() => onEdit(category)} className="p-1.5 text-stone hover:text-ledger hover:bg-ledger/10 transition-colors" title="Edit">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(category)} className="p-1.5 text-stone hover:text-rust hover:bg-rust/10 transition-colors" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
