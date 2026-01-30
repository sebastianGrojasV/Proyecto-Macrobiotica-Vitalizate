import { useState } from 'react';
import { CreditCard, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import PublicLayout from '@/layouts/PublicLayout';
import Stepper from '@/components/custom/Stepper';
import { formatCurrency } from '@/lib/constants';
import { convertUSDtoCRC } from '@/lib/utils-cr';

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 1, title: 'Dirección', description: 'Información de envío' },
    { id: 2, title: 'Pago', description: 'Método de pago' },
    { id: 3, title: 'Confirmación', description: 'Revisar pedido' },
  ];

  const cartItems = [
    { name: 'Espirulina Orgánica', quantity: 2, price: convertUSDtoCRC(29.99) },
    { name: 'Cúrcuma con Pimienta Negra', quantity: 1, price: convertUSDtoCRC(24.99) },
    { name: 'Ashwagandha Premium', quantity: 1, price: convertUSDtoCRC(34.99) },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-heading text-4xl font-bold text-gray-900 mb-8">
          Finalizar Compra
        </h1>

        {/* Stepper */}
        <div className="mb-12">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            {currentStep === 0 && (
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Dirección de Envío</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Juan" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" placeholder="Pérez" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="juan@ejemplo.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" placeholder="8888-8888" />
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" placeholder="Avenida Central, Calle 5" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" placeholder="San José" />
                    </div>
                    <div>
                      <Label htmlFor="state">Provincia</Label>
                      <Input id="state" placeholder="San José" />
                    </div>
                    <div>
                      <Label htmlFor="zip">Código Postal</Label>
                      <Input id="zip" placeholder="10101" />
                    </div>
                  </div>
                  <Button
                    onClick={() => setCurrentStep(1)}
                    className="w-full bg-primary hover:bg-forest"
                  >
                    Continuar al Pago
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Payment Method */}
            {currentStep === 1 && (
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span>Método de Pago</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup defaultValue="card">
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        Tarjeta de Crédito/Débito
                      </Label>
                      <div className="flex space-x-2">
                        <img src="/images/CreditCard.jpg" alt="Visa" className="h-6" />
                        <img src="/images/Payment.jpg" alt="Mastercard" className="h-6" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="sinpe" id="sinpe" />
                      <Label htmlFor="sinpe" className="flex-1 cursor-pointer">
                        SINPE Móvil
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                        Transferencia Bancaria
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Fecha de Expiración</Label>
                        <Input id="expiry" placeholder="MM/AA" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                      <Input id="cardName" placeholder="Juan Pérez" />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(0)}
                      className="flex-1"
                    >
                      Regresar
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 bg-primary hover:bg-forest"
                    >
                      Revisar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Confirmation */}
            {currentStep === 2 && (
              <Card className="shadow-natural">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-primary" />
                    <span>Confirmar Pedido</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Dirección de Envío</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Juan Pérez</p>
                      <p className="text-sm text-gray-600">Avenida Central, Calle 5</p>
                      <p className="text-sm text-gray-600">San José, San José 10101</p>
                      <p className="text-sm text-gray-600">+506 8888-8888</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Método de Pago</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Tarjeta de Crédito</p>
                      <p className="text-sm text-gray-600">**** **** **** 3456</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Productos</h3>
                    <div className="space-y-3">
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-700">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Regresar
                    </Button>
                    <Button className="flex-1 bg-primary hover:bg-forest">
                      Confirmar y Pagar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-natural-lg sticky top-24">
              <CardContent className="p-6">
                <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">
                  Resumen del Pedido
                </h2>
                <div className="space-y-3 mb-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Envío</span>
                    <span className="font-semibold text-primary">Gratis</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}