CREATE TABLE [dbo].[orders] (
    [id]                  UNIQUEIDENTIFIER   CONSTRAINT [orders_id_default] DEFAULT (newsequentialid()) NOT NULL,
    [user_id]             UNIQUEIDENTIFIER   NULL,
    [status]              NVARCHAR (30)      CONSTRAINT [orders_status_default] DEFAULT (N'pending') NOT NULL,
    [total_amount]        DECIMAL (18, 2)    NOT NULL,
    [shipping_address_id] UNIQUEIDENTIFIER   NULL,
    [tracking_number]     NVARCHAR (MAX)     NULL,
    [created_at]          DATETIMEOFFSET (7) CONSTRAINT [orders_created_at_default] DEFAULT (sysutcdatetime()) NOT NULL,
    [updated_at]          DATETIMEOFFSET (7) CONSTRAINT [orders_updated_at_default] DEFAULT (sysutcdatetime()) NOT NULL,
    CONSTRAINT [orders_pkey] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [orders_status_ck] CHECK ([status]=N'cancelled' OR [status]=N'delivered' OR [status]=N'shipped' OR [status]=N'paid' OR [status]=N'pending'),
    CONSTRAINT [orders_shipping_address_id_fkey] FOREIGN KEY ([shipping_address_id]) REFERENCES [dbo].[addresses] ([id]),
    CONSTRAINT [orders_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[profiles] ([id])
);

