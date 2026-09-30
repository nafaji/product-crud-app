using NFJ.InventoryManagementSystem.Domain.Entities;

namespace NFJ.InventoryManagementSystem.Application.Common.Interfaces;

public interface IStockMovementRepository
{
    Task<IReadOnlyList<StockMovement>> GetStockMovementsAsync();
    Task<IReadOnlyList<StockMovement>> GetProductStockMovementsAsync(Guid productId);
    void Add(StockMovement movement);
}