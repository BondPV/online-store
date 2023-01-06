import './productDetails.scss';
import Product from '../product/Product';
import Gallery from './gallary/Gallery';

class ProductDetails extends Product {
  private price(): HTMLElement[] {
    const productPrice: HTMLElement = document.createElement('div');
    productPrice.classList.add('product-details__price_min', 'product__price');
    productPrice.innerText = `${this.initialPrice()} $`;

    const productPriceDiscount: HTMLElement = document.createElement('div');
    productPriceDiscount.classList.add('product-details__price', 'product__price_discount');
    productPriceDiscount.innerText = `${this.product.price} $`;

    return [productPrice, productPriceDiscount];
  }

  public renderHeader(): HTMLElement {
    const header: HTMLElement = document.createElement('div');
    header.classList.add('product-details__header');

    const breadCrumbs: HTMLElement = document.createElement('div');
    breadCrumbs.classList.add('product-details__bread-crumbs');
    breadCrumbs.innerHTML = `
      <a href="#">Home</a> >
      <a href="#?category=${this.product.category}">${this.product.category}</a> >
      <a href="#?category=${this.product.category}&brand=${this.product.brand}">${this.product.brand}</a> >
      ${this.product.title}
      `;
    header.append(breadCrumbs);

    const price: HTMLElement = document.createElement('div');
    price.classList.add('product-details__prices');
    price.append(this.price()[1]);
    header.append(price);

    const buttons: HTMLElement = document.createElement('div');
    buttons.classList.add('product-details__buttons');
    header.append(buttons);

    const buttonAddToCart: HTMLElement = document.createElement('button');
    buttonAddToCart.classList.add('product-details__button');
    buttonAddToCart.innerText = 'ADD TO CARD';
    buttons.append(buttonAddToCart);

    const buttonBuyNow: HTMLElement = document.createElement('button');
    buttonBuyNow.classList.add('product-details__button', 'product-details__button_buy');
    buttonBuyNow.innerText = 'BUY NOW';
    buttons.append(buttonBuyNow);

    buttonAddToCart.addEventListener('click', () => {
      alert('click Add to cart');
    });

    buttonBuyNow.addEventListener('click', () => {
      alert('click Buy Now');
    });

    return header;
  }

  public renderDescription(): HTMLElement {
    const productDetails: HTMLElement = document.createElement('div');
    productDetails.classList.add('product-details__description');

    const productTitle: HTMLElement = document.createElement('div');
    productTitle.classList.add('product-details__title');
    productTitle.innerText = `${this.product.titleDatail}`;
    productDetails.append(productTitle);

    const productReting: HTMLElement = document.createElement('div');
    productReting.classList.add('product-details__rating');
    const ratingStars: string = this.fillRating();
    productReting.innerHTML = `
      <div class="product__rating">${ratingStars}</div>
      <span class="product__rating-text">${this.product.rating}</span>
      </div>
    `;
    productDetails.append(productReting);

    productDetails.append(this.price()[0]);
    productDetails.append(this.price()[1]);

    const productBrand: HTMLElement = document.createElement('div');
    productBrand.classList.add('product-details__article');
    productBrand.innerHTML = `<span>Brand:</span> ${this.product.brand}`;
    productDetails.append(productBrand);

    const productCategory: HTMLElement = document.createElement('div');
    productCategory.classList.add('product-details__article');
    productCategory.innerHTML = `<span>Category:</span> ${this.product.category}`;
    productDetails.append(productCategory);

    const productStock: HTMLElement = document.createElement('div');
    productStock.classList.add('product-details__article');
    productStock.innerHTML = `<span>Stock:</span> ${this.product.stock}`;
    productDetails.append(productStock);

    const productDescription: HTMLElement = document.createElement('ul');
    productDescription.innerText = 'Description:';
    productDescription.classList.add('product-details__specification');
    productDetails.append(productDescription);

    this.product.description.forEach((el) => {
      const listItem: HTMLElement = document.createElement('li');
      listItem.classList.add('product-details__specification-item');
      listItem.innerText = el;
      productDescription.append(listItem);
    });

    return productDetails;
  }

  public renderGallery(): HTMLElement {
    const productGallery: HTMLElement = document.createElement('div');
    productGallery.classList.add('product-details__gallery');

    new Gallery(productGallery, this.product.images);

    return productGallery;
  }
}

export default ProductDetails;
