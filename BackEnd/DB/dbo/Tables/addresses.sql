CREATE TABLE [dbo].[addresses] (
    [id]         UNIQUEIDENTIFIER   CONSTRAINT [addresses_id_default] DEFAULT (newsequentialid()) NOT NULL,
    [user_id]    UNIQUEIDENTIFIER   NULL,
    [street]     NVARCHAR (MAX)     NOT NULL,
    [city]       NVARCHAR (MAX)     NOT NULL,
    [state]      NVARCHAR (MAX)     NULL,
    [zip_code]   NVARCHAR (MAX)     NULL,
    [country]    NVARCHAR (MAX)     CONSTRAINT [addresses_country_default] DEFAULT (N'Costa Rica') NOT NULL,
    [is_default] BIT                CONSTRAINT [addresses_is_default_default] DEFAULT ((0)) NOT NULL,
    [created_at] DATETIMEOFFSET (7) CONSTRAINT [addresses_created_at_default] DEFAULT (sysutcdatetime()) NOT NULL,
    CONSTRAINT [addresses_pkey] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [addresses_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[profiles] ([id])
);

