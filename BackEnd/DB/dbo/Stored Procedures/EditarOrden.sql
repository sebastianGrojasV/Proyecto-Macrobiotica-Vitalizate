
-- =============================================
CREATE PROCEDURE EditarOrden
    @Id AS uniqueidentifier,
    @Status AS nvarchar(30),
    @ShippingAddressId AS uniqueidentifier = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    UPDATE [dbo].[orders]
       SET [status] = @Status,
           [shipping_address_id] = @ShippingAddressId,
           [updated_at] = SYSUTCDATETIME()
     WHERE [id] = @Id;

    -- Retornar solo el Id
    SELECT @Id;

    COMMIT TRANSACTION;
END