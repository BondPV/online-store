import ProductsDB from 'database/ProductsDB';
import Product from 'components/main/product/Product';
import { IProduct } from 'types/interfaces';
import Catalog from 'components/main/catalog/Catalog';
import Grid from 'components/main/sortCatalog/grid/Grid';
import './sortCatalog.scss';

class SortCatalog {
  private products: IProduct[] = [];

  constructor(private catalog: Catalog, private grid: Grid) {
    this.initProducts();
  }

  initProducts() {
    this.products = ProductsDB.getProducts();
  }

  appendSortWrap(patentElement: Element): void {
    const catalogHeader: HTMLElement = document.createElement('div');
    catalogHeader.classList.add('catalog__header');
    patentElement.prepend(catalogHeader);

    // sort
    const selectSortButton: HTMLSelectElement = document.createElement('select');
    catalogHeader.append(selectSortButton);

    selectSortButton.addEventListener('change', () => {
      const currentOptionValue = selectSortButton.options[selectSortButton.selectedIndex];
      currentOptionValue.selected = true;
      this.sortCatalog();
      const oldCatalog = document.querySelector('.catalog');
      if (oldCatalog && oldCatalog.parentNode) {
        oldCatalog.parentNode.removeChild(oldCatalog);
      }
      const main = document.querySelector('.catalog-products');
      if (main && main instanceof HTMLElement) {
        main.innerHTML = this.render();
      }
      //  remove old catalog
      //  this.render();
    });

    const optionNames = ['Name ASC', 'Name DESC', 'Price ASC', 'Price DESC', 'Rating ASC', 'Rating DESC'];

    optionNames.forEach((item) => {
      this.createOptionsSort(item, selectSortButton);
    });

    // grid view

    const viewButtonTable: HTMLDivElement = document.createElement('div');
    viewButtonTable.classList.add('catalog__view', 'catalog__view-table');
    catalogHeader.append(viewButtonTable);

    const iconButtonTable: HTMLElement = document.createElement('i');
    iconButtonTable.classList.add('fa-solid', 'fa-table-cells');
    viewButtonTable.append(iconButtonTable);

    const viewButtonList: HTMLDivElement = document.createElement('div');
    viewButtonList.classList.add('catalog__view', 'catalog__view-list');
    catalogHeader.append(viewButtonList);

    const iconButtonList: HTMLElement = document.createElement('i');
    iconButtonList.classList.add('fa-solid', 'fa-list');
    viewButtonList.append(iconButtonList);

    viewButtonList.addEventListener('click', this.grid.showGridTable);
    viewButtonTable.addEventListener('click', this.grid.showGridTable);
  }

  sortCatalog() {
    this.products = this.products.sort((a, b) => (a.price < b.price ? -1 : 1));
  }

  createOptionsSort(optionName: string, parentElem: HTMLSelectElement) {
    const optionSort: HTMLOptionElement = document.createElement('option');
    optionSort.textContent = optionName;
    optionSort.value = optionName;
    parentElem.append(optionSort);
  }

  render() {
    const products: string = this.products
      .map((product) => new Product(product))
      .map((product) => product.render())
      .join('');

    const catalogSort = document.querySelector('.catalog-sort');
    if (catalogSort) {
      this.appendSortWrap(catalogSort);
    }

    return `
   <div class="catalog">${products}</div>
    `;
  }
}

export default SortCatalog;
