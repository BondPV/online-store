import ProductsDB from 'database/ProductsDB';
import Catalog from 'components/main/catalog/Catalog';
import Filters from 'components/main/sortBar/filters/Filters';
import { FiltersNameEnum } from 'types/enums';

class App {
  public start() {
    const catalogDataBase = ProductsDB.getProducts();

    Catalog.render(catalogDataBase);

    const filtersContainer = document.querySelector('#value-filters');
    if (filtersContainer instanceof HTMLElement) {
      const filterCategory = new Filters(FiltersNameEnum.Category);
      filterCategory.appendFilterList(filtersContainer);

      const filterBrand = new Filters(FiltersNameEnum.Brand);
      filterBrand.appendFilterList(filtersContainer);
    }
  }
}

export default App;
