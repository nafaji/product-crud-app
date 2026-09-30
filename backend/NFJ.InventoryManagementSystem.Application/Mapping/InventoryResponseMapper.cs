using NFJ.InventoryManagementSystem.Application.DTOs.Responses;
using NFJ.InventoryManagementSystem.Domain.Entities;

namespace NFJ.InventoryManagementSystem.Application.Mapping;

public static class InventoryResponseMapper
{
    public static CategoryResponseDto ToResponse(this Category category) => new(
        category.Id,
        category.Name,
        category.Description,
        category.IsActive,
        category.CreatedAt);

    public static UnitResponseDto ToResponse(this Unit unit) => new(
        unit.Id,
        unit.Name,
        unit.ShortName,
        unit.IsActive);

    public static SupplierResponseDto ToResponse(this Supplier supplier) => new(
        supplier.Id,
        supplier.Name,
        supplier.ContactPerson,
        supplier.Phone,
        supplier.Email,
        supplier.Address,
        supplier.IsActive,
        supplier.CreatedAt);

    public static ProductResponseDto ToResponse(this Product product) => new(
        product.Id,
        product.ProductCode,
        product.Name,
        product.Description,
        product.CategoryId,
        product.UnitId,
        product.SupplierId,
        product.PurchasePrice,
        product.SellingPrice,
        product.OpeningStock,
        product.MinimumStockLevel,
        product.IsActive,
        product.CreatedAt,
        product.UpdatedAt,
        product.Category?.ToResponse(),
        product.Unit?.ToResponse(),
        product.Supplier?.ToResponse());

    public static StockMovementResponseDto ToResponse(this StockMovement movement) => new(
        movement.Id,
        movement.ProductId,
        movement.Type,
        movement.Quantity,
        movement.Reference,
        movement.Notes,
        movement.CreatedAt,
        movement.Product?.ToResponse());
}