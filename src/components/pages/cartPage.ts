import Cart from 'components/main/cart/cart';
import { itemsCart } from 'constants/htmlConstants';
import '../main/cart/Cart.scss';
import LocalStorage from 'helpers/localStorage/LocalStorage';
import { IProduct } from 'types/interfaces';

class CartPage {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.renderPage();
    Cart.fillHeaderCounter();
  }

  public renderPage(): void {
    const containerWrap = document.createElement('div');
    containerWrap.classList.add('cart-wrap');
    this.container.append(containerWrap);

    const cartTitle = document.createElement('h2');
    cartTitle.textContent = 'Shopping Cart';
    cartTitle.classList.add('cart-title');
    containerWrap.append(cartTitle);

    const cartDescription = document.createElement('div');
    containerWrap.append(cartDescription);

    const cartHeaderList = document.createElement('ul');
    cartHeaderList.classList.add('cart-list');
    cartDescription.append(cartHeaderList);

    itemsCart.forEach((item) => {
      this.createItemTitleCart(item, cartHeaderList);
    });

    this.renderProducts(cartDescription);
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

  private renderProduct(item: IProduct, parentElem: HTMLElement): void {
    const productWrap = document.createElement('div');
    parentElem.append(productWrap);

    const name = document.createElement('div');
    name.textContent = item.title;
    productWrap.append(name);
  }

  public removePage(): void {
    this.container.innerHTML = '';
  }
}

export default CartPage;
