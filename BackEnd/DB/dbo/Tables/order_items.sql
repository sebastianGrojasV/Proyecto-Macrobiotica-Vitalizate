CREATE TABLE [dbo].[order_items] (
    [id]         UNIQUEIDENTIFIER CONSTRAINT [order_items_id_default] DEFAULT (newsequentialid()) NOT NULL,
    [order_id]   UNIQUEIDENTIFIER NULL,
    [product_id] UNIQUEIDENTIFIER NULL,
    [quantity]   INT              NOT NULL,
    [unit_price] DECIMAL (18, 2)  NOT NULL,
    [subtotal]   AS               (CONVERT([decimal](18,2),[quantity])*[unit_price]) PERSISTED,
    CONSTRAINT [order_items_pkey] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [order_items_order_id_fkey] FOREIGN KEY ([order_id]) REFERENCES [dbo].[orders] ([id]),
    CONSTRAINT [order_items_product_id_fkey] FOREIGN KEY ([product_id]) REFERENCES [dbo].[products] ([id])
);

