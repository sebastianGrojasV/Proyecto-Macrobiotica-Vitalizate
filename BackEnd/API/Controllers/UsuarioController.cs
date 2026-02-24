using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase, IUsuarioController
    {
        private readonly IUsuarioFlujo _usuarioFlujo;
        private readonly ILogger<UsuarioController> _logger;

        public UsuarioController(IUsuarioFlujo usuarioFlujo, ILogger<UsuarioController> logger)
        {
            _usuarioFlujo = usuarioFlujo;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Agregar(UsuarioRequest usuario)
        {
            var result = await _usuarioFlujo.Agregar(usuario);

            return CreatedAtAction(nameof(Obtener), new { Id = result }, null);
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Editar(Guid Id, UsuarioRequest usuario)
        {
            var result = await _usuarioFlujo.Editar(Id, usuario);

            return Ok(result);
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Eliminar(Guid Id)
        {
            var result = await _usuarioFlujo.Eliminar(Id);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var result = await _usuarioFlujo.Obtener();
            if (!result.Any())
                return NoContent();

            return Ok(result);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> Obtener(Guid Id)
        {
            var result = await _usuarioFlujo.Obtener(Id);

            return Ok(result);
        }
    }
}