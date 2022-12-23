import { FiltersValueType, FiltersRangeType, FiltersDataType } from 'types/types';

class LocalStorage {
  //* update local storage filters
  static controlFilter(filterName: FiltersValueType, elementValue: string): void {
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

  static controlSlider(filterName: FiltersRangeType, rangeValue: number[]): void {
    const savedFilters: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);
    savedFilters.filtersRange[filterName] = rangeValue;
    localStorage.setItem('filters', JSON.stringify(savedFilters));
  }

  static setItems() {
    localStorage.setItem(
      'filters',
      JSON.stringify(<FiltersDataType>{
        filtersValue: { brand: [], category: [] },
        filtersRange: { price: [], stock: [] },
      })
    );
  }
}

export default LocalStorage;
