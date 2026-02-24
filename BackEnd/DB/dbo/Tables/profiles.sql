CREATE TABLE [dbo].[profiles] (
    [id]         UNIQUEIDENTIFIER   NOT NULL,
    [full_name]  NVARCHAR (MAX)     NULL,
    [role]       NVARCHAR (30)      CONSTRAINT [profiles_role_default] DEFAULT (N'customer') NOT NULL,
    [phone]      NVARCHAR (MAX)     NULL,
    [avatar_url] NVARCHAR (MAX)     NULL,
    [created_at] DATETIMEOFFSET (7) CONSTRAINT [profiles_created_at_default] DEFAULT (sysutcdatetime()) NOT NULL,
    [updated_at] DATETIMEOFFSET (7) CONSTRAINT [profiles_updated_at_default] DEFAULT (sysutcdatetime()) NOT NULL,
    [username]   NVARCHAR (255)     NULL,
    [email]      NVARCHAR (MAX)     NULL,
    [cedula]     NVARCHAR (MAX)     NULL,
    [status]     NVARCHAR (30)      NULL,
    CONSTRAINT [profiles_pkey] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [profiles_role_ck] CHECK ([role]=N'staff' OR [role]=N'admin' OR [role]=N'customer'),
    CONSTRAINT [profiles_status_ck] CHECK ([status] IS NULL OR ([status]=N'inactive' OR [status]=N'active')),
    CONSTRAINT [profiles_username_ck] CHECK ([username] IS NULL OR len([username])>=(3)),
    CONSTRAINT [profiles_id_fkey] FOREIGN KEY ([id]) REFERENCES [auth].[users] ([id])
);

