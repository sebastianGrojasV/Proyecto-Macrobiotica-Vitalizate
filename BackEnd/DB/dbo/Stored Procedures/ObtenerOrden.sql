
-- =============================================
CREATE PROCEDURE ObtenerOrden
    @Id AS uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        o.[id],
        o.[user_id],
        o.[status],
        o.[total_amount],
        o.[shipping_address_id],
        o.[tracking_number],
        o.[created_at],
        o.[updated_at]
    FROM [dbo].[orders] o
    WHERE o.[id] = @Id;
END