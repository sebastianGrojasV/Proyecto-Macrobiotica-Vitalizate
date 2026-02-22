CREATE TABLE [dbo].[suppliers] (
    [id]            UNIQUEIDENTIFIER   CONSTRAINT [suppliers_id_default] DEFAULT (newsequentialid()) NOT NULL,
    [name]          NVARCHAR (MAX)     NOT NULL,
    [contact_email] NVARCHAR (MAX)     NULL,
    [phone]         NVARCHAR (MAX)     NULL,
    [address]       NVARCHAR (MAX)     NULL,
    [created_at]    DATETIMEOFFSET (7) CONSTRAINT [suppliers_created_at_default] DEFAULT (sysutcdatetime()) NOT NULL,
    CONSTRAINT [suppliers_pkey] PRIMARY KEY CLUSTERED ([id] ASC)
);

