CREATE TABLE [auth].[users] (
    [id]         UNIQUEIDENTIFIER   NOT NULL,
    [name]       NVARCHAR (200)     NOT NULL,
    [email]      NVARCHAR (200)     NOT NULL,
    [phone]      NVARCHAR (50)      NULL,
    [rol]        NVARCHAR (50)      NOT NULL,
    [cedula]     NVARCHAR (20)      NOT NULL,
    [created_at] DATETIMEOFFSET (7) CONSTRAINT [users_created_at_default] DEFAULT (sysutcdatetime()) NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [CK_users_role] CHECK ([rol]='accountant' OR [rol]='customer' OR [rol]='delivery' OR [rol]='admin'),
    CONSTRAINT [UQ_users_cedula] UNIQUE NONCLUSTERED ([cedula] ASC),
    CONSTRAINT [UQ_users_email] UNIQUE NONCLUSTERED ([email] ASC)
);

