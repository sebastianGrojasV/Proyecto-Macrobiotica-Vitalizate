using Abstracciones.Interfaces.DataAccess;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class ProfileFlujo : IProfileFlujo
    {
        private readonly IProfileDA _profileDA;

        public ProfileFlujo(IProfileDA profileDA)
        {
            _profileDA = profileDA;
        }

        public async Task<Guid> Agregar(ProfileRequest profile)
        {
            return await _profileDA.Agregar(profile);
        }

        public async Task<Guid> Editar(Guid Id, ProfileRequest profile)
        {
            return await _profileDA.Editar(Id, profile);
        }

        public async Task<Guid> Eliminar(Guid Id)
        {
            return await _profileDA.Eliminar(Id);
        }

        public async Task<IEnumerable<ProfileResponse>> Obtener()
        {
            return await _profileDA.Obtener();
        }

        public async Task<ProfileResponse> Obtener(Guid Id)
        {
            return await _profileDA.Obtener(Id);
        }
    }
}