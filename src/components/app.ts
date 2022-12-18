import Catalog from './main/catalog/Catalog';

class App {
  private catalog = new Catalog();

  public start() {
    return `
      <h1>Online Store</h1>
      <div>
        ${this.catalog.render()}
      </div>
      `;
  }
}

export default App;
