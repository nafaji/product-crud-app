using System.ComponentModel.DataAnnotations;

namespace ProductApi.DTOs
{
    public class UnitCreateDto
    {
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string ShortName { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
    }

    public class UnitUpdateDto : UnitCreateDto
    {
    }
}
