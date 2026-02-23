using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;
using System.ComponentModel;

namespace DA
{
    public class HistorialProductoDA : IHistorialProductoDA {
        private readonly IRepositorioDapper _repositorioDapper;
        private readonly SqlConnection _sqlConnection;

        public HistorialProductoDA (IRepositorioDapper repositorioDapper) {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<IEnumerable<HistorialProductoResponse>> Obtener (Guid IdProducto) {
            string query = @"ObtenerHistorialProducto";
            var resultadoConsulta = await _sqlConnection.QueryAsync<HistorialProductoResponse>(query, new 
            {
                IdProducto = IdProducto
            });
            return resultadoConsulta;
        }
    }
}

