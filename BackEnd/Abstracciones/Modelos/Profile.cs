namespace Abstracciones.Modelos
{
    public class Profile
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; }
        public string Phone { get; set; }
        public string AvatarUrl { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Cedula { get; set; }
        public string Status { get; set; } // active | inactive | null
    }

    public class ProfileRequest : Profile
    {
        
    }

    public class ProfileResponse : Profile
    {
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
    }
}