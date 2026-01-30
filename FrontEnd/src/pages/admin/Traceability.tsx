import { useState } from 'react';
import { Plus, QrCode, Package, Search, Download, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AdminLayout from '@/layouts/AdminLayout';
import { mockProductBatches, generateQRCode, type ProductBatch } from '@/data/traceability';
import { mockProducts } from '@/data/products';
import { toast } from 'sonner';

export default function AdminTraceability() {
  const [batches, setBatches] = useState<ProductBatch[]>(mockProductBatches);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    productId: '',
    batchNumber: '',
    manufacturingDate: '',
    expirationDate: '',
    quantity: '',
    origin: '',
    supplier: '',
  });

  const filteredBatches = batches.filter(
    (batch) =>
      batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.qrCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateBatch = () => {
    if (
      !formData.productId ||
      !formData.batchNumber ||
      !formData.manufacturingDate ||
      !formData.expirationDate ||
      !formData.quantity
    ) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    const product = mockProducts.find((p) => p.id === formData.productId);
    if (!product) {
      toast.error('Producto no encontrado');
      return;
    }

    const qrCode = generateQRCode(formData.batchNumber);

    const newBatch: ProductBatch = {
      id: `batch-${Date.now()}`,
      batchNumber: formData.batchNumber,
      productId: formData.productId,
      productName: product.name,
      productImage: product.image,
      qrCode: qrCode,
      manufacturingDate: formData.manufacturingDate,
      expirationDate: formData.expirationDate,
      quantity: parseInt(formData.quantity),
      origin: formData.origin || 'Costa Rica',
      supplier: formData.supplier || 'Vitalízate',
      certifications: ['BPM', 'HACCP', 'ISO 22000'],
      stages: [],
      isVerified: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setBatches([newBatch, ...batches]);
    toast.success(`Lote ${formData.batchNumber} creado exitosamente`);
    setIsDialogOpen(false);
    setFormData({
      productId: '',
      batchNumber: '',
      manufacturingDate: '',
      expirationDate: '',
      quantity: '',
      origin: '',
      supplier: '',
    });
  };

  const handleDownloadQR = (batch: ProductBatch) => {
    toast.success(`Código QR de ${batch.batchNumber} descargado`);
  };

  const handleDeleteBatch = (id: string) => {
    setBatches(batches.filter((b) => b.id !== id));
    toast.success('Lote eliminado correctamente');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
              Gestión de Trazabilidad
            </h1>
            <p className="text-gray-600">
              Administra lotes de productos y códigos QR de trazabilidad
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-forest">
                <Plus className="w-4 h-4 mr-2" />
                Crear Nuevo Lote
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Lote</DialogTitle>
                <DialogDescription>
                  Registra un nuevo lote de producto y genera su código QR de trazabilidad
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productId">Producto *</Label>
                    <Select
                      value={formData.productId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, productId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar producto" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProducts.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batchNumber">Número de Lote *</Label>
                    <Input
                      id="batchNumber"
                      value={formData.batchNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, batchNumber: e.target.value })
                      }
                      placeholder="ESP-2025-001"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manufacturingDate">Fecha de Fabricación *</Label>
                    <Input
                      id="manufacturingDate"
                      type="date"
                      value={formData.manufacturingDate}
                      onChange={(e) =>
                        setFormData({ ...formData, manufacturingDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expirationDate">Fecha de Vencimiento *</Label>
                    <Input
                      id="expirationDate"
                      type="date"
                      value={formData.expirationDate}
                      onChange={(e) =>
                        setFormData({ ...formData, expirationDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Cantidad *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      placeholder="1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origen</Label>
                    <Input
                      id="origin"
                      value={formData.origin}
                      onChange={(e) =>
                        setFormData({ ...formData, origin: e.target.value })
                      }
                      placeholder="Costa Rica"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier">Proveedor</Label>
                  <Input
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) =>
                      setFormData({ ...formData, supplier: e.target.value })
                    }
                    placeholder="Nombre del proveedor"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateBatch}
                  className="bg-primary hover:bg-forest"
                >
                  Crear Lote y Generar QR
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Lotes</p>
                  <p className="text-2xl font-bold text-gray-900">{batches.length}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Códigos QR Activos</p>
                  <p className="text-2xl font-bold text-primary">{batches.length}</p>
                </div>
                <QrCode className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Productos Trazables</p>
                  <p className="text-2xl font-bold text-green-600">
                    {new Set(batches.map((b) => b.productId)).size}
                  </p>
                </div>
                <Package className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-natural">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Verificaciones</p>
                  <p className="text-2xl font-bold text-blue-600">1,234</p>
                </div>
                <QrCode className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="shadow-natural">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar por lote, producto o código QR..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Batches List */}
        <div className="space-y-4">
          {filteredBatches.map((batch) => (
            <Card key={batch.id} className="shadow-natural hover:shadow-natural-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <img
                      src={batch.productImage}
                      alt={batch.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {batch.productName}
                        </h3>
                        <Badge className="bg-green-100 text-green-800">Verificado</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600">Lote</p>
                          <p className="font-medium">{batch.batchNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Código QR</p>
                          <p className="font-medium font-mono text-xs">{batch.qrCode}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Cantidad</p>
                          <p className="font-medium">{batch.quantity} unidades</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Fabricación</p>
                          <p className="font-medium">{batch.manufacturingDate}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {batch.certifications.slice(0, 3).map((cert, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                        {batch.certifications.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{batch.certifications.length - 3} más
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadQR(batch)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar QR
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteBatch(batch.id)}
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

        {filteredBatches.length === 0 && (
          <Card className="shadow-natural">
            <CardContent className="p-12 text-center">
              <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                No se encontraron lotes
              </h3>
              <p className="text-gray-600">
                {searchTerm
                  ? 'Intenta con otros términos de búsqueda'
                  : 'Crea tu primer lote para comenzar'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}