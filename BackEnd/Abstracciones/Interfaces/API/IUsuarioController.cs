using Abstracciones.Modelos;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.API
{
    public interface IUsuarioController
    {
        Task<IActionResult> Obtener();
        Task<IActionResult> Obtener(Guid Id);
        Task<IActionResult> Agregar(UsuarioRequest usuario);
        Task<IActionResult> Editar(Guid Id, UsuarioRequest usuario);
        Task<IActionResult> Eliminar(Guid Id);
    }
}