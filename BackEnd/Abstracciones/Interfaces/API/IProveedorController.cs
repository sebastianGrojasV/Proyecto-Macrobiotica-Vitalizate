using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.API
{
    public interface IProveedorController
    {
        Task<IActionResult> Obtener();
        Task<IActionResult> Obtener(Guid Id);
        Task<IActionResult> Agregar(ProveedorRequest proveedor);
        Task<IActionResult> Editar(Guid Id, ProveedorRequest proveedor);
        Task<IActionResult> Eliminar(Guid Id);
    }
}
