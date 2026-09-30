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
    public class UnitsController : ControllerBase
    {
        private readonly IUnitsService _units;

        public UnitsController(IUnitsService units)
        {
            _units = units;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnitResponseDto>>> GetUnits()
        {
            return Ok(await _units.GetUnitsAsync());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<UnitResponseDto>> GetUnit(Guid id)
        {
            return Ok(await _units.GetUnitAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<UnitResponseDto>> CreateUnit([FromBody] UnitCreateDto dto)
        {
            var unit = await _units.CreateUnitAsync(dto);

            return CreatedAtAction(nameof(GetUnit), new { id = unit.Id }, unit);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<UnitResponseDto>> UpdateUnit(Guid id, [FromBody] UnitUpdateDto dto)
        {
            return Ok(await _units.UpdateUnitAsync(id, dto));
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteUnit(Guid id)
        {
            await _units.DeleteUnitAsync(id);
            return NoContent();
        }
    }
}
