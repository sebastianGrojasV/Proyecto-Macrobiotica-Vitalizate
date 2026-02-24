
CREATE PROCEDURE AgregarProducto
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

    BEGIN TRANSACTION;

    INSERT INTO [dbo].[products]
           ([id]
           ,[name]
           ,[description]
           ,[price]
           ,[stock_quantity]
           ,[category_id]
           ,[image_url]
           ,[is_active]
           ,[created_at])
    VALUES
           (@Id
           ,@Name
           ,@Description
           ,@Price
           ,@StockQuantity
           ,@CategoryId
           ,@ImageUrl
           ,@IsActive
           ,SYSDATETIMEOFFSET())

    -- Retornar solo el Id
    SELECT @Id
    COMMIT TRANSACTION;
END