namespace NFJ.InventoryManagementSystem.Application.DTOs.Responses;

public sealed record CategoryResponseDto(
    Guid Id,
    string Name,
    string? Description,
    bool IsActive,
    DateTime CreatedAt);

public sealed record UnitResponseDto(
    Guid Id,
    string Name,
    string ShortName,
    bool IsActive);

public sealed record SupplierResponseDto(
    Guid Id,
    string Name,
    string? ContactPerson,
    string? Phone,
    string? Email,
    string? Address,
    bool IsActive,
    DateTime CreatedAt);

public sealed record ProductResponseDto(
    Guid Id,
    string ProductCode,
    string Name,
    string? Description,
    Guid CategoryId,
    Guid UnitId,
    Guid? SupplierId,
    decimal PurchasePrice,
    decimal SellingPrice,
    decimal OpeningStock,
    decimal MinimumStockLevel,
    bool IsActive,
    DateTime CreatedAt,
    DateTime? UpdatedAt,
    CategoryResponseDto? Category,
    UnitResponseDto? Unit,
    SupplierResponseDto? Supplier);

public sealed record StockMovementResponseDto(
    Guid Id,
    Guid ProductId,
    string Type,
    decimal Quantity,
    string? Reference,
    string? Notes,
    DateTime CreatedAt,
    ProductResponseDto? Product);