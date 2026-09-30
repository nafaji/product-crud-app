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
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService _products;

        public ProductsController(IProductsService products)
        {
            _products = products;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductResponseDto>>> GetProducts()
        {
            return Ok(await _products.GetProductsAsync());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ProductResponseDto>> GetProduct(Guid id)
        {
            return Ok(await _products.GetProductAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<ProductResponseDto>> CreateProduct([FromBody] ProductCreateDto dto)
        {
            var product = await _products.CreateProductAsync(dto);

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<ProductResponseDto>> UpdateProduct(Guid id, [FromBody] ProductUpdateDto dto)
        {
            return Ok(await _products.UpdateProductAsync(id, dto));
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            await _products.DeleteProductAsync(id);
            return NoContent();
        }
    }
}
