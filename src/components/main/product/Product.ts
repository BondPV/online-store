import './product.scss';
import { IProduct } from 'types/interfaces';

class Product {
  constructor(private product: IProduct) {}

  render() {
    return `
      <div class="product">
        <div class="product__stock">stock: ${this.product.stock}</div>
        <div class="product__img-wrap">
        <img class="product__img"src="${this.product.images[0]}" alt="${this.product.title}">
        </div>
        <div class="product__title">${this.product.title}</div>
        <div class="product__price">${this.product.price}$</div>
      </div>
      `;
  }
}

export default Product;
