import './grid.scss';

class Grid {
  public changeGridList(): void {
    const catalogView = document.querySelector('.catalog');
    if (catalogView) {
      catalogView.classList.add('catalog_list');
    }
  }

  public changeGridTable(): void {
    const catalogView = document.querySelector('.catalog');
    if (catalogView) {
      catalogView.classList.remove('catalog_list');
    }
  }

  render(): void {
    const catalogHeader = document.querySelector('.catalog__header');

    if (!catalogHeader) {
      return;
    }

    const viewButtonTable: HTMLDivElement = document.createElement('div');
    viewButtonTable.classList.add('catalog__view', 'catalog__view-table');
    catalogHeader.append(viewButtonTable);

    const iconButtonTable: HTMLElement = document.createElement('i');
    iconButtonTable.classList.add('fa-solid', 'fa-table-cells');
    viewButtonTable.append(iconButtonTable);

    const viewButtonList: HTMLDivElement = document.createElement('div');
    viewButtonList.classList.add('catalog__view', 'catalog__view-list');
    catalogHeader.append(viewButtonList);

    const iconButtonList: HTMLElement = document.createElement('i');
    iconButtonList.classList.add('fa-solid', 'fa-list');
    viewButtonList.append(iconButtonList);

    viewButtonList.addEventListener('click', () => this.changeGridList());
    viewButtonTable.addEventListener('click', () => this.changeGridTable());
  }
}

export default Grid;
