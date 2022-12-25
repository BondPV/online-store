import './filters.scss';
import {
  FiltersValueType,
  FiltersValueDataType,
  FiltersRangeType,
  FiltersRangeDataType,
  FiltersDataType,
} from 'types/types';
import { IProduct, IQuantity } from 'types/interfaces';
import Catalog from 'components/main/catalog/Catalog';
import ProductsDB from 'database/ProductsDB';
import RangeSliderControl from 'components/main/sortBar/filters/rangeSliderControl/RangeSliderControl';
import { FiltersName } from 'types/enums';
import LocalStorage from 'helpers/localStorage/LocalStarage';
import SortCatalog from 'components/main/sortCatalog/SortCatalog';

class Filters {
  private currentCatalog: IProduct[];

  constructor(
    private readonly filterName: FiltersValueType | FiltersRangeType,

    private readonly catalog: Catalog,

    private readonly sortCatalog: SortCatalog,

    private readonly productsDB: ProductsDB,
  ) {
    this.currentCatalog = [];
    this.filterName = filterName;
    this.initialFilter();
  }

  //* append HTML elements to the parentElement
  public appendFilterList(parentElement: HTMLElement): void {
    const filterTitle: HTMLParagraphElement = document.createElement('p');

    filterTitle.classList.add('value-filters__title');
    filterTitle.textContent = `${this.filterName[0].toUpperCase() + this.filterName.slice(1)}`;

    parentElement.append(filterTitle, this.valueFilterList());

    this.initialFilter();
  }

  valueFilterList(): HTMLElement {
    const valueFilterList = document.createElement('div');
    valueFilterList.classList.add('value-filters__list');

    const setElements: Set<string> = new Set();

    this.productsDB.getProducts().forEach((el) => {
      if (this.filterName === FiltersName.Category) {
        setElements.add(el.category);
      }
      if (this.filterName === FiltersName.Brand) {
        setElements.add(el.brand);
      }
    });

    setElements.forEach((el) => {
      const elQuantity = this.getProductsQuantity(el);
      const elementValue = this.valueFilterListElement(el, elQuantity);
      valueFilterList.append(elementValue);
    });
    return valueFilterList;
  }

  valueFilterListElement(elementValue: string, elementQuantity: IQuantity): HTMLElement {
    const element = document.createElement('div');
    element.classList.add('value-filters__list-element');

    const elementLabel = document.createElement('label');
    elementLabel.classList.add('value-filters__element-label');
    element.append(elementLabel);

    const elementInput = document.createElement('input');
    elementInput.classList.add('value-filters__element-input');
    elementLabel.innerText = elementValue;
    elementInput.setAttribute('type', 'checkbox');
    elementLabel.prepend(elementInput);

    const elementCountAll = document.createElement('span');
    elementCountAll.classList.add('value-filters__count-all');
    elementCountAll.innerText = `${elementQuantity.current}/${elementQuantity.total}`;
    element.append(elementCountAll);

    this.checkActiveElement(elementValue, elementInput);

    elementInput.addEventListener('click', () => {
      LocalStorage.controlFilter(this.filterName as FiltersValueType, elementValue);
      this.filterProducts();
    });
    return element;
  }

  private initialFilter(): void {
    if (!localStorage.getItem('filters')) {
      LocalStorage.setItems();
    } else {
      this.filterProducts();
    }
  }

  //* render Catalog
  public filterProducts(): void {
    const savedFilters: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);
    const filterValue: FiltersValueDataType = savedFilters.filtersValue;
    const filterRange: FiltersRangeDataType = savedFilters.filtersRange;

    let filteredCatalog: IProduct[] = this.filterValueProducts(this.productsDB.getProducts().slice(), filterValue);
    filteredCatalog = this.filterRangeProducts(filteredCatalog, filterRange);

