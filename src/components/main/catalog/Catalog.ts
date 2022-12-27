import { IdMap } from 'constants/htmlConstants';
import Product from 'components/main/product/Product';
import { IProduct } from 'types/interfaces';
import './catalog.scss';

class Catalog {
  constructor(public products: IProduct[]) {}

  render() {
    const parentElement = document.querySelector(IdMap.catalog);
    const products: string = this.products
      .map((product) => new Product(product))
      .map((product) => product.render())
      .join('');

    if (parentElement instanceof HTMLElement) {
      parentElement.innerHTML = products.length ? products : 'No products found';
    }
  }
}

export default Catalog;
