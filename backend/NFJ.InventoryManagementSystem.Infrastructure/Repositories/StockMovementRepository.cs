using Microsoft.EntityFrameworkCore;
using NFJ.InventoryManagementSystem.Application.Common.Interfaces;
using NFJ.InventoryManagementSystem.Domain.Entities;
using NFJ.InventoryManagementSystem.Infrastructure.Persistence.Context;

namespace NFJ.InventoryManagementSystem.Infrastructure.Repositories;

public sealed class StockMovementRepository(ApplicationDbContext context) : IStockMovementRepository
{
    public async Task<IReadOnlyList<StockMovement>> GetStockMovementsAsync() => await context.StockMovements
        .Include(movement => movement.Product)
        .OrderByDescending(movement => movement.CreatedAt)
        .Take(100)
        .ToListAsync();

    public async Task<IReadOnlyList<StockMovement>> GetProductStockMovementsAsync(Guid productId) => await context.StockMovements
        .Where(movement => movement.ProductId == productId)
        .Include(movement => movement.Product)
        .OrderByDescending(movement => movement.CreatedAt)
        .ToListAsync();

    public void Add(StockMovement movement) => context.StockMovements.Add(movement);
}