import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  DollarSign,
  BarChart3,
  CheckSquare,
  QrCode,
  Menu,
  X,
  Leaf,
  LogOut,
  ClipboardList,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: Users, label: 'Usuarios', path: '/admin/users' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Package, label: 'Inventario', path: '/admin/inventory' },
  { icon: ShoppingCart, label: 'Compras', path: '/admin/purchases' },
  { icon: BarChart3, label: 'Ventas', path: '/admin/sales' },
  { icon: Users, label: 'Proveedores', path: '/admin/suppliers' },
  { icon: FileText, label: 'Facturación', path: '/admin/invoicing' },
  { icon: DollarSign, label: 'Contabilidad', path: '/admin/accounting' },
  { icon: CheckSquare, label: 'Aprobaciones', path: '/admin/approvals' },
  { icon: ClipboardList, label: 'Bitácora', path: '/admin/audit-logs' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: QrCode, label: 'Trazabilidad', path: '/admin/traceability' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Redirigir a la vista de cliente
    navigate('/customer/dashboard');
  };

  return (
    <div className="min-h-screen bg-beige">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold text-primary hidden sm:block">
                Vitalízate Admin
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Administrador</p>
              <p className="text-xs text-gray-600">admin@vitalizate.cr</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Salir a Vista de Cliente"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
          style={{ top: '64px' }}
        >
          <nav className="p-4 space-y-1 h-[calc(100vh-64px)] overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}