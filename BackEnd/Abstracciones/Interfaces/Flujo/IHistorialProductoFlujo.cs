using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo {
    public interface IHistorialProductoFlujo {
        Task<IEnumerable<HistorialProductoResponse>> Obtener (Guid IdProducto);
    }
}
