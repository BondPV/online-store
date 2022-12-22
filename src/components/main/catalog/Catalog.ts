//  product catalog implementation

import { IdMap } from 'constants/htmlConstants';
import ProductsDB from 'database/ProductsDB';
import Product from 'components/main/product/Product';
import { IProduct } from 'types/interfaces';
import './catalog.scss';

class Catalog {
  private products: IProduct[] = [];

  constructor() {
    this.initProducts();
  }

  //  product database initialization
  initProducts() {
    this.products = ProductsDB.getProducts();
  }

  appendSortWrap(patentElement: Element): void  {
    const catalogHeader: HTMLElement = document.createElement('div');
    catalogHeader.classList.add('catalog__header');
    patentElement.prepend(catalogHeader);

    // sort
    const selectSortButton: HTMLSelectElement = document.createElement('select');
    catalogHeader.append(selectSortButton);

    selectSortButton.addEventListener('change', () => {
      console.log(selectSortButton.value);
      const currentOptionValue = selectSortButton.options[selectSortButton.selectedIndex];
      currentOptionValue.selected = true;
      this.sortCatalog();
      const oldCatalog = document.querySelector('.catalog');
      if (oldCatalog && oldCatalog.parentNode) {
        oldCatalog.parentNode.removeChild(oldCatalog);
      }
      const main = document.querySelector('.catalog-products');
      if (main && main instanceof HTMLElement) {
        main.innerHTML = this.render();;
      }
      //remove old catalog
      // this.render();
    })

    const optionNames = ['Name ASC', 'Name DESC', 'Price ASC', 'Price DESC', 'Rating ASC', 'Rating DESC'];

    optionNames.forEach((item) => {
      this.createOptionsSort(item, selectSortButton);
    })


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

    viewButtonList.addEventListener('click', () => {
      const catalogView = document.querySelector('.catalog');
      const productCard = document.querySelector('.product');
      if (catalogView && productCard) {
        catalogView.classList.add('catalog_list');
        productCard.classList.add('product_list');
      }
    })

    viewButtonTable.addEventListener('click', () => {
      const catalogView = document.querySelector('.catalog');
      const productCard = document.querySelector('.product');
      if (catalogView && productCard) {
        catalogView.classList.remove('catalog_list');
        productCard.classList.remove('product_list');
      }
    })
  }

  sortCatalog() {
    this.products = this.products.sort((prevValue, nextValue) => {
      return prevValue.price < nextValue.price ? -1 : 1;
    })
  }

  createOptionsSort(optionName: string, parentElem: HTMLSelectElement) {
    const optionSort: HTMLOptionElement = document.createElement('option');
    optionSort.textContent = optionName;
    optionSort.value = optionName;
    parentElem.append(optionSort);
  }

  static render(catalog: IProduct[]) {
    const parentElement = document.querySelector(IdMap.catalog);
    const products: string = catalog
      .map((product) => new Product(product))
      .map((product) => product.render())
      .join('');

    const catalogSort = document.querySelector('.catalog-sort');
    if(catalogSort) {
      this.appendSortWrap(catalogSort);
    }

    if (parentElement instanceof HTMLElement) {
      parentElement.innerHTML = products.length ? products : 'No products found';
    }
  }
  // render(sort = null) {
  //   let listProduct = this.products;
  //   if(sort) {
  //     // listProduct = this.sort(sort, listProduct);
  //   }
  //   const products: string = listProduct
  //     .map((product) => new Product(product))
  //     .map((product) => product.render())
  //     .join('');
  //   return `
  //   <div class="catalog__header">
  //       <div class="catalog__sort-wrap">Sort BY
  //         <select>
  //           <option>Name ASC</option>
  //           <option>Name DESC</option>
  //           <option>Price ASC</option>
  //           <option>Price DESC</option>
  //           <option>Rating ASC</option>
  //           <option>Rating DESC</option>
  //         </select>
  //       </div>
  //       <div class="catalog__view catalog__view-list">
  //         <i class="fa-solid fa-table-cells"></i>
  //       </div>
  //       <div class="catalog__view catalog__view-table">
  //         <i class="fa-solid fa-list"></i>
  //       </div>
  //   </div>
  //   <div class="catalog">
  //   ${products}</div>`;
  // }
}

export default Catalog;
