import LocalStorage from 'helpers/localStorage/LocalStorage';

class Cart {
  public static fillHeaderCounter(): void {
    const headerQty = document.querySelector('.header__basket-counter');
    const cartTotalQty = document.querySelector('.total-quantity');

    const headerTotalPrice = document.querySelector('.header__total-price');
    const cartTotalPrice = document.querySelector('.total-price');

    if (headerQty && cartTotalQty) {
      const counterQty = LocalStorage.getCart();
      const totalQty = counterQty.reduce((acc, currentValue) => acc + currentValue.count, 0);
      headerQty.textContent = `${totalQty}`;
      cartTotalQty.textContent = `Total products: ${totalQty}`;
    }

    if (headerTotalPrice && cartTotalPrice) {
      const counterPrice = LocalStorage.getCart();
      const totalPrice = counterPrice.reduce((acc, currentValue) => acc + currentValue.price * currentValue.count, 0);
      headerTotalPrice.textContent = `Cart total: $ ${totalPrice}`;
      cartTotalPrice.textContent = `Total: $ ${totalPrice}`;
    }
  }
}

export default Cart;
