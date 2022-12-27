import { IProduct } from 'types/interfaces';
import productJSON from './database.json';

class ProductsDB {
  public getProducts(): IProduct[] {
    return productJSON.products;
  }
}

export default ProductsDB;
