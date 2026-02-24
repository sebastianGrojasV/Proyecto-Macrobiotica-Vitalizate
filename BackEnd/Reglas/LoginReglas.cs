using Abstracciones.Interfaces.Reglas;
using Abstracciones.Modelos;

namespace Reglas
{
    public class LoginReglas : ILoginReglas
    {
        public Usuario ConvertirContrasenaHash(UsuarioRequest usuario)
        {
            throw new NotImplementedException();
        }

        public bool VerificarContrasenaHash(string contrasena, string contrasenaHash)
        {
            throw new NotImplementedException();
        }
    }
}
