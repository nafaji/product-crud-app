namespace NFJ.InventoryManagementSystem.Application.DTOs;

public sealed record RegisterRequestDto(
    string FirstName,
    string LastName,
    string Email,
    string Password,
    string? UserName = null,
    string? PhoneNumber = null);

public sealed record LoginRequestDto(
    string Email,
    string Password);

public sealed record AuthResponseDto(
    string Token,
    DateTime ExpiresAt,
    string UserId,
    string UserName,
    string Email,
    IReadOnlyList<string> Roles);
