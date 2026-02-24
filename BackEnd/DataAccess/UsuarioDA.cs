using Abstracciones.Interfaces.DataAccess;
using Abstracciones.Modelos;
using Microsoft.Data.SqlClient;
using Dapper;

namespace DataAccess
{
    public class UsuarioDA : IUsuarioDA
    {
        private readonly IRepositorioDapper _repositorioDapper;
        private readonly SqlConnection _connection;

        public UsuarioDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _connection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<Guid> Agregar(UsuarioRequest usuario)
        {
            string query = @"
                INSERT INTO auth.users
                (
                    id,
                    name,
                    email,
                    phone,
                    rol,
                    cedula,
                    password_hash,
                    created_at
                )
                OUTPUT INSERTED.id
                VALUES
                (
                    @ID,
                    @Name,
                    @Email,
                    @Phone,
                    @Rol,
                    @Cedula,
                    @PasswordHash,
                    SYSDATETIMEOFFSET()
                );";

            var idGenerado = await _connection.ExecuteScalarAsync<Guid>(query, new
            {
                Id=Guid.NewGuid(),
                Name = usuario.Name,
                Email = usuario.Email,
                Phone = usuario.Phone,
                Rol = usuario.Role,
                Cedula = usuario.Cedula,
                PasswordHash = usuario.Password
            });

            return idGenerado;
        }

        public async Task<Guid> Editar(Guid id, UsuarioRequest usuario)
        {
            string query = @"
                UPDATE auth.users
                SET
                    name = @Name,
                    email = @Email,
                    phone = @Phone,
                    rol = @Role,
                    cedula = @Cedula,
                    password_hash = @Password
                OUTPUT INSERTED.id
                WHERE id = @Id;";

            var result = await _connection.ExecuteScalarAsync<Guid>(
                query,
                new
                {
                    Id = id,
                    usuario.Name,
                    usuario.Email,
                    usuario.Phone,
                    usuario.Role,
                    usuario.Cedula,
                    usuario.Password
                });

            return result;
        }

        public async Task<Guid> Eliminar(Guid id)
        {
            string query = @"
                DELETE FROM auth.users
                OUTPUT DELETED.id
                WHERE id = @Id;";

            var result = await _connection.ExecuteScalarAsync<Guid>(
                query,
                new { Id = id });

            return result;
        }

        public async Task<IEnumerable<UsuarioResponse>> Obtener()
        {
            string query = @"
                SELECT 
                    id,
                    name,
                    email,
                    phone,
                    rol,
                    cedula,
                    created_at
                FROM auth.users;";

            var result = await _connection.QueryAsync<UsuarioResponse>(query);

            return result;
        }

        public async Task<UsuarioResponse> Obtener(Guid Id)
        {
            string query = @"
                SELECT 
                    id,
                    name,
                    email,
                    phone,
                    rol,
                    cedula,
                    created_at
                FROM auth.users
                WHERE id = @Id;";

            var result = await _connection.QuerySingleOrDefaultAsync<UsuarioResponse>(
                query,
                new { Id = Id });

            return result;
        }
    }
}