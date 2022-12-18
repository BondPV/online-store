import './product.scss';
import { IProduct } from '../../../../types/interfaces';

class Product {
  constructor(private product: IProduct) {}

  render() {
    return `
      <div>
      <p>${this.product.title}</p>
      </div>
      `;
  }
}

export default Product;
