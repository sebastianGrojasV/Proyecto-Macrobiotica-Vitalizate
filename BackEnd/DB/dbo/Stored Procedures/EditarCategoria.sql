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