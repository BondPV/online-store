import { FiltersValueType, FiltersRangeType, FiltersDataType } from 'types/types';

class LocalStorage {
  static savedFilters: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);

  //* update local storage filters
  static controlFilter(filterName: FiltersValueType, elementValue: string): void {
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

  static controlSlider(filterName: FiltersRangeType, rangeValue: number[]): void {
    const savedFilters: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);
    savedFilters.filtersRange[filterName] = rangeValue;
    localStorage.setItem('filters', JSON.stringify(savedFilters));
  }

  static setItems() {
    const value = JSON.stringify(<FiltersDataType>{
      filtersValue: { brand: [], category: [] },
      filtersRange: { price: [], stock: [] },
    });
    localStorage.setItem('filters', value);
  }

  static clear() {
    localStorage.clear();
  }
}

export default LocalStorage;
