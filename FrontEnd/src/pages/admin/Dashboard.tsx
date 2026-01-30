import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import DashboardCard from '@/components/custom/DashboardCard';
import { formatCurrency } from '@/lib/constants';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Ventas del Mes',
      value: formatCurrency(12500000),
      change: 12.5,
      trend: 'up' as const,
      icon: DollarSign,
      description: 'vs mes anterior',
    },
    {
      title: 'Pedidos Totales',
      value: '248',
      change: 8.2,
      trend: 'up' as const,
      icon: ShoppingCart,
      description: 'este mes',
    },
    {
      title: 'Productos en Stock',
      value: '1,234',
      change: -3.1,
      trend: 'down' as const,
      icon: Package,
      description: 'productos activos',
    },
    {
      title: 'Clientes Activos',
      value: '892',
      change: 15.3,
      trend: 'up' as const,
      icon: Users,
      description: 'este mes',
    },
  ];

  const salesData = [
    { name: 'Ene', ventas: 4500000, pedidos: 145 },
    { name: 'Feb', ventas: 5200000, pedidos: 168 },
    { name: 'Mar', ventas: 6100000, pedidos: 192 },
    { name: 'Abr', ventas: 5800000, pedidos: 178 },
    { name: 'May', ventas: 7200000, pedidos: 215 },
    { name: 'Jun', ventas: 8500000, pedidos: 248 },
  ];

  const topProducts = [
    { name: 'Espirulina Orgánica', sales: 2500000, units: 156 },
    { name: 'Cúrcuma con Pimienta', sales: 2100000, units: 142 },
    { name: 'Ashwagandha Premium', sales: 1950000, units: 98 },
    { name: 'Té Verde Matcha', sales: 1800000, units: 87 },
    { name: 'Omega-3 Vegano', sales: 1650000, units: 72 },
  ];

  const lowStockAlerts = [
    { product: 'Colágeno Marino', stock: 15, minStock: 50 },
    { product: 'Probióticos Multi-Cepa', stock: 18, minStock: 50 },
    { product: 'Maca Andina', stock: 22, minStock: 50 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-900">
              Dashboard Administrativo
            </h1>
            <p className="text-gray-600 mt-1">
              Resumen general del negocio y métricas clave
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              Exportar Reporte
            </Button>
            <Button className="bg-primary hover:bg-forest">
              Ver Analytics Completo
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <DashboardCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              trend={stat.trend}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <Card className="shadow-natural">
            <CardHeader>
              <CardTitle>Ventas Mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ventas"
                    stroke="#2F9A48"
                    strokeWidth={2}
                    name="Ventas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Orders Chart */}
          <Card className="shadow-natural">
            <CardHeader>
              <CardTitle>Pedidos Mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pedidos" fill="#F3C623" name="Pedidos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <Card className="shadow-natural">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Productos Más Vendidos</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link to="/admin/sales">Ver Todos</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.units} unidades</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{formatCurrency(product.sales)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alerts */}
          <Card className="shadow-natural border-red-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <CardTitle className="text-red-700">Alertas de Stock Bajo</CardTitle>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link to="/admin/inventory">Ver Inventario</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockAlerts.map((alert) => (
                  <div key={alert.product} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{alert.product}</p>
                      <p className="text-sm text-gray-600">
                        Stock actual: {alert.stock} | Mínimo: {alert.minStock}
                      </p>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-forest">
                      Reordenar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-natural">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/admin/purchases">
                  <ShoppingCart className="w-6 h-6 mb-2" />
                  <span>Nueva Compra</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/admin/inventory">
                  <Package className="w-6 h-6 mb-2" />
                  <span>Gestionar Inventario</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/admin/invoicing">
                  <DollarSign className="w-6 h-6 mb-2" />
                  <span>Nueva Factura</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/admin/suppliers">
                  <Users className="w-6 h-6 mb-2" />
                  <span>Ver Proveedores</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}