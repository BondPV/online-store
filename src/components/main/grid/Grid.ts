import './grid.scss';
import { ClassListName, ClassMap } from 'constants/htmlConstants';

class Grid {
  public changeGridList(): void {
    const catalogView = document.querySelector(ClassMap.catalog);

    if (catalogView) {
      catalogView.classList.add(ClassListName.catalogListView);
    }
  }

  public changeGridTable(): void {
    const catalogView = document.querySelector(ClassMap.catalog);

    if (catalogView) {
      catalogView.classList.remove(ClassListName.catalogListView);
    }
  }

  render(): void {
    const catalogHeader = document.querySelector(ClassMap.catalogHeader);

    if (!catalogHeader) {
      return;
    }

    const viewButtonTable: HTMLDivElement = document.createElement('div');
    viewButtonTable.classList.add(ClassListName.catalogView, ClassListName.catalogViewTable);
    catalogHeader.append(viewButtonTable);

    const iconButtonTable: HTMLElement = document.createElement('i');
    iconButtonTable.classList.add(ClassListName.iconFontSolid, ClassListName.iconFontTable);
    viewButtonTable.append(iconButtonTable);

    const viewButtonList: HTMLDivElement = document.createElement('div');
    viewButtonList.classList.add(ClassListName.catalogView, ClassListName.catalogViewList);
    catalogHeader.append(viewButtonList);

    const iconButtonList: HTMLElement = document.createElement('i');
    iconButtonList.classList.add(ClassListName.iconFontSolid, ClassListName.iconFontList);
    viewButtonList.append(iconButtonList);

    viewButtonList.addEventListener('click', () => this.changeGridList());
    viewButtonTable.addEventListener('click', () => this.changeGridTable());
  }
}

export default Grid;
