using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class Proveedor
    {
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public decimal Rating { get; set; }
        public string Status { get; set; } // active | inactive
    }

    public class ProveedorRequest : Proveedor 
    {
    }

    public class ProveedorResponse : Proveedor
    {
        public Guid Id { get; set; }
        public List<string> ProductsSupplied { get; set; }
        public DateTimeOffset CreatedAt { get; set; }

    }
}
