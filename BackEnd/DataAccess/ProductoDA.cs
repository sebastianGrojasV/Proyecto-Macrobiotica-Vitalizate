using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;
using System.ComponentModel;

namespace DA
{
    public class ProductoDA : IProductoDA {
        private readonly IRepositorioDapper _repositorioDapper;
        private readonly SqlConnection _sqlConnection;

        public ProductoDA (IRepositorioDapper repositorioDapper) {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        #region Operaciones
        public async Task<Guid> Agregar (ProductoRequest producto) {
            string query = @"AgregarProducto";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new 
            {
                Id = Guid.NewGuid(),
                Name = producto.name,
                Description = producto.description,
                Price = producto.price,
                StockQuantity = producto.stock_quantity,
                CategoryId = producto.category_id,
                ImageUrl = producto.image_url,
                IsActive = producto.is_active
            });
            return resultadoConsulta;
        }

        public async Task<Guid> Editar (Guid Id, ProductoRequest producto) {
            await verificarProductoExiste(Id);
            string query = @"EditarProducto";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new 
            {
                Id = Id,
                Name = producto.name,
                Description = producto.description,
                Price = producto.price,
                StockQuantity = producto.stock_quantity,
                CategoryId = producto.category_id,
                ImageUrl = producto.image_url,
                IsActive = producto.is_active
            });
            return resultadoConsulta;
        }

        public async Task<Guid> Eliminar (Guid Id) {
            await verificarProductoExiste(Id);
            string query = @"EliminarProducto";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new 
            {
                Id = Id
            });
            return resultadoConsulta;
        }

        public async Task<IEnumerable<ProductoResponse>> Obtener () {
            string query = @"ObtenerProductos";
            var resultadoConsulta = await _sqlConnection.QueryAsync<ProductoResponse>(query);
            return resultadoConsulta;
        }

        public async Task<ProductoResponse> Obtener (Guid Id) {
            string query = @"ObtenerProducto";
            var resultadoConsulta = await _sqlConnection.QueryAsync<ProductoResponse>(query, new 
            {
                Id = Id
            });
            return resultadoConsulta.FirstOrDefault();
        }
        #endregion

        #region Helpers
        private async Task verificarProductoExiste(Guid Id) {
            ProductoResponse? resultadoConsultaProducto = await Obtener(Id);
            if (resultadoConsultaProducto == null) {
                throw new Exception("El producto no se encontró.");
            }
        }
        #endregion
    }
}

