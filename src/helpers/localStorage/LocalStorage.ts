import { FiltersValueType, FiltersRangeType, FiltersDataType } from 'types/types';

class LocalStorage {
  public static savedFilters: FiltersDataType = JSON.parse(localStorage.getItem('filters') as string);

  //* update filters
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
}

export default LocalStorage;
