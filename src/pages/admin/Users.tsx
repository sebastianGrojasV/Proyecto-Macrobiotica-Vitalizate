import { useState } from 'react';
import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    Users as UsersIcon,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import AdminLayout from '@/layouts/AdminLayout';
import { User } from '@/lib/types';
import { users as initialUsers } from '@/data/users';

export default function Users() {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newUser, setNewUser] = useState<Partial<User>>({
        role: 'customer',
    });

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.cedula?.includes(searchTerm)
    );

    const validateCedula = (cedula: string) => {
        // Escenario 3: Validación de formato de cédula
        const cedulaRegex = /^\d{9}$/;
        return cedulaRegex.test(cedula);
    };

    const checkDuplicateCedula = (cedula: string) => {
        // Escenario 2: Detección de cédula duplicada
        return users.some((user) => user.cedula === cedula);
    };

    const handleSaveUser = () => {
        if (!newUser.name || !newUser.email || !newUser.role || !newUser.cedula) {
            toast.error('Por favor complete todos los campos');
            return;
        }

        // Validación de formato
        if (!validateCedula(newUser.cedula)) {
            toast.error('Formato de cédula incorrecto. Debe tener 9 dígitos.');
            return;
        }

        // Validación de duplicados
        if (checkDuplicateCedula(newUser.cedula)) {
            toast.error('La cédula ya existe en el sistema.');
            return;
        }

        // Escenario 1: Registro exitoso
        const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone || '',
            role: newUser.role as User['role'],
            cedula: newUser.cedula,
            avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
        };

        setUsers([...users, user]);
        setIsDialogOpen(false);
        setNewUser({ role: 'customer' });
        toast.success('Usuario registrado exitosamente');
    };

    const handleDeleteUser = (id: string) => {
        setUsers(users.filter((u) => u.id !== id));
        toast.success('Usuario eliminado');
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-purple-100 text-purple-800';
            case 'customer':
                return 'bg-green-100 text-green-800';
            case 'delivery':
                return 'bg-blue-100 text-blue-800';
            case 'accountant':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-gray-900">
                            Gestión de Usuarios
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Administra los usuarios y sus permisos
                        </p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-forest text-white gap-2">
                                <Plus className="w-4 h-4" />
                                Agregar Usuario
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                                <DialogDescription>
                                    Ingrese los datos del nuevo usuario. La cédula es obligatoria para validación.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cedula">Cédula</Label>
                                    <Input
                                        id="cedula"
                                        placeholder="9 dígitos (ej: 111111111)"
                                        value={newUser.cedula || ''}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, cedula: e.target.value })
                                        }
                                    />
                                    <p className="text-xs text-gray-500">
                                        Requerido para validación de identidad
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre Completo</Label>
                                    <Input
                                        id="name"
                                        placeholder="Juan Pérez"
                                        value={newUser.name || ''}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, name: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="juan@ejemplo.com"
                                        value={newUser.email || ''}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, email: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Teléfono</Label>
                                    <Input
                                        id="phone"
                                        placeholder="8888-8888"
                                        value={newUser.phone || ''}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, phone: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Rol</Label>
                                    <Select
                                        value={newUser.role}
                                        onValueChange={(value: any) =>
                                            setNewUser({ ...newUser, role: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione un rol" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="customer">Cliente</SelectItem>
                                            <SelectItem value="admin">Administrador</SelectItem>
                                            <SelectItem value="accountant">Contador</SelectItem>
                                            <SelectItem value="delivery">Repartidor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button onClick={handleSaveUser}>Guardar Usuario</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Buscar por nombre, email o cédula..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Usuario</TableHead>
                                <TableHead>Cédula</TableHead>
                                <TableHead>Rol</TableHead>
                                <TableHead>Contacto</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                                {user.avatar ? (
                                                    <img
                                                        src={user.avatar}
                                                        alt={user.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <UsersIcon className="w-5 h-5 text-gray-500" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-mono text-sm bg-gray-50 px-2 py-1 rounded inline-block text-gray-700">
                                            {user.cedula || 'N/A'}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
                                                user.role
                                            )}`}
                                        >
                                            {user.role === 'admin' && 'Administrador'}
                                            {user.role === 'customer' && 'Cliente'}
                                            {user.role === 'accountant' && 'Contador'}
                                            {user.role === 'delivery' && 'Repartidor'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-500">{user.phone}</div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="gap-2">
                                                    <Pencil className="w-4 h-4" />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="gap-2 text-red-600 focus:text-red-600"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AdminLayout>
    );
}
