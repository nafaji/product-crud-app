using Microsoft.EntityFrameworkCore;
using NFJ.InventoryManagementSystem.Application.Common.Interfaces;
using NFJ.InventoryManagementSystem.Domain.Entities;
using NFJ.InventoryManagementSystem.Infrastructure.Persistence.Context;

namespace NFJ.InventoryManagementSystem.Infrastructure.Repositories;

public sealed class CategoryRepository(ApplicationDbContext context) : ICategoryRepository
{
    public async Task<IReadOnlyList<Category>> GetCategoriesAsync() => await context.Categories
        .OrderBy(category => category.Name).ToListAsync();

    public async Task<Category?> GetCategoryAsync(Guid id, bool includeProducts = false)
    {
        var query = context.Categories.AsQueryable();
        if (includeProducts)
            query = query.Include(category => category.Products);
        return await query.FirstOrDefaultAsync(category => category.Id == id);
    }

    public Task<bool> ExistsAsync(Guid id) => context.Categories.AnyAsync(category => category.Id == id);
    public void Add(Category category) => context.Categories.Add(category);
    public void Remove(Category category) => context.Categories.Remove(category);
}