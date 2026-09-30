using NFJ.InventoryManagementSystem.Application.Common.Exceptions;
using NFJ.InventoryManagementSystem.Application.Common.Interfaces;
using NFJ.InventoryManagementSystem.Application.DTOs;
using NFJ.InventoryManagementSystem.Application.DTOs.Responses;
using NFJ.InventoryManagementSystem.Application.Mapping;
using NFJ.InventoryManagementSystem.Domain.Entities;

namespace NFJ.InventoryManagementSystem.Application.Services;

public sealed class UnitsService(IUnitRepository units, IUnitOfWork unitOfWork) : IUnitsService
{
    public async Task<IReadOnlyList<UnitResponseDto>> GetUnitsAsync() =>
        (await units.GetUnitsAsync()).Select(unit => unit.ToResponse()).ToList();

    public async Task<UnitResponseDto> GetUnitAsync(Guid id)
    {
        var unit = await units.GetUnitAsync(id)
            ?? throw new NotFoundException($"Unit with id {id} was not found.");
        return unit.ToResponse();
    }

    public async Task<UnitResponseDto> CreateUnitAsync(UnitCreateDto dto)
    {
        var unit = new Unit
        {
            Name = dto.Name.Trim(),
            ShortName = dto.ShortName.Trim(),
            IsActive = dto.IsActive
        };
        units.Add(unit);
        await unitOfWork.SaveChangesAsync();
        return unit.ToResponse();
    }

    public async Task<UnitResponseDto> UpdateUnitAsync(Guid id, UnitUpdateDto dto)
    {
        var unit = await units.GetUnitAsync(id)
            ?? throw new NotFoundException($"Unit with id {id} was not found.");
        unit.Name = dto.Name.Trim();
        unit.ShortName = dto.ShortName.Trim();
        unit.IsActive = dto.IsActive;
        await unitOfWork.SaveChangesAsync();
        return unit.ToResponse();
    }

    public async Task DeleteUnitAsync(Guid id)
    {
        var unit = await units.GetUnitAsync(id, includeProducts: true)
            ?? throw new NotFoundException($"Unit with id {id} was not found.");
        if (unit.Products.Any())
            throw new BusinessRuleException("Unit cannot be deleted because it is assigned to products.");
        units.Remove(unit);
        await unitOfWork.SaveChangesAsync();
    }
}