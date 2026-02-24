CREATE PROCEDURE ObtenerHistorialProducto
    @IdProducto AS uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        a.[id],
        a.[product_id],
        a.[action],
        a.[description],
        a.[old_values],
        a.[new_values],
        a.[created_at]
    FROM [dbo].[product_audit] a
    WHERE a.[product_id] = @IdProducto
    ORDER BY a.[created_at] DESC;
END