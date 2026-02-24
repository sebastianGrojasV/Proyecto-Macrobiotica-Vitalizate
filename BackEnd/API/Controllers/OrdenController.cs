using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenController : ControllerBase, IOrdenController {
        private readonly IOrdenFlujo _ordenFlujo;
        private readonly ILogger<OrdenController> _logger;

        public OrdenController (IOrdenFlujo ordenFlujo, ILogger<OrdenController> logger) {
            _ordenFlujo = ordenFlujo;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Agregar (OrdenRequest orden) {
            var resultado = await _ordenFlujo.Agregar(orden);
            return CreatedAtAction(nameof(Obtener), new { Id = resultado }, null);
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Editar (Guid Id, OrdenRequest orden) {
            var resultado = await _ordenFlujo.Editar(Id, orden);
            return Ok(resultado);
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Eliminar (Guid Id) {
            var resultado = await _ordenFlujo.Eliminar(Id);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener () {
            var resultado = await _ordenFlujo.Obtener();
            if (!resultado.Any()) {
                return NoContent();
            }
            return Ok(resultado);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> Obtener (Guid Id) {
            var resultado = await _ordenFlujo.Obtener(Id);
            return Ok(resultado);
        }
    }
}
