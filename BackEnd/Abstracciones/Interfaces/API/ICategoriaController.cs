using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API {
    public interface ICategoriaController {
        Task<IActionResult> Obtener ();
        Task<IActionResult> Obtener (Guid Id);
        Task<IActionResult> Agregar (CategoriaBase categoria);
        Task<IActionResult> Editar (Guid Id, CategoriaBase categoria);
        Task<IActionResult> Eliminar (Guid Id);
    }
}
