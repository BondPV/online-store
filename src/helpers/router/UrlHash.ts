import { HashDataType, FiltersValueType, FiltersRangeType } from 'types/types';
import { FiltersName } from 'types/enums';

class UrlHash {
  static hashData: HashDataType = {
    filtersValue: { category: [], brand: [] },
    filtersRange: { price: [], stock: [] },
    search: null,
    sort: '',
    view: '',
  };

  static setUrlHash(hashData: HashDataType) {
    const category = `category=${hashData.filtersValue.category.join('+')}`;
    const brand = `brand=${hashData.filtersValue.brand.join('+')}`;
    const price = `price=${hashData.filtersRange.price.join('+')}`;
    const stock = `stock=${hashData.filtersRange.stock.join('+')}`;
    const search = `search=${hashData.search}`;
    const sort = `sort=${hashData.sort}`;
    const view = `view=${hashData.view}`;

    window.location.hash = `?${category}&${brand}&${price}&${stock}&${search}&${sort}&${view}`;
  }

  static getHashData(hash: string): HashDataType {
    const hashData = this.hashData;
    const urlHashArray: string[] = hash.slice(1).split('&');

    for (let i = 0; i < urlHashArray.length; i++) {
      const param: string[] = urlHashArray[i].split('=');

      if ((param[0] === FiltersName.Category || param[0] === FiltersName.Brand) && param[1].length > 0) {
        hashData.filtersValue[param[0]] = param[1].split('+');
        hashData.filtersValue = hashData.filtersValue;
      }

      if ((param[0] === FiltersName.Price || param[0] === FiltersName.Stock) && param[1].length > 0) {
        hashData.filtersRange[param[0]] = param[1].split('+').map((el) => Number(el));
        hashData.filtersRange = hashData.filtersRange;
      }

      if (param[0] === FiltersName.Search || param[0] === FiltersName.Sort || param[0] === FiltersName.View) {
        hashData[param[0]] = param[1];
      }
    }
    this.hashData = hashData;

    return this.hashData;
  }

  public static controlFilter(filterName: FiltersValueType, elementValue: string): void {
    let savedfiltersValue = this.hashData.filtersValue[filterName];

    if (savedfiltersValue.includes(elementValue)) {
      savedfiltersValue = savedfiltersValue.filter((el: string) => el !== elementValue);
    } else {
      savedfiltersValue.push(elementValue);
    }

    this.hashData.filtersValue[filterName] = savedfiltersValue;
    this.setUrlHash(this.hashData);
  }

  public static controlSlider(filterName: FiltersRangeType, rangeValue: number[]): void {
    this.hashData.filtersRange[filterName] = rangeValue;
    this.setUrlHash(this.hashData);
  }

  public static getSort(): string | null {
    const currentHash = window.location.hash.slice(2);
    this.getHashData(currentHash);
    return this.hashData.sort;
  }

  public static setSort(currentOptionValue: string): void {
    this.hashData.sort = currentOptionValue;
    if (currentOptionValue !== '') {
      this.setUrlHash(this.hashData);
    }
  }

  public static getGridCatalog(): string {
    const currentHash = window.location.hash.slice(2);
    this.getHashData(currentHash);
    return this.hashData.view;
  }

  public static setGridCatalog(value: string): void {
    this.hashData.view = value;
    this.setUrlHash(this.hashData);
  }

  static clearHash() {
    window.location.hash = '#main';
    this.hashData = {
      filtersValue: { category: [], brand: [] },
      filtersRange: { price: [], stock: [] },
      search: null,
      sort: '',
      view: '',
    };
  }
}

export default UrlHash;
