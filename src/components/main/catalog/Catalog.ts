//  product catalog implementation
import Product from 'components/main/product/Product';
import { IProduct } from 'types/interfaces';
import './catalog.scss';

class Catalog {
  static render(catalog: IProduct[]) {
    const parentElement = document.querySelector('#catalog');
    const products: string = catalog
      .map((product) => new Product(product))
      .map((product) => product.render())
      .join('');
    if (parentElement instanceof HTMLElement) {
      parentElement.innerHTML = products;
      if (products.length === 0) {
        parentElement.innerHTML = 'No products found';
      }
    }
  }
}

export default Catalog;
