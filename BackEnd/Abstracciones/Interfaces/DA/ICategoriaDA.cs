using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA {
    public interface ICategoriaDA {
        Task<IEnumerable<CategoriaResponse>> Obtener ();
        Task<CategoriaResponse> Obtener (Guid Id);
        Task<Guid> Agregar (CategoriaBase categoria);
        Task<Guid> Editar (Guid Id, CategoriaBase categoria);
        Task<Guid> Eliminar (Guid Id);
    }
}
