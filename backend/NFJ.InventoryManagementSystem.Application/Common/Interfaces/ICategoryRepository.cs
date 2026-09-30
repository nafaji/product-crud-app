using NFJ.InventoryManagementSystem.Domain.Entities;

namespace NFJ.InventoryManagementSystem.Application.Common.Interfaces;

public interface ICategoryRepository
{
    Task<IReadOnlyList<Category>> GetCategoriesAsync();
    Task<Category?> GetCategoryAsync(Guid id, bool includeProducts = false);
    Task<bool> ExistsAsync(Guid id);
    void Add(Category category);
    void Remove(Category category);
}