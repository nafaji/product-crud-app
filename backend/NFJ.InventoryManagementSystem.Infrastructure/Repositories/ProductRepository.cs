using Microsoft.EntityFrameworkCore;
using NFJ.InventoryManagementSystem.Application.Common.Interfaces;
using NFJ.InventoryManagementSystem.Domain.Entities;
using NFJ.InventoryManagementSystem.Infrastructure.Persistence.Context;

namespace NFJ.InventoryManagementSystem.Infrastructure.Repositories;

public sealed class ProductRepository(ApplicationDbContext context) : IProductRepository
{
    public async Task<IReadOnlyList<Product>> GetProductsAsync() => await context.Products
        .Include(product => product.Category)
        .Include(product => product.Unit)
        .Include(product => product.Supplier)
        .OrderByDescending(product => product.CreatedAt)
        .ToListAsync();

    public async Task<Product?> GetProductAsync(Guid id, bool includeReferences = false)
    {
        var query = context.Products.AsQueryable();
        if (includeReferences)
        {
            query = query.Include(product => product.Category)
                .Include(product => product.Unit)
                .Include(product => product.Supplier);
        }
        return await query.FirstOrDefaultAsync(product => product.Id == id);
    }

    public void Add(Product product) => context.Products.Add(product);
    public void Remove(Product product) => context.Products.Remove(product);
}