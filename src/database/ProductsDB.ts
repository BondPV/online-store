import { IProducts, IProduct } from 'types/interfaces';
import productJSON from './database.json';

class ProductsDB {
  constructor(private jsonDB: IProducts) {
    this.jsonDB = jsonDB;
  }

  static getProducts() {
    return productJSON.products;
  }

  static products: IProduct[] = this.getProducts();
}

export default ProductsDB;
