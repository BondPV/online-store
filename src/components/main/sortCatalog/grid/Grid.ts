import './grid.scss';

class Grid {
  catalogView = document.querySelector('.catalog');

  productCard = document.querySelector('.product');

  public showGridList() {
    if (this.catalogView && this.productCard) {
      this.catalogView.classList.add('catalog_list');
      this.productCard.classList.add('product_list');
    }
  }

  public showGridTable() {
    if (this.catalogView && this.productCard) {
      this.catalogView.classList.remove('catalog_list');
      this.productCard.classList.remove('product_list');
    }
  }
}

export default Grid;
