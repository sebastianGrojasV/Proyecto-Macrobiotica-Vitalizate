using Abstracciones.Interfaces.DataAccess;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class ProveedorFlujo : IProveedorFlujo
    {
        private readonly IProveedorDA _proveedorDA;

        public ProveedorFlujo(IProveedorDA proveedorDA)
        {
            _proveedorDA = proveedorDA;
        }

        public async Task<Guid> Agregar(ProveedorRequest proveedor)
        {
            return await _proveedorDA.Agregar(proveedor);
        }

        public async Task<Guid> Editar(Guid Id, ProveedorRequest proveedor)
        {
            return await _proveedorDA.Editar(Id, proveedor);
        }

        public async Task<Guid> Eliminar(Guid Id)
        {
            return await _proveedorDA.Eliminar(Id);
        }

        public async Task<IEnumerable<ProveedorResponse>> Obtener()
        {
            return await _proveedorDA.Obtener();
        }

        public async Task<ProveedorResponse> Obtener(Guid Id)
        {
            return await _proveedorDA.Obtener(Id);

        }
    }
}
