/* ============================================================
   ProyectoGaia - Schema compatible con SQL Server (GUID PKs)
   Fuente: Supabase/PostgreSQL (estructura)
   ============================================================ */

-- 1) Crear base de datos si no existe
IF DB_ID(N'ProyectoGaia') IS NULL
BEGIN
    CREATE DATABASE ProyectoGaia;
END
GO

-- 2) Usar base de datos
USE ProyectoGaia;
GO

/* ============================================================
   3) Schema "auth" y tabla mínima para soportar FK profiles -> auth.users
   ============================================================ */
IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = N'auth')
BEGIN
    EXEC(N'CREATE SCHEMA [auth]');
END
GO

IF OBJECT_ID(N'[auth].[users]', N'U') IS NULL
BEGIN
    CREATE TABLE [auth].[users] (
        [id] UNIQUEIDENTIFIER NOT NULL,
        CONSTRAINT [users_pkey] PRIMARY KEY ([id])
    );
END
GO

/* ============================================================
   4) Tablas dbo (IDs como GUID)
   - text            -> NVARCHAR(MAX)
   - uuid            -> UNIQUEIDENTIFIER
   - boolean         -> BIT
   - numeric         -> DECIMAL(18,2)
   - timestamptz     -> DATETIMEOFFSET(7)
   ============================================================ */

-- PROFILES (referencia a auth.users)
IF OBJECT_ID(N'[dbo].[profiles]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[profiles] (
        [id] UNIQUEIDENTIFIER NOT NULL,
        [full_name] NVARCHAR(MAX) NULL,

        -- USER-DEFINED user_role -> NVARCHAR con CHECK
        [role] NVARCHAR(30) NOT NULL
            CONSTRAINT [profiles_role_default] DEFAULT (N'customer'),

        [phone] NVARCHAR(MAX) NULL,
        [avatar_url] NVARCHAR(MAX) NULL,

        [created_at] DATETIMEOFFSET(7) NOT NULL
            CONSTRAINT [profiles_created_at_default] DEFAULT (SYSUTCDATETIME()),
        [updated_at] DATETIMEOFFSET(7) NOT NULL
            CONSTRAINT [profiles_updated_at_default] DEFAULT (SYSUTCDATETIME()),

        [username] NVARCHAR(255) NULL,
        [email] NVARCHAR(MAX) NULL,
        [cedula] NVARCHAR(MAX) NULL,

        [status] NVARCHAR(30) NULL,

        CONSTRAINT [profiles_pkey] PRIMARY KEY ([id]),

        CONSTRAINT [profiles_id_fkey]
            FOREIGN KEY ([id]) REFERENCES [auth].[users]([id]),

        CONSTRAINT [profiles_username_ck]
            CHECK ([username] IS NULL OR LEN([username]) >= 3),

        CONSTRAINT [profiles_status_ck]
            CHECK ([status] IS NULL OR [status] IN (N'active', N'inactive')),

        CONSTRAINT [profiles_role_ck]
            CHECK ([role] IN (N'customer', N'admin', N'staff'))
            -- Ajustá la lista si tu enum real tiene otros valores
    );
END
GO

-- CATEGORIES
IF OBJECT_ID(N'[dbo].[categories]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[categories] (
        [id] UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT [categories_id_default] DEFAULT (NEWSEQUENTIALID()),
        [name] NVARCHAR(MAX) NOT NULL,
        [slug] NVARCHAR(255) NOT NULL,
        [image_url] NVARCHAR(MAX) NULL,
        [created_at] DATETIMEOFFSET(7) NOT NULL
            CONSTRAINT [categories_created_at_default] DEFAULT (SYSUTCDATETIME()),

        CONSTRAINT [categories_pkey] PRIMARY KEY ([id]),
        CONSTRAINT [categories_slug_uq] UNIQUE ([slug])
    );
END
GO

-- SUPPLIERS
IF OBJECT_ID(N'[dbo].[suppliers]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[suppliers] (
        [id] UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT [suppliers_id_default] DEFAULT (NEWSEQUENTIALID()),
        [name] NVARCHAR(MAX) NOT NULL,
        [contact_email] NVARCHAR(MAX) NULL,
        [phone] NVARCHAR(MAX) NULL,
        [address] NVARCHAR(MAX) NULL,
        [created_at] DATETIMEOFFSET(7) NOT NULL
            CONSTRAINT [suppliers_created_at_default] DEFAULT (SYSUTCDATETIME()),

        CONSTRAINT [suppliers_pkey] PRIMARY KEY ([id])
    );
