import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  QrCode,
  Download,
  Calendar,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/layouts/AdminLayout';
import {
  mockSalesData,
  mockTopProducts,
  mockCategorySales,
  mockCustomerMetrics,
  mockTraceabilityMetrics,
  mockAnalyticsSummary,
  formatCurrency,
  getGrowthColor,
} from '@/data/analytics';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { toast } from 'sonner';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Analytics() {
  const [dateRange, setDateRange] = useState('year');

  const handleExport = (type: string) => {
    toast.success(`Exportando reporte en formato ${type.toUpperCase()}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
              Analytics y Reportes
            </h1>
            <p className="text-gray-600">
              Análisis detallado de ventas, productos y clientes
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mes</SelectItem>
                <SelectItem value="year">Este Año</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => handleExport('pdf')}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar PDF</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport('excel')}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Excel</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {mockAnalyticsSummary.revenueGrowth}%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(mockAnalyticsSummary.totalRevenue)}
              </p>
              <p className="text-xs text-gray-500 mt-2">vs mes anterior</p>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {mockAnalyticsSummary.ordersGrowth}%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Pedidos</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockAnalyticsSummary.totalOrders.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">vs mes anterior</p>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <Badge className="bg-purple-100 text-purple-800">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  8.3%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Valor Promedio Pedido</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(mockAnalyticsSummary.averageOrderValue)}
              </p>
              <p className="text-xs text-gray-500 mt-2">vs mes anterior</p>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <Badge className="bg-orange-100 text-orange-800">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  2.1%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Tasa de Conversión</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockAnalyticsSummary.conversionRate}%
              </p>
              <p className="text-xs text-gray-500 mt-2">vs mes anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Trend Chart */}
        <Card className="shadow-natural">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Tendencia de Ventas e Ingresos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={mockSalesData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === 'revenue') return [formatCurrency(value), 'Ingresos'];
                    return [value.toLocaleString(), 'Ventas'];
                  }}
                />
                <Legend />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Ingresos"
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  name="Ventas"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Orders Chart */}
          <Card className="shadow-natural">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span>Pedidos por Mes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#3b82f6" name="Pedidos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="shadow-natural">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-primary" />
                <span>Distribución por Categoría</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockCategorySales}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category} ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="sales"
                  >
                    {mockCategorySales.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <Card className="shadow-natural">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-primary" />
              <span>Top 10 Productos Más Vendidos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTopProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Unidades Vendidas</p>
                      <p className="font-semibold text-gray-900">
                        {product.unitsSold.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Ingresos</p>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(product.revenue)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Metrics and Traceability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Metrics */}
          <Card className="shadow-natural">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Métricas de Clientes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Clientes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockCustomerMetrics.totalCustomers.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Clientes Nuevos</p>
                  <p className="text-2xl font-bold text-green-600">
                    {mockCustomerMetrics.newCustomers.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">Clientes Recurrentes</p>
                  <p className="text-sm font-bold text-gray-900">
                    {mockCustomerMetrics.returningCustomers.toLocaleString()}
                  </p>
                </div>
                <Progress
                  value={
                    (mockCustomerMetrics.returningCustomers /
                      mockCustomerMetrics.totalCustomers) *
                    100
                  }
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">Tasa de Retención</p>
                  <p className="text-sm font-bold text-green-600">
                    {mockCustomerMetrics.customerRetentionRate}%
                  </p>
                </div>
                <Progress value={mockCustomerMetrics.customerRetentionRate} className="h-2" />
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Valor Promedio por Cliente</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(mockCustomerMetrics.averageOrderValue)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Traceability Metrics */}
          <Card className="shadow-natural">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <QrCode className="w-5 h-5 text-primary" />
                <span>Métricas de Trazabilidad</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Verificaciones QR</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockTraceabilityMetrics.totalVerifications.toLocaleString()}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Productos Más Verificados
                </h4>
                <div className="space-y-3">
                  {mockTraceabilityMetrics.verificationsByProduct.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-gray-700">{item.productName}</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {item.verifications.toLocaleString()}
                        </p>
                      </div>
                      <Progress
                        value={
                          (item.verifications / mockTraceabilityMetrics.totalVerifications) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Trend */}
        <Card className="shadow-natural">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <QrCode className="w-5 h-5 text-primary" />
              <span>Tendencia de Verificaciones QR</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockTraceabilityMetrics.verificationTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="verifications"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Verificaciones"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Sales Details */}
        <Card className="shadow-natural">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-primary" />
              <span>Ventas por Categoría</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCategorySales.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium text-gray-900">{category.category}</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Ventas</p>
                        <p className="font-semibold text-gray-900">
                          {category.sales.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Ingresos</p>
                        <p className="font-semibold text-green-600">
                          {formatCurrency(category.revenue)}
                        </p>
                      </div>
                      <Badge className="bg-primary/10 text-primary">
                        {category.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}