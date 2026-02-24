using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DataAccess
{
    public interface IProveedorDA
    {
        Task<IEnumerable<ProveedorResponse>> Obtener();
        Task<ProveedorResponse> Obtener(Guid Id);
        Task<Guid> Agregar(ProveedorRequest proveedor);
        Task<Guid> Editar(Guid Id, ProveedorRequest proveedor);
        Task<Guid> Eliminar(Guid Id);
    }
}
