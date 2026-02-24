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