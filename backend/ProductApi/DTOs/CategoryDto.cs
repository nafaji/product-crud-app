using System.ComponentModel.DataAnnotations;

namespace ProductApi.DTOs
{
    public class CategoryCreateDto
    {
        [Required, MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;
    }

    public class CategoryUpdateDto : CategoryCreateDto
    {
    }
}
