using System.ComponentModel.DataAnnotations;

namespace ProductApi.DTOs
{
    public class ProductCreateDto
    {
        [Required, MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Range(0, int.MaxValue)]
        public int Stock { get; set; }
    }

    public class ProductUpdateDto : ProductCreateDto
    {
    }
}
