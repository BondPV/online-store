import ProductsDB from 'database/ProductsDB';
import Catalog from 'components/main/catalog/Catalog';
import SortCatalog from 'components/main/sortCatalog/SortCatalog';
import Grid from 'components/main/grid/Grid';
import FilterCatalog from 'components/main/sortBar/FilterCatalog';

class MainPage {
  private productsDB = new ProductsDB();

  private catalog = new Catalog(this.productsDB.getProducts());

  private sortCatalog = new SortCatalog(this.catalog);

  private filterCatalog = new FilterCatalog(this.catalog, this.sortCatalog, this.productsDB);

  private grid = new Grid();

  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.renderPage();
    this.sortCatalog.render();
    this.grid.render();
    this.filterCatalog.render();
  }

  renderPage() {
    const filtersBar: HTMLElement = document.createElement('section');
    filtersBar.classList.add('filter-bar');
    this.container.append(filtersBar);

    const filtersBarTitle: HTMLElement = document.createElement('h2');
    filtersBarTitle.classList.add('filter-bar__titel');
    filtersBarTitle.innerText = 'Filters';
    filtersBar.prepend(filtersBarTitle);

    const resetBtn: HTMLElement = document.createElement('div');
    resetBtn.classList.add('reset-btn');
    resetBtn.id = 'reset-button';
    filtersBar.append(resetBtn);

    const valueFilters: HTMLDivElement = document.createElement('div');
    valueFilters.classList.add('value-filters');
    valueFilters.id = 'value-filters';
    filtersBar.append(valueFilters);

    const rangeFilters: HTMLDivElement = document.createElement('div');
    rangeFilters.classList.add('range-filters');
    rangeFilters.id = 'range-filters';
    filtersBar.append(rangeFilters);

    const catalog: HTMLElement = document.createElement('section');
    catalog.classList.add('catalog-wrap');
    this.container.append(catalog);

    const catalogHeader: HTMLDivElement = document.createElement('div');
    catalogHeader.classList.add('catalog__header');
    catalog.append(catalogHeader);

    const catalogBody: HTMLDivElement = document.createElement('div');
    catalogBody.classList.add('catalog');
    catalogBody.id = 'catalog';
    catalog.append(catalogBody);

    const catalogQuantity: HTMLDivElement = document.createElement('div');
    catalogQuantity.classList.add('catalog__quantity');
    catalogHeader.append(catalogQuantity);
  }

  removePage() {
    this.container.innerHTML = '';
  }
}

export default MainPage;
