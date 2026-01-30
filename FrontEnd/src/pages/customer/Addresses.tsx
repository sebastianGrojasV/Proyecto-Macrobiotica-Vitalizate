import { useState } from 'react';
import { MapPin, Plus, Edit, Trash2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import CustomerLayout from '@/layouts/CustomerLayout';
import { mockAddresses, costaRicaProvinces, type Address } from '@/data/addresses';
import { toast } from 'sonner';

export default function CustomerAddresses() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({
    name: '',
    phone: '',
    province: '',
    canton: '',
    district: '',
    exactAddress: '',
    postalCode: '',
    isDefault: false,
  });

  const handleOpenDialog = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setFormData(address);
    } else {
      setEditingAddress(null);
      setFormData({
        name: '',
        phone: '',
        province: '',
        canton: '',
        district: '',
        exactAddress: '',
        postalCode: '',
        isDefault: false,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveAddress = () => {
    if (!formData.name || !formData.phone || !formData.province || !formData.exactAddress) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    if (editingAddress) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id ? { ...addr, ...formData } : addr
        )
      );
      toast.success('Dirección actualizada correctamente');
    } else {
      const newAddress: Address = {
        id: `addr-${Date.now()}`,
        ...formData as Address,
      };
      setAddresses([...addresses, newAddress]);
      toast.success('Dirección agregada correctamente');
    }

    setIsDialogOpen(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    toast.success('Dirección eliminada correctamente');
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    toast.success('Dirección predeterminada actualizada');
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
              Mis Direcciones
            </h1>
            <p className="text-gray-600">
              Gestiona tus direcciones de envío
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-primary hover:bg-forest"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Dirección
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingAddress ? 'Editar Dirección' : 'Nueva Dirección'}
                </DialogTitle>
                <DialogDescription>
                  Completa la información de tu dirección de envío
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="8888-8888"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="province">Provincia *</Label>
                    <Select
                      value={formData.province}
                      onValueChange={(value) =>
                        setFormData({ ...formData, province: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar provincia" />
                      </SelectTrigger>
                      <SelectContent>
                        {costaRicaProvinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="canton">Cantón</Label>
                    <Input
                      id="canton"
                      value={formData.canton}
                      onChange={(e) =>
                        setFormData({ ...formData, canton: e.target.value })
                      }
                      placeholder="Escazú"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district">Distrito</Label>
                    <Input
                      id="district"
                      value={formData.district}
                      onChange={(e) =>
                        setFormData({ ...formData, district: e.target.value })
                      }
                      placeholder="San Rafael"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Código Postal</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({ ...formData, postalCode: e.target.value })
                      }
                      placeholder="10203"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exactAddress">Dirección Exacta *</Label>
                  <Textarea
                    id="exactAddress"
                    value={formData.exactAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, exactAddress: e.target.value })
                    }
                    placeholder="Del Centro Comercial Multiplaza, 200 metros oeste, casa #45"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveAddress}
                  className="bg-primary hover:bg-forest"
                >
                  {editingAddress ? 'Actualizar' : 'Guardar'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {addresses.length === 0 ? (
          <Card className="shadow-natural">
            <CardContent className="p-12 text-center">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                No tienes direcciones guardadas
              </h3>
              <p className="text-gray-600 mb-6">
                Agrega una dirección para facilitar tus compras
              </p>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-primary hover:bg-forest"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Primera Dirección
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {addresses.map((address) => (
              <Card
                key={address.id}
                className="shadow-natural hover:shadow-natural-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {address.name}
                          </h3>
                          {address.isDefault && (
                            <Badge className="bg-primary text-white">
                              <Check className="w-3 h-3 mr-1" />
                              Predeterminada
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-1">
                          <span className="font-medium">Teléfono:</span> {address.phone}
                        </p>
                        <p className="text-gray-600 mb-1">
                          <span className="font-medium">Ubicación:</span>{' '}
                          {address.province}, {address.canton}
                          {address.district && `, ${address.district}`}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Dirección:</span>{' '}
                          {address.exactAddress}
                        </p>
                        {address.postalCode && (
                          <p className="text-gray-600 mt-1">
                            <span className="font-medium">Código Postal:</span>{' '}
                            {address.postalCode}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      {!address.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefault(address.id)}
                        >
                          Predeterminada
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(address)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}