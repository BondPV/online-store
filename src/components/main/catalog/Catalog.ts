import { IdMap } from 'constants/htmlConstants';
import Product from 'components/main/product/Product';
import { IProduct } from 'types/interfaces';
import './catalog.scss';

class Catalog {
  constructor(public products: IProduct[]) {}

  render() {
    const parentElement = document.querySelector(IdMap.catalog);
    const products: HTMLElement[] = this.products
      .map((product) => new Product(product))
      .map((product) => product.render());

    if (parentElement instanceof HTMLElement) {
      if (products.length === 0) {
        parentElement.innerHTML = 'No products found';
      } else {
        parentElement.innerHTML = '';
        products.forEach((product) => parentElement.append(product));
      }
    }
  }
}

export default Catalog;
