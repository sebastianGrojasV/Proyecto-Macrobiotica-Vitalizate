using Microsoft.Data.SqlClient;

namespace Abstracciones.Interfaces.DataAccess
{
    public interface IRepositorioDapper
    {
        SqlConnection ObtenerRepositorio();
    }
}
