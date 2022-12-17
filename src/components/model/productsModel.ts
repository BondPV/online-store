import productJSON from '../../database/database.json';
import { IProducts } from '../types/types';

class ProductsModel {
  jsonDB: IProducts;

  constructor(jsonDB: IProducts) {
    this.jsonDB = jsonDB;
  }

  getProducts() {
    return this.jsonDB.products;
  }
}

//  get array all products from the database productJSON
const productsModel = new ProductsModel(productJSON);

export default productsModel;
