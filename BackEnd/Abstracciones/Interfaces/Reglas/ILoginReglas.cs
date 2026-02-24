using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.Reglas
{
    public interface ILoginReglas
    {
        Usuario ConvertirContrasenaHash(UsuarioRequest usuario);
        bool VerificarContrasenaHash(string contrasena, string contrasenaHash);

    }
}
