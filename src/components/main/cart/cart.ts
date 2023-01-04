import LocalStorage from 'helpers/localStorage/LocalStorage';

class Cart {
  public static fillHeaderCounter(): void {
    const cartIcon = document.querySelector('.header__basket-counter');
    const cartTotalPrice = document.querySelector('.header__total-price');

    if (cartIcon) {
      const counterQty = LocalStorage.getCart();
      const totalQty = counterQty.reduce((acc, currentValue) => acc + currentValue.count, 0);
      cartIcon.textContent = `${totalQty}`;
    }

    if (cartTotalPrice) {
      const counterPrice = LocalStorage.getCart();
      const totalPrice = counterPrice.reduce((acc, currentValue) => acc + currentValue.price * currentValue.count, 0);
      cartTotalPrice.textContent = `Cart total: ${totalPrice} $`;
    }
  }
}

export default Cart;
