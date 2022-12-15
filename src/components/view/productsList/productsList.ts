//product catalog implementation

import productsModel from '../../model/productsModel';
import ProductItem from '../productItem/productItem';
import { IProduct } from '../../types/types';
import './productsList.scss';

class ProductsList {
  private products: IProduct[] = [];

  constructor() {
    this.initProducts();
  }

  //product database initialization
  initProducts() {
    this.products = productsModel.getProducts();
  }

  render() {
    return `
      <p>Products List</p>
      ${this.products
        .map((product) => new ProductItem(product))
        .map((product) => product.render())
        .join('')}
      `;
  }
}

export default ProductsList;
