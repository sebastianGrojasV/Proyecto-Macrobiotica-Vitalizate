CREATE PROCEDURE ObtenerCategorias
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        c.[id],
        c.[name],
        c.[slug],
        c.[image_url],
        c.[created_at]
    FROM [dbo].[categories] c;
END