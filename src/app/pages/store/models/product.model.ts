export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity?: number;
  rating?: {
    rate: number;
    count: number;
  };
  stock?: number;
  featured: boolean;
}
export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}