END
GO

-- PRODUCTS
IF OBJECT_ID(N'[dbo].[products]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[products] (
        [id] UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT [products_id_default] DEFAULT (NEWSEQUENTIALID()),
        [name] NVARCHAR(MAX) NOT NULL,
        [description] NVARCHAR(MAX) NULL,
        [price] DECIMAL(18,2) NOT NULL,
        [stock_quantity] INT NOT NULL
            CONSTRAINT [products_stock_quantity_default] DEFAULT (0),
        [category_id] UNIQUEIDENTIFIER NULL,
        [image_url] NVARCHAR(MAX) NULL,
        [is_active] BIT NOT NULL
            CONSTRAINT [products_is_active_default] DEFAULT (1),
        [created_at] DATETIMEOFFSET(7) NOT NULL
            CONSTRAINT [products_created_at_default] DEFAULT (SYSUTCDATETIME()),

        CONSTRAINT [products_pkey] PRIMARY KEY ([id]),
        CONSTRAINT [products_category_id_fkey]
            FOREIGN KEY ([category_id]) REFERENCES [dbo].[categories]([id])
    );
END
GO

-- ADDRESSES
IF OBJECT_ID(N'[dbo].[addresses]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[addresses] (
        [id] UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT [addresses_id_default] DEFAULT (NEWSEQUENTIALID()),
        [user_id] UNIQUEIDENTIFIER NULL,
        [street] NVARCHAR(MAX) NOT NULL,
        [city] NVARCHAR(MAX) NOT NULL,
        [state] NVARCHAR(MAX) NULL,
        [zip_code] NVARCHAR(MAX) NULL,
        [country] NVARCHAR(MAX) NOT NULL
            CONSTRAINT [addresses_country_default] DEFAULT (N'Costa Rica'),
        [is_default] BIT NOT NULL
            CONSTRAINT [addresses_is_default_default] DEFAULT (0),
        [created_at] DATETIMEOFFSET(7) NOT NULL
            CONSTRAINT [addresses_created_at_default] DEFAULT (SYSUTCDATETIME()),

        CONSTRAINT [addresses_pkey] PRIMARY KEY ([id]),
        CONSTRAINT [addresses_user_id_fkey]
            FOREIGN KEY ([user_id]) REFERENCES [dbo].[profiles]([id])
    );
END
GO

-- ORDERS
IF OBJECT_ID(N'[dbo].[orders]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[orders] (
        [id] UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT [orders_id_default] DEFAULT (NEWSEQUENTIALID()),
        [user_id] UNIQUEIDENTIFIER NULL,

        -- USER-DEFINED order_status -> NVARCHAR con CHECK
        [status] NVARCHAR(30) NOT NULL
            CONSTRAINT [orders_status_default] DEFAULT (N'pending'),

        [total_amount] DECIMAL(18,2) NOT NULL,
        [shipping_address_id] UNIQUEIDENTIFIER NULL,
        [tracking_number] NVARCHAR(MAX) NULL,
        [created_at] DATETIMEOFFSET(7) NOT NULL
            CONSTRAINT [orders_created_at_default] DEFAULT (SYSUTCDATETIME()),
        [updated_at] DATETIMEOFFSET(7) NOT NULL
            CONSTRAINT [orders_updated_at_default] DEFAULT (SYSUTCDATETIME()),

        CONSTRAINT [orders_pkey] PRIMARY KEY ([id]),
        CONSTRAINT [orders_user_id_fkey]
            FOREIGN KEY ([user_id]) REFERENCES [dbo].[profiles]([id]),
        CONSTRAINT [orders_shipping_address_id_fkey]
            FOREIGN KEY ([shipping_address_id]) REFERENCES [dbo].[addresses]([id]),

        CONSTRAINT [orders_status_ck]
            CHECK ([status] IN (N'pending', N'paid', N'shipped', N'delivered', N'cancelled'))
            -- Ajustá esta lista para que refleje tu enum real
    );
END
GO

