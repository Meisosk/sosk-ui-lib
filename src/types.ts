export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  tags: string[];
  image?: string;
  saleCount: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
