using NFJ.InventoryManagementSystem.Domain.Entities;

namespace NFJ.InventoryManagementSystem.Application.Common.Interfaces;

public interface IUnitRepository
{
    Task<IReadOnlyList<Unit>> GetUnitsAsync();
    Task<Unit?> GetUnitAsync(Guid id, bool includeProducts = false);
    Task<bool> ExistsAsync(Guid id);
    void Add(Unit unit);
    void Remove(Unit unit);
}