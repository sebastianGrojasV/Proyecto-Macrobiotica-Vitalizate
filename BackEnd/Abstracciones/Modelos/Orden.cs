using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class OrdenBase {
        [Display (Name = "Estado")]
        [Required(ErrorMessage = "La propiedad Estado es requerida")]
        public string status { get; set; }

        [Display(Name = "Monto total")]
        [Required(ErrorMessage = "La propiedad Monto total es requerida")]
        [Range(0.01, double.MaxValue, ErrorMessage = "El valor del monto total debe ser mayor a 0")]
        public decimal total_amount { get; set; }

        [Display(Name = "Número de seguimiento")]
        [Required(ErrorMessage = "La propiedad Número de seguimiento es requerida")]
        public string tracking_number { get; set; }
    }

    public class OrdenRequest : OrdenBase {
        public Guid user_id { get; set; }
        public Guid shipping_address_id { get; set; }
    }

    public class OrdenResponse : OrdenBase { 
        public Guid id { get; set; }
    }
}
