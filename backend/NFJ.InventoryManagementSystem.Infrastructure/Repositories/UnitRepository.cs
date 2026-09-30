using Microsoft.EntityFrameworkCore;
using NFJ.InventoryManagementSystem.Application.Common.Interfaces;
using NFJ.InventoryManagementSystem.Domain.Entities;
using NFJ.InventoryManagementSystem.Infrastructure.Persistence.Context;

namespace NFJ.InventoryManagementSystem.Infrastructure.Repositories;

public sealed class UnitRepository(ApplicationDbContext context) : IUnitRepository
{
    public async Task<IReadOnlyList<Unit>> GetUnitsAsync() => await context.Units
        .OrderBy(unit => unit.Name).ToListAsync();

    public async Task<Unit?> GetUnitAsync(Guid id, bool includeProducts = false)
    {
        var query = context.Units.AsQueryable();
        if (includeProducts)
            query = query.Include(unit => unit.Products);
        return await query.FirstOrDefaultAsync(unit => unit.Id == id);
    }

    public Task<bool> ExistsAsync(Guid id) => context.Units.AnyAsync(unit => unit.Id == id);
    public void Add(Unit unit) => context.Units.Add(unit);
    public void Remove(Unit unit) => context.Units.Remove(unit);
}