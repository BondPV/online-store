import LocalStorage from 'helpers/localStorage/LocalStorage';

class Cart {
  public static fillHeaderCounter() {
    const cartIcon = document.querySelector('.header__basket-counter');

    if (cartIcon) {
      const counterNum = LocalStorage.getCart().length;
      cartIcon.textContent = `${counterNum}`;
    }
  }
}

export default Cart;
