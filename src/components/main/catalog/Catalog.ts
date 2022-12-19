//  product catalog implementation

import ProductsDB from 'database/ProductsDB';
import Product from 'components/main/product/Product';
import { IProduct } from 'types/interfaces';
import './catalog.scss';

class Catalog {
  private products: IProduct[] = [];

  constructor() {
    this.initProducts();
  }

  //  product database initialization
  initProducts() {
    this.products = ProductsDB.getProducts();
  }

  render() {
    const products: string = this.products
      .map((product) => new Product(product))
      .map((product) => product.render())
      .join('');
    return `<div class="catalog">
    ${products}</div>`;
  }
}

export default Catalog;
