//  product catalog implementation

import productsDB from '../../../database/ProductsDB';
import Product from './product/Product';
import { IProduct } from '../../../types/interfaces';
import './catalog.scss';

class Catalog {
  private products: IProduct[] = [];

  constructor() {
    this.initProducts();
  }

  //  product database initialization
  initProducts() {
    this.products = productsDB.getProducts();
  }

  render() {
    const products: string = this.products
      .map((product) => new Product(product))
      .map((product) => product.render())
      .join('');
    return `<p>Products List</p>
      ${products}`;
  }
}

export default Catalog;
