using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class Proveedor
    {
        string Name { get; set; }
        string ContactEmail { get; set; }
        string Phone {  get; set; }
        string Address { get; set; }
        DateTime CreatedAt { get; set; }
    }

    public class ProveedorRequest : Proveedor 
    {
    }

    public class ProveedorResponse : Proveedor
    {
        Guid Id { get; set; }
    }
}
