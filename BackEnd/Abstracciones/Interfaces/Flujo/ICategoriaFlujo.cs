using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo {
    public interface ICategoriaFlujo {
        Task<IEnumerable<CategoriaResponse>> Obtener ();
        Task<CategoriaResponse> Obtener (Guid Id);
        Task<Guid> Agregar (CategoriaBase categoria);
        Task<Guid> Editar (Guid Id, CategoriaBase categoria);
        Task<Guid> Eliminar (Guid Id);
    }
}
