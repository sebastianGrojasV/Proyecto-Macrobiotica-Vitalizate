CREATE TABLE [dbo].[categories] (
    [id]         UNIQUEIDENTIFIER   CONSTRAINT [categories_id_default] DEFAULT (newsequentialid()) NOT NULL,
    [name]       NVARCHAR (MAX)     NOT NULL,
    [slug]       NVARCHAR (255)     NOT NULL,
    [image_url]  NVARCHAR (MAX)     NULL,
    [created_at] DATETIMEOFFSET (7) CONSTRAINT [categories_created_at_default] DEFAULT (sysutcdatetime()) NOT NULL,
    CONSTRAINT [categories_pkey] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [categories_slug_uq] UNIQUE NONCLUSTERED ([slug] ASC)
);

