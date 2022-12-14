export interface IProduct {
  id: string;
  title: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  discountPercentage: number | null;
  rating: number | null;
  thumbnail: string | null;
}

export interface IProducts {
  products: IProduct[];
}

export type CallBackType<T> = (data: T) => void;
