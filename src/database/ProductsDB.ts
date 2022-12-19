import { IProducts } from 'types/interfaces';
import productJSON from './database.json';

class ProductsDB {
  constructor(private jsonDB: IProducts) {
    this.jsonDB = jsonDB;
  }

  static getProducts() {
    return productJSON.products;
  }
}

export default ProductsDB;
