-- =============================================
-- ORDENES
-- =============================================
CREATE PROCEDURE AgregarOrden
    @Id AS uniqueidentifier,
    @UserId AS uniqueidentifier = NULL,
    @Status AS nvarchar(30),
    @TotalAmount AS decimal(18,2),
    @ShippingAddressId AS uniqueidentifier = NULL,
    @TrackingNumber AS nvarchar(max) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    INSERT INTO [dbo].[orders]
           ([id],
            [user_id],
            [status],
            [total_amount],
            [shipping_address_id],
            [tracking_number])
    VALUES
           (@Id,
            @UserId,
            @Status,
            @TotalAmount,
            @ShippingAddressId,
            @TrackingNumber);

    -- Retornar solo el Id
    SELECT @Id;

    COMMIT TRANSACTION;
END