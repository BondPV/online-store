import './grid.scss';
import { ClassListName, ClassMap } from 'constants/htmlConstants';

class Grid {
  public changeGridList(): void {
    const catalogView = document.querySelector(ClassMap.catalog);
    const catalogListIcon = document.querySelector(ClassMap.catalogViewList);
    const catalogTableIcon = document.querySelector(ClassMap.catalogViewTable);

    if (catalogView && catalogListIcon && catalogTableIcon) {
      catalogView.classList.add(ClassListName.catalogListView);
      catalogTableIcon.classList.remove(ClassListName.catalogViewActive);
      catalogListIcon.classList.add(ClassListName.catalogViewActive);
    }
  }

  public changeGridTable(): void {
    const catalogView = document.querySelector(ClassMap.catalog);
    const catalogListIcon = document.querySelector(ClassMap.catalogViewList);
    const catalogTableIcon = document.querySelector(ClassMap.catalogViewTable);

    if (catalogView && catalogListIcon && catalogTableIcon) {
      catalogView.classList.remove(ClassListName.catalogListView);
      catalogListIcon.classList.remove(ClassListName.catalogViewActive);
      catalogTableIcon.classList.add(ClassListName.catalogViewActive);
    }
  }

  render(): void {
    const catalogHeader = document.querySelector(ClassMap.catalogHeader);

    if (!catalogHeader) {
      return;
    }

    const viewButtonTable: HTMLDivElement = document.createElement('div');
    viewButtonTable.classList.add(
      ClassListName.catalogView,
      ClassListName.catalogViewTable,
      ClassListName.catalogViewActive,
    );
    catalogHeader.append(viewButtonTable);

    const viewButtonList: HTMLDivElement = document.createElement('div');
    viewButtonList.classList.add(ClassListName.catalogView, ClassListName.catalogViewList);
    catalogHeader.append(viewButtonList);

    viewButtonList.addEventListener('click', () => this.changeGridList());
    viewButtonTable.addEventListener('click', () => this.changeGridTable());
  }
}

export default Grid;
