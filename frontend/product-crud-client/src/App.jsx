import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Search, RefreshCw, AlertCircle, Boxes, Package, Tags, Warehouse, Truck, Menu, X, TrendingUp, CircleDollarSign, BarChart3 } from 'lucide-react'
import ProductForm from './components/ProductForm.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx'
import Toast from './components/Toast.jsx'
import CategoryForm from './components/CategoryForm.jsx'
import UnitForm from './components/UnitForm.jsx'
import SupplierForm from './components/SupplierForm.jsx'
import StockMovementForm from './components/StockMovementForm.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import UnitsPage from './pages/UnitsPage.jsx'
import SuppliersPage from './pages/SuppliersPage.jsx'
import StockMovementsPage from './pages/StockMovementsPage.jsx'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getUnits,
  createUnit,
  updateUnit,
  deleteUnit,
} from './services/productService.js'
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getStockMovements,
  createStockMovement,
} from './services/inventoryService.js'

const tabs = [
  { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { key: 'products', label: 'Products', icon: Package },
  { key: 'categories', label: 'Categories', icon: Tags },
  { key: 'units', label: 'Units', icon: Boxes },
  { key: 'suppliers', label: 'Suppliers', icon: Warehouse },
  { key: 'stock', label: 'Stock Movements', icon: Truck },
]

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeTab = location.pathname === '/' ? 'products' : location.pathname.slice(1)
  const currentTab = tabs.find((tab) => tab.key === activeTab) ?? tabs[0]
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [units, setUnits] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [stockMovements, setStockMovements] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [search, setSearch] = useState('')

  const [productFormOpen, setProductFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isSavingProduct, setIsSavingProduct] = useState(false)

  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [isSavingCategory, setIsSavingCategory] = useState(false)

  const [unitFormOpen, setUnitFormOpen] = useState(false)
  const [editingUnit, setEditingUnit] = useState(null)
  const [isSavingUnit, setIsSavingUnit] = useState(false)

  const [supplierFormOpen, setSupplierFormOpen] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState(null)
  const [isSavingSupplier, setIsSavingSupplier] = useState(false)

  const [stockMovementFormOpen, setStockMovementFormOpen] = useState(false)
  const [isSavingStockMovement, setIsSavingStockMovement] = useState(false)

  const [pendingDelete, setPendingDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => setToast({ message, type })

  const loadCurrentPageData = async () => {
    setIsLoading(true)
    setLoadError(null)

    try {
      switch (activeTab) {
        case 'products': {
          const [productsResponse, categoriesResponse, unitsResponse, suppliersResponse] = await Promise.all([
            getProducts(),
            getCategories(),
            getUnits(),
            getSuppliers(),
          ])
          setProducts(productsResponse.data)
          setCategories(categoriesResponse.data)
          setUnits(unitsResponse.data)
          setSuppliers(suppliersResponse.data)
          break
        }
        case 'categories': {
          const { data } = await getCategories()
          setCategories(data)
          break
        }
        case 'units': {
          const { data } = await getUnits()
          setUnits(data)
          break
        }
        case 'suppliers': {
          const { data } = await getSuppliers()
          setSuppliers(data)
          break
        }
        case 'stock': {
          const [stockMovementsResponse, productsResponse] = await Promise.all([
            getStockMovements(),
            getProducts(),
          ])
          setStockMovements(stockMovementsResponse.data)
          setProducts(productsResponse.data)
          break
        }
        default:
          break
      }
    } catch (error) {
      const message = error?.message || 'Could not reach the API. Confirm the backend is running and the API base URL is correct.'
      setLoadError(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadCurrentPageData()
  }, [activeTab])

  useEffect(() => {
    setIsSidebarOpen(false)
  }, [location.pathname])

  const lowStockProducts = useMemo(
    () => products.filter((product) => Number(product.openingStock ?? 0) <= Number(product.minimumStockLevel ?? 0)),
    [products],
  )

  useEffect(() => {
    if (!lowStockProducts.length) return

    const itemNames = lowStockProducts.slice(0, 3).map((product) => product.name).join(', ')
    showToast(`Low stock alert: ${itemNames}${lowStockProducts.length > 3 ? '...' : ''}`, 'warning')
  }, [lowStockProducts])

  const reorderSuggestions = useMemo(
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

  const dashboardStats = useMemo(
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

  const handleProductSubmit = async (payload) => {
    setIsSavingProduct(true)
    try {
      if (editingProduct) {
        const { data } = await updateProduct(editingProduct.id, payload)
        setProducts((prev) => prev.map((item) => (item.id === data.id ? data : item)))
        showToast(`${data.name} updated.`)
      } else {
        const { data } = await createProduct(payload)
        setProducts((prev) => [data, ...prev])
        showToast(`${data.name} added.`)
      }
      setProductFormOpen(false)
      setEditingProduct(null)
    } catch (error) {
      showToast('Could not save product. Please check the form values and try again.', 'error')
    } finally {
      setIsSavingProduct(false)
    }
  }

  const handleCategorySubmit = async (payload) => {
    setIsSavingCategory(true)
    try {
      if (editingCategory) {
        const { data } = await updateCategory(editingCategory.id, payload)
        setCategories((prev) => prev.map((item) => (item.id === data.id ? data : item)))
        showToast(`${data.name} updated.`)
      } else {
        const { data } = await createCategory(payload)
        setCategories((prev) => [data, ...prev])
        if (activeTab === 'products') {
          await loadCurrentPageData()
        }
        showToast(`${data.name} added.`)
      }
      setCategoryFormOpen(false)
      setEditingCategory(null)
    } catch (error) {
      showToast('Could not save category. Please check the form values and try again.', 'error')
    } finally {
      setIsSavingCategory(false)
    }
  }

  const handleUnitSubmit = async (payload) => {
    setIsSavingUnit(true)
    try {
      if (editingUnit) {
        const { data } = await updateUnit(editingUnit.id, payload)
        setUnits((prev) => prev.map((item) => (item.id === data.id ? data : item)))
        showToast(`${data.name} updated.`)
      } else {
        const { data } = await createUnit(payload)
        setUnits((prev) => [data, ...prev])
        if (activeTab === 'products') {
          await loadCurrentPageData()
        }
        showToast(`${data.name} added.`)
      }
      setUnitFormOpen(false)
      setEditingUnit(null)
    } catch (error) {
      showToast('Could not save unit. Please check the form values and try again.', 'error')
    } finally {
      setIsSavingUnit(false)
    }
  }

  const handleSupplierSubmit = async (payload) => {
    setIsSavingSupplier(true)
    try {
      if (editingSupplier) {
        const { data } = await updateSupplier(editingSupplier.id, payload)
        setSuppliers((prev) => prev.map((item) => (item.id === data.id ? data : item)))
        showToast(`${data.name} updated.`)
      } else {
        const { data } = await createSupplier(payload)
        setSuppliers((prev) => [data, ...prev])
        if (activeTab === 'products') {
          await loadCurrentPageData()
        }
        showToast(`${data.name} added.`)
      }
      setSupplierFormOpen(false)
      setEditingSupplier(null)
    } catch (error) {
      showToast('Could not save supplier. Please check the form values and try again.', 'error')
    } finally {
      setIsSavingSupplier(false)
    }
  }

  const handleStockMovementSubmit = async (payload) => {
    setIsSavingStockMovement(true)
    try {
      const { data } = await createStockMovement(payload)
      setStockMovements((prev) => [data, ...prev])

      setProducts((prev) =>
        prev.map((product) =>
          product.id === data.productId
            ? { ...product, openingStock: Number(product.openingStock ?? 0) + Number(data.quantity ?? 0) }
            : product,
        ),
      )

      const productName = products.find((p) => p.id === data.productId)?.name ?? 'Product'
      showToast(`${productName} stock updated.`)
      setStockMovementFormOpen(false)
    } catch (error) {
      showToast('Could not record stock movement. Please check the form values and try again.', 'error')
    } finally {
      setIsSavingStockMovement(false)
    }
  }

  const confirmDelete = (type, item) => setPendingDelete({ type, item })

  const handleDelete = async () => {
    if (!pendingDelete) return

    const { type, item } = pendingDelete
    setIsDeleting(true)
    try {
      if (type === 'product') {
        await deleteProduct(item.id)
        setProducts((prev) => prev.filter((p) => p.id !== item.id))
        showToast(`${item.name} removed.`)
      }
      if (type === 'category') {
        await deleteCategory(item.id)
        setCategories((prev) => prev.filter((c) => c.id !== item.id))
        showToast(`${item.name} removed.`)
      }
      if (type === 'unit') {
        await deleteUnit(item.id)
        setUnits((prev) => prev.filter((u) => u.id !== item.id))
        showToast(`${item.name} removed.`)
      }
      if (type === 'supplier') {
        await deleteSupplier(item.id)
        setSuppliers((prev) => prev.filter((s) => s.id !== item.id))
        showToast(`${item.name} removed.`)
      }
      setPendingDelete(null)
    } catch (error) {
      showToast('Could not delete this item. Check for related records and try again.', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  const renderActivePage = () => (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <DashboardPage
            products={products}
            categories={categories}
            suppliers={suppliers}
            stockMovements={stockMovements}
            isLoading={isLoading}
          />
        }
      />
      <Route
        path="/products"
        element={
          <ProductsPage
            products={products}
            isLoading={isLoading}
            search={search}
            onAdd={() => {
              setEditingProduct(null)
              setProductFormOpen(true)
            }}
            onEdit={(product) => {
              setEditingProduct(product)
              setProductFormOpen(true)
            }}
            onDelete={(product) => confirmDelete('product', product)}
          />
        }
      />
      <Route
        path="/categories"
        element={
          <CategoriesPage
            categories={categories}
            isLoading={isLoading}
            search={search}
            onAdd={() => {
              setEditingCategory(null)
              setCategoryFormOpen(true)
            }}
            onEdit={(category) => {
              setEditingCategory(category)
              setCategoryFormOpen(true)
            }}
            onDelete={(category) => confirmDelete('category', category)}
          />
        }
      />
      <Route
        path="/units"
        element={
          <UnitsPage
            units={units}
            isLoading={isLoading}
            search={search}
            onAdd={() => {
              setEditingUnit(null)
              setUnitFormOpen(true)
            }}
            onEdit={(unit) => {
              setEditingUnit(unit)
              setUnitFormOpen(true)
            }}
            onDelete={(unit) => confirmDelete('unit', unit)}
          />
        }
      />
      <Route
        path="/suppliers"
        element={
          <SuppliersPage
            suppliers={suppliers}
            isLoading={isLoading}
            search={search}
            onAdd={() => {
              setEditingSupplier(null)
              setSupplierFormOpen(true)
            }}
            onEdit={(supplier) => {
              setEditingSupplier(supplier)
              setSupplierFormOpen(true)
            }}
            onDelete={(supplier) => confirmDelete('supplier', supplier)}
          />
        }
      />
      <Route
        path="/stock"
        element={
          <StockMovementsPage
            movements={stockMovements}
            isLoading={isLoading}
            search={search}
            onAdd={() => setStockMovementFormOpen(true)}
          />
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 lg:px-5">
        <div className="overflow-hidden rounded-2xl border border-stone/20 bg-white shadow-sm">
          <div className="relative grid min-h-[calc(100vh-7rem)] md:grid-cols-[248px_minmax(0,1fr)]">
            <div
              className={`fixed inset-0 z-30 bg-stone-900/30 transition-opacity md:hidden ${
                isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            />

            <aside
              className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-stone/20 bg-stone/5 p-5 transition-transform duration-200 md:static md:w-[248px] md:translate-x-0 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
              }`}
            >
              <div className="mb-8 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone">Inventory</p>
                  <h1 className="mt-3 font-serif text-2xl text-ink">ProductHub CRM</h1>
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-stone/20 bg-white p-2 text-stone md:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close navigation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="space-y-2">
                {tabs.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => navigate(`/${key}`)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                      activeTab === key
                        ? 'border-ledger bg-ledger text-white shadow-sm'
                        : 'border-transparent bg-white text-ink hover:border-stone/20 hover:bg-paper'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </aside>

            <div className="flex min-w-0 flex-col">
              <header className="border-b border-stone/20 bg-white/90 px-4 py-3 sm:px-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone/20 bg-white text-stone md:hidden"
                      onClick={() => setIsSidebarOpen((current) => !current)}
                      aria-label="Open navigation"
                    >
                      <Menu className="h-4 w-4" />
                    </button>
                    <div>
                      <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone">Dashboard</div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-stone">
                        <span>Home</span>
                        <span>/</span>
                        <span className="font-medium text-ink">{currentTab.label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">
                      Low stock: {lowStockProducts.length}
                    </div>
                    <div className="rounded-full border border-ledger/20 bg-ledger/5 px-3 py-1.5 text-xs font-medium text-ledger">
                      Total products: {products.length}
                    </div>
                    <button
                      onClick={loadCurrentPageData}
                      className="flex items-center gap-2 rounded-full border border-stone/30 bg-white px-3 py-1.5 text-xs font-medium text-stone transition-colors hover:text-ink hover:bg-paper"
                      title="Refresh"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Refresh
                    </button>
                  </div>
                </div>
              </header>

              <main className="flex-1 px-4 py-4 sm:px-5 lg:px-6">
                <div className="mb-4">
                  <div className="relative max-w-xl">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={
                        activeTab === 'products'
                          ? 'Search products…'
                          : activeTab === 'categories'
                            ? 'Search categories…'
                            : activeTab === 'units'
                              ? 'Search units…'
                              : activeTab === 'suppliers'
                                ? 'Search suppliers…'
                                : 'Search stock movements…'
                      }
                      className="w-full rounded-xl border border-stone/30 bg-white pl-9 pr-3 py-2.5 text-sm text-ink placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-ledger/30 focus:border-ledger"
                    />
                  </div>
                </div>

                {loadError && (
                  <div className="mb-6 flex items-start gap-2 border border-rust/30 bg-rust/5 px-4 py-3 text-sm text-ink rounded-xl">
                    <AlertCircle className="h-4 w-4 text-rust mt-0.5 shrink-0" />
                    <p>{loadError}</p>
                  </div>
                )}

                {renderActivePage()}
              </main>
            </div>
          </div>
        </div>
      </div>

      <ProductForm
        open={productFormOpen}
        product={editingProduct}
        categories={categories}
        units={units}
        suppliers={suppliers}
        onClose={() => {
          if (isSavingProduct) return
          setProductFormOpen(false)
          setEditingProduct(null)
        }}
        onSubmit={handleProductSubmit}
        isSaving={isSavingProduct}
      />

      <CategoryForm
        open={categoryFormOpen}
        category={editingCategory}
        onClose={() => {
          if (isSavingCategory) return
          setCategoryFormOpen(false)
          setEditingCategory(null)
        }}
        onSubmit={handleCategorySubmit}
        isSaving={isSavingCategory}
      />

      <UnitForm
        open={unitFormOpen}
        unit={editingUnit}
        onClose={() => {
          if (isSavingUnit) return
          setUnitFormOpen(false)
          setEditingUnit(null)
        }}
        onSubmit={handleUnitSubmit}
        isSaving={isSavingUnit}
      />

      <SupplierForm
        open={supplierFormOpen}
        supplier={editingSupplier}
        onClose={() => {
          if (isSavingSupplier) return
          setSupplierFormOpen(false)
          setEditingSupplier(null)
        }}
        onSubmit={handleSupplierSubmit}
        isSaving={isSavingSupplier}
      />

      <StockMovementForm
        open={stockMovementFormOpen}
        products={products}
        onClose={() => {
          if (isSavingStockMovement) return
          setStockMovementFormOpen(false)
        }}
        onSubmit={handleStockMovementSubmit}
        isSaving={isSavingStockMovement}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={pendingDelete?.type === 'product' ? 'Remove product?' : pendingDelete?.type === 'category' ? 'Remove category?' : pendingDelete?.type === 'unit' ? 'Remove unit?' : 'Remove supplier?'}
        message={pendingDelete ? `${pendingDelete.item.name} will be permanently removed from the system.` : ''}
        confirmLabel={pendingDelete?.type === 'product' ? 'Remove product' : pendingDelete?.type === 'category' ? 'Remove category' : pendingDelete?.type === 'unit' ? 'Remove unit' : 'Remove supplier'}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}
