import './product.scss';
import { IProduct } from 'types/interfaces';

class Product {
  constructor(protected product: IProduct) {}

  protected fillRating(): string {
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

  protected initialPrice(): number {
    const discount: number = 1 + this.product.discountPercentage / 100;
    const initialPrice: number = Math.round(this.product.price * discount);

    return initialPrice;
  }

  public addProductToCart(buttonAdd: HTMLElement) {
    buttonAdd.addEventListener('click', () => {
      const cartIcon = document.querySelector('.header__basket-counter');

      if (cartIcon) {
        const counter: string = cartIcon.innerHTML;
        let counterNum = 0;
        if (buttonAdd.classList.length == 1) {
          counterNum = Number(counter) + 1;
        } else {
          counterNum = Number(counter) - 1;
        }
        cartIcon.textContent = `${counterNum}`;
        buttonAdd.classList.toggle('product__remove-from-cart');
      }
    });
  }

  private convertFromStringToHTML(htmlString: string): HTMLElement {
    const parentDiv = document.createElement('div');
    parentDiv.innerHTML = htmlString.trim();
    return parentDiv.firstChild as HTMLElement;
  }

  public render(): HTMLElement {
    const ratingStars: string = this.fillRating();
    const initialPrice: number = this.initialPrice();

    const productString = `
      <div class="product">
        <div class="product__stock">stock: ${this.product.stock}</div>
        <div class="product__img-wrap">
          <a href="#product-details/${this.product.id}">
            <div class="product__img" style="background: url('${this.product.thumbnail}') no-repeat center / contain;"></div>
          </a>
        </div>
        <div class="product__rating-wrap">
          <div class="product__rating">${ratingStars}</div>
          <span class="product__rating-text">${this.product.rating}</span>
        </div>
        <div class="product__title">${this.product.title}</div>
        <div class="product__description">${this.product.titleDetail}</div>
        <div class="product__footer-wrap">
          <div class="product__price-wrap">
            <div class="product__price">${initialPrice}$</div>
            <div class="product__price_discount">${this.product.price}$</div>
          </div>
          
        </div>
        
      </div>
      `;
    const product: HTMLElement = this.convertFromStringToHTML(productString);

    const addButton: HTMLDivElement = document.createElement('div');
    addButton.classList.add('product__add-to-cart');
    this.addProductToCart(addButton);

    const productFooter: HTMLElement | null = product.querySelector('.product__footer-wrap');

    if (productFooter) {
      productFooter.append(addButton);
    }

    return product;
  }
}

export default Product;
