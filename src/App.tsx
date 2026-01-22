import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public Pages
import Index from './pages/Index';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import TrackingPublic from './pages/TrackingPublic';
import About from './pages/About';
import Contact from './pages/Contact';
import Traceability from './pages/Traceability';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';
import CustomerOrders from './pages/customer/Orders';
import CustomerAddresses from './pages/customer/Addresses';
import CustomerReturns from './pages/customer/Returns';
import CustomerProfile from './pages/customer/Profile';
import CustomerFavorites from './pages/customer/Favorites';

// Driver Pages
import DriverDashboard from './pages/driver/Dashboard';
import DriverOrders from './pages/driver/Orders';
import DriverMap from './pages/driver/Map';
import DriverHistory from './pages/driver/History';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import Inventory from './pages/admin/Inventory';
import Purchases from './pages/admin/Purchases';
import Sales from './pages/admin/Sales';
import Suppliers from './pages/admin/Suppliers';
import Invoicing from './pages/admin/Invoicing';
import Accounting from './pages/admin/Accounting';
import Approvals from './pages/admin/Approvals';
import AdminTraceability from './pages/admin/Traceability';
import Analytics from './pages/admin/Analytics';
import Users from './pages/admin/Users';

import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tracking" element={<TrackingPublic />} />
          <Route path="/tracking/:id" element={<TrackingPublic />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/traceability" element={<Traceability />} />

          {/* Customer Routes */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/orders" element={<CustomerOrders />} />
          <Route path="/customer/addresses" element={<CustomerAddresses />} />
          <Route path="/customer/returns" element={<CustomerReturns />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/customer/favorites" element={<CustomerFavorites />} />

          {/* Driver Routes */}
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          <Route path="/driver/orders" element={<DriverOrders />} />
          <Route path="/driver/map" element={<DriverMap />} />
          <Route path="/driver/history" element={<DriverHistory />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/purchases" element={<Purchases />} />
          <Route path="/admin/sales" element={<Sales />} />
          <Route path="/admin/suppliers" element={<Suppliers />} />
          <Route path="/admin/invoicing" element={<Invoicing />} />
          <Route path="/admin/accounting" element={<Accounting />} />
          <Route path="/admin/approvals" element={<Approvals />} />
          <Route path="/admin/traceability" element={<AdminTraceability />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/users" element={<Users />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;