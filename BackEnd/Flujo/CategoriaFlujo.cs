using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class CategoriaFlujo : ICategoriaFlujo {
        private readonly ICategoriaDA _categoriaDA;

        public CategoriaFlujo (ICategoriaDA categoriaDA) {
            _categoriaDA = categoriaDA;
        }

        public async Task<Guid> Agregar (CategoriaBase categoria) {
            return await _categoriaDA.Agregar(categoria);
        }

        public async Task<Guid> Editar (Guid Id, CategoriaBase categoria) {
            return await _categoriaDA.Editar(Id, categoria);
        }

        public async Task<Guid> Eliminar (Guid Id) {
            return await _categoriaDA.Eliminar(Id);
        }

        public async Task<IEnumerable<CategoriaResponse>> Obtener () {
            return await _categoriaDA.Obtener();
        }

        public async Task<CategoriaResponse> Obtener (Guid Id) {
            return await _categoriaDA.Obtener(Id);
        }
    }
}
