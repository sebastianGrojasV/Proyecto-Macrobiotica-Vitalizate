-- Para crear los SP

-- CATEGORIA
-- =============================================
CREATE PROCEDURE AgregarCategoria
    @Id AS uniqueidentifier,
    @Name AS nvarchar(max),
    @Slug AS nvarchar(255),
    @ImageUrl AS nvarchar(max) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    INSERT INTO [dbo].[categories]
           ([id]
           ,[name]
           ,[slug]
           ,[image_url]
           ,[created_at])
    VALUES
           (@Id
           ,@Name
           ,@Slug
           ,@ImageUrl
           ,SYSDATETIMEOFFSET())

    -- Retornar solo el Id
    SELECT @Id
    COMMIT TRANSACTION;
END
GO


-- =============================================
CREATE PROCEDURE EditarCategoria
    @Id AS uniqueidentifier,
    @Name AS nvarchar(max),
    @Slug AS nvarchar(255),
    @ImageUrl AS nvarchar(max) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION
    UPDATE [dbo].[categories]
       SET [name] = @Name
          ,[slug] = @Slug
          ,[image_url] = @ImageUrl
     WHERE [id] = @Id

    -- Retornar solo el Id
    SELECT @Id
    COMMIT TRANSACTION
END
GO


-- =============================================
CREATE PROCEDURE EliminarCategoria
    @Id AS uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION
    DELETE FROM [dbo].[categories]
    WHERE ([id] = @Id)

    -- Retornar solo el Id
    SELECT @Id
    COMMIT TRANSACTION
END
GO


-- =============================================
CREATE PROCEDURE ObtenerCategorias
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        c.[id],
        c.[name],
        c.[slug],
        c.[image_url],
        c.[created_at]
    FROM [dbo].[categories] c;
END
GO


-- =============================================
CREATE PROCEDURE ObtenerCategoria
    @Id AS uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        c.[id],
        c.[name],
        c.[slug],
        c.[image_url],
        c.[created_at]
    FROM [dbo].[categories] c
    WHERE c.[id] = @Id;
END
GO

-- =============================================
-- PRODUCTOS
-- =============================================
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
GO

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
GO

---- ALTER PARA AUDIT ----
-- =============================================
ALTER PROCEDURE [dbo].[EditarProducto]
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
GO

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
GO

---- ALTER PARA AUDIT ----
-- =============================================
ALTER PROCEDURE [dbo].[EliminarProducto]
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
GO

-- =============================================
CREATE PROCEDURE ObtenerProductos
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        p.[id],
        p.[name],
        p.[description],
        p.[price],
        p.[stock_quantity],
        p.[category_id],
        p.[image_url],
        p.[is_active],
        p.[created_at],
        c.[name] AS Categoria
    FROM [dbo].[products] p
    LEFT JOIN [dbo].[categories] c 
        ON c.[id] = p.[category_id];
END
GO

-- =============================================
CREATE PROCEDURE ObtenerProducto
    @Id AS uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        p.[id],
        p.[name],
        p.[description],
        p.[price],
        p.[stock_quantity],
        p.[category_id],
        p.[image_url],
        p.[is_active],
        p.[created_at],
        c.[name] AS Categoria
    FROM [dbo].[products] p
    LEFT JOIN [dbo].[categories] c 
        ON c.[id] = p.[category_id]
    WHERE p.[id] = @Id;
END
GO

-- =============================================
-- PRODUCTOS AUDIT
-- =============================================
CREATE PROCEDURE ObtenerHistorialProducto
    @IdProducto AS uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        a.[id],
        a.[product_id],
        a.[action],
        a.[description],
        a.[old_values],
        a.[new_values],
        a.[created_at]
    FROM [dbo].[product_audit] a
    WHERE a.[product_id] = @IdProducto
    ORDER BY a.[created_at] DESC;
END
GO