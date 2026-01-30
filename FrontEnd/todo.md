# Plan de Desarrollo - Sistema Vitalízate

## Paleta de Colores
- Verde natural: #2F9A48
- Verde bosque: #1F6A32
- Verde menta: #A7D7A9
- Amarillo herbal: #F3C623
- Beige natural: #F2F2EA
- Blanco: #FFFFFF
- Gris claro: #F4F4F4
- Gris texto: #333333

## Tipografías
- Montserrat (títulos)
- Lato/Inter (cuerpo)

## Estructura de Archivos a Crear

### 1. Configuración Base
- [x] tailwind.config.ts - Actualizar con colores personalizados
- [x] src/index.css - Agregar fuentes y estilos globales
- [x] index.html - Actualizar título y meta tags

### 2. Componentes Reutilizables (src/components/custom/)
- [ ] Header.tsx - Navegación principal con búsqueda
- [ ] Footer.tsx - Información de tienda
- [ ] ProductCard.tsx - Tarjeta de producto
- [ ] QRScanner.tsx - Componente para escaneo QR
- [ ] OrderTimeline.tsx - Línea de tiempo de pedidos
- [ ] ApprovalWorkflow.tsx - Flujo de aprobaciones
- [ ] ChatAssistant.tsx - Asistente virtual flotante
- [ ] DashboardCard.tsx - Tarjetas para KPIs
- [ ] DataTable.tsx - Tabla con filtros
- [ ] Stepper.tsx - Stepper para checkout

### 3. Páginas Públicas (src/pages/)
- [ ] Index.tsx - Landing page
- [ ] Catalog.tsx - Catálogo de productos
- [ ] ProductDetail.tsx - Detalle de producto
- [ ] Cart.tsx - Carrito de compras
- [ ] Checkout.tsx - Proceso de checkout
- [ ] TrackingPublic.tsx - Tracking público con QR
- [ ] Login.tsx - Inicio de sesión
- [ ] Register.tsx - Registro de usuario

### 4. Portal del Cliente (src/pages/customer/)
- [ ] Dashboard.tsx - Dashboard del cliente
- [ ] Orders.tsx - Historial de pedidos
- [ ] Addresses.tsx - Direcciones guardadas
- [ ] Returns.tsx - Devoluciones
- [ ] Profile.tsx - Perfil del usuario

### 5. Panel Administrativo (src/pages/admin/)
- [ ] Dashboard.tsx - Dashboard principal admin
- [ ] Inventory.tsx - Gestión de inventario
- [ ] Purchases.tsx - Órdenes de compra
- [ ] Sales.tsx - Registro de ventas
- [ ] Suppliers.tsx - Gestión de proveedores
- [ ] Invoicing.tsx - Facturación
- [ ] Accounting.tsx - Contabilidad
- [ ] Approvals.tsx - Sistema de aprobaciones
- [ ] Analytics.tsx - Dashboard BI
- [ ] Traceability.tsx - Trazabilidad interna QR

### 6. Layouts
- [ ] src/layouts/PublicLayout.tsx - Layout público
- [ ] src/layouts/CustomerLayout.tsx - Layout cliente
- [ ] src/layouts/AdminLayout.tsx - Layout administrativo

### 7. Datos Mock (src/data/)
- [ ] products.ts - Productos de ejemplo
- [ ] orders.ts - Pedidos de ejemplo
- [ ] suppliers.ts - Proveedores de ejemplo

### 8. Utilidades
- [ ] src/lib/constants.ts - Constantes del sistema
- [ ] src/lib/types.ts - Tipos TypeScript

## Orden de Implementación
1. Configuración base y estilos
2. Componentes reutilizables
3. Layouts
4. Datos mock
5. Páginas públicas
6. Portal del cliente
7. Panel administrativo
8. Rutas y navegación
9. Responsive design
10. Pruebas finales

## Características Especiales
- Diseño minimalista y natural
- Tarjetas con esquinas redondeadas
- Sombreado suave
- Iconografía outline moderna
- Responsive mobile-first
- Asistente virtual flotante
- Sistema de trazabilidad QR
- Workflow de aprobaciones
- Dashboard BI con gráficos