-- Para crear los SP

-- CATEGORIA
-- =============================================
--CREATE PROCEDURE AgregarCategoria
--    @Id AS uniqueidentifier,
--    @Name AS nvarchar(max),
--    @Slug AS nvarchar(255),
--    @ImageUrl AS nvarchar(max) = NULL
--AS
--BEGIN
--    SET NOCOUNT ON;

--    BEGIN TRANSACTION;

--    INSERT INTO [dbo].[categories]
--           ([id]
--           ,[name]
--           ,[slug]
--           ,[image_url]
--           ,[created_at])
--    VALUES
--           (@Id
--           ,@Name
--           ,@Slug
--           ,@ImageUrl
--           ,SYSDATETIMEOFFSET())

--    -- Retornar solo el Id
--    SELECT @Id
--    COMMIT TRANSACTION;
--END
--GO


---- =============================================
--CREATE PROCEDURE EditarCategoria
--    @Id AS uniqueidentifier,
--    @Name AS nvarchar(max),
--    @Slug AS nvarchar(255),
--    @ImageUrl AS nvarchar(max) = NULL
--AS
--BEGIN
--    SET NOCOUNT ON;

--    BEGIN TRANSACTION
--    UPDATE [dbo].[categories]
--       SET [name] = @Name
--          ,[slug] = @Slug
--          ,[image_url] = @ImageUrl
--     WHERE [id] = @Id

--    -- Retornar solo el Id
--    SELECT @Id
--    COMMIT TRANSACTION
--END
--GO


---- =============================================
--CREATE PROCEDURE EliminarCategoria
--    @Id AS uniqueidentifier
--AS
--BEGIN
--    SET NOCOUNT ON;

--    BEGIN TRANSACTION
--    DELETE FROM [dbo].[categories]
--    WHERE ([id] = @Id)

--    -- Retornar solo el Id
--    SELECT @Id
--    COMMIT TRANSACTION
--END
--GO


---- =============================================
--CREATE PROCEDURE ObtenerCategorias
--AS
--BEGIN
--    SET NOCOUNT ON;

--    SELECT
--        c.[id],
--        c.[name],
--        c.[slug],
--        c.[image_url],
--        c.[created_at]
--    FROM [dbo].[categories] c;
--END
--GO


---- =============================================
--CREATE PROCEDURE ObtenerCategoria
--    @Id AS uniqueidentifier
--AS
--BEGIN
--    SET NOCOUNT ON;

--    SELECT
--        c.[id],
--        c.[name],
--        c.[slug],
--        c.[image_url],
--        c.[created_at]
--    FROM [dbo].[categories] c
--    WHERE c.[id] = @Id;
--END
--GO

-- =============================================
-- PRODUCTOS
-- =============================================
--CREATE PROCEDURE AgregarProducto
--    @Id AS uniqueidentifier,
--    @Name AS nvarchar(max),
--    @Description AS nvarchar(max) = NULL,
--    @Price AS decimal(18,2),
--    @StockQuantity AS int,
--    @CategoryId AS uniqueidentifier = NULL,
--    @ImageUrl AS nvarchar(max) = NULL,
--    @IsActive AS bit
--AS
--BEGIN
--    SET NOCOUNT ON;

--    BEGIN TRANSACTION;

--    INSERT INTO [dbo].[products]
--           ([id]
--           ,[name]
--           ,[description]
--           ,[price]
--           ,[stock_quantity]
--           ,[category_id]
--           ,[image_url]
--           ,[is_active]
--           ,[created_at])
--    VALUES
--           (@Id
--           ,@Name
--           ,@Description
--           ,@Price
--           ,@StockQuantity
--           ,@CategoryId
--           ,@ImageUrl
--           ,@IsActive
--           ,SYSDATETIMEOFFSET())

--    -- Retornar solo el Id
--    SELECT @Id
--    COMMIT TRANSACTION;
--END
--GO

---- =============================================
--CREATE PROCEDURE EditarProducto
--    @Id AS uniqueidentifier,
--    @Name AS nvarchar(max),
--    @Description AS nvarchar(max) = NULL,
--    @Price AS decimal(18,2),
--    @StockQuantity AS int,
--    @CategoryId AS uniqueidentifier = NULL,
--    @ImageUrl AS nvarchar(max) = NULL,
--    @IsActive AS bit
--AS
--BEGIN
--    SET NOCOUNT ON;

--    BEGIN TRANSACTION
--    UPDATE [dbo].[products]
--       SET [name] = @Name,
--           [description] = @Description,
--           [price] = @Price,
--           [stock_quantity] = @StockQuantity,
--           [category_id] = @CategoryId,
--           [image_url] = @ImageUrl,
--           [is_active] = @IsActive
--     WHERE [id] = @Id

--    -- Retornar solo el Id
--    SELECT @Id
--    COMMIT TRANSACTION
--END
--GO

---- =============================================
--CREATE PROCEDURE EliminarProducto
--    @Id AS uniqueidentifier
--AS
--BEGIN
--    SET NOCOUNT ON;

--    BEGIN TRANSACTION
--    UPDATE [dbo].[products]
--       SET [is_active] = 0
--     WHERE [id] = @Id

--    -- Retornar solo el Id
--    SELECT @Id
--    COMMIT TRANSACTION
--END
--GO

---- =============================================
--CREATE PROCEDURE ObtenerProductos
--AS
--BEGIN
--    SET NOCOUNT ON;

--    SELECT
--        p.[id],
--        p.[name],
--        p.[description],
--        p.[price],
--        p.[stock_quantity],
--        p.[category_id],
--        p.[image_url],
--        p.[is_active],
--        p.[created_at],
--        c.[name] AS Categoria
--    FROM [dbo].[products] p
--    LEFT JOIN [dbo].[categories] c 
--        ON c.[id] = p.[category_id];
--END
--GO

---- =============================================
--CREATE PROCEDURE ObtenerProducto
--    @Id AS uniqueidentifier
--AS
--BEGIN
--    SET NOCOUNT ON;

--    SELECT
--        p.[id],
--        p.[name],
--        p.[description],
--        p.[price],
--        p.[stock_quantity],
--        p.[category_id],
--        p.[image_url],
--        p.[is_active],
--        p.[created_at],
--        c.[name] AS Categoria
--    FROM [dbo].[products] p
--    LEFT JOIN [dbo].[categories] c 
--        ON c.[id] = p.[category_id]
--    WHERE p.[id] = @Id;
--END
--GO

---- =============================================
