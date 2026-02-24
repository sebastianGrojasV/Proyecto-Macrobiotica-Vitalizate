CREATE TABLE [dbo].[product_lots] (
    [id]               UNIQUEIDENTIFIER   CONSTRAINT [product_lots_id_default] DEFAULT (newsequentialid()) NOT NULL,
    [product_id]       UNIQUEIDENTIFIER   NULL,
    [supplier_id]      UNIQUEIDENTIFIER   NULL,
    [lot_code]         NVARCHAR (MAX)     NOT NULL,
    [expiration_date]  DATE               NULL,
    [quantity_initial] INT                NOT NULL,
    [created_at]       DATETIMEOFFSET (7) CONSTRAINT [product_lots_created_at_default] DEFAULT (sysutcdatetime()) NOT NULL,
    CONSTRAINT [product_lots_pkey] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [product_lots_product_id_fkey] FOREIGN KEY ([product_id]) REFERENCES [dbo].[products] ([id]),
    CONSTRAINT [product_lots_supplier_id_fkey] FOREIGN KEY ([supplier_id]) REFERENCES [dbo].[suppliers] ([id])
);

