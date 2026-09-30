using NFJ.InventoryManagementSystem.Application.DTOs;

namespace NFJ.InventoryManagementSystem.Application.Services;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterRequestDto dto);
    Task<AuthResponseDto> LoginAsync(LoginRequestDto dto);
}
