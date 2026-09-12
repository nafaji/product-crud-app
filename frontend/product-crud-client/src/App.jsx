import { useEffect, useMemo, useState } from 'react'
import { Plus, Search, RefreshCw, AlertCircle } from 'lucide-react'
import ProductTable from './components/ProductTable.jsx'
import ProductForm from './components/ProductForm.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import Toast from './components/Toast.jsx'
import { getProducts, createProduct, updateProduct, deleteProduct } from './services/productService.js'

export default function App() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [search, setSearch] = useState('')

  const [formOpen, setFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const [pendingDelete, setPendingDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => setToast({ message, type })

  const loadProducts = async () => {
    setIsLoading(true)
    setLoadError(null)
    try {
      const { data } = await getProducts()
      setProducts(data)
    } catch (err) {
      setLoadError(
        'Could not reach the API. Confirm the backend is running and the URL in productService.js matches it.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return products
    const q = search.trim().toLowerCase()
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || (p.description ?? '').toLowerCase().includes(q)
    )
  }, [products, search])

  const openAddForm = () => {
    setEditingProduct(null)
    setFormOpen(true)
  }

  const openEditForm = (product) => {
    setEditingProduct(product)
    setFormOpen(true)
  }

  const closeForm = () => {
    if (isSaving) return
    setFormOpen(false)
    setEditingProduct(null)
  }

  const handleSubmit = async (payload) => {
    setIsSaving(true)
    try {
      if (editingProduct) {
        const { data } = await updateProduct(editingProduct.id, payload)
        setProducts((prev) => prev.map((p) => (p.id === data.id ? data : p)))
        showToast(`${data.name} updated.`)
      } else {
        const { data } = await createProduct(payload)
        setProducts((prev) => [data, ...prev])
        showToast(`${data.name} added to the ledger.`)
      }
      setFormOpen(false)
      setEditingProduct(null)
    } catch (err) {
      showToast('Something went wrong while saving. Please try again.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const confirmDelete = (product) => setPendingDelete(product)

  const handleDelete = async () => {
    if (!pendingDelete) return
    setIsDeleting(true)
    try {
      await deleteProduct(pendingDelete.id)
      setProducts((prev) => prev.filter((p) => p.id !== pendingDelete.id))
      showToast(`${pendingDelete.name} removed.`)
      setPendingDelete(null)
    } catch (err) {
      showToast('Could not remove this item. Please try again.', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-stone/20 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <p className="text-sm text-stone mb-1">Inventory</p>
          <h1 className="font-serif text-3xl text-ink">Product Ledger</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items…"
              className="w-full border border-stone/30 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ledger/40 focus:border-ledger"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadProducts}
              className="p-2 border border-stone/30 text-stone hover:text-ink hover:bg-white transition-colors"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={openAddForm}
              className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-ledger hover:bg-ledgerDark transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add item
            </button>
          </div>
        </div>

        {loadError && (
          <div className="mb-6 flex items-start gap-2 border border-rust/30 bg-rust/5 px-4 py-3 text-sm text-ink">
            <AlertCircle className="h-4 w-4 text-rust mt-0.5 shrink-0" />
            <p>{loadError}</p>
          </div>
        )}

        <ProductTable
          products={filtered}
          isLoading={isLoading}
          onEdit={openEditForm}
          onDelete={confirmDelete}
        />

        {!isLoading && products.length > 0 && (
          <p className="mt-4 text-xs text-stone">
            Showing {filtered.length} of {products.length} item{products.length === 1 ? '' : 's'}
          </p>
        )}
      </main>

      <ProductForm
        open={formOpen}
        product={editingProduct}
        onClose={closeForm}
        onSubmit={handleSubmit}
        isSaving={isSaving}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        product={pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}
