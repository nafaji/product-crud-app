using NFJ.InventoryManagementSystem.Application.DTOs;
using NFJ.InventoryManagementSystem.Application.DTOs.Responses;

namespace NFJ.InventoryManagementSystem.Application.Services;

public interface ISuppliersService
{
    Task<IReadOnlyList<SupplierResponseDto>> GetSuppliersAsync();
    Task<SupplierResponseDto> GetSupplierAsync(Guid id);
    Task<SupplierResponseDto> CreateSupplierAsync(SupplierCreateDto dto);
    Task<SupplierResponseDto> UpdateSupplierAsync(Guid id, SupplierUpdateDto dto);
    Task DeleteSupplierAsync(Guid id);
}