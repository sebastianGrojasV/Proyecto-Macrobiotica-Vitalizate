using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API {
    public interface IHistorialProductoController {
        Task<IActionResult> Obtener (Guid IdProducto);
    }
}
