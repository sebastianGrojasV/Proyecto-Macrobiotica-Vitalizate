using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase, IProfileController
    {
        private readonly IProfileFlujo _profileFlujo;
        private readonly ILogger<ProfileController> _logger;

        public ProfileController(IProfileFlujo profileFlujo, ILogger<ProfileController> logger)
        {
            _profileFlujo = profileFlujo;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Agregar(ProfileRequest profile)
        {
            var result = await _profileFlujo.Agregar(profile);
            return CreatedAtAction(nameof(Obtener), new { Id = result }, null);
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Editar(Guid Id, ProfileRequest profile)
        {
            var result = await _profileFlujo.Editar(Id, profile);
            return Ok(result);
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Eliminar(Guid Id)
        {
            var result = await _profileFlujo.Eliminar(Id);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var result = await _profileFlujo.Obtener();
            if (!result.Any())
                return NoContent();

            return Ok(result);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> Obtener(Guid Id)
        {
            var result = await _profileFlujo.Obtener(Id);
            if (result == null)
                return NotFound();

            return Ok(result);
        }
    }
}