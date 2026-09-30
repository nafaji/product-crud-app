using NFJ.InventoryManagementSystem.Application.DTOs;
using NFJ.InventoryManagementSystem.Application.DTOs.Responses;

namespace NFJ.InventoryManagementSystem.Application.Services;

public interface IUnitsService
{
    Task<IReadOnlyList<UnitResponseDto>> GetUnitsAsync();
    Task<UnitResponseDto> GetUnitAsync(Guid id);
    Task<UnitResponseDto> CreateUnitAsync(UnitCreateDto dto);
    Task<UnitResponseDto> UpdateUnitAsync(Guid id, UnitUpdateDto dto);
    Task DeleteUnitAsync(Guid id);
}