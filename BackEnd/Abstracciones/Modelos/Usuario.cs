using System;

namespace Abstracciones.Modelos
{
    public class Usuario
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Role { get; set; }
        public string Cedula { get; set; }
    }

    public class UsuarioRequest : Usuario
    {
        public string Password { get; set; }
    }

    public class UsuarioResponse : Usuario
    {
        public Guid Id { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }
}