    this.currentCatalog = filteredCatalog;
    this.catalog.products = filteredCatalog;
    this.sortCatalog.selectOrder();
    this.catalog.render();
  }

  //* Value filter
  private filterValueProducts(filteredProducts: IProduct[], filterValue: FiltersValueDataType): IProduct[] {
    let newProducts: IProduct[] = filteredProducts;
    let isEmptyFilters = true;

    for (const key in filterValue) {
      if (filterValue[key as FiltersValueType]?.length) {
        newProducts = this.filterByValue(filterValue[key as FiltersValueType], newProducts, key as FiltersValueType);
        isEmptyFilters = false;
      }
    }
    return isEmptyFilters ? this.productsDB.getProducts().slice() : newProducts;
  }

  private filterByValue(filterValues: string[], items: IProduct[], filterName: FiltersValueType): IProduct[] {
    return items.filter((item) => filterValues.find((filterValue) => item[filterName] === filterValue));
  }

  //* Range filters
  public appendFilterRange(parentElement: HTMLElement, char: string): void {
    const filterTitle: HTMLParagraphElement = document.createElement('p');
    filterTitle.classList.add('range-filters__title');
    filterTitle.textContent = `${this.filterName[0].toUpperCase() + this.filterName.slice(1)}`;

    parentElement.append(filterTitle, this.valueFilterRange(char));
    this.initialFilter();
  }

  private valueFilterRange(char: string): HTMLDivElement {
    const element = document.createElement('div');
    element.classList.add('range-filters__filter');

    if (this.filterName === FiltersName.Price) {
      const priceValue: number[] = [];

      this.productsDB.getProducts().forEach((el) => priceValue.push(el.price));

      const minValue = Math.floor(Math.min(...priceValue));
      const maxValue = Math.ceil(Math.max(...priceValue));

      const priceRange = new RangeSliderControl(element, minValue, maxValue, char, this);

      priceRange.eventListener(this.filterName);
    }

    if (this.filterName === FiltersName.Stock) {
      const stockValue: number[] = [];

      this.productsDB.getProducts().forEach((el) => stockValue.push(el.stock));

      const minValue = Math.floor(Math.min(...stockValue));
      const maxValue = Math.ceil(Math.max(...stockValue));

      const stockRange = new RangeSliderControl(element, minValue, maxValue, char, this);

      stockRange.eventListener(this.filterName);
      this.filterProducts();
    }

    return element;
  }

  private filterRangeProducts(filteredProducts: IProduct[], filterRange: FiltersRangeDataType): IProduct[] {
    let newProducts: IProduct[] = filteredProducts;
    let isEmptyFilters = true;

    for (const key in filterRange) {
      if (filterRange[key as FiltersRangeType]?.length) {
        newProducts = this.filterByRangeFilter(
          filterRange[key as FiltersRangeType],
          newProducts,
          key as FiltersRangeType,
        );
        isEmptyFilters = false;
      }
    }
    return isEmptyFilters ? filteredProducts : newProducts;
  }

  private filterByRangeFilter(filterRange: number[], items: IProduct[], filterName: FiltersRangeType): IProduct[] {
    return items.filter((item) => item[filterName] >= filterRange[0] && item[filterName] <= filterRange[1]);
  }

  // check for activity on saved from Local Storage
  checkActiveElement(elementValue: string, element: HTMLInputElement): void {
    const filteredCatalog = LocalStorage.savedFilters.filtersValue[this.filterName as FiltersValueType];

    if (filteredCatalog.includes(elementValue)) {
      element.checked = true;
    }
  }

  getProductsQuantity(elementValue: string): IQuantity {
    const productsAll = this.productsDB.getProducts();
    const productsCurrent = this.currentCatalog;
    let total = 0;
    let current = 0;

    productsAll.forEach((elem) => {
      for (const key in elem) {
        if (elem[key as FiltersValueType] === elementValue) {
          total += 1;
        }
      }
    });

    productsCurrent.forEach((elem) => {
      for (const key in elem) {
        if (elem[key as FiltersValueType] === elementValue) {
          current += 1;
        }
      }
    });

    const quantity: IQuantity = { current, total };

    return quantity;
  }
}

export default Filters;
