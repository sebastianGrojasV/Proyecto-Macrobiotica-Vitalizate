using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.DataAccess;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DataAccess
{
    public class ProfileDA : IProfileDA
    {
        private readonly IRepositorioDapper _repositorioDapper;
        private readonly SqlConnection _connection;

        public ProfileDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _connection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<Guid> Agregar(ProfileRequest profile)
        {
            string query = @"
                INSERT INTO dbo.profiles
                (
                    id,
                    full_name,
                    role,
                    phone,
                    avatar_url,
                    created_at,
                    updated_at,
                    username,
                    email,
                    cedula,
                    status
                )
                OUTPUT INSERTED.id
                VALUES
                (
                    @Id,
                    @FullName,
                    @Role,
                    @Phone,
                    @AvatarUrl,
                    SYSUTCDATETIME(),
                    SYSUTCDATETIME(),
                    @Username,
                    @Email,
                    @Cedula,
                    @Status
                );";

            var idGenerado = await _connection.ExecuteScalarAsync<Guid>(query, profile);
            return idGenerado;
        }

        public async Task<Guid> Editar(Guid id, ProfileRequest profile)
        {
            string query = @"
                UPDATE dbo.profiles
                SET
                    full_name = @FullName,
                    role = @Role,
                    phone = @Phone,
                    avatar_url = @AvatarUrl,
                    updated_at = SYSUTCDATETIME(),
                    username = @Username,
                    email = @Email,
                    cedula = @Cedula,
                    status = @Status
                OUTPUT INSERTED.id
                WHERE id = @Id;";

            var result = await _connection.ExecuteScalarAsync<Guid>(
                query,
                new
                {
                    Id = id,
                    profile.FullName,
                    profile.Role,
                    profile.Phone,
                    profile.AvatarUrl,
                    profile.Username,
                    profile.Email,
                    profile.Cedula,
                    profile.Status
                });

            return result;
        }

        public async Task<Guid> Eliminar(Guid id)
        {
            string query = @"
                DELETE FROM dbo.profiles
                OUTPUT DELETED.id
                WHERE id = @Id;";

            var result = await _connection.ExecuteScalarAsync<Guid>(
                query,
                new { Id = id });

            return result;
        }

        public async Task<IEnumerable<ProfileResponse>> Obtener()
        {
            string query = @"
                SELECT
                    id,
                    full_name AS FullName,
                    role AS Role,
                    phone AS Phone,
                    avatar_url AS AvatarUrl,
                    username AS Username,
                    email AS Email,
                    cedula AS Cedula,
                    status AS Status,
                    created_at AS CreatedAt,
                    updated_at AS UpdatedAt
                FROM dbo.profiles;";

            var result = await _connection.QueryAsync<ProfileResponse>(query);
            return result;
        }

        public async Task<ProfileResponse> Obtener(Guid Id)
        {
            string query = @"
                SELECT
                    id,
                    full_name AS FullName,
                    role AS Role,
                    phone AS Phone,
                    avatar_url AS AvatarUrl,
                    username AS Username,
                    email AS Email,
                    cedula AS Cedula,
                    status AS Status,
                    created_at AS CreatedAt,
                    updated_at AS UpdatedAt
                FROM dbo.profiles
                WHERE id = @Id;";

            var result = await _connection.QuerySingleOrDefaultAsync<ProfileResponse>(
                query,
                new { Id = Id });

            return result;
        }
    }
}