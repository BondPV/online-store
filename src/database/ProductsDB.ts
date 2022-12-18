import productJSON from './database.json';
import { IProducts } from '../types/interfaces';

class ProductsDB {
  jsonDB: IProducts;

  constructor(jsonDB: IProducts) {
    this.jsonDB = jsonDB;
  }

  getProducts() {
    return this.jsonDB.products;
  }
}

//  get array all products from the database productJSON
const productsDB = new ProductsDB(productJSON);

export default productsDB;
