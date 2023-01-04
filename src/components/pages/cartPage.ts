import Cart from 'components/main/cart/cart';
import { itemsCart } from 'constants/htmlConstants';
import '../main/cart/Cart.scss';
import LocalStorage from 'helpers/localStorage/LocalStorage';
import { ICartProduct } from 'types/interfaces';
import Product from 'components/main/product/Product';
import localStorage from 'helpers/localStorage/LocalStorage';

class CartPage {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.renderPage();
    Cart.fillHeaderCounter();
  }

  public renderPage(): void {
    if (localStorage.getCart().length === 0) {
      const emptyCartMessage = document.createElement('div');
      emptyCartMessage.classList.add('empty-cart');
      emptyCartMessage.textContent = 'Your cart is empty';
      this.container.append(emptyCartMessage);
      return;
    }

    const containerWrap = document.createElement('div');
    containerWrap.classList.add('cart-wrap');
    this.container.append(containerWrap);

    const cartTitle = document.createElement('h2');
    cartTitle.textContent = 'Shopping Cart';
    cartTitle.classList.add('cart-title');
    containerWrap.append(cartTitle);

    const cartHeaderList = document.createElement('ul');
    cartHeaderList.classList.add('cart-list');
    containerWrap.append(cartHeaderList);

    itemsCart.forEach((item) => {
      this.createItemTitleCart(item, cartHeaderList);
    });

    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container');
    containerWrap.append(cartContainer);

    this.renderProducts(cartContainer);
  }

  private createItemTitleCart(itemName: string, parentElem: HTMLElement): void {
    const itemTitle: HTMLDivElement = document.createElement('div');
    itemTitle.textContent = itemName;
    itemTitle.classList.add('cart-item');
    parentElem.append(itemTitle);
  }

  private renderProducts(parentElem: HTMLElement): void {
    const allProducts = LocalStorage.getCart();
    allProducts.forEach((item) => {
      this.renderProduct(item, parentElem);
    });
  }

  private renderProduct(item: ICartProduct, parentElem: HTMLElement): void {
    const productCart = document.createElement('div');
    productCart.classList.add('product-card');
    parentElem.append(productCart);

    const productItemWrap = document.createElement('div');
    productItemWrap.classList.add('product-card_wrap');
    productCart.append(productItemWrap);

    const productStock = document.createElement('div');
    productStock.textContent = `stock: ${item.stock}`;
    productStock.classList.add('product__stock');
    productItemWrap.append(productStock);

    const productImg = document.createElement('div');
    productImg.classList.add('product__img');
    productImg.style.backgroundImage = `url(${item.thumbnail})`;
    productImg.style.backgroundPosition = 'center';
    productImg.style.backgroundSize = 'cover';
    productItemWrap.append(productImg);

    const productDescWrap = document.createElement('div');
    productDescWrap.classList.add('product-card_wrap');
    productCart.append(productDescWrap);

    const productTitle = document.createElement('h3');
    productTitle.classList.add('product-card__title');
    productTitle.textContent = item.title;
    productDescWrap.append(productTitle);

    const productRating: HTMLDivElement = document.createElement('div');
    productRating.classList.add('product-details__rating');
    productRating.innerHTML = Product.fillRating(item.rating);
    productDescWrap.append(productRating);

    const productRatingText: HTMLSpanElement = document.createElement('span');
    productRatingText.classList.add('product__rating-text');
    productRatingText.textContent = `${item.rating}`;
    productRating.append(productRatingText);

    const productDesc = document.createElement('p');
    productDesc.textContent = item.titleDetail;
    productDescWrap.append(productDesc);

    const productPrice = document.createElement('div');
    productPrice.classList.add('product__price_discount');
    productPrice.textContent = `${item.price}$`;
    productDescWrap.append(productPrice);

    const productQty = document.createElement('div');
    productQty.classList.add('quantity');
    productCart.append(productQty);

    const inputButtonMinus = document.createElement('input');
    inputButtonMinus.type = 'button';
    inputButtonMinus.value = '-';
    inputButtonMinus.classList.add('quantity-button', 'minus');
    productQty.append(inputButtonMinus);

    const quantityValue = document.createElement('div');
    quantityValue.textContent = `${item.count}`;
    quantityValue.classList.add('quantity-number');
    productQty.append(quantityValue);

    const inputButtonPlus = document.createElement('input');
    inputButtonPlus.type = 'button';
    inputButtonPlus.value = '+';
    inputButtonPlus.classList.add('quantity-button', 'plus');
    productQty.append(inputButtonPlus);

    const totalPriceWrap = document.createElement('div');
    totalPriceWrap.textContent = `${item.price} $`;
    totalPriceWrap.classList.add('product__price_discount', 'product-card__price');
    productCart.append(totalPriceWrap);

    inputButtonMinus.addEventListener('click', () => {
      item.count -= 1;
      if (item.count === 0) {
        LocalStorage.removeProductFromCart(item.id);
        productCart.remove();
      } else {
        LocalStorage.updateProductToCart(item.id, item.count);
        quantityValue.textContent = `${item.count}`;
      }
      Cart.fillHeaderCounter();
    });

    inputButtonPlus.addEventListener('click', () => {
      if (item.count < item.stock) {
        item.count += 1;
        LocalStorage.updateProductToCart(item.id, item.count);
        quantityValue.textContent = `${item.count}`;
      }
      Cart.fillHeaderCounter();
    });
  }

  public removePage(): void {
    this.container.innerHTML = '';
  }
}

export default CartPage;
