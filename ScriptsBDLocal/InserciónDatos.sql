-- Inserción de datos
-- Productos
BEGIN TRANSACTION;

INSERT INTO [dbo].[products]
(
    [id],
    [name],
    [description],
    [price],
    [stock_quantity],
    [category_id],
    [image_url],
    [is_active],
    [created_at]
)
VALUES
-- 1) Espirulina Orgánica (Superalimentos)
(
    NEWID(),
    N'Espirulina Orgánica',
    CONCAT(
        N'Superalimento rico en proteínas, vitaminas y minerales. Ideal para aumentar energía y fortalecer el sistema inmunológico.',
        CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Beneficios:', CHAR(13), CHAR(10),
        N'• Alto contenido de proteína vegetal', CHAR(13), CHAR(10),
        N'• Fortalece el sistema inmunológico', CHAR(13), CHAR(10),
        N'• Aumenta los niveles de energía', CHAR(13), CHAR(10),
        N'• Rica en antioxidantes', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Ingredientes:', CHAR(13), CHAR(10),
        N'• Espirulina orgánica 100%', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Síntomas / Enfoque:', CHAR(13), CHAR(10),
        N'• Fatiga', CHAR(13), CHAR(10),
        N'• Inmunidad', CHAR(13), CHAR(10),
        N'• Energía'
    ),
    CAST(29.99 AS decimal(18,2)),
    150,
    CAST('B126BA2D-8224-4420-AF11-EAAABB215FD8' AS uniqueidentifier),
    N'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop',
    CAST(1 AS bit),
    SYSDATETIMEOFFSET()
),

-- 2) Cúrcuma con Pimienta Negra (Hierbas Medicinales)
(
    NEWID(),
    N'Cúrcuma con Pimienta Negra',
    CONCAT(
        N'Potente antiinflamatorio natural. La combinación con pimienta negra aumenta su absorción hasta 2000%.',
        CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Beneficios:', CHAR(13), CHAR(10),
        N'• Poderoso antiinflamatorio', CHAR(13), CHAR(10),
        N'• Apoya la salud articular', CHAR(13), CHAR(10),
        N'• Mejora la digestión', CHAR(13), CHAR(10),
        N'• Antioxidante natural', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Ingredientes:', CHAR(13), CHAR(10),
        N'• Cúrcuma orgánica', CHAR(13), CHAR(10),
        N'• Pimienta negra', CHAR(13), CHAR(10),
        N'• Curcumina 95%', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Síntomas / Enfoque:', CHAR(13), CHAR(10),
        N'• Dolor articular', CHAR(13), CHAR(10),
        N'• Digestión'
    ),
    CAST(24.99 AS decimal(18,2)),
    200,
    CAST('EB0E095D-F24C-44F5-BF6D-94D82F8283E0' AS uniqueidentifier),
    N'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop',
    CAST(1 AS bit),
    SYSDATETIMEOFFSET()
),

-- 3) Ashwagandha Premium (Suplementos)
(
    NEWID(),
    N'Ashwagandha Premium',
    CONCAT(
        N'Adaptógeno ayurvédico que ayuda a reducir el estrés y la ansiedad, mejorando el bienestar general.',
        CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Beneficios:', CHAR(13), CHAR(10),
        N'• Reduce el estrés y la ansiedad', CHAR(13), CHAR(10),
        N'• Mejora la calidad del sueño', CHAR(13), CHAR(10),
        N'• Aumenta la energía y resistencia', CHAR(13), CHAR(10),
        N'• Equilibra las hormonas', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Ingredientes:', CHAR(13), CHAR(10),
        N'• Extracto de Ashwagandha 500mg', CHAR(13), CHAR(10),
        N'• Withanólidos 5%', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Síntomas / Enfoque:', CHAR(13), CHAR(10),
        N'• Estrés', CHAR(13), CHAR(10),
        N'• Ansiedad', CHAR(13), CHAR(10),
        N'• Insomnio'
    ),
    CAST(34.99 AS decimal(18,2)),
    120,
    CAST('24BADA14-3E52-454A-A8F6-1B2349F90977' AS uniqueidentifier),
    N'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    CAST(1 AS bit),
    SYSDATETIMEOFFSET()
),

-- 4) Té Verde Matcha Ceremonial (Tés e Infusiones)
(
    NEWID(),
    N'Té Verde Matcha Ceremonial',
    CONCAT(
        N'Matcha de grado ceremonial japonés. Rico en L-teanina y antioxidantes para concentración y calma.',
        CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Beneficios:', CHAR(13), CHAR(10),
        N'• Aumenta la concentración', CHAR(13), CHAR(10),
        N'• Rico en antioxidantes', CHAR(13), CHAR(10),
        N'• Promueve la calma mental', CHAR(13), CHAR(10),
        N'• Acelera el metabolismo', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Ingredientes:', CHAR(13), CHAR(10),
        N'• Té verde Matcha ceremonial 100%', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Síntomas / Enfoque:', CHAR(13), CHAR(10),
        N'• Memoria', CHAR(13), CHAR(10),
        N'• Energía', CHAR(13), CHAR(10),
        N'• Estrés'
    ),
    CAST(39.99 AS decimal(18,2)),
    80,
    CAST('E22598D0-D01C-4478-9214-06ED960C92B9' AS uniqueidentifier),
    N'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop',
    CAST(1 AS bit),
    SYSDATETIMEOFFSET()
),

