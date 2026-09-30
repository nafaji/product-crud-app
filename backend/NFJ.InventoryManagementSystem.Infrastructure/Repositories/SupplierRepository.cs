using Microsoft.EntityFrameworkCore;
using NFJ.InventoryManagementSystem.Application.Common.Interfaces;
using NFJ.InventoryManagementSystem.Domain.Entities;
using NFJ.InventoryManagementSystem.Infrastructure.Persistence.Context;

namespace NFJ.InventoryManagementSystem.Infrastructure.Repositories;

public sealed class SupplierRepository(ApplicationDbContext context) : ISupplierRepository
{
    public async Task<IReadOnlyList<Supplier>> GetSuppliersAsync() => await context.Suppliers
        .OrderBy(supplier => supplier.Name).ToListAsync();

    public async Task<Supplier?> GetSupplierAsync(Guid id, bool includeProducts = false)
    {
        var query = context.Suppliers.AsQueryable();
        if (includeProducts)
            query = query.Include(supplier => supplier.Products);
        return await query.FirstOrDefaultAsync(supplier => supplier.Id == id);
    }

    public Task<bool> ExistsAsync(Guid id) => context.Suppliers.AnyAsync(supplier => supplier.Id == id);
    public void Add(Supplier supplier) => context.Suppliers.Add(supplier);
    public void Remove(Supplier supplier) => context.Suppliers.Remove(supplier);
}