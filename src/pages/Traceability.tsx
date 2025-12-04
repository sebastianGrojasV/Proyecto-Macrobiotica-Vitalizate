import { useState } from 'react';
import { Search, QrCode, CheckCircle, XCircle, Package, MapPin, Calendar, Award, FileText, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';
import ChatAssistant from '@/components/custom/ChatAssistant';
import { findBatchByQRCode, verifyQRCode, STAGE_STATUS, type ProductBatch } from '@/data/traceability';
import { toast } from 'sonner';

export default function Traceability() {
  const [qrCode, setQrCode] = useState('');
  const [batch, setBatch] = useState<ProductBatch | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!qrCode.trim()) {
      toast.error('Por favor ingresa un código QR');
      return;
    }

    setIsSearching(true);

    // Simulate search delay
    setTimeout(() => {
      const isValid = verifyQRCode(qrCode);

      if (!isValid) {
        toast.error('Código QR inválido. Verifica el formato.');
        setBatch(null);
        setIsSearching(false);
        return;
      }

      const foundBatch = findBatchByQRCode(qrCode);

      if (foundBatch) {
        setBatch(foundBatch);
        toast.success('Producto verificado exitosamente');
      } else {
        setBatch(null);
        toast.error('Código QR no encontrado en nuestra base de datos');
      }

      setIsSearching(false);
    }, 1000);
  };

  const handleDownloadQR = () => {
    toast.success('Código QR descargado');
  };

  return (
    <div className="min-h-screen flex flex-col bg-natural">
      <Header cartItemsCount={0} />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
            <QrCode className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-gray-900 mb-4">
            Sistema de Trazabilidad QR
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Verifica la autenticidad y conoce el origen de tu producto.
            Escanea o ingresa el código QR para ver toda la información de trazabilidad.
          </p>
        </div>

        {/* Search Section */}
        <Card className="shadow-natural max-w-2xl mx-auto mb-12">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Ingresa el código QR (ej: VTZ-ESP-2025-001-A1B2C3)"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="h-12"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-primary hover:bg-forest h-12 px-8"
              >
                <Search className="w-5 h-5 mr-2" />
                {isSearching ? 'Buscando...' : 'Verificar'}
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              También puedes escanear el código QR desde tu dispositivo móvil
            </p>
          </CardContent>
        </Card>

        {/* Results Section */}
        {batch && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Verification Status */}
            <Card className="shadow-natural border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-gray-900">
                        Producto Verificado
                      </h3>
                      <p className="text-gray-600">
                        Este producto es auténtico y cumple con todos los estándares de calidad
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                    ✓ Certificado
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Product Information */}
            <Card className="shadow-natural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-6 h-6 text-primary" />
                  <span>Información del Producto</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={batch.productImage}
                      alt={batch.productName}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-900 mb-2">
                        {batch.productName}
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Lote:</span> {batch.batchNumber}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Código QR:</span> {batch.qrCode}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Cantidad:</span> {batch.quantity} unidades
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Fecha de Fabricación</p>
                        <p className="text-sm text-gray-600">{batch.manufacturingDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Fecha de Vencimiento</p>
                        <p className="text-sm text-gray-600">{batch.expirationDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Origen</p>
                        <p className="text-sm text-gray-600">{batch.origin}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Proveedor</p>
                        <p className="text-sm text-gray-600">{batch.supplier}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Award className="w-5 h-5 text-primary" />
                    <h5 className="font-semibold text-gray-900">Certificaciones</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {batch.certifications.map((cert, idx) => (
                      <Badge key={idx} variant="outline" className="bg-primary/5">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleDownloadQR}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar Código QR</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Traceability Timeline */}
            <Card className="shadow-natural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-6 h-6 text-primary" />
                  <span>Trazabilidad del Producto</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

                  {/* Timeline Items */}
                  <div className="space-y-8">
                    {batch.stages.map((stage, idx) => (
                      <div key={stage.id} className="relative flex items-start space-x-4">
                        {/* Timeline Dot */}
                        <div
                          className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${stage.status === 'completed'
                              ? 'bg-green-100'
                              : stage.status === 'in_progress'
                                ? 'bg-blue-100'
                                : 'bg-gray-100'
                            }`}
                        >
                          {stage.status === 'completed' ? (
                            <CheckCircle className="w-8 h-8 text-green-600" />
                          ) : stage.status === 'in_progress' ? (
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <div className="w-8 h-8 border-4 border-gray-400 rounded-full" />
                          )}
                        </div>

                        {/* Stage Content */}
                        <div className="flex-1 pb-8">
                          <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-lg text-gray-900">
                                  {idx + 1}. {stage.stage}
                                </h4>
                                <p className="text-sm text-gray-600">{stage.description}</p>
                              </div>
                              <Badge className={STAGE_STATUS[stage.status].color}>
                                {STAGE_STATUS[stage.status].label}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700">{stage.location}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700">
                                  {stage.date} • {stage.time}
                                </span>
                              </div>
                            </div>

                            <div className="mt-3 text-sm">
                              <p className="text-gray-700">
                                <span className="font-medium">Responsable:</span>{' '}
                                {stage.responsible}
                              </p>
                            </div>

                            {stage.certifications && stage.certifications.length > 0 && (
                              <div className="mt-3">
                                <div className="flex flex-wrap gap-2">
                                  {stage.certifications.map((cert, certIdx) => (
                                    <Badge
                                      key={certIdx}
                                      variant="outline"
                                      className="text-xs bg-primary/5"
                                    >
                                      <Award className="w-3 h-3 mr-1" />
                                      {cert}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {stage.notes && (
                              <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-700">
                                <span className="font-medium">Nota:</span> {stage.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Results */}
        {!batch && qrCode && !isSearching && (
          <Card className="shadow-natural max-w-2xl mx-auto border-l-4 border-l-red-500">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-xl text-gray-900 mb-2">
                Código QR No Encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                No se encontró información para el código QR ingresado.
                Verifica que el código sea correcto.
              </p>
              <p className="text-sm text-gray-500">
                Si crees que esto es un error, contacta a nuestro servicio al cliente.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        {!batch && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="shadow-natural">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Escanea el Código
                </h3>
                <p className="text-sm text-gray-600">
                  Encuentra el código QR en el empaque de tu producto y escanéalo con tu dispositivo
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-natural">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Verifica Autenticidad
                </h3>
                <p className="text-sm text-gray-600">
                  Confirma que tu producto es auténtico y cumple con todos los estándares de calidad
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-natural">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Conoce su Origen
                </h3>
                <p className="text-sm text-gray-600">
                  Descubre toda la información sobre el origen y proceso de elaboración de tu producto
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
      <ChatAssistant />
    </div>
  );
}