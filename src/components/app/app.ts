import ProductsList from '../view/productsList/productsList';

class App {
  private productsList = new ProductsList();

  public start() {
    return `
      <h1>Online Store</h1>
      <div>
        ${this.productsList.render()}
      </div>
      `;
  }
}

export default App;
