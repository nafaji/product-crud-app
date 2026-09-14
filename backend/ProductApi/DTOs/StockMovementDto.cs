using System.ComponentModel.DataAnnotations;

namespace ProductApi.DTOs
{
    public class StockMovementCreateDto
    {
        [Required]
        public Guid ProductId { get; set; }

        [Required, MaxLength(50)]
        public string Type { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue)]
        public decimal Quantity { get; set; }

        [MaxLength(500)]
        public string? Reference { get; set; }

        [MaxLength(500)]
        public string? Notes { get; set; }
    }
}
