import './productItem.scss';
import { IProduct } from '../../types/types';

class ProductItem {
  constructor(private product: IProduct) {}

  render() {
    return `
      <div>
      <p>${this.product.title}</p>
      </div>
      `;
  }
}

export default ProductItem;
