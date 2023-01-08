import { HashDataType, FiltersValueType, FiltersRangeType } from 'types/types';
import { FiltersName, Symbol } from 'types/enums';

class UrlHash {
  static hashData: HashDataType = {
    filtersValue: {
      category: [],
      brand: [],
    },
    filtersRange: {
      price: [],
      stock: [],
    },
    search: '',
    sort: '',
    view: '',
  };

  static setUrlHash(hashData: HashDataType) {
    const category = `category=${hashData.filtersValue.category.join(Symbol.Plus)}`;
    const brand = `brand=${hashData.filtersValue.brand.join(Symbol.Plus)}`;
    const price = `price=${hashData.filtersRange.price.join(Symbol.Plus)}`;
    const stock = `stock=${hashData.filtersRange.stock.join(Symbol.Plus)}`;
    const search = `search=${hashData.search}`;
    const sort = `sort=${hashData.sort}`;
    const view = `view=${hashData.view}`;

    window.location.hash = `?${category}&${brand}&${price}&${stock}&${search}&${sort}&${view}`;
  }

  static getHashData(hash: string): HashDataType {
    const hashData = this.hashData;
    const urlHashArray: string[] = hash.slice(1).split(Symbol.Ampersand);

    for (let i = 0; i < urlHashArray.length; i++) {
      const [paramName, paramValue] = urlHashArray[i].split(Symbol.Equality);

      if ((paramName === FiltersName.Category || paramName === FiltersName.Brand) && paramValue.length > 0) {
        hashData.filtersValue[paramName] = paramValue.split(Symbol.Plus);
        hashData.filtersValue = hashData.filtersValue;
      }

      if ((paramName === FiltersName.Price || paramName === FiltersName.Stock) && paramValue.length > 0) {
        hashData.filtersRange[paramName] = paramValue.split(Symbol.Plus).map((el) => Number(el));
        hashData.filtersRange = hashData.filtersRange;
      }

      if (paramName === FiltersName.Search || paramName === FiltersName.Sort || paramName === FiltersName.View) {
        hashData[paramName] = paramValue;
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

  public static getUrlHashParam(param: FiltersName.Sort | FiltersName.Search | FiltersName.View): string {
    const currentHash = decodeURI(window.location.hash).slice(2);
    this.getHashData(currentHash);
    return this.hashData[param];
  }

  public static setUrlHashParam(param: FiltersName.Sort | FiltersName.Search | FiltersName.View, value: string): void {
    this.hashData[param] = value;

    if (param !== FiltersName.Sort || (param === FiltersName.Sort && value !== '')) {
      this.setUrlHash(this.hashData);
    }
  }

  static clearHash() {
    window.location.hash = '#main';
    this.hashData = {
      filtersValue: {
        category: [],
        brand: [],
      },
      filtersRange: {
        price: [],
        stock: [],
      },
      search: '',
      sort: '',
      view: '',
    };
  }
}

export default UrlHash;
