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
