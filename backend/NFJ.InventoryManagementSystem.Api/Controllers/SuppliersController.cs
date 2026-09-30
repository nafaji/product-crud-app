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
    public class SuppliersController : ControllerBase
    {
        private readonly ISuppliersService _suppliers;

        public SuppliersController(ISuppliersService suppliers)
        {
            _suppliers = suppliers;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupplierResponseDto>>> GetSuppliers()
        {
            return Ok(await _suppliers.GetSuppliersAsync());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<SupplierResponseDto>> GetSupplier(Guid id)
        {
            return Ok(await _suppliers.GetSupplierAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<SupplierResponseDto>> CreateSupplier([FromBody] SupplierCreateDto dto)
        {
            var supplier = await _suppliers.CreateSupplierAsync(dto);

            return CreatedAtAction(nameof(GetSupplier), new { id = supplier.Id }, supplier);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<SupplierResponseDto>> UpdateSupplier(Guid id, [FromBody] SupplierUpdateDto dto)
        {
            return Ok(await _suppliers.UpdateSupplierAsync(id, dto));
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteSupplier(Guid id)
        {
            await _suppliers.DeleteSupplierAsync(id);
            return NoContent();
        }
    }
}
