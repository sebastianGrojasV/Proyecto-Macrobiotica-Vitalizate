using Abstracciones.Interfaces.DataAccess;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace DataAccess.Repositorios
{
    public class RepositorioDapper : IRepositorioDapper
    {

        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;

        public RepositorioDapper(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("DB"));
        }

        public SqlConnection ObtenerRepositorio()
        {
            return _connection;
        }
    }
}
