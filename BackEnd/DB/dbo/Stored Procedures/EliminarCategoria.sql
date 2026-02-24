CREATE PROCEDURE EliminarCategoria
    @Id AS uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION
    DELETE FROM [dbo].[categories]
    WHERE ([id] = @Id)

    -- Retornar solo el Id
    SELECT @Id
    COMMIT TRANSACTION
END