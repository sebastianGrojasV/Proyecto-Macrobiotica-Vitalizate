using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistorialProductoController : ControllerBase, IHistorialProductoController {
        private readonly IHistorialProductoFlujo _historialProductoFlujo;
        private readonly ILogger<HistorialProductoController> _logger;

        public HistorialProductoController (IHistorialProductoFlujo historialProductoFlujo, ILogger<HistorialProductoController> logger) {
            _historialProductoFlujo = historialProductoFlujo;
            _logger = logger;
        }

        [HttpGet("{IdProducto}")]
        public async Task<IActionResult> Obtener (Guid IdProducto) {
            var resultado = await _historialProductoFlujo.Obtener(IdProducto);
            if (!resultado.Any()) {
                return NoContent();
            }
            return Ok(resultado);
        }
    }
}
