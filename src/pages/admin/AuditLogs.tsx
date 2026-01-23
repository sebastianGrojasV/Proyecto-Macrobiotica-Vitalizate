import { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import {
    Search,
    Filter,
    Download,
    Calendar as CalendarIcon,
    Shield,
    FileText,
    Users,
    ShoppingCart,
    Package,
    Lock,
    X
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auditLogs as initialLogs } from '@/data/auditLogs';
import { format, isWithinInterval, startOfDay, endOfDay, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

export default function AuditLogs() {
    const [logs, _setLogs] = useState(initialLogs);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAction, setFilterAction] = useState('all');
    const [filterModule, setFilterModule] = useState('all');
    const [date, setDate] = useState<DateRange | undefined>(undefined);
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    const filteredLogs = logs.filter(log => {
        const matchesSearch =
            log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.ipAddress?.includes(searchTerm);

        const matchesAction = filterAction === 'all' || log.action === filterAction;
        const matchesModule = filterModule === 'all' || log.module === filterModule;

        let matchesDate = true;
        if (date?.from) {
            const logDate = new Date(log.timestamp);
            const start = startOfDay(date.from);
            const end = date.to ? endOfDay(date.to) : endOfDay(date.from);
            matchesDate = isWithinInterval(logDate, { start, end });
        }

        return matchesSearch && matchesAction && matchesModule && matchesDate;
    });

    const getActionBadgeColor = (action: string) => {
        switch (action) {
            case 'create': return 'bg-green-100 text-green-800 border-green-200';
            case 'update': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'delete': return 'bg-red-100 text-red-800 border-red-200';
            case 'approve': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'reject': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'login': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getModuleIcon = (module: string) => {
        switch (module) {
            case 'users': return <Users className="w-4 h-4" />;
            case 'inventory': return <Package className="w-4 h-4" />;
            case 'orders': return <ShoppingCart className="w-4 h-4" />;
            case 'auth': return <Lock className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    const getActionLabel = (action: string) => {
        switch (action) {
            case 'create': return 'Creación';
            case 'update': return 'Actualización';
            case 'delete': return 'Eliminación';
            case 'approve': return 'Aprobación';
            case 'reject': return 'Rechazo';
            case 'login': return 'Inicio de Sesión';
            case 'logout': return 'Cierre de Sesión';
            default: return action;
        }
    };

    const handlePresetSelect = (preset: string) => {
        const today = new Date();
        switch (preset) {
            case 'today':
                setDate({ from: today, to: today });
                break;
            case 'yesterday':
                const yesterday = subDays(today, 1);
                setDate({ from: yesterday, to: yesterday });
                break;
            case 'last7':
                setDate({ from: subDays(today, 6), to: today });
                break;
            case 'last30':
                setDate({ from: subDays(today, 29), to: today });
                break;
            case 'thisMonth':
                setDate({ from: startOfMonth(today), to: endOfMonth(today) });
                break;
            case 'lastMonth':
                const lastMonth = subMonths(today, 1);
                setDate({ from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) });
                break;
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900 flex items-center gap-2">
                        <Shield className="w-8 h-8 text-primary" />
                        Bitácora de Seguridad
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Registro detallado de acciones y eventos del sistema para auditoría
                    </p>
                </div>

                <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="bg-gray-50/50 pb-4">
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                            <CardTitle className="text-lg font-medium text-gray-700">Filtros de Búsqueda</CardTitle>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Download className="w-4 h-4" />
                                Exportar Reporte
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Buscar por usuario, detalle o IP..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            <Select value={filterAction} onValueChange={setFilterAction}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tipo de Acción" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las acciones</SelectItem>
                                    <SelectItem value="login">Inicio de Sesión</SelectItem>
                                    <SelectItem value="create">Creación</SelectItem>
                                    <SelectItem value="update">Actualización</SelectItem>
                                    <SelectItem value="delete">Eliminación</SelectItem>
                                    <SelectItem value="approve">Aprobación</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={filterModule} onValueChange={setFilterModule}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Módulo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los módulos</SelectItem>
                                    <SelectItem value="auth">Autenticación</SelectItem>
                                    <SelectItem value="users">Usuarios</SelectItem>
                                    <SelectItem value="inventory">Inventario</SelectItem>
                                    <SelectItem value="orders">Pedidos</SelectItem>
                                </SelectContent>
                            </Select>

                            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date?.from ? (
                                            date.to ? (
                                                <>
                                                    {format(date.from, "LLL dd, y", { locale: es })} -{" "}
                                                    {format(date.to, "LLL dd, y", { locale: es })}
                                                </>
                                            ) : (
                                                format(date.from, "LLL dd, y", { locale: es })
                                            )
                                        ) : (
                                            <span>Rango de Fechas</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <div className="flex">
                                        <div className="border-r border-gray-200 p-2 space-y-1 w-40 bg-gray-50/50">
                                            <p className="text-xs font-semibold text-gray-500 mb-2 px-2 pt-1">Rangos Comunes</p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start text-sm h-8"
                                                onClick={() => handlePresetSelect('today')}
                                            >
                                                Hoy
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start text-sm h-8"
                                                onClick={() => handlePresetSelect('yesterday')}
                                            >
                                                Ayer
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start text-sm h-8"
                                                onClick={() => handlePresetSelect('last7')}
                                            >
                                                Últimos 7 días
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start text-sm h-8"
                                                onClick={() => handlePresetSelect('last30')}
                                            >
                                                Últimos 30 días
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start text-sm h-8"
                                                onClick={() => handlePresetSelect('thisMonth')}
                                            >
                                                Este Mes
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start text-sm h-8"
                                                onClick={() => handlePresetSelect('lastMonth')}
                                            >
                                                Mes Pasado
                                            </Button>
                                            <div className="border-t border-gray-200 my-2 pt-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-full justify-start text-sm h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => setDate(undefined)}
                                                >
                                                    <X className="w-3 h-3 mr-2" />
                                                    Limpiar
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-0">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={date?.from}
                                                selected={date}
                                                onSelect={setDate}
                                                numberOfMonths={2}
                                                locale={es}
                                                classNames={{
                                                    month: "space-y-4 mx-2" // Add margin between months
                                                }}
                                            />
                                            <div className="border-t border-gray-200 p-3 bg-gray-50/30 flex justify-end gap-2">
                                                <Button variant="outline" size="sm" onClick={() => setDatePickerOpen(false)}>
                                                    Cerrar
                                                </Button>
                                                <Button size="sm" onClick={() => setDatePickerOpen(false)}>
                                                    Aplicar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha y Hora</TableHead>
                                <TableHead>Usuario</TableHead>
                                <TableHead>Módulo</TableHead>
                                <TableHead>Acción</TableHead>
                                <TableHead>Detalle</TableHead>
                                <TableHead>IP</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLogs.length > 0 ? (
                                filteredLogs.map((log) => (
                                    <TableRow key={log.id} className="hover:bg-gray-50/50">
                                        <TableCell className="font-mono text-sm text-gray-600">
                                            {format(new Date(log.timestamp), "dd MMM yyyy HH:mm:ss", { locale: es })}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">{log.userName}</span>
                                                <span className="text-xs text-gray-500 capitalize">{log.userRole}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-gray-700 capitalize">
                                                {getModuleIcon(log.module)}
                                                {log.module}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getActionBadgeColor(log.action)}`}>
                                                {getActionLabel(log.action)}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-gray-700">{log.details}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                {log.ipAddress || 'N/A'}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <Filter className="w-8 h-8 text-gray-300" />
                                            <p>No se encontraron registros que coincidan con los filtros.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AdminLayout>
    );
}
