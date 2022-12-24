import Catalog from 'components/main/catalog/Catalog';
import './sortCatalog.scss';
import { IProduct } from 'types/interfaces';
import { SortOption } from 'types/types';
import { SortOptionMap, optionNames } from 'constants/htmlConstants';

class SortCatalog {
  constructor(private readonly catalog: Catalog) {}

  render(): void {
    const catalogHeader = document.querySelector('.catalog__header');

    if (!catalogHeader) {
      return;
    }

    const selectSortButton: HTMLSelectElement = document.createElement('select');
    selectSortButton.classList.add('sort-catalog');
    catalogHeader.append(selectSortButton);

    optionNames.forEach((item) => {
      this.createOptionsSort(item, selectSortButton);
    });

    selectSortButton.addEventListener('change', () => this.selectOrder());
  }

  selectOrder(): void {
    const selectSortButton: HTMLSelectElement | null = document.querySelector('.sort-catalog');
    if (!selectSortButton) {
      return;
    }

    const currentOption: HTMLOptionElement = selectSortButton.options[selectSortButton.selectedIndex];
    currentOption.selected = true;
    const currentOptionValue: string = currentOption.value;

    const splitedOptionValue = currentOptionValue.split(' ');
    const currentField = SortOptionMap[splitedOptionValue[0] as keyof SortOption];
    const currentOrder = splitedOptionValue[1];

    this.sortCatalog(currentField, currentOrder);

    const oldCatalog = document.querySelector('.catalog');
    if (!oldCatalog) {
      return;
    }
    oldCatalog.childNodes.forEach((child) => oldCatalog.removeChild(child));

    this.catalog.render();
  }

  sortCatalog(field: string, order: string): void {
    const typedField = field as keyof IProduct;
    const products: IProduct[] = this.catalog.products.sort((a, b) => {
      if (order === 'ASC') {
        return a[typedField] < b[typedField] ? -1 : 1;
      }
      return a[typedField] > b[typedField] ? -1 : 1;
    });
    this.catalog.products = products;
  }

  createOptionsSort(optionName: string, parentElem: HTMLSelectElement): void {
    const optionSort: HTMLOptionElement = document.createElement('option');
    optionSort.textContent = optionName;
    optionSort.value = optionName;
    parentElem.append(optionSort);
  }
}

export default SortCatalog;
