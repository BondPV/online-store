import { IdMap } from 'constants/htmlConstants';
import { FiltersName } from 'types/enums';
import Filters from 'components/main/sortBar/filters/Filters';
import Catalog from 'components/main/catalog/Catalog';
import ProductsDB from 'database/ProductsDB';
import SortCatalog from 'components/main/sortCatalog/SortCatalog';

class FilterCatalog {
  constructor(
    private catalog: Catalog,

    private sortCatalog: SortCatalog,

    private productsDB: ProductsDB,
  ) {}

  resetButtonContainer = document.querySelector(IdMap.resetButton) as HTMLElement;

  filtersContainer = document.querySelector(IdMap.valueFilters) as HTMLElement;

  filtersRangeContainer = document.querySelector(IdMap.rangeFilters) as HTMLElement;

  render() {
    const filterCategory = new Filters(FiltersName.Category, this.catalog, this.sortCatalog, this.productsDB);
    filterCategory.appendFilterList(this.filtersContainer);
    filterCategory.resetFiltersSettings();

    const filterBrand = new Filters(FiltersName.Brand, this.catalog, this.sortCatalog, this.productsDB);
    filterBrand.appendFilterList(this.filtersContainer);

    const filterPrice = new Filters(FiltersName.Price, this.catalog, this.sortCatalog, this.productsDB);
    filterPrice.appendFilterRange(this.filtersRangeContainer, '$');

    const filterStock = new Filters(FiltersName.Stock, this.catalog, this.sortCatalog, this.productsDB);
    filterStock.appendFilterRange(this.filtersRangeContainer, '');
  }

  clear() {
    this.resetButtonContainer.innerHTML = '';
    this.filtersContainer.innerHTML = '';
    this.filtersRangeContainer.innerHTML = '';
  }
}

export default FilterCatalog;
