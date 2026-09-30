using NFJ.InventoryManagementSystem.Application.DTOs;
using NFJ.InventoryManagementSystem.Application.DTOs.Responses;

namespace NFJ.InventoryManagementSystem.Application.Services;

public interface IProductsService
{
    Task<IReadOnlyList<ProductResponseDto>> GetProductsAsync();
    Task<ProductResponseDto> GetProductAsync(Guid id);
    Task<ProductResponseDto> CreateProductAsync(ProductCreateDto dto);
    Task<ProductResponseDto> UpdateProductAsync(Guid id, ProductUpdateDto dto);
    Task DeleteProductAsync(Guid id);
}