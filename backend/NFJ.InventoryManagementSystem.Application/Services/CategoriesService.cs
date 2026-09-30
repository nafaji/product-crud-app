using NFJ.InventoryManagementSystem.Application.Common.Exceptions;
using NFJ.InventoryManagementSystem.Application.Common.Interfaces;
using NFJ.InventoryManagementSystem.Application.DTOs;
using NFJ.InventoryManagementSystem.Application.DTOs.Responses;
using NFJ.InventoryManagementSystem.Application.Mapping;
using NFJ.InventoryManagementSystem.Domain.Entities;

namespace NFJ.InventoryManagementSystem.Application.Services;

public sealed class CategoriesService(ICategoryRepository categories, IUnitOfWork unitOfWork) : ICategoriesService
{
    public async Task<IReadOnlyList<CategoryResponseDto>> GetCategoriesAsync() =>
        (await categories.GetCategoriesAsync()).Select(category => category.ToResponse()).ToList();

    public async Task<CategoryResponseDto> GetCategoryAsync(Guid id)
    {
        var category = await categories.GetCategoryAsync(id)
            ?? throw new NotFoundException($"Category with id {id} was not found.");
        return category.ToResponse();
    }

    public async Task<CategoryResponseDto> CreateCategoryAsync(CategoryCreateDto dto)
    {
        var category = new Category
        {
            Name = dto.Name.Trim(),
            Description = dto.Description?.Trim(),
            IsActive = dto.IsActive,
            CreatedAt = DateTime.UtcNow
        };
        categories.Add(category);
        await unitOfWork.SaveChangesAsync();
        return category.ToResponse();
    }

    public async Task<CategoryResponseDto> UpdateCategoryAsync(Guid id, CategoryUpdateDto dto)
    {
        var category = await categories.GetCategoryAsync(id)
            ?? throw new NotFoundException($"Category with id {id} was not found.");
        category.Name = dto.Name.Trim();
        category.Description = dto.Description?.Trim();
        category.IsActive = dto.IsActive;
        await unitOfWork.SaveChangesAsync();
        return category.ToResponse();
    }

    public async Task DeleteCategoryAsync(Guid id)
    {
        var category = await categories.GetCategoryAsync(id, includeProducts: true)
            ?? throw new NotFoundException($"Category with id {id} was not found.");
        if (category.Products.Any())
            throw new BusinessRuleException("Category cannot be deleted because it is assigned to products.");
        categories.Remove(category);
        await unitOfWork.SaveChangesAsync();
    }
}