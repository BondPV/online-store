import LocalStorage from 'helpers/localStorage/LocalStorage';
import CartPage from 'components/pages/cartPage';

class Cart {
  public static fillHeaderCounter(): void {
    const headerQty = document.querySelector('.header__basket-counter');
    const cartTotalQty = document.querySelector('.total-quantity');

    const headerTotalPrice = document.querySelector('.header__total-price');
    const cartPriceWrap = document.querySelector('.total-price-container');
    const cartTotalPrice = document.querySelector('.total-price');
    const cartDiscountPrice = document.querySelector('.new-price');

    const cart = LocalStorage.getCart();
    const totalQty = cart.reduce((acc, currentValue) => acc + currentValue.count, 0);
    const totalPrice = cart.reduce((acc, currentValue) => acc + currentValue.price * currentValue.count, 0);

    const discount = Math.round(totalPrice * ((100 - LocalStorage.getPromo().length * 10) / 100));

    if (headerTotalPrice && headerQty) {
      headerTotalPrice.textContent = `Cart total: $ ${totalPrice}`;
      headerQty.textContent = `${totalQty}`;
    }

    if (cartTotalPrice && cartTotalQty) {
      cartTotalQty.textContent = `Total products: ${totalQty}`;
      cartTotalPrice.textContent = `Total: $ ${totalPrice}`;
    }

    if (cartDiscountPrice && cartPriceWrap && cartTotalPrice) {
      this.createDiscountItems();

      if (LocalStorage.getPromo().length > 0) {
        cartDiscountPrice.textContent = `Total: $ ${discount}`;
        cartDiscountPrice.classList.add('new-price_active');
        cartTotalPrice.classList.add('old-price');
      } else {
        cartDiscountPrice.classList.remove('new-price_active');
        cartTotalPrice.classList.remove('old-price');
      }
    }
  }

  private static createDiscountItems(): void {
    const promoStorage = LocalStorage.getPromo();
    const discountList = document.querySelector('.promo-list');

    if (discountList) {
      discountList.innerHTML = '';

      promoStorage.forEach((item) => {
        CartPage.createPromoItem(item, discountList);
      });
    }
  }
}

export default Cart;
