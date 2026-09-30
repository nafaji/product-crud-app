using NFJ.InventoryManagementSystem.Application.DTOs;
using NFJ.InventoryManagementSystem.Application.DTOs.Responses;

namespace NFJ.InventoryManagementSystem.Application.Services;

public interface IStockMovementsService
{
    Task<IReadOnlyList<StockMovementResponseDto>> GetStockMovementsAsync();
    Task<IReadOnlyList<StockMovementResponseDto>> GetProductStockMovementsAsync(Guid productId);
    Task<StockMovementResponseDto> CreateStockMovementAsync(StockMovementCreateDto dto);
}