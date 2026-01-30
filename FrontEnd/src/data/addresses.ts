export interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  canton: string;
  district: string;
  exactAddress: string;
  postalCode: string;
  isDefault: boolean;
}

export const mockAddresses: Address[] = [
  {
    id: 'addr-001',
    name: 'Juan Pérez',
    phone: '8888-8888',
    province: 'San José',
    canton: 'Escazú',
    district: 'San Rafael',
    exactAddress: 'Del Centro Comercial Multiplaza, 200 metros oeste, casa #45',
    postalCode: '10203',
    isDefault: true,
  },
  {
    id: 'addr-002',
    name: 'Juan Pérez',
    phone: '8888-8888',
    province: 'Alajuela',
    canton: 'Alajuela',
    district: 'San José',
    exactAddress: 'Frente al Parque Central, edificio azul, apartamento 3B',
    postalCode: '20101',
    isDefault: false,
  },
];

export const costaRicaProvinces = [
  'San José',
  'Alajuela',
  'Cartago',
  'Heredia',
  'Guanacaste',
  'Puntarenas',
  'Limón',
];