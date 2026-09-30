using NFJ.InventoryManagementSystem.Application.Common.Interfaces;

namespace NFJ.InventoryManagementSystem.Infrastructure.Persistence.Context;

public sealed class UnitOfWork(ApplicationDbContext context) : IUnitOfWork
{
    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) =>
        context.SaveChangesAsync(cancellationToken);
}