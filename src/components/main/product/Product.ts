import './product.scss';
import { IProduct } from 'types/interfaces';

class Product {
  constructor(private product: IProduct) {}

  private fillRating(): string {
    const totalStarsCount = 5;
    const fullStarsCount: number = Math.trunc(this.product.rating);
    let result = '';

    for (let i = 0; i < fullStarsCount; i += 1) {
      result += '<i class="fa-solid fa-star rating-star"></i>';
    }

    const halfStar: number = this.product.rating - fullStarsCount;

    if (halfStar > 0 && halfStar < 0.25) {
      result += '<i class="fa-regular fa-star rating-star"></i>';
    } else if (halfStar >= 0.25 && halfStar < 0.75) {
      result += '<i class="fa-regular fa-star-half-stroke rating-star"></i>';
    } else if (halfStar >= 0.75) {
      result += '<i class="fa-solid fa-star rating-star"></i>';
    }

    const emptyStarsCount: number = totalStarsCount - Math.ceil(this.product.rating);

    for (let i = 0; i < emptyStarsCount; i += 1) {
      result += '<i class="fa-regular fa-star rating-star"></i>';
    }

    return result;
  }

  render() {
    const discount: number = 1 + this.product.discountPercentage / 100;
    const initialPrice: number = Math.round(this.product.price * discount);
    const ratingStars: string = this.fillRating();

    return `
      <div class="product">
        <div class="product__stock">stock: ${this.product.stock}</div>
        <div class="product__img-wrap">
          <div class="product__img" style="background: url('${this.product.images[0]}') no-repeat center / contain;"></div>
        </div>
        <div class="product__rating-wrap">
          <div class="product__rating">${ratingStars}</div>
          <span class="product__rating-text">${this.product.rating}</span>
        </div>
        <div class="product__title">${this.product.title}</div>
        <div class="product__description">${this.product.description}</div>
        <div class="product__footer-wrap">
          <div class="product__price-wrap">
            <div class="product__price">${initialPrice}$</div>
            <div class="product__price_discount">${this.product.price}$</div>
          </div>
          <div class="product__add-to-cart"></div>
          </div>
      </div>
      `;
  }
}

export default Product;
