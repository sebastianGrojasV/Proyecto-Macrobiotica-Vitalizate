CREATE TABLE [dbo].[reviews] (
    [id]         UNIQUEIDENTIFIER   CONSTRAINT [reviews_id_default] DEFAULT (newsequentialid()) NOT NULL,
    [product_id] UNIQUEIDENTIFIER   NULL,
    [user_id]    UNIQUEIDENTIFIER   NULL,
    [rating]     INT                NULL,
    [comment]    NVARCHAR (MAX)     NULL,
    [created_at] DATETIMEOFFSET (7) CONSTRAINT [reviews_created_at_default] DEFAULT (sysutcdatetime()) NOT NULL,
    CONSTRAINT [reviews_pkey] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [reviews_rating_ck] CHECK ([rating] IS NULL OR [rating]>=(1) AND [rating]<=(5)),
    CONSTRAINT [reviews_product_id_fkey] FOREIGN KEY ([product_id]) REFERENCES [dbo].[products] ([id]),
    CONSTRAINT [reviews_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[profiles] ([id])
);

