//  product catalog implementation

import productsModel from '../../model/productsModel';
import ProductItem from '../productItem/productItem';
import { IProduct } from '../../types/types';
import './productsList.scss';

class ProductsList {
  private products: IProduct[] = [];

  constructor() {
    this.initProducts();
  }

  //  product database initialization
  initProducts() {
    this.products = productsModel.getProducts();
  }

  render() {
    const products: string = this.products
      .map((product) => new ProductItem(product))
      .map((product) => product.render())
      .join('');
    return `<p>Products List</p>
      ${products}`;
  }
}

export default ProductsList;
