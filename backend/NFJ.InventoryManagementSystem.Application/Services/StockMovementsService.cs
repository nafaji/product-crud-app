using NFJ.InventoryManagementSystem.Application.Common.Exceptions;
using NFJ.InventoryManagementSystem.Application.Common.Interfaces;
using NFJ.InventoryManagementSystem.Application.DTOs;
using NFJ.InventoryManagementSystem.Application.DTOs.Responses;
using NFJ.InventoryManagementSystem.Application.Mapping;
using NFJ.InventoryManagementSystem.Domain.Entities;

namespace NFJ.InventoryManagementSystem.Application.Services;

public sealed class StockMovementsService(
    IStockMovementRepository movements,
    IProductRepository products,
    IUnitOfWork unitOfWork) : IStockMovementsService
{
    public async Task<IReadOnlyList<StockMovementResponseDto>> GetStockMovementsAsync() =>
        (await movements.GetStockMovementsAsync()).Select(movement => movement.ToResponse()).ToList();

    public async Task<IReadOnlyList<StockMovementResponseDto>> GetProductStockMovementsAsync(Guid productId) =>
        (await movements.GetProductStockMovementsAsync(productId)).Select(movement => movement.ToResponse()).ToList();

    public async Task<StockMovementResponseDto> CreateStockMovementAsync(StockMovementCreateDto dto)
    {
        var product = await products.GetProductAsync(dto.ProductId)
            ?? throw new NotFoundException("Product was not found.");
        if (dto.Type != "IN" && dto.Type != "OUT" && dto.Type != "ADJUSTMENT")
            throw new BusinessRuleException("Movement type must be IN, OUT, or ADJUSTMENT.");

        var quantity = dto.Type switch
        {
            "OUT" => -Math.Abs(dto.Quantity),
            "IN" => Math.Abs(dto.Quantity),
            _ => dto.Quantity
        };
        var movement = new StockMovement
        {
            ProductId = dto.ProductId,
            Type = dto.Type,
            Quantity = quantity,
            Reference = dto.Reference?.Trim(),
            Notes = dto.Notes?.Trim(),
            CreatedAt = DateTime.UtcNow,
            Product = product
        };
        movements.Add(movement);
        product.OpeningStock += quantity;
        await unitOfWork.SaveChangesAsync();
        return movement.ToResponse();
    }
}