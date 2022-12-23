//  product catalog implementation

import { IdMap } from 'constants/htmlConstants';
import ProductsDB from 'database/ProductsDB';
import Product from 'components/main/product/Product';
import { IProduct } from 'types/interfaces';
import './catalog.scss';

class Catalog {
  private products: IProduct[] = [];

  constructor() {
    this.initProducts();
  }

  initProducts() {
    this.products = ProductsDB.getProducts();
  }

  get getProducts() {
    return this.products;
  }

  static render(catalog: IProduct[]) {
    const parentElement = document.querySelector(IdMap.catalog);
    const products: string = catalog
      .map((product) => new Product(product))
      .map((product) => product.render())
      .join('');

    if (parentElement instanceof HTMLElement) {
      parentElement.innerHTML = products.length ? products : 'No products found';
    }
  }
}

export default Catalog;
