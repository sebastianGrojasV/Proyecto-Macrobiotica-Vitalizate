using Abstracciones.Interfaces.DataAccess;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class UsuarioFlujo : IUsuarioFlujo
    {
        private readonly IUsuarioDA _usuarioDA;

        public UsuarioFlujo(IUsuarioDA usuarioDA)
        {
            _usuarioDA = usuarioDA;
        }

        public async Task<Guid> Agregar(UsuarioRequest usuario)
        {
            return await _usuarioDA.Agregar(usuario);
        }

        public async Task<Guid> Editar(Guid Id, UsuarioRequest usuario)
        {
            return await _usuarioDA.Editar(Id, usuario);
        }

        public async Task<Guid> Eliminar(Guid Id)
        {
            return await _usuarioDA.Eliminar(Id);
        }

        public async Task<IEnumerable<UsuarioResponse>> Obtener()
        {
            return await _usuarioDA.Obtener();
        }

        public async Task<UsuarioResponse> Obtener(Guid Id)
        {
            return await _usuarioDA.Obtener(Id);
        }
    }
}