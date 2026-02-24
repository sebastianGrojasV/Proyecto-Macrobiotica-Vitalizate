using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IProveedorFlujo
    {
        Task<IEnumerable<ProveedorResponse>> Obtener();
        Task<ProveedorResponse> Obtener(Guid Id);
        Task<Guid> Agregar(ProveedorRequest proveedor);
        Task<Guid> Editar(Guid Id, ProveedorRequest proveedor);
        Task<Guid> Eliminar(Guid Id);
    }
}
