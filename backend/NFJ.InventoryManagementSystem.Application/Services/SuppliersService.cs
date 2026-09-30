using NFJ.InventoryManagementSystem.Application.Common.Exceptions;
using NFJ.InventoryManagementSystem.Application.Common.Interfaces;
using NFJ.InventoryManagementSystem.Application.DTOs;
using NFJ.InventoryManagementSystem.Application.DTOs.Responses;
using NFJ.InventoryManagementSystem.Application.Mapping;
using NFJ.InventoryManagementSystem.Domain.Entities;

namespace NFJ.InventoryManagementSystem.Application.Services;

public sealed class SuppliersService(ISupplierRepository suppliers, IUnitOfWork unitOfWork) : ISuppliersService
{
    public async Task<IReadOnlyList<SupplierResponseDto>> GetSuppliersAsync() =>
        (await suppliers.GetSuppliersAsync()).Select(supplier => supplier.ToResponse()).ToList();

    public async Task<SupplierResponseDto> GetSupplierAsync(Guid id)
    {
        var supplier = await suppliers.GetSupplierAsync(id)
            ?? throw new NotFoundException($"Supplier with id {id} was not found.");
        return supplier.ToResponse();
    }

    public async Task<SupplierResponseDto> CreateSupplierAsync(SupplierCreateDto dto)
    {
        var supplier = new Supplier
        {
            Name = dto.Name.Trim(),
            ContactPerson = dto.ContactPerson?.Trim(),
            Phone = dto.Phone?.Trim(),
            Email = dto.Email?.Trim(),
            Address = dto.Address?.Trim(),
            IsActive = dto.IsActive,
            CreatedAt = DateTime.UtcNow
        };
        suppliers.Add(supplier);
        await unitOfWork.SaveChangesAsync();
        return supplier.ToResponse();
    }

    public async Task<SupplierResponseDto> UpdateSupplierAsync(Guid id, SupplierUpdateDto dto)
    {
        var supplier = await suppliers.GetSupplierAsync(id)
            ?? throw new NotFoundException($"Supplier with id {id} was not found.");
        supplier.Name = dto.Name.Trim();
        supplier.ContactPerson = dto.ContactPerson?.Trim();
        supplier.Phone = dto.Phone?.Trim();
        supplier.Email = dto.Email?.Trim();
        supplier.Address = dto.Address?.Trim();
        supplier.IsActive = dto.IsActive;
        await unitOfWork.SaveChangesAsync();
        return supplier.ToResponse();
    }

    public async Task DeleteSupplierAsync(Guid id)
    {
        var supplier = await suppliers.GetSupplierAsync(id, includeProducts: true)
            ?? throw new NotFoundException($"Supplier with id {id} was not found.");
        if (supplier.Products.Any())
            throw new BusinessRuleException("Supplier cannot be deleted because it is assigned to products.");
        suppliers.Remove(supplier);
        await unitOfWork.SaveChangesAsync();
    }
}