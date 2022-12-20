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


  static render(catalog: IProduct[]) {
    const parentElement = document.querySelector(IdMap.catalog);
    const products: string = catalog
      .map((product) => new Product(product))
      .map((product) => product.render())
      .join('');

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
