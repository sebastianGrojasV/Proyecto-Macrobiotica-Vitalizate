import { DollarSign, TrendingUp, TrendingDown, FileText, Download, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import AdminLayout from '@/layouts/AdminLayout';
import { formatCurrency } from '@/lib/constants';
import { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Accounting() {
  const [period, setPeriod] = useState('month');

  const financialData = {
    revenue: 12500000,
    expenses: 7800000,
    profit: 4700000,
    profitMargin: 37.6,
  };

  const monthlyData = [
    { month: 'Jul', ingresos: 8500000, gastos: 5200000, utilidad: 3300000 },
    { month: 'Ago', ingresos: 9200000, gastos: 5800000, utilidad: 3400000 },
    { month: 'Sep', ingresos: 10100000, gastos: 6200000, utilidad: 3900000 },
    { month: 'Oct', ingresos: 10800000, gastos: 6800000, utilidad: 4000000 },
    { month: 'Nov', ingresos: 11500000, gastos: 7200000, utilidad: 4300000 },
    { month: 'Dic', ingresos: 12500000, gastos: 7800000, utilidad: 4700000 },
  ];

  const expensesByCategory = [
    { category: 'Compras de Inventario', amount: 4200000, percentage: 53.8 },
    { category: 'Salarios', amount: 1800000, percentage: 23.1 },
    { category: 'Alquiler y Servicios', amount: 900000, percentage: 11.5 },
    { category: 'Marketing', amount: 500000, percentage: 6.4 },
    { category: 'Otros Gastos', amount: 400000, percentage: 5.1 },
  ];

  const recentTransactions = [
    { id: '1', date: '01/12/2025', description: 'Venta - Pedido ORD-2025-001', type: 'ingreso', amount: 100000 },
    { id: '2', date: '01/12/2025', description: 'Compra - OC-202512-0001', type: 'egreso', amount: -250000 },
    { id: '3', date: '28/11/2025', description: 'Venta - Pedido ORD-2025-002', type: 'ingreso', amount: 150000 },
    { id: '4', date: '28/11/2025', description: 'Pago de Salarios', type: 'egreso', amount: -450000 },
    { id: '5', date: '25/11/2025', description: 'Venta - Pedido ORD-2025-003', type: 'ingreso', amount: 200000 },
    { id: '6', date: '25/11/2025', description: 'Pago de Alquiler', type: 'egreso', amount: -300000 },
    { id: '7', date: '20/11/2025', description: 'Venta - Pedido ORD-2025-004', type: 'ingreso', amount: 250000 },
    { id: '8', date: '20/11/2025', description: 'Compra - OC-202512-0002', type: 'egreso', amount: -180000 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-900">
              Contabilidad
            </h1>
            <p className="text-gray-600 mt-1">
              Estados financieros y reportes contables
            </p>
          </div>
          <div className="flex space-x-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mes</SelectItem>
                <SelectItem value="quarter">Este Trimestre</SelectItem>
                <SelectItem value="year">Este Año</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar Estados
            </Button>
          </div>
        </div>

        {/* Financial KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-natural border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ingresos</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(financialData.revenue)}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15.2% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Gastos</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(financialData.expenses)}</p>
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.3% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural border-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Utilidad Neta</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(financialData.profit)}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +25.8% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Margen de Utilidad</p>
                  <p className="text-2xl font-bold text-gray-900">{financialData.profitMargin}%</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.1% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income vs Expenses */}
          <Card className="shadow-natural">
            <CardHeader>
              <CardTitle>Ingresos vs Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="ingresos" fill="#2F9A48" name="Ingresos" />
                  <Bar dataKey="gastos" fill="#EF4444" name="Gastos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Profit Trend */}
          <Card className="shadow-natural">
            <CardHeader>
              <CardTitle>Tendencia de Utilidad</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="utilidad"
                    stroke="#2F9A48"
                    strokeWidth={3}
                    name="Utilidad"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expenses by Category */}
          <Card className="shadow-natural">
            <CardHeader>
              <CardTitle>Gastos por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                    <TableHead className="text-right">%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expensesByCategory.map((expense) => (
                    <TableRow key={expense.category}>
                      <TableCell className="font-medium">{expense.category}</TableCell>
                      <TableCell className="text-right font-semibold text-red-600">
                        {formatCurrency(expense.amount)}
                      </TableCell>
                      <TableCell className="text-right">{expense.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="shadow-natural">
            <CardHeader>
              <CardTitle>Transacciones Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-xs text-gray-600">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${transaction.type === 'ingreso' ? 'text-green-600' : 'text-red-600'
                          }`}
                      >
                        {transaction.type === 'ingreso' ? '+' : ''}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-natural">
          <CardHeader>
            <CardTitle>Reportes Contables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="w-6 h-6 mb-2" />
                <span>Estado de Resultados</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="w-6 h-6 mb-2" />
                <span>Balance General</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="w-6 h-6 mb-2" />
                <span>Flujo de Caja</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="w-6 h-6 mb-2" />
                <span>Libro Mayor</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}