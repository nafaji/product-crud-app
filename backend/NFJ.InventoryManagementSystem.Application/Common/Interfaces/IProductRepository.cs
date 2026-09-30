using NFJ.InventoryManagementSystem.Domain.Entities;

namespace NFJ.InventoryManagementSystem.Application.Common.Interfaces;

public interface IProductRepository
{
    Task<IReadOnlyList<Product>> GetProductsAsync();
    Task<Product?> GetProductAsync(Guid id, bool includeReferences = false);
    void Add(Product product);
    void Remove(Product product);
}