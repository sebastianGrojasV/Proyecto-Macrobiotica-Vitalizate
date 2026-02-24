using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo {
    public interface IOrdenFlujo {
        Task<IEnumerable<OrdenResponse>> Obtener ();
        Task<OrdenResponse> Obtener (Guid Id);
        Task<Guid> Agregar (OrdenRequest orden);
        Task<Guid> Editar (Guid Id, OrdenRequest orden);
        Task<Guid> Eliminar (Guid Id);
    }
}
