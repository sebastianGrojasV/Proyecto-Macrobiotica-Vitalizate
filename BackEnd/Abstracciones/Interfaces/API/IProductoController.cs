using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API {
    public interface IProductoController {
        Task<IActionResult> Obtener ();
        Task<IActionResult> Obtener (Guid Id);
        Task<IActionResult> Agregar (ProductoRequest producto);
        Task<IActionResult> Editar (Guid Id, ProductoRequest producto);
        Task<IActionResult> Eliminar (Guid Id);
    }
}
