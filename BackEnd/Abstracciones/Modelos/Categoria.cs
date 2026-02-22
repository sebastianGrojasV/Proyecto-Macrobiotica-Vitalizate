using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class CategoriaBase {
        [Display(Name = "Nombre")]
        [Required(ErrorMessage = "La propiedad Nombre es requerida")]
        [StringLength(100, ErrorMessage = "El nombre debe contener entre 1 y 100 caracteres", MinimumLength = 1)]
        public string name { get; set; }

        [Display(Name = "Slug")]
        [Required(ErrorMessage = "La propiedad Slug es requerida")]
        [StringLength(255, ErrorMessage = "El slug debe contener entre 1 y 255 caracteres", MinimumLength = 1)]
        public string slug { get; set; }

        [Display(Name = "URL de la imagen")]
        [StringLength(1024, ErrorMessage = "El URL debe contener un máximo de 1024 caracteres", MinimumLength = 0)]
        public string? image_url { get; set; }
    }

    public class CategoriaResponse : CategoriaBase { 
        public Guid id { get; set; }
    }
}
