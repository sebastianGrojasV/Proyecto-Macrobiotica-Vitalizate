using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.DataAccess;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DataAccess
{
    public class ProveedorDA : IProveedorDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _connection;

        public ProveedorDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _connection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<Guid> Agregar(ProveedorRequest proveedor)
        {
            string query = @"INSERT INTO suppliers
                            (
                                name,
                                contact,
                                email,
                                phone,
                                address,
                                rating,
                                status
                            )
                            OUTPUT INSERTED.id
                            VALUES
                            (
                                @Name,
                                @Contact,
                                @Email,
                                @Phone,
                                @Address,
                                @Rating,
                                @Status
                            );";

            var idGenerado = await _connection.ExecuteScalarAsync<Guid>(query, proveedor);

            return idGenerado;
        }

        public async Task<Guid> Editar(Guid id, ProveedorRequest proveedor)
        {
            string query = @"UPDATE suppliers
                            SET
                                name = @Name,
                                contact = @Contact,
                                email = @Email,
                                phone = @Phone,
                                address = @Address,
                                rating = @Rating,
                                status = @Status
                            OUTPUT INSERTED.id
                            WHERE id = @Id;";

            var result = await _connection.ExecuteScalarAsync<Guid>(
                query,
                new
                {
                    Id = id,
                    proveedor.Name,
                    proveedor.Contact,
                    proveedor.Email,
                    proveedor.Phone,
                    proveedor.Address,
                    proveedor.Rating,
                    proveedor.Status
                });

            return result;
        }

        public async Task<Guid> Eliminar(Guid id)
        {
            string query = @"UPDATE suppliers
                            SET status = 'inactive'
                            OUTPUT INSERTED.id
                            WHERE id = @Id;";

            var result = await _connection.ExecuteScalarAsync<Guid>(
                query,
                new { Id = id });

            return result;
        }

        public async Task<IEnumerable<ProveedorResponse>> Obtener()
        {
            string query = @"SELECT 
                                s.id,
                                s.name,
                                s.contact,
                                s.email,
                                s.phone,
                                s.address,
                                s.rating,
                                s.status,
                                p.name AS ProductName
                            FROM suppliers s
                            LEFT JOIN product_lots pl ON pl.supplier_id = s.id
                            LEFT JOIN products p ON p.id = pl.product_id;";

            var supplierDictionary = new Dictionary<Guid, ProveedorResponse>();

            await _connection.QueryAsync<ProveedorResponse, string, ProveedorResponse>(
                query,
                (supplier, productName) =>
                {
                    if (!supplierDictionary.TryGetValue(supplier.Id, out var currentSupplier))
                    {
                        currentSupplier = supplier;
                        currentSupplier.ProductsSupplied = new List<string>();
                        supplierDictionary.Add(currentSupplier.Id, currentSupplier);
                    }

                    if (!string.IsNullOrEmpty(productName))
                    {
                        currentSupplier.ProductsSupplied.Add(productName);
                    }

                    return currentSupplier;
                },
                splitOn: "ProductName"
            );

            return supplierDictionary.Values;
        }

        public async Task<ProveedorResponse> Obtener(Guid Id)
        {
            string query = @"SELECT 
                                s.id,
                                s.name,
                                s.contact,
                                s.email,
                                s.phone,
                                s.address,
                                s.rating,
                                s.status,
                                p.name AS ProductName
                            FROM suppliers s
                            LEFT JOIN product_lots pl ON pl.supplier_id = s.id
                            LEFT JOIN products p ON p.id = pl.product_id
                            WHERE s.id = @Id;";

            var supplierDictionary = new Dictionary<Guid, ProveedorResponse>();

            var result = await _connection.QueryAsync<ProveedorResponse, string, ProveedorResponse>(
                query,
                (supplier, productName) =>
                {
                    if (!supplierDictionary.TryGetValue(supplier.Id, out var currentSupplier))
                    {
                        currentSupplier = supplier;
                        currentSupplier.ProductsSupplied = new List<string>();
                        supplierDictionary.Add(currentSupplier.Id, currentSupplier);
                    }

                    if (!string.IsNullOrEmpty(productName))
                        currentSupplier.ProductsSupplied.Add(productName);

                    return currentSupplier;
                },
                new { Id = Id },
                splitOn: "ProductName"
            );

            return supplierDictionary.Values.FirstOrDefault();
        }
    }
}
