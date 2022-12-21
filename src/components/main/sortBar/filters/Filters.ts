import './filters.scss';
import { FiltersValueType, FiltersValueDataType, FiltersDataType } from 'types/types';

import { IProduct } from 'types/interfaces';

import Catalog from 'components/main/catalog/Catalog';

import ProductsDB from 'database/ProductsDB';

class Filters {
  static currentCatalog: IProduct[];
  private filterName: FiltersValueType;
  private readonly products: IProduct[];

  constructor(filterName: FiltersValueType) {
    this.filterName = filterName;
    this.products = ProductsDB.getProducts();
    this.initialFilter();
  }

  //* append HTML elements to the parentElement
  appendFilterList(parentElement: HTMLElement): void {
    const filterTitle: HTMLParagraphElement = document.createElement('p');

    filterTitle.classList.add('value-filters__title');
    filterTitle.textContent = `${this.filterName[0].toUpperCase() + this.filterName.slice(1)}`;

    parentElement.append(filterTitle, this.valueFilterList());

    this.initialFilter();
  }

  valueFilterList(): HTMLUListElement {
    const valueFilterList = document.createElement('ul');
    valueFilterList.classList.add('value-filters__list');

    const setElements: Set<string> = new Set();
    this.products.forEach((el) => {
      if (this.filterName === 'category') {
        setElements.add(el.category);
      }
      if (this.filterName === 'brand') {
        setElements.add(el.brand);
      }
    });
    setElements.forEach((el) => {
      const elementValue = this.valueFilterListElement(el);
      valueFilterList.append(elementValue);
    });
    return valueFilterList;
  }

  valueFilterListElement(elementValue: string): HTMLLIElement {
    const element = document.createElement('li');
    element.classList.add('value-filters__list-element');
    element.append(elementValue);

    element.addEventListener('click', () => {
      element.classList.toggle('value-filters__list-element_active');
      this.controlLocalStorageFilter(this.filterName, elementValue);
      this.filterProducts();
    });
    return element;
  }

  //* initial Filters
  initialFilter(): void {
    if (!localStorage.getItem('filters')) {
      localStorage.setItem(
        'filters',
        JSON.stringify(<FiltersDataType>{
          filtersValue: { brand: [], category: [] },
        })
      );
    } else {
      this.filterProducts();
    }
  }

  //* render Catalog
  filterProducts(): void {
    const savedFilters: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);
    const filterValue: FiltersValueDataType = savedFilters.filtersValue;

    const filteredCatalog: IProduct[] = this.filterValueProducts(this.products.slice(), filterValue);

    Filters.currentCatalog = filteredCatalog;
    Catalog.render(filteredCatalog);
  }

  //* update local storage filters
  controlLocalStorageFilter(filterName: FiltersValueType, elementValue: string): void {
    const savedFilters: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);
    let filteredCatalog = savedFilters.filtersValue[filterName];

    if (filteredCatalog.includes(elementValue)) {
      filteredCatalog = filteredCatalog.filter((el: string) => el !== elementValue);
    } else {
      filteredCatalog.push(elementValue);
    }
    savedFilters.filtersValue[filterName] = filteredCatalog;
    localStorage.setItem('filters', JSON.stringify(savedFilters));
  }

  //* Value filter
  filterValueProducts(filteredProducts: IProduct[], filterValue: FiltersValueDataType): IProduct[] {
    let newProducts: IProduct[] = filteredProducts;
    let isEmptyFilters = true;
    for (const key in filterValue) {
      if (filterValue[key as FiltersValueType]?.length) {
        newProducts = this.filterByValue(filterValue[key as FiltersValueType], newProducts, key as FiltersValueType);
        isEmptyFilters = false;
      }
    }
    return isEmptyFilters ? this.products.slice() : newProducts;
  }

  filterByValue(
    filterValues: string[],
    items: IProduct[],
    filterName: FiltersValueType // brand, categotry
  ): IProduct[] {
    let filteredProducts: IProduct[] = items;
    filteredProducts = filteredProducts.filter((item) =>
      filterValues.find((filterValue) => item[filterName] === filterValue)
    );
    return filteredProducts;
  }
}

export default Filters;
