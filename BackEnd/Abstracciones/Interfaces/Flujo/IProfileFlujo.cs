using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IProfileFlujo
    {
        Task<IEnumerable<ProfileResponse>> Obtener();
        Task<ProfileResponse> Obtener(Guid Id);
        Task<Guid> Agregar(ProfileRequest profile);
        Task<Guid> Editar(Guid Id, ProfileRequest profile);
        Task<Guid> Eliminar(Guid Id);
    }
}