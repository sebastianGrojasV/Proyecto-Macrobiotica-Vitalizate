using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API
{
    public interface IProfileController
    {
        Task<IActionResult> Obtener();
        Task<IActionResult> Obtener(Guid Id);
        Task<IActionResult> Agregar(ProfileRequest profile);
        Task<IActionResult> Editar(Guid Id, ProfileRequest profile);
        Task<IActionResult> Eliminar(Guid Id);
    }
}