CREATE PROCEDURE [dbo].[EliminarProducto]
    @Id AS uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @OldValues NVARCHAR(MAX);
    DECLARE @NewValues NVARCHAR(MAX);

    BEGIN TRANSACTION

    -- Snapshot ANTES
    SELECT @OldValues =
    (
        SELECT
            p.[name],
            p.[description],
            p.[price],
            p.[stock_quantity],
            p.[category_id],
            p.[image_url],
            p.[is_active]
        FROM [dbo].[products] p
        WHERE p.[id] = @Id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    );

    UPDATE [dbo].[products]
       SET [is_active] = 0
     WHERE [id] = @Id

    -- Snapshot DESPUÉS
    SELECT @NewValues =
    (
        SELECT
            p.[name],
            p.[description],
            p.[price],
            p.[stock_quantity],
            p.[category_id],
            p.[image_url],
            p.[is_active]
        FROM [dbo].[products] p
        WHERE p.[id] = @Id
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    );

    INSERT INTO [dbo].[product_audit]
           ([id], [product_id], [action], [description], [old_values], [new_values])
    VALUES
           (NEWID(), @Id, N'INACTIVATE', N'Se inactivó el producto.', @OldValues, @NewValues);

    -- Retornar solo el Id
    SELECT @Id
    COMMIT TRANSACTION
END