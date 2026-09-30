using NFJ.InventoryManagementSystem.Application.DTOs;
using NFJ.InventoryManagementSystem.Application.DTOs.Responses;

namespace NFJ.InventoryManagementSystem.Application.Services;

public interface ICategoriesService
{
    Task<IReadOnlyList<CategoryResponseDto>> GetCategoriesAsync();
    Task<CategoryResponseDto> GetCategoryAsync(Guid id);
    Task<CategoryResponseDto> CreateCategoryAsync(CategoryCreateDto dto);
    Task<CategoryResponseDto> UpdateCategoryAsync(Guid id, CategoryUpdateDto dto);
    Task DeleteCategoryAsync(Guid id);
}