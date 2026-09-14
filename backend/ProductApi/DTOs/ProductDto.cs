using System.ComponentModel.DataAnnotations;

namespace ProductApi.DTOs
{
    public class ProductCreateDto
    {
        [Required, MaxLength(50)]
        public string ProductCode { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [Required]
        public Guid CategoryId { get; set; }

        [Required]
        public Guid UnitId { get; set; }

        public Guid? SupplierId { get; set; }

        [Range(0, double.MaxValue)]
        public decimal PurchasePrice { get; set; }

        [Range(0, double.MaxValue)]
        public decimal SellingPrice { get; set; }

        [Range(0, double.MaxValue)]
        public decimal OpeningStock { get; set; }

        [Range(0, double.MaxValue)]
        public decimal MinimumStockLevel { get; set; }

        public bool IsActive { get; set; } = true;
    }

    public class ProductUpdateDto : ProductCreateDto
    {
    }
}
