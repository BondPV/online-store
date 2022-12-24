import ProductsDB from 'database/ProductsDB';
import Catalog from 'components/main/catalog/Catalog';
import SortCatalog from 'components/main/sortCatalog/SortCatalog';
import Grid from 'components/main/grid/Grid';
import FilterCatalog from 'components/main/sortBar/FilterCatalog';

class App {
  private productsDB = new ProductsDB();

  private catalog = new Catalog(this.productsDB.getProducts());

  private sortCatalog = new SortCatalog(this.catalog);

  private filterCatalog = new FilterCatalog(this.catalog, this.sortCatalog, this.productsDB);

  private grid = new Grid();

  public start() {
    this.grid.render();
    this.sortCatalog.render();
    this.filterCatalog.render();
  }
}

export default App;
