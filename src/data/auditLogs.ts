import { AuditLog } from '@/lib/types';

export const auditLogs: AuditLog[] = [
    {
        id: '1',
        userId: '1',
        userName: 'Admin User',
        userRole: 'admin',
        action: 'login',
        details: 'Inicio de sesión exitoso',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        ipAddress: '192.168.1.1',
        module: 'auth',
    },
    {
        id: '2',
        userId: '1',
        userName: 'Admin User',
        userRole: 'admin',
        action: 'update',
        details: 'Actualización de stock producto PROD-001',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        ipAddress: '192.168.1.1',
        module: 'inventory',
    },
    {
        id: '3',
        userId: '2',
        userName: 'Juan Pérez',
        userRole: 'customer',
        action: 'create',
        details: 'Creación de orden #ORD-2024-001',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
        ipAddress: '201.192.10.55',
        module: 'orders',
    },
    {
        id: '4',
        userId: '3',
        userName: 'Maria Rodriguez',
        userRole: 'admin',
        action: 'approve',
        details: 'Aprobación de orden de compra #PO-999',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        ipAddress: '10.0.0.5',
        module: 'inventory',
    },
    {
        id: '5',
        userId: '1',
        userName: 'Admin User',
        userRole: 'admin',
        action: 'delete',
        details: 'Eliminación de usuario inactivo user_old_99',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), // 1 day 1 hour ago
        ipAddress: '192.168.1.1',
        module: 'users',
    },
    {
        id: '6',
        userId: '2',
        userName: 'Juan Pérez',
        userRole: 'customer',
        action: 'login',
        details: 'Inicio de sesión desde nuevo dispositivo',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
        ipAddress: '201.192.10.55',
        module: 'auth',
    },
    {
        id: '7',
        userId: '1',
        userName: 'Admin User',
        userRole: 'admin',
        action: 'create',
        details: 'Creación de nuevo usuario staff',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(), // 2 days ago
        ipAddress: '192.168.1.1',
        module: 'users',
    },
];
