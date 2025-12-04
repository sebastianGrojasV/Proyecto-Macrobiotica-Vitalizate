import { mockProducts } from './products';

export interface Favorite {
  id: string;
  productId: string;
  addedDate: string;
}

export const mockFavorites: Favorite[] = [
  {
    id: 'fav-001',
    productId: 'prod-001',
    addedDate: '2025-01-10',
  },
  {
    id: 'fav-002',
    productId: 'prod-003',
    addedDate: '2025-01-12',
  },
  {
    id: 'fav-003',
    productId: 'prod-005',
    addedDate: '2025-01-15',
  },
  {
    id: 'fav-004',
    productId: 'prod-007',
    addedDate: '2025-01-18',
  },
];

export const getFavoriteProducts = () => {
  return mockFavorites.map((fav) => {
    const product = mockProducts.find((p) => p.id === fav.productId);
    return {
      ...fav,
      product,
    };
  });
};