
-- =============================================
CREATE PROCEDURE EliminarProducto
    @Id AS uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION
    UPDATE [dbo].[products]
       SET [is_active] = 0
     WHERE [id] = @Id

    -- Retornar solo el Id
    SELECT @Id
    COMMIT TRANSACTION
END