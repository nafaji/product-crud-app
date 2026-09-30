using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NFJ.InventoryManagementSystem.Application.Common.Exceptions;
using NFJ.InventoryManagementSystem.Application.Common.Identity;
using NFJ.InventoryManagementSystem.Application.DTOs;

namespace NFJ.InventoryManagementSystem.Application.Services;

public sealed class AuthService(
    UserManager<AppUser> userManager,
    RoleManager<IdentityRole> roleManager,
    IConfiguration configuration) : IAuthService
{
    public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto dto)
    {
        var normalizedEmail = dto.Email.Trim();
        var existingUser = await userManager.FindByEmailAsync(normalizedEmail);
        if (existingUser is not null)
            throw new BusinessRuleException("A user with this email already exists.");

        var userName = string.IsNullOrWhiteSpace(dto.UserName)
            ? normalizedEmail.Split('@')[0]
            : dto.UserName.Trim();

        var user = new AppUser
        {
            UserName = userName,
            Email = normalizedEmail,
            PhoneNumber = dto.PhoneNumber?.Trim(),
            FirstName = dto.FirstName.Trim(),
            LastName = dto.LastName.Trim(),
            IsActive = true,
            EmailConfirmed = true,
            CreatedAt = DateTime.UtcNow
        };

        var identityResult = await userManager.CreateAsync(user, dto.Password);
        if (!identityResult.Succeeded)
            throw new BusinessRuleException(string.Join("; ", identityResult.Errors.Select(e => e.Description)));

        var roleName = await GetDefaultRoleAsync();
        await userManager.AddToRoleAsync(user, roleName);

        return await BuildAuthResponseAsync(user);
    }

    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto dto)
    {
        var normalizedEmail = dto.Email.Trim();
        var user = await userManager.FindByEmailAsync(normalizedEmail)
            ?? await userManager.FindByNameAsync(normalizedEmail);

        if (user is null || !user.IsActive)
            throw new BusinessRuleException("Invalid email or password.");

        var isPasswordValid = await userManager.CheckPasswordAsync(user, dto.Password);
        if (!isPasswordValid)
            throw new BusinessRuleException("Invalid email or password.");

        return await BuildAuthResponseAsync(user);
    }

    private async Task<AuthResponseDto> BuildAuthResponseAsync(AppUser user)
    {
        var roles = await userManager.GetRolesAsync(user);
        var jwtKey = configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT key is not configured.");
        var issuer = configuration["Jwt:Issuer"] ?? "NFJ.InventoryManagementSystem";
        var audience = configuration["Jwt:Audience"] ?? "NFJ.InventoryManagementSystem";
        var expiryMinutes = configuration.GetValue<int>("Jwt:ExpiryMinutes", 60);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id),
            new(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Name, user.UserName ?? user.Email ?? string.Empty),
            new(ClaimTypes.GivenName, user.FirstName ?? string.Empty),
            new(ClaimTypes.Surname, user.LastName ?? string.Empty),
            new("tenantId", user.TenantId ?? string.Empty)
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiresAt = DateTime.UtcNow.AddMinutes(expiryMinutes);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials);

        return new AuthResponseDto(
            Token: new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresAt: expiresAt,
            UserId: user.Id,
            UserName: user.UserName ?? user.Email ?? string.Empty,
            Email: user.Email ?? string.Empty,
            Roles: roles.ToList());
    }

    private async Task<string> GetDefaultRoleAsync()
    {
        const string defaultRole = "Staff";

        if (!await roleManager.RoleExistsAsync(defaultRole))
        {
            await roleManager.CreateAsync(new IdentityRole(defaultRole));
        }

        return defaultRole;
    }
}
