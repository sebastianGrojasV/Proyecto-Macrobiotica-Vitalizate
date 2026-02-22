using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase, ICategoriaController {
        private readonly ICategoriaFlujo _categoriaFlujo;
        private readonly ILogger<CategoriaController> _logger;

        public CategoriaController (ICategoriaFlujo categoriaFlujo, ILogger<CategoriaController> logger) {
            _categoriaFlujo = categoriaFlujo;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Agregar (CategoriaBase categoria) {
            var resultado = await _categoriaFlujo.Agregar(categoria);
            return CreatedAtAction(nameof(Obtener), new { Id = resultado }, null);
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Editar (Guid Id, CategoriaBase categoria) {
            var resultado = await _categoriaFlujo.Editar(Id, categoria);
            return Ok(resultado);
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Eliminar (Guid Id) {
            var resultado = await _categoriaFlujo.Eliminar(Id);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener () {
            var resultado = await _categoriaFlujo.Obtener();
            if (!resultado.Any()) {
                return NoContent();
            }
            return Ok(resultado);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> Obtener (Guid Id) {
            var resultado = await _categoriaFlujo.Obtener(Id);
            return Ok(resultado);
        }
    }
}