-- 5) Omega-3 Vegano (Suplementos)
(
    NEWID(),
    N'Omega-3 Vegano',
    CONCAT(
        N'Ácidos grasos esenciales de origen vegetal provenientes de algas marinas.',
        CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Beneficios:', CHAR(13), CHAR(10),
        N'• Apoya la salud cardiovascular', CHAR(13), CHAR(10),
        N'• Mejora la función cerebral', CHAR(13), CHAR(10),
        N'• Reduce la inflamación', CHAR(13), CHAR(10),
        N'• Fuente vegana de EPA y DHA', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Ingredientes:', CHAR(13), CHAR(10),
        N'• Aceite de algas marinas', CHAR(13), CHAR(10),
        N'• EPA 300mg', CHAR(13), CHAR(10),
        N'• DHA 600mg', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Síntomas / Enfoque:', CHAR(13), CHAR(10),
        N'• Memoria', CHAR(13), CHAR(10),
        N'• Dolor articular'
    ),
    CAST(44.99 AS decimal(18,2)),
    95,
    CAST('24BADA14-3E52-454A-A8F6-1B2349F90977' AS uniqueidentifier),
    N'/images/photo1764878233.jpg',
    CAST(1 AS bit),
    SYSDATETIMEOFFSET()
),

-- 6) Probióticos Multi-Cepa (Suplementos)
(
    NEWID(),
    N'Probióticos Multi-Cepa',
    CONCAT(
        N'Fórmula avanzada con 10 cepas probióticas para la salud digestiva e inmunológica.',
        CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Beneficios:', CHAR(13), CHAR(10),
        N'• Mejora la salud digestiva', CHAR(13), CHAR(10),
        N'• Fortalece el sistema inmune', CHAR(13), CHAR(10),
        N'• Reduce la inflamación intestinal', CHAR(13), CHAR(10),
        N'• 50 mil millones de UFC', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Ingredientes:', CHAR(13), CHAR(10),
        N'• 10 cepas probióticas', CHAR(13), CHAR(10),
        N'• Prebióticos FOS', CHAR(13), CHAR(10),
        N'• Cápsula vegetal', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Síntomas / Enfoque:', CHAR(13), CHAR(10),
        N'• Digestión', CHAR(13), CHAR(10),
        N'• Inmunidad'
    ),
    CAST(49.99 AS decimal(18,2)),
    110,
    CAST('24BADA14-3E52-454A-A8F6-1B2349F90977' AS uniqueidentifier),
    N'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
    CAST(1 AS bit),
    SYSDATETIMEOFFSET()
),

-- 7) Colágeno Marino Hidrolizado (Suplementos)
(
    NEWID(),
    N'Colágeno Marino Hidrolizado',
    CONCAT(
        N'Colágeno tipo I de pescado salvaje para piel, cabello y articulaciones.',
        CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Beneficios:', CHAR(13), CHAR(10),
        N'• Mejora la elasticidad de la piel', CHAR(13), CHAR(10),
        N'• Fortalece cabello y uñas', CHAR(13), CHAR(10),
        N'• Apoya la salud articular', CHAR(13), CHAR(10),
        N'• Alta biodisponibilidad', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Ingredientes:', CHAR(13), CHAR(10),
        N'• Colágeno marino hidrolizado 10g', CHAR(13), CHAR(10),
        N'• Vitamina C', CHAR(13), CHAR(10),
        N'• Ácido hialurónico', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Síntomas / Enfoque:', CHAR(13), CHAR(10),
        N'• Piel', CHAR(13), CHAR(10),
        N'• Dolor articular'
    ),
    CAST(54.99 AS decimal(18,2)),
    75,
    CAST('24BADA14-3E52-454A-A8F6-1B2349F90977' AS uniqueidentifier),
    N'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    CAST(1 AS bit),
    SYSDATETIMEOFFSET()
),

-- 8) Maca Andina en Polvo (Superalimentos)
(
    NEWID(),
    N'Maca Andina en Polvo',
    CONCAT(
        N'Superalimento peruano que aumenta la energía, resistencia y equilibrio hormonal.',
        CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Beneficios:', CHAR(13), CHAR(10),
        N'• Aumenta la energía y resistencia', CHAR(13), CHAR(10),
        N'• Equilibra las hormonas', CHAR(13), CHAR(10),
        N'• Mejora el estado de ánimo', CHAR(13), CHAR(10),
        N'• Adaptógeno natural', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Ingredientes:', CHAR(13), CHAR(10),
        N'• Maca andina orgánica en polvo 100%', CHAR(13), CHAR(10), CHAR(13), CHAR(10),
        N'Síntomas / Enfoque:', CHAR(13), CHAR(10),
        N'• Fatiga', CHAR(13), CHAR(10),
        N'• Energía', CHAR(13), CHAR(10),
        N'• Estrés'
    ),
    CAST(27.99 AS decimal(18,2)),
    130,
    CAST('B126BA2D-8224-4420-AF11-EAAABB215FD8' AS uniqueidentifier),
    N'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&h=400&fit=crop',
    CAST(1 AS bit),
    SYSDATETIMEOFFSET()
);

COMMIT TRANSACTION;