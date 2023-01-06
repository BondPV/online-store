import LocalStorage from 'helpers/localStorage/LocalStorage';

class Cart {
  public static fillHeaderCounter(): void {
    const headerQty = document.querySelector('.header__basket-counter');
    const cartTotalQty = document.querySelector('.total-quantity');

    const headerTotalPrice = document.querySelector('.header__total-price');
    const cartTotalPrice = document.querySelector('.total-price');
    const cartDiscountPrice = document.querySelector('.new-price');

    const cart = LocalStorage.getCart();
    const totalQty = cart.reduce((acc, currentValue) => acc + currentValue.count, 0);
    const totalPrice = cart.reduce((acc, currentValue) => acc + currentValue.price * currentValue.count, 0);

    if (headerTotalPrice && headerQty) {
      headerTotalPrice.textContent = `Cart total: $ ${totalPrice}`;
      headerQty.textContent = `${totalQty}`;
    }

    if (cartTotalPrice && cartTotalQty) {
      cartTotalQty.textContent = `Total products: ${totalQty}`;
      cartTotalPrice.textContent = `Total: $ ${totalPrice}`;
    }

    if (cartDiscountPrice) {
      const priceDiscount = Math.round(totalPrice * 0.9);
      console.log(priceDiscount);
      cartDiscountPrice.textContent = `Total: $ ${priceDiscount}`;
    }
  }
}

export default Cart;
