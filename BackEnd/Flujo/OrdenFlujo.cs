using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class OrdenFlujo : IOrdenFlujo {
        private readonly IOrdenDA _ordenDA;

        public OrdenFlujo (IOrdenDA ordenDA) {
            _ordenDA = ordenDA;
        }

        public async Task<Guid> Agregar (OrdenRequest orden) {
            return await _ordenDA.Agregar(orden);
        }

        public async Task<Guid> Editar (Guid Id, OrdenRequest orden) {
            return await _ordenDA.Editar(Id, orden);
        }

        public async Task<Guid> Eliminar (Guid Id) {
            return await _ordenDA.Eliminar(Id);
        }

        public async Task<IEnumerable<OrdenResponse>> Obtener () {
            return await _ordenDA.Obtener();
        }

        public async Task<OrdenResponse> Obtener (Guid Id) {
            return await _ordenDA.Obtener(Id);
        }
    }
}
