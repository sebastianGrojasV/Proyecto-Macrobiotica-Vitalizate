CREATE PROCEDURE ObtenerCategoria
    @Id AS uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        c.[id],
        c.[name],
        c.[slug],
        c.[image_url],
        c.[created_at]
    FROM [dbo].[categories] c
    WHERE c.[id] = @Id;
END