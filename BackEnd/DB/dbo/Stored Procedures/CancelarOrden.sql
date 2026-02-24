
-- =============================================
CREATE PROCEDURE CancelarOrden
    @Id AS uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    UPDATE [dbo].[orders]
       SET [status] = N'cancelled',
           [updated_at] = SYSUTCDATETIME()
     WHERE [id] = @Id;

    -- Retornar solo el Id
    SELECT @Id;

    COMMIT TRANSACTION;
END