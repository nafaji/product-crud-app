using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using ProductApi.DTOs;
using InventoryManagementSystem.Domain.Entities;

namespace ProductApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UnitsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UnitsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Unit>>> GetUnits()
        {
            var units = await _context.Units
                .OrderBy(u => u.Name)
                .ToListAsync();

            return Ok(units);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Unit>> GetUnit(Guid id)
        {
            var unit = await _context.Units.FindAsync(id);

            if (unit == null)
                return NotFound(new { message = $"Unit with id {id} was not found." });

            return Ok(unit);
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateUnit([FromBody] UnitCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var unit = new Unit
            {
                Name = dto.Name.Trim(),
                ShortName = dto.ShortName.Trim(),
                IsActive = dto.IsActive
            };

            _context.Units.Add(unit);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUnit), new { id = unit.Id }, unit);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Unit>> UpdateUnit(Guid id, [FromBody] UnitUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var unit = await _context.Units.FindAsync(id);
            if (unit == null)
                return NotFound(new { message = $"Unit with id {id} was not found." });

            unit.Name = dto.Name.Trim();
            unit.ShortName = dto.ShortName.Trim();
            unit.IsActive = dto.IsActive;

            await _context.SaveChangesAsync();

            return Ok(unit);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteUnit(Guid id)
        {
            var unit = await _context.Units
                .Include(u => u.Products)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (unit == null)
                return NotFound(new { message = $"Unit with id {id} was not found." });

            if (unit.Products.Any())
                return BadRequest(new { message = "Unit cannot be deleted because it is assigned to products." });

            _context.Units.Remove(unit);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
