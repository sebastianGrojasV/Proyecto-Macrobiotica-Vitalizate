CREATE TABLE [dbo].[product_audit] (
    [id]          UNIQUEIDENTIFIER   NOT NULL,
    [product_id]  UNIQUEIDENTIFIER   NOT NULL,
    [action]      NVARCHAR (50)      NOT NULL,
    [description] NVARCHAR (MAX)     NULL,
    [old_values]  NVARCHAR (MAX)     NULL,
    [new_values]  NVARCHAR (MAX)     NULL,
    [created_at]  DATETIMEOFFSET (7) CONSTRAINT [DF_product_audit_created_at] DEFAULT (sysdatetimeoffset()) NOT NULL,
    CONSTRAINT [PK_product_audit] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_product_audit_products] FOREIGN KEY ([product_id]) REFERENCES [dbo].[products] ([id])
);


GO
CREATE NONCLUSTERED INDEX [IX_product_audit_product_date]
    ON [dbo].[product_audit]([product_id] ASC, [created_at] DESC);

