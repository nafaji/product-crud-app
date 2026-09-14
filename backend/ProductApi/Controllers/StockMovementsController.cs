using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using ProductApi.DTOs;
using InventoryManagementSystem.Domain.Entities;

namespace ProductApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockMovementsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StockMovementsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockMovement>>> GetStockMovements()
        {
            var movements = await _context.StockMovements
                .Include(m => m.Product)
                .OrderByDescending(m => m.CreatedAt)
                .Take(100)
                .ToListAsync();

            return Ok(movements);
        }

        [HttpGet("product/{productId:guid}")]
        public async Task<ActionResult<IEnumerable<StockMovement>>> GetProductStockMovements(Guid productId)
        {
            var movements = await _context.StockMovements
                .Where(m => m.ProductId == productId)
                .Include(m => m.Product)
                .OrderByDescending(m => m.CreatedAt)
                .ToListAsync();

            return Ok(movements);
        }

        [HttpPost]
        public async Task<ActionResult<StockMovement>> CreateStockMovement([FromBody] StockMovementCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null)
                return NotFound(new { message = "Product was not found." });

            if (dto.Type != "IN" && dto.Type != "OUT" && dto.Type != "ADJUSTMENT")
                return BadRequest(new { message = "Movement type must be IN, OUT, or ADJUSTMENT." });

            var quantity = dto.Quantity;
            if (dto.Type == "OUT")
                quantity = -Math.Abs(dto.Quantity);
            else if (dto.Type == "IN")
                quantity = Math.Abs(dto.Quantity);
            else
                quantity = dto.Quantity;

            var movement = new StockMovement
            {
                ProductId = dto.ProductId,
                Type = dto.Type,
                Quantity = quantity,
                Reference = dto.Reference?.Trim(),
                Notes = dto.Notes?.Trim(),
                CreatedAt = DateTime.UtcNow,
                Product = product
            };

            _context.StockMovements.Add(movement);
            product.OpeningStock += quantity;

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStockMovements), new { id = movement.Id }, movement);
        }
    }
}
