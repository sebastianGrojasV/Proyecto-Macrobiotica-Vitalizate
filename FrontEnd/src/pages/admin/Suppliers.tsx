import { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Mail, Phone, MapPin, Star, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import AdminLayout from '@/layouts/AdminLayout';
import { Supplier } from '@/lib/types';
import { getSuppliers, createSupplier, updateSupplier, deleteSupplierApi } from '@/lib/suppliersApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function Suppliers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [form, setForm] = useState<Partial<Supplier>>({ status: 'active', rating: 0 });

  useEffect(() => {
    setLoading(true);
    getSuppliers()
      .then((data) => setSuppliers(data || []))
      .catch((err) => {
        console.error(err);
        // toast could be used here but keep minimal
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSuppliers = filteredSuppliers.filter((s) => s.status === 'active').length;
  const avgRating = filteredSuppliers.length ? filteredSuppliers.reduce((sum, s) => sum + (s.rating || 0), 0) / filteredSuppliers.length : 0;

  const openCreate = () => {
    setEditing(null);
    setForm({ status: 'active', rating: 0 });
    setIsDialogOpen(true);
  };

  const openEdit = (s: Supplier) => {
    setEditing(s);
    setForm({ ...s, productsSupplied: s.productsSupplied || [] });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const payload: Partial<Supplier> = {
      name: form.name,
      contact: form.contact,
      email: form.email,
      phone: form.phone,
      address: form.address,
      rating: Number(form.rating) || 0,
      status: (form.status as Supplier['status']) || 'active',
    };

    setSaving(true);
    if (editing && editing.id) {
      updateSupplier(editing.id, payload)
        .then((updated) => {
          setSuppliers((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
          setIsDialogOpen(false);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setSaving(false));
    } else {
      createSupplier(payload)
        .then((created) => {
          setSuppliers((prev) => [created, ...prev]);
          setIsDialogOpen(false);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setSaving(false));
    }
  };

  const handleDelete = (id: string) => {
    deleteSupplierApi(id)
      .then(() => setSuppliers((prev) => prev.filter((s) => s.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-900">Gestión de Proveedores</h1>
            <p className="text-gray-600 mt-1">Administración de proveedores y contactos</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-forest">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Proveedor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing ? 'Editar Proveedor' : 'Nuevo Proveedor'}</DialogTitle>
                <DialogDescription>
                  Complete los datos del proveedor. Los campos principales son nombre y contacto.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contacto</Label>
                  <Input id="contact" value={form.contact || ''} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input id="address" value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input id="rating" type="number" step="0.1" value={form.rating ?? 0} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <select id="status" value={form.status || 'active'} onChange={(e) => setForm({ ...form, status: e.target.value as Supplier['status'] })} className="w-full rounded border px-3 py-2">
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSave} disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Proveedores</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredSuppliers.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Proveedores Activos</p>
                  <p className="text-2xl font-bold text-green-600">{activeSuppliers}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Calificación Promedio</p>
                  <p className="text-2xl font-bold text-secondary">{avgRating.toFixed(1)} ⭐</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="shadow-natural">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Buscar proveedores..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="shadow-natural hover:shadow-natural-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12 bg-primary/10">
                      <AvatarFallback className="text-primary font-bold">{supplier.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">{supplier.status === 'active' ? 'Activo' : 'Inactivo'}</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(supplier)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(supplier.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Contacto</p>
                  <p className="text-sm text-gray-900 font-semibold">{supplier.contact}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{supplier.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{supplier.address}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Productos Suministrados</p>
                  <div className="flex flex-wrap gap-2">
                    {supplier.productsSupplied?.slice(0, 3).map((product, index) => (
                      <Badge key={index} variant="outline" className="text-xs">{product}</Badge>
                    ))}
                    {supplier.productsSupplied && supplier.productsSupplied.length > 3 && (
                      <Badge variant="outline" className="text-xs">+{supplier.productsSupplied.length - 3}</Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="text-sm font-semibold">{supplier.rating}</span>
                  </div>
                  <Button variant="outline" size="sm">Ver Detalles</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}