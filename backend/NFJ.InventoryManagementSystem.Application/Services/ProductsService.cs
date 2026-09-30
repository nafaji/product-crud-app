using NFJ.InventoryManagementSystem.Application.Common.Exceptions;
using NFJ.InventoryManagementSystem.Application.Common.Interfaces;
using NFJ.InventoryManagementSystem.Application.DTOs;
using NFJ.InventoryManagementSystem.Application.DTOs.Responses;
using NFJ.InventoryManagementSystem.Application.Mapping;
using NFJ.InventoryManagementSystem.Domain.Entities;

namespace NFJ.InventoryManagementSystem.Application.Services;

public sealed class ProductsService(
    IProductRepository products,
    ICategoryRepository categories,
    IUnitRepository units,
    ISupplierRepository suppliers,
    IUnitOfWork unitOfWork) : IProductsService
{
    public async Task<IReadOnlyList<ProductResponseDto>> GetProductsAsync() =>
        (await products.GetProductsAsync()).Select(product => product.ToResponse()).ToList();

    public async Task<ProductResponseDto> GetProductAsync(Guid id)
    {
        var product = await products.GetProductAsync(id, includeReferences: true)
            ?? throw new NotFoundException($"Product with id {id} was not found.");
        return product.ToResponse();
    }

    public async Task<ProductResponseDto> CreateProductAsync(ProductCreateDto dto)
    {
        await ValidateReferencesAsync(dto.CategoryId, dto.UnitId, dto.SupplierId);
        var product = new Product
        {
            ProductCode = dto.ProductCode.Trim(),
            Name = dto.Name.Trim(),
            Description = dto.Description?.Trim(),
            CategoryId = dto.CategoryId,
            UnitId = dto.UnitId,
            SupplierId = dto.SupplierId,
            PurchasePrice = dto.PurchasePrice,
            SellingPrice = dto.SellingPrice,
            OpeningStock = dto.OpeningStock,
            MinimumStockLevel = dto.MinimumStockLevel,
            IsActive = dto.IsActive,
            CreatedAt = DateTime.UtcNow
        };

        products.Add(product);
        await unitOfWork.SaveChangesAsync();
        return (await products.GetProductAsync(product.Id, includeReferences: true) ?? product).ToResponse();
    }

    public async Task<ProductResponseDto> UpdateProductAsync(Guid id, ProductUpdateDto dto)
    {
        var product = await products.GetProductAsync(id)
            ?? throw new NotFoundException($"Product with id {id} was not found.");
        await ValidateReferencesAsync(dto.CategoryId, dto.UnitId, dto.SupplierId);

        product.ProductCode = dto.ProductCode.Trim();
        product.Name = dto.Name.Trim();
        product.Description = dto.Description?.Trim();
        product.CategoryId = dto.CategoryId;
        product.UnitId = dto.UnitId;
        product.SupplierId = dto.SupplierId;
        product.PurchasePrice = dto.PurchasePrice;
        product.SellingPrice = dto.SellingPrice;
        product.OpeningStock = dto.OpeningStock;
        product.MinimumStockLevel = dto.MinimumStockLevel;
        product.IsActive = dto.IsActive;
        product.UpdatedAt = DateTime.UtcNow;

        await unitOfWork.SaveChangesAsync();
        return (await products.GetProductAsync(product.Id, includeReferences: true) ?? product).ToResponse();
    }

    public async Task DeleteProductAsync(Guid id)
    {
        var product = await products.GetProductAsync(id)
            ?? throw new NotFoundException($"Product with id {id} was not found.");
        products.Remove(product);
        await unitOfWork.SaveChangesAsync();
    }

    private async Task ValidateReferencesAsync(Guid categoryId, Guid unitId, Guid? supplierId)
    {
        if (!await categories.ExistsAsync(categoryId))
            throw new BusinessRuleException("Selected category was not found.");
        if (!await units.ExistsAsync(unitId))
            throw new BusinessRuleException("Selected unit was not found.");
        if (supplierId.HasValue && !await suppliers.ExistsAsync(supplierId.Value))
            throw new BusinessRuleException("Selected supplier was not found.");
    }
}