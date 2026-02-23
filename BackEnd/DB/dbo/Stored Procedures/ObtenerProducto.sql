
-- =============================================
CREATE PROCEDURE ObtenerProducto
    @Id AS uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        p.[id],
        p.[name],
        p.[description],
        p.[price],
        p.[stock_quantity],
        p.[category_id],
        p.[image_url],
        p.[is_active],
        p.[created_at],
        c.[name] AS Categoria
    FROM [dbo].[products] p
    LEFT JOIN [dbo].[categories] c 
        ON c.[id] = p.[category_id]
    WHERE p.[id] = @Id;
END