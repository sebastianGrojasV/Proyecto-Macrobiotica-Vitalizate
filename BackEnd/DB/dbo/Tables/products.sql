CREATE TABLE [dbo].[products] (
    [id]             UNIQUEIDENTIFIER   CONSTRAINT [products_id_default] DEFAULT (newsequentialid()) NOT NULL,
    [name]           NVARCHAR (MAX)     NOT NULL,
    [description]    NVARCHAR (MAX)     NULL,
    [price]          DECIMAL (18, 2)    NOT NULL,
    [stock_quantity] INT                CONSTRAINT [products_stock_quantity_default] DEFAULT ((0)) NOT NULL,
    [category_id]    UNIQUEIDENTIFIER   NULL,
    [image_url]      NVARCHAR (MAX)     NULL,
    [is_active]      BIT                CONSTRAINT [products_is_active_default] DEFAULT ((1)) NOT NULL,
    [created_at]     DATETIMEOFFSET (7) CONSTRAINT [products_created_at_default] DEFAULT (sysutcdatetime()) NOT NULL,
    CONSTRAINT [products_pkey] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [products_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[categories] ([id])
);