-- ORDER_ITEMS
IF OBJECT_ID(N'[dbo].[order_items]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[order_items] (
        [id] UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT [order_items_id_default] DEFAULT (NEWSEQUENTIALID()),
        [order_id] UNIQUEIDENTIFIER NULL,
        [product_id] UNIQUEIDENTIFIER NULL,
        [quantity] INT NOT NULL,
        [unit_price] DECIMAL(18,2) NOT NULL,

        -- En PG era DEFAULT (quantity * unit_price)
        -- En SQL Server es mejor como computed column:
        [subtotal] AS (CONVERT(DECIMAL(18,2), [quantity]) * [unit_price]) PERSISTED,

        CONSTRAINT [order_items_pkey] PRIMARY KEY ([id]),
        CONSTRAINT [order_items_order_id_fkey]
            FOREIGN KEY ([order_id]) REFERENCES [dbo].[orders]([id]),
        CONSTRAINT [order_items_product_id_fkey]
            FOREIGN KEY ([product_id]) REFERENCES [dbo].[products]([id])
    );
END
GO

-- PRODUCT_LOTS
IF OBJECT_ID(N'[dbo].[product_lots]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[product_lots] (
        [id] UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT [product_lots_id_default] DEFAULT (NEWSEQUENTIALID()),
        [product_id] UNIQUEIDENTIFIER NULL,
        [supplier_id] UNIQUEIDENTIFIER NULL,
        [lot_code] NVARCHAR(MAX) NOT NULL,
        [expiration_date] DATE NULL,
        [quantity_initial] INT NOT NULL,
        [created_at] DATETIMEOFFSET(7) NOT NULL
            CONSTRAINT [product_lots_created_at_default] DEFAULT (SYSUTCDATETIME()),

        CONSTRAINT [product_lots_pkey] PRIMARY KEY ([id]),
        CONSTRAINT [product_lots_product_id_fkey]
            FOREIGN KEY ([product_id]) REFERENCES [dbo].[products]([id]),
        CONSTRAINT [product_lots_supplier_id_fkey]
            FOREIGN KEY ([supplier_id]) REFERENCES [dbo].[suppliers]([id])
    );
END
GO

-- REVIEWS
IF OBJECT_ID(N'[dbo].[reviews]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[reviews] (
        [id] UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT [reviews_id_default] DEFAULT (NEWSEQUENTIALID()),
        [product_id] UNIQUEIDENTIFIER NULL,
        [user_id] UNIQUEIDENTIFIER NULL,
        [rating] INT NULL,
        [comment] NVARCHAR(MAX) NULL,
        [created_at] DATETIMEOFFSET(7) NOT NULL
            CONSTRAINT [reviews_created_at_default] DEFAULT (SYSUTCDATETIME()),

        CONSTRAINT [reviews_pkey] PRIMARY KEY ([id]),
        CONSTRAINT [reviews_product_id_fkey]
            FOREIGN KEY ([product_id]) REFERENCES [dbo].[products]([id]),
        CONSTRAINT [reviews_user_id_fkey]
            FOREIGN KEY ([user_id]) REFERENCES [dbo].[profiles]([id]),
        CONSTRAINT [reviews_rating_ck]
            CHECK ([rating] IS NULL OR ([rating] >= 1 AND [rating] <= 5))
    );
END
GO

-- ORDER_TRACKING
IF OBJECT_ID(N'[dbo].[order_tracking]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[order_tracking] (
        [id] UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT [order_tracking_id_default] DEFAULT (NEWSEQUENTIALID()),
        [order_id] UNIQUEIDENTIFIER NULL,

        -- USER-DEFINED (mismo concepto que orders.status)
        [status] NVARCHAR(30) NOT NULL,
        [notes] NVARCHAR(MAX) NULL,
        [created_at] DATETIMEOFFSET(7) NOT NULL
            CONSTRAINT [order_tracking_created_at_default] DEFAULT (SYSUTCDATETIME()),

        CONSTRAINT [order_tracking_pkey] PRIMARY KEY ([id]),
        CONSTRAINT [order_tracking_order_id_fkey]
            FOREIGN KEY ([order_id]) REFERENCES [dbo].[orders]([id]),

        CONSTRAINT [order_tracking_status_ck]
            CHECK ([status] IN (N'pending', N'paid', N'shipped', N'delivered', N'cancelled'))
            -- Idealmente esta lista debería ser igual a orders.status
    );
END
GO