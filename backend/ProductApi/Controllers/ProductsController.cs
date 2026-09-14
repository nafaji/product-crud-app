using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using ProductApi.DTOs;
using InventoryManagementSystem.Domain.Entities;

namespace ProductApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Unit)
                .Include(p => p.Supplier)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Product>> GetProduct(Guid id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Unit)
                .Include(p => p.Supplier)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound(new { message = $"Product with id {id} was not found." });

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] ProductCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoryExists = await _context.Categories.AnyAsync(c => c.Id == dto.CategoryId);
            if (!categoryExists)
                return BadRequest(new { message = "Selected category was not found." });

            var unitExists = await _context.Units.AnyAsync(u => u.Id == dto.UnitId);
            if (!unitExists)
                return BadRequest(new { message = "Selected unit was not found." });

            if (dto.SupplierId.HasValue)
            {
                var supplierExists = await _context.Suppliers.AnyAsync(s => s.Id == dto.SupplierId.Value);
                if (!supplierExists)
                    return BadRequest(new { message = "Selected supplier was not found." });
            }

            var product = new Product
            {
                ProductCode = dto.ProductCode.Trim(),
                Name = dto.Name.Trim(),
                Description = dto.Description?.Trim(),
                CategoryId = dto.CategoryId,
                UnitId = dto.UnitId,
                SupplierId = dto.SupplierId,
                PurchasePrice = dto.PurchasePrice,
                SellingPrice = dto.SellingPrice,
                OpeningStock = dto.OpeningStock,
                MinimumStockLevel = dto.MinimumStockLevel,
                IsActive = dto.IsActive,
                CreatedAt = DateTime.UtcNow
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            var createdProduct = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Unit)
                .Include(p => p.Supplier)
                .FirstOrDefaultAsync(p => p.Id == product.Id);

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, createdProduct ?? product);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Product>> UpdateProduct(Guid id, [FromBody] ProductUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound(new { message = $"Product with id {id} was not found." });

            var categoryExists = await _context.Categories.AnyAsync(c => c.Id == dto.CategoryId);
            if (!categoryExists)
                return BadRequest(new { message = "Selected category was not found." });

            var unitExists = await _context.Units.AnyAsync(u => u.Id == dto.UnitId);
            if (!unitExists)
                return BadRequest(new { message = "Selected unit was not found." });

            if (dto.SupplierId.HasValue)
            {
                var supplierExists = await _context.Suppliers.AnyAsync(s => s.Id == dto.SupplierId.Value);
                if (!supplierExists)
                    return BadRequest(new { message = "Selected supplier was not found." });
            }

            product.ProductCode = dto.ProductCode.Trim();
            product.Name = dto.Name.Trim();
            product.Description = dto.Description?.Trim();
            product.CategoryId = dto.CategoryId;
            product.UnitId = dto.UnitId;
            product.SupplierId = dto.SupplierId;
            product.PurchasePrice = dto.PurchasePrice;
            product.SellingPrice = dto.SellingPrice;
            product.OpeningStock = dto.OpeningStock;
            product.MinimumStockLevel = dto.MinimumStockLevel;
            product.IsActive = dto.IsActive;
            product.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            var updatedProduct = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Unit)
                .Include(p => p.Supplier)
                .FirstOrDefaultAsync(p => p.Id == product.Id);

            return Ok(updatedProduct ?? product);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound(new { message = $"Product with id {id} was not found." });

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
