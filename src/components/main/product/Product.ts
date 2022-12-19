import './product.scss';
import { IProduct } from 'types/interfaces';

class Product {
  constructor(private product: IProduct) {}

  render() {
    const discount = 1 + this.product.discountPercentage / 100;
    const initialPrice: number = Math.round(this.product.price * discount);
    return `
      <div class="product">
        <div class="product__stock">stock: ${this.product.stock}</div>
        <div class="product__img-wrap">
          <div class="product__img" style="background: url('${this.product.images[0]}') no-repeat center / cover;"></div>
        </div>
        <div class="product__title">${this.product.title}</div>
        <div class="product__description">${this.product.description}</div>
        <div class="product__price">${initialPrice}$</div>
        <div class="product__price_discount">${this.product.price}$</div>
      </div>
      `;
  }
}

export default Product;
