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

  render() {
    const filtersContainer = document.querySelector(IdMap.valueFilters);

    if (filtersContainer instanceof HTMLElement) {
      const filterCategory = new Filters(FiltersName.Category, this.catalog, this.sortCatalog, this.productsDB);
      filterCategory.appendFilterList(filtersContainer);

      const filterBrand = new Filters(FiltersName.Brand, this.catalog, this.sortCatalog, this.productsDB);
      filterBrand.appendFilterList(filtersContainer);
    }

    const filtersRangeContainer = document.querySelector(IdMap.rangeFilters);

    if (filtersRangeContainer instanceof HTMLElement) {
      const filterPrice = new Filters(FiltersName.Price, this.catalog, this.sortCatalog, this.productsDB);
      filterPrice.appendFilterRange(filtersRangeContainer, '$');

      const filterStock = new Filters(FiltersName.Stock, this.catalog, this.sortCatalog, this.productsDB);
      filterStock.appendFilterRange(filtersRangeContainer, '');
    }
  }
}

export default FilterCatalog;
