export const ROLE_PERMISSIONS = {
    admin: [
        'Acceso total al sistema',
        'Gestión de usuarios',
        'Configuración global'
    ],
    customer: [
        'Ver catálogo de productos',
        'Realizar pedidos',
        'Ver historial de compras',
        'Gestionar perfil personal'
    ],
    accountant: [
        'Ver módulo de ventas',
        'Gestión de facturación',
        'Reportes financieros',
        'Cuentas por cobrar'
    ],
    delivery: [
        'Ver pedidos asignados',
        'Actualizar estado de entrega',
        'Ver rutas de entrega'
    ]
};

export type RoleType = keyof typeof ROLE_PERMISSIONS;
