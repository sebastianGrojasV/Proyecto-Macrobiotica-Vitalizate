
-- =============================================
CREATE PROCEDURE EditarProducto
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

    BEGIN TRANSACTION
    UPDATE [dbo].[products]
       SET [name] = @Name,
           [description] = @Description,
           [price] = @Price,
           [stock_quantity] = @StockQuantity,
           [category_id] = @CategoryId,
           [image_url] = @ImageUrl,
           [is_active] = @IsActive
     WHERE [id] = @Id

    -- Retornar solo el Id
    SELECT @Id
    COMMIT TRANSACTION
END