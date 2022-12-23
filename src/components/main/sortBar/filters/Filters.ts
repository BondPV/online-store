import './filters.scss';
import {
  FiltersValueType,
  FiltersValueDataType,
  FiltersRangeType,
  FiltersRangeDataType,
  FiltersDataType,
} from 'types/types';
import { IProduct } from 'types/interfaces';
import Catalog from 'components/main/catalog/Catalog';
import ProductsDB from 'database/ProductsDB';
import RangeSliderControl from 'components/main/sortBar/filters/rangeSliderControl/RangeSliderControl';
import { FiltersName } from 'types/enums';
import LocalStorage from 'helpers/localStorage/LocalStarage';

class Filters {
  static currentCatalog: IProduct[];

  private filterName: FiltersValueType | FiltersRangeType;

  constructor(filterName: FiltersValueType | FiltersRangeType) {
    Filters.currentCatalog = [];
    this.filterName = filterName;
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

    ProductsDB.products.forEach((el) => {
      if (this.filterName === FiltersName.Category) {
        setElements.add(el.category);
      }
      if (this.filterName === FiltersName.Brand) {
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
      LocalStorage.controlFilter(this.filterName as FiltersValueType, elementValue);
      Filters.filterProducts();
    });
    return element;
  }

  initialFilter(): void {
    if (!localStorage.getItem('filters')) {
      LocalStorage.setItems();
    } else {
      Filters.filterProducts();
    }
  }

  //* render Catalog
  static filterProducts(): void {
    const savedFilters: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);
    const filterValue: FiltersValueDataType = savedFilters.filtersValue;
    const filterRange: FiltersRangeDataType = savedFilters.filtersRange;

    let filteredCatalog: IProduct[] = this.filterValueProducts(ProductsDB.products.slice(), filterValue);
    filteredCatalog = this.filterRangeProducts(filteredCatalog, filterRange);

    Filters.currentCatalog = filteredCatalog;
    Catalog.render(filteredCatalog);
  }

  //* Value filter
  static filterValueProducts(filteredProducts: IProduct[], filterValue: FiltersValueDataType): IProduct[] {
    let newProducts: IProduct[] = filteredProducts;
    let isEmptyFilters = true;

    for (const key in filterValue) {
      if (filterValue[key as FiltersValueType]?.length) {
        newProducts = this.filterByValue(filterValue[key as FiltersValueType], newProducts, key as FiltersValueType);
        isEmptyFilters = false;
      }
    }
    return isEmptyFilters ? ProductsDB.products.slice() : newProducts;
  }

  static filterByValue(filterValues: string[], items: IProduct[], filterName: FiltersValueType): IProduct[] {
    return items.filter((item) => filterValues.find((filterValue) => item[filterName] === filterValue));
  }

  //* Range filters
  appendFilterRange(parentElement: HTMLElement, char: string): void {
    const filterTitle: HTMLParagraphElement = document.createElement('p');
    filterTitle.classList.add('range-filters__title');
    filterTitle.textContent = `${this.filterName[0].toUpperCase() + this.filterName.slice(1)}`;

    parentElement.append(filterTitle, this.valueFilterRange(char));
    this.initialFilter();
  }

  valueFilterRange(char: string): HTMLDivElement {
    const element = document.createElement('div');
    element.classList.add('range-filters__filter');

    if (this.filterName === FiltersName.Price) {
      const priceValue: number[] = [];

      ProductsDB.products.forEach((el) => priceValue.push(el.price));

      const minValue = Math.floor(Math.min(...priceValue));
      const maxValue = Math.ceil(Math.max(...priceValue));

      const priceRange = new RangeSliderControl(element, minValue, maxValue, char);

      priceRange.eventListener(this.filterName);
    }

    if (this.filterName === FiltersName.Stock) {
      const stockValue: number[] = [];

      ProductsDB.products.forEach((el) => stockValue.push(el.stock));

      const minValue = Math.floor(Math.min(...stockValue));
      const maxValue = Math.ceil(Math.max(...stockValue));

      const stockRange = new RangeSliderControl(element, minValue, maxValue, char);

      stockRange.eventListener(this.filterName);
      Filters.filterProducts();
    }

    return element;
  }

  static filterRangeProducts(filteredProducts: IProduct[], filterRange: FiltersRangeDataType): IProduct[] {
    let newProducts: IProduct[] = filteredProducts;
    let isEmptyFilters = true;

    for (const key in filterRange) {
      if (filterRange[key as FiltersRangeType]?.length) {
        newProducts = this.filterByRangeFilter(
          filterRange[key as FiltersRangeType],
          newProducts,
          key as FiltersRangeType
        );
        isEmptyFilters = false;
      }
    }
    return isEmptyFilters ? filteredProducts : newProducts;
  }

  static filterByRangeFilter(filterRange: number[], items: IProduct[], filterName: FiltersRangeType): IProduct[] {
    return items.filter((item) => item[filterName] >= filterRange[0] && item[filterName] <= filterRange[1]);
  }
}

export default Filters;
