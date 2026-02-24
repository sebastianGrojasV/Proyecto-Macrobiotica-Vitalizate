using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DataAccess
{
    public interface IProfileDA
    {
        Task<IEnumerable<ProfileResponse>> Obtener();
        Task<ProfileResponse> Obtener(Guid Id);
        Task<Guid> Agregar(ProfileRequest profile);
        Task<Guid> Editar(Guid Id, ProfileRequest profile);
        Task<Guid> Eliminar(Guid Id);
    }
}