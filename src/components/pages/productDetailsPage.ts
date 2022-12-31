import ProductsDB from 'database/ProductsDB';
import { IProduct } from 'types/interfaces';

class ProductDetailsPage {
  container: HTMLElement;

  hash: string;

  constructor(container: HTMLElement, hash: string, private productsDB = new ProductsDB()) {
    this.container = container;
    this.hash = hash;
    this.renderPage(this.hash);
  }

  public renderPage(hash: string): void {
    const hashId = Number(hash.split('/').at(-1));
    const products: IProduct[] = this.productsDB.getProducts();
    const productItem = products.find((elem) => elem.id === hashId);

    if (productItem) {
      this.container.innerHTML = productItem.title;
    } else {
      this.container.innerHTML = 'Товар не найден';
    }
  }

  public removePage(): void {
    this.container.innerHTML = '';
  }
}

export default ProductDetailsPage;
