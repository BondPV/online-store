import ProductsDB from 'database/ProductsDB';
import ProductDetails from 'components/main/productDetails/ProductDetails';

class ProductDetailsPage {
  container: HTMLElement;

  hash: string;

  constructor(container: HTMLElement, hash: string, private products = new ProductsDB().getProducts()) {
    this.container = container;
    this.hash = hash;
    this.renderPage();
  }

  public renderPage(): void {
    const hashId = Number(this.hash.split('/').at(-1));
    const productItem = this.products.find((elem) => elem.id === hashId);

    const productDetailsContainer: HTMLElement = document.createElement('div');
    productDetailsContainer.classList.add('product-details');
    this.container.append(productDetailsContainer);

    if (productItem) {
      const productDetails = new ProductDetails(productItem);
      this.container.prepend(productDetails.renderHeader());
      productDetailsContainer.append(productDetails.renderDescription());
      productDetailsContainer.append(productDetails.renderGallery());
    } else {
      const productNotFound: HTMLElement = document.createElement('div');
      productNotFound.classList.add('product-details__notFound');
      productNotFound.innerText = 'Sorry. Product not found.';
      productDetailsContainer.append(productNotFound);
    }
  }

  public removePage(): void {
    this.container.innerHTML = '';
  }
}

export default ProductDetailsPage;
