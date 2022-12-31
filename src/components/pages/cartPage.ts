class CartPage {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.renderPage();
  }

  public renderPage(): void {
    this.container.innerHTML = 'loading CartPage';
  }

  public removePage(): void {
    this.container.innerHTML = '';
  }
}

export default CartPage;
