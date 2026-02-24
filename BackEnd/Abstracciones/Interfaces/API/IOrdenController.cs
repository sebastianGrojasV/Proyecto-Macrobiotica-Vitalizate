using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API {
    public interface IOrdenController {
        Task<IActionResult> Obtener ();
        Task<IActionResult> Obtener (Guid Id);
        Task<IActionResult> Agregar (OrdenRequest orden);
        Task<IActionResult> Editar (Guid Id, OrdenRequest orden);
        Task<IActionResult> Eliminar (Guid Id);
    }
}
