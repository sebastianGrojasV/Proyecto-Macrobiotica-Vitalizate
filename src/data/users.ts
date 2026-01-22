import { User } from '@/lib/types';

export const users: User[] = [
    {
        id: 'u1',
        name: 'Ana García',
        email: 'ana.garcia@vitalizate.cr',
        phone: '8888-1111',
        role: 'admin',
        cedula: '111111111',
        status: 'active'
    },
    {
        id: 'u2',
        name: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@vitalizate.cr',
        phone: '8888-2222',
        role: 'customer',
        cedula: '222222222',
        status: 'active'
    },
    {
        id: 'u3',
        name: 'María López',
        email: 'maria.lopez@vitalizate.cr',
        phone: '8888-3333',
        role: 'accountant',
        cedula: '333333333',
        status: 'active'
    },
    {
        id: 'u4',
        name: 'Juan Pérez',
        email: 'juan.perez@vitalizate.cr',
        phone: '8888-4444',
        role: 'delivery',
        cedula: '444444444',
        status: 'active'
    }
];
