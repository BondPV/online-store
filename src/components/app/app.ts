import { IdMap } from 'constants/htmlConstants';
import ProductsDB from 'database/ProductsDB';
import Catalog from 'components/main/catalog/Catalog';
import Filters from 'components/main/sortBar/filters/Filters';
import { FiltersName } from 'types/enums';

class App {
  public start() {
    const catalogDataBase = ProductsDB.getProducts();

    Catalog.render(catalogDataBase);

    const filtersContainer = document.querySelector(IdMap.valueFilters);

    if (filtersContainer instanceof HTMLElement) {
      const filterCategory = new Filters(FiltersName.Category);
      filterCategory.appendFilterList(filtersContainer);

      const filterBrand = new Filters(FiltersName.Brand);
      filterBrand.appendFilterList(filtersContainer);
    }

    const filtersRangeContainer = document.querySelector(IdMap.rangeFilters);

    if (filtersRangeContainer instanceof HTMLElement) {
      const filterPrice = new Filters(FiltersName.Price);
      filterPrice.appendFilterRange(filtersRangeContainer, '$');

      const filterStock = new Filters(FiltersName.Stock);
      filterStock.appendFilterRange(filtersRangeContainer, '');
    }
  }
}

export default App;
