using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class HistorialProductoFlujo : IHistorialProductoFlujo {
        private readonly IHistorialProductoDA _historialproductoDA;

        public HistorialProductoFlujo (IHistorialProductoDA historialproductoDA) {
            _historialproductoDA = historialproductoDA;
        }

        public async Task<IEnumerable<HistorialProductoResponse>> Obtener (Guid IdProducto) {
            return await _historialproductoDA.Obtener(IdProducto);
        }
    }
}
