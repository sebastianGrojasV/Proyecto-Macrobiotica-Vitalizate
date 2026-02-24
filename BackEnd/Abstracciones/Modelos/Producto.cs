using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class ProductoBase {
        [Display(Name = "Nombre")]
        [Required(ErrorMessage = "La propiedad Nombre es requerida")]
        [StringLength(100, ErrorMessage = "El nombre debe contener entre 1 y 100 caracteres", MinimumLength = 1)]
        public string name { get; set; }

        [Display(Name = "Descripción")]
        [Required(ErrorMessage = "La propiedad Descripción es requerida")]
        public string description { get; set; }

        [Display(Name = "Precio")]
        [Required(ErrorMessage = "La propiedad Precio es requerida")]
        [Range(1, double.MaxValue, ErrorMessage = "El valor del precio debe ser mayor a 0")]
        public decimal price { get; set; }

        [Display(Name = "Cantidad en stock")]
        [Required(ErrorMessage = "La propiedad Cantidad en stock es requerida")]
        [Range(0, int.MaxValue, ErrorMessage = "El valor de la cantidad en stock no puede ser negativo")]
        public int stock_quantity { get; set; }

        [Display(Name = "URL de la imagen")]
        [StringLength(1024, ErrorMessage = "El URL debe contener un máximo de 1024 caracteres", MinimumLength = 0)]
        public string? image_url { get; set; }

        [Display(Name = "Activo")]
        public bool is_active { get; set; }
    }

    public class ProductoRequest : ProductoBase {
        public Guid category_id { get; set; }
    }

    public class ProductoResponse : ProductoBase { 
        public Guid id { get; set; }

        [Display(Name = "Categoría")]
        public string Categoria { get; set; }
    }
}
