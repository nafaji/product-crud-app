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
    public class StockMovementsController : ControllerBase
    {
        private readonly IStockMovementsService _stockMovements;

        public StockMovementsController(IStockMovementsService stockMovements)
        {
            _stockMovements = stockMovements;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockMovementResponseDto>>> GetStockMovements()
        {
            return Ok(await _stockMovements.GetStockMovementsAsync());
        }

        [HttpGet("product/{productId:guid}")]
        public async Task<ActionResult<IEnumerable<StockMovementResponseDto>>> GetProductStockMovements(Guid productId)
        {
            return Ok(await _stockMovements.GetProductStockMovementsAsync(productId));
        }

        [HttpPost]
        public async Task<ActionResult<StockMovementResponseDto>> CreateStockMovement([FromBody] StockMovementCreateDto dto)
        {
            var movement = await _stockMovements.CreateStockMovementAsync(dto);

            return CreatedAtAction(nameof(GetStockMovements), new { id = movement.Id }, movement);
        }
    }
}
