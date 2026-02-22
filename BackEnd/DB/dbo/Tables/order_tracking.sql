CREATE TABLE [dbo].[order_tracking] (
    [id]         UNIQUEIDENTIFIER   CONSTRAINT [order_tracking_id_default] DEFAULT (newsequentialid()) NOT NULL,
    [order_id]   UNIQUEIDENTIFIER   NULL,
    [status]     NVARCHAR (30)      NOT NULL,
    [notes]      NVARCHAR (MAX)     NULL,
    [created_at] DATETIMEOFFSET (7) CONSTRAINT [order_tracking_created_at_default] DEFAULT (sysutcdatetime()) NOT NULL,
    CONSTRAINT [order_tracking_pkey] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [order_tracking_status_ck] CHECK ([status]=N'cancelled' OR [status]=N'delivered' OR [status]=N'shipped' OR [status]=N'paid' OR [status]=N'pending'),
    CONSTRAINT [order_tracking_order_id_fkey] FOREIGN KEY ([order_id]) REFERENCES [dbo].[orders] ([id])
);

