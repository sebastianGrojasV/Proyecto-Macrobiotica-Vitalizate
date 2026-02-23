using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA {
    public interface IHistorialProductoDA {
        Task<IEnumerable<HistorialProductoResponse>> Obtener (Guid IdProducto);
    }
}
