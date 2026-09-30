using NFJ.InventoryManagementSystem.Domain.Entities;

namespace NFJ.InventoryManagementSystem.Application.Common.Interfaces;

public interface ISupplierRepository
{
    Task<IReadOnlyList<Supplier>> GetSuppliersAsync();
    Task<Supplier?> GetSupplierAsync(Guid id, bool includeProducts = false);
    Task<bool> ExistsAsync(Guid id);
    void Add(Supplier supplier);
    void Remove(Supplier supplier);
}