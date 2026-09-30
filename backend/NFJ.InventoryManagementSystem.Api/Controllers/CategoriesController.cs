using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using NFJ.InventoryManagementSystem.Application.DTOs;
using NFJ.InventoryManagementSystem.Application.DTOs.Responses;
using NFJ.InventoryManagementSystem.Application.Services;

namespace NFJ.InventoryManagementSystem.Api.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesService _categories;

        public CategoriesController(ICategoriesService categories)
        {
            _categories = categories;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryResponseDto>>> GetCategories()
        {
            return Ok(await _categories.GetCategoriesAsync());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<CategoryResponseDto>> GetCategory(Guid id)
        {
            return Ok(await _categories.GetCategoryAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<CategoryResponseDto>> CreateCategory([FromBody] CategoryCreateDto dto)
        {
            var category = await _categories.CreateCategoryAsync(dto);

            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<CategoryResponseDto>> UpdateCategory(Guid id, [FromBody] CategoryUpdateDto dto)
        {
            return Ok(await _categories.UpdateCategoryAsync(id, dto));
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            await _categories.DeleteCategoryAsync(id);
            return NoContent();
        }
    }
}
