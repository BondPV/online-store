class CartPage {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.renderPage();
  }

  renderPage() {
    this.container.innerHTML = 'loading CartPage';
  }

  removePage() {
    this.container.innerHTML = '';
  }
}

export default CartPage;
