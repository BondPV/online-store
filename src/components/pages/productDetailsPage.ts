import ProductsDB from 'database/ProductsDB';
import { IProduct } from 'types/interfaces';

class ProductDetailsPage {
  container: HTMLElement;

  private productsDB = new ProductsDB();

  hash: string;

  constructor(container: HTMLElement, hash: string) {
    this.container = container;
    this.hash = hash;
    this.renderPage(this.hash);
  }

  renderPage(hash: string) {
    const hashId = Number(hash.split('/').at(-1));
    const products: IProduct[] = this.productsDB.getProducts();
    const productItem = products.find((elem) => elem.id === hashId);

    if (productItem) {
      this.container.innerHTML = productItem.title;
    } else {
      this.container.innerHTML = 'Товар не найден';
    }
  }

  removePage() {
    this.container.innerHTML = '';
  }
}

export default ProductDetailsPage;
