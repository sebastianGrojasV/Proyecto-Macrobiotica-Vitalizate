using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProveedorController : ControllerBase, IProveedorController
    {
        private readonly IProveedorFlujo _proveedorFlujo;
        private readonly ILogger<ProveedorController> _logger;

        public ProveedorController(IProveedorFlujo proveedorFlujo, ILogger<ProveedorController> logger)
        {
            _proveedorFlujo = proveedorFlujo;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Agregar(ProveedorRequest proveedor)
        {
            var result = await _proveedorFlujo.Agregar(proveedor);

            return CreatedAtAction(nameof(Obtener), new { Id = result }, null);
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Editar(Guid Id, ProveedorRequest proveedor)
        {
            var result = await _proveedorFlujo.Editar(Id, proveedor);

            return Ok(result);
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Eliminar(Guid Id)
        {
            var result = await _proveedorFlujo.Eliminar(Id);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var result = await _proveedorFlujo.Obtener();
            if (!result.Any())
                return NoContent();

            return Ok(result);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> Obtener(Guid Id)
        {
            var result = await _proveedorFlujo.Obtener(Id);

            return Ok(result);

        }
    }
}
