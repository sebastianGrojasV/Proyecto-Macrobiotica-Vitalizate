CREATE PROCEDURE [dbo].[EditarProducto]
    @Id AS uniqueidentifier,
    @Name AS nvarchar(max),
    @Description AS nvarchar(max) = NULL,
    @Price AS decimal(18,2),
    @StockQuantity AS int,
    @CategoryId AS uniqueidentifier = NULL,
    @ImageUrl AS nvarchar(max) = NULL,
    @IsActive AS bit
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @OldValues NVARCHAR(MAX);
    DECLARE @NewValues NVARCHAR(MAX);
    DECLARE @AuditDescription NVARCHAR(MAX);

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
       SET [name] = @Name,
           [description] = @Description,
           [price] = @Price,
           [stock_quantity] = @StockQuantity,
           [category_id] = @CategoryId,
           [image_url] = @ImageUrl,
           [is_active] = @IsActive
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

    SET @AuditDescription = CONCAT(N'Se actualizó el producto: ', @Name);

    INSERT INTO [dbo].[product_audit]
           ([id], [product_id], [action], [description], [old_values], [new_values])
    VALUES
           (NEWID(), @Id, N'UPDATE', @AuditDescription, @OldValues, @NewValues);

    -- Retornar solo el Id
    SELECT @Id
    COMMIT TRANSACTION
END