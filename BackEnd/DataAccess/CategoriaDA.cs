using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DA
{
    public class CategoriaDA : ICategoriaDA {
        private readonly IRepositorioDapper _repositorioDapper;
        private readonly SqlConnection _sqlConnection;

        public CategoriaDA (IRepositorioDapper repositorioDapper) {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        #region Operaciones
        public async Task<Guid> Agregar (CategoriaBase categoria) {
            string query = @"AgregarCategoria";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new 
            {
                Id = Guid.NewGuid(),
                Name = categoria.name,
                Slug = categoria.slug,
                ImageUrl = categoria.image_url
            });
            return resultadoConsulta;
        }

        public async Task<Guid> Editar (Guid Id, CategoriaBase categoria) {
            await verificarCategoriaExiste(Id);
            string query = @"EditarCategoria";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new 
            {
                Id = Id,
                Name = categoria.name,
                Slug = categoria.slug,
                ImageUrl = categoria.image_url
            });
            return resultadoConsulta;
        }

        public async Task<Guid> Eliminar (Guid Id) {
            await verificarCategoriaExiste(Id);
            string query = @"EliminarCategoria";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new 
            {
                Id = Id
            });
            return resultadoConsulta;
        }

        public async Task<IEnumerable<CategoriaResponse>> Obtener () {
            string query = @"ObtenerCategorias";
            var resultadoConsulta = await _sqlConnection.QueryAsync<CategoriaResponse>(query);
            return resultadoConsulta;
        }

        public async Task<CategoriaResponse> Obtener (Guid Id) {
            string query = @"ObtenerCategoria";
            var resultadoConsulta = await _sqlConnection.QueryAsync<CategoriaResponse>(query, new 
            {
                Id = Id
            });
            return resultadoConsulta.FirstOrDefault();
        }
        #endregion

        #region Helpers
        private async Task verificarCategoriaExiste(Guid Id) {
            CategoriaResponse? resultadoConsultaCategoria = await Obtener(Id);
            if (resultadoConsultaCategoria == null) {
                throw new Exception("La categoría no se encontró.");
            }
        }
        #endregion
    }
}

