using System.ComponentModel.DataAnnotations;

namespace ProductApi.DTOs
{
    public class SupplierCreateDto
    {
        [Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? ContactPerson { get; set; }

        [MaxLength(50)]
        public string? Phone { get; set; }

        [MaxLength(250)]
        public string? Email { get; set; }

        [MaxLength(500)]
        public string? Address { get; set; }

        public bool IsActive { get; set; } = true;
    }

    public class SupplierUpdateDto : SupplierCreateDto
    {
    }
}
