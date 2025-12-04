import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utilidades específicas para Costa Rica

// Validar cédula costarricense
export const validateCedula = (cedula: string): boolean => {
  const cleaned = cedula.replace(/\D/g, '');
  if (cleaned.length !== 9) return false;
  
  // Validación básica de formato
  const firstDigit = parseInt(cleaned[0]);
  if (firstDigit < 1 || firstDigit > 9) return false;
  
  return true;
};

// Formatear cédula costarricense
export const formatCedula = (cedula: string): string => {
  const cleaned = cedula.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 1)}-${cleaned.slice(1, 5)}-${cleaned.slice(5)}`;
  }
  return cedula;
};

// Validar teléfono costarricense
export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 8;
};

// Calcular impuesto de ventas (IVA 13% en Costa Rica)
export const calculateIVA = (amount: number): number => {
  return amount * 0.13;
};

// Calcular total con IVA
export const calculateTotalWithIVA = (subtotal: number): number => {
  return subtotal + calculateIVA(subtotal);
};

// Generar número de factura
export const generateInvoiceNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `FAC-${year}${month}-${random}`;
};

// Generar número de orden de compra
export const generatePurchaseOrderNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `OC-${year}${month}-${random}`;
};

// Validar código postal costarricense
export const validatePostalCode = (code: string): boolean => {
  const cleaned = code.replace(/\D/g, '');
  return cleaned.length === 5;
};

// Formatear código postal
export const formatPostalCode = (code: string): string => {
  const cleaned = code.replace(/\D/g, '');
  if (cleaned.length === 5) {
    return `${cleaned.slice(0, 5)}`;
  }
  return code;
};

// Días hábiles de Costa Rica (excluye domingos y feriados)
export const isBusinessDay = (date: Date): boolean => {
  const day = date.getDay();
  // 0 = Domingo, 6 = Sábado
  return day !== 0;
};

// Calcular fecha de entrega estimada (días hábiles)
export const calculateDeliveryDate = (startDate: Date, businessDays: number): Date => {
  const currentDate = new Date(startDate);
  let daysAdded = 0;
  
  while (daysAdded < businessDays) {
    currentDate.setDate(currentDate.getDate() + 1);
    if (isBusinessDay(currentDate)) {
      daysAdded++;
    }
  }
  
  return currentDate;
};

// Convertir USD a CRC (tasa aproximada)
export const convertUSDtoCRC = (usd: number, rate: number = 530): number => {
  return Math.round(usd * rate);
};

// Formatear número con separadores de miles
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-CR').format(num);
};