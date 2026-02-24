using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IUsuarioFlujo
    {
        Task<IEnumerable<UsuarioResponse>> Obtener();
        Task<UsuarioResponse> Obtener(Guid Id);
        Task<Guid> Agregar(UsuarioRequest usuario);
        Task<Guid> Editar(Guid Id, UsuarioRequest usuario);
        Task<Guid> Eliminar(Guid Id);
    }
}