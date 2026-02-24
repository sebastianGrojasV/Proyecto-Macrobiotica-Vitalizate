using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;
using System.ComponentModel;

namespace DA
{
    public class OrdenDA : IOrdenDA {
        private readonly IRepositorioDapper _repositorioDapper;
        private readonly SqlConnection _sqlConnection;

        public OrdenDA (IRepositorioDapper repositorioDapper) {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        #region Operaciones
        public async Task<Guid> Agregar (OrdenRequest orden) {
            string query = @"AgregarOrden";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new 
            {
                Id = Guid.NewGuid(),
                UserId = orden.user_id,
                ShippingAddressId = orden.shipping_address_id,
                Status = orden.status,
                TotalAmount = orden.total_amount,
                TrackingNumber = orden.tracking_number
            });
            return resultadoConsulta;
        }

        public async Task<Guid> Editar (Guid Id, OrdenRequest orden) {
            await verificarOrdenExiste(Id);
            string query = @"EditarOrden";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new 
            {
                Id = Id,
                UserId = orden.user_id,
                ShippingAddressId = orden.shipping_address_id,
                Status = orden.status,
                TotalAmount = orden.total_amount,
                TrackingNumber = orden.tracking_number
            });
            return resultadoConsulta;
        }

        public async Task<Guid> Eliminar (Guid Id) {
            await verificarOrdenExiste(Id);
            string query = @"EliminarOrden";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new 
            {
                Id = Id
            });
            return resultadoConsulta;
        }

        public async Task<IEnumerable<OrdenResponse>> Obtener () {
            string query = @"ObtenerOrdens";
            var resultadoConsulta = await _sqlConnection.QueryAsync<OrdenResponse>(query);
            return resultadoConsulta;
        }

        public async Task<OrdenResponse> Obtener (Guid Id) {
            string query = @"ObtenerOrden";
            var resultadoConsulta = await _sqlConnection.QueryAsync<OrdenResponse>(query, new 
            {
                Id = Id
            });
            return resultadoConsulta.FirstOrDefault();
        }
        #endregion

        #region Helpers
        private async Task verificarOrdenExiste(Guid Id) {
            OrdenResponse? resultadoConsultaOrden = await Obtener(Id);
            if (resultadoConsultaOrden == null) {
                throw new Exception("La orden no se encontró.");
            }
        }
        #endregion
    }
}

