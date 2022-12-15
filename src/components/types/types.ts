export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

//JSON database structure
export interface IProducts {
  products: IProduct[];
  limit: number;
  skip: number;
  total: number;
}

export type CallBackType<T> = (data: T) => void;
