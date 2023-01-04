import { FiltersValueType, FiltersRangeType, FiltersDataType } from 'types/types';
import { ICartProduct } from 'types/interfaces';

class LocalStorage {
  public static savedFilters: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);

  //* update local storage filters
  public static controlFilter(filterName: FiltersValueType, elementValue: string): void {
    this.savedFilters = JSON.parse(localStorage.getItem('filters') as string);
    let filteredCatalog = this.savedFilters.filtersValue[filterName];

    if (filteredCatalog.includes(elementValue)) {
      filteredCatalog = filteredCatalog.filter((el: string) => el !== elementValue);
    } else {
      filteredCatalog.push(elementValue);
    }

    this.savedFilters.filtersValue[filterName] = filteredCatalog;
    localStorage.setItem('filters', JSON.stringify(this.savedFilters));
  }

  public static controlSlider(filterName: FiltersRangeType, rangeValue: number[]): void {
    const savedFilters: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);
    savedFilters.filtersRange[filterName] = rangeValue;
    localStorage.setItem('filters', JSON.stringify(savedFilters));
  }

  public static setItems() {
    const value = JSON.stringify(<FiltersDataType>{
      filtersValue: { brand: [], category: [] },
      filtersRange: { price: [], stock: [] },
    });

    localStorage.setItem('filters', value);
  }

  public static resetFilters() {
    localStorage.removeItem('filters');
    LocalStorage.setItems();
  }

  public static saveSort(name: string): void {
    localStorage.setItem('sort', name);
  }

  public static getSort(): string | null {
    return localStorage.getItem('sort');
  }

  public static saveGridCatalog(name: string): void {
    localStorage.setItem('grid', name);
  }

  public static getGridCatalog(): string | null {
    return localStorage.getItem('grid');
  }

  public static addProductToCart(product: ICartProduct): void {
    const cartStorage: ICartProduct[] = this.getCart();
    product.count = 1;
    cartStorage.push(product);
    localStorage.setItem('cart', JSON.stringify(cartStorage));
  }

  public static updateProductToCart(id: number, count: number): void {
    const cartProducts = this.getCart();
    cartProducts.forEach((item) => {
      if (item.id === id) {
        item.count = count;
      }
    });
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }

  public static removeProductFromCart(id: number): void {
    const cartArr = this.getCart();
    const filteredCart = cartArr.filter((product) => product.id !== id);
    localStorage.setItem('cart', JSON.stringify(filteredCart));
  }

  public static getCart(): ICartProduct[] {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
      return JSON.parse(cartString);
    }
    return [];
  }

  public static isProductExists(id: number): boolean {
    const cartArr = this.getCart();
    const currProduct = cartArr.find((product) => product.id === id);
    return !!currProduct;
  }
}

export default LocalStorage;
