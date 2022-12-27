import { Container } from 'constants/htmlConstants';
import MainPage from 'components/pages/mainPage';
import ProductDetailsPage from 'components/pages/productDetailsPage';
import CartPage from 'components/pages/cartPage';
import { Pages } from 'types/enums';

class Router {
  private location: Location;

  private currentPage: MainPage | ProductDetailsPage | CartPage | null = null;

  constructor() {
    this.location = window.location;
    this.setPage(this.location.hash.slice(1));
    this.hashChange();
  }

  private hashChange() {
    window.addEventListener('hashchange', () => {
      if (this.currentPage) this.currentPage.removePage();
      this.setPage(this.location.hash.slice(1));
    });
  }

  private setPage(hash: string) {
    if (window.location.hash.length === 0) {
      window.location.hash = `#${Pages.Main}`;
    }

    if (hash.includes(Pages.ProductDetails)) {
      this.currentPage = new ProductDetailsPage(Container, hash);
    }

    switch (hash) {
      case Pages.Main:
        this.currentPage = new MainPage(Container);
        break;

      case Pages.Cart:
        this.currentPage = new CartPage(Container);
        break;
    }
  }
}

export default Router;
