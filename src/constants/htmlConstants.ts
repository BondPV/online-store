import { SortOption } from 'types/types';

export const Body = document.querySelector('body') as HTMLElement;
export const Container = document.querySelector('#main-container') as HTMLElement;

export const IdMap = {
  catalog: '#catalog',
  resetButton: '#reset-button',
  valueFilters: '#value-filters',
  rangeFilters: '#range-filters',
};

export const ClassMap = {
  catalogHeader: '.catalog__header',
  selectSort: '.catalog__selectSort',
  catalog: '.catalog',
  catalogListView: '.catalog_list',
  catalogView: '.catalog__view',
  catalogViewActive: '.catalog__view_active',
  catalogViewTable: '.catalog__view_table',
  catalogViewList: '.catalog__view_list',
  catalogQuantity: '.filter-quantity',
};

export const ClassListName = {
  selectSort: 'catalog__selectSort',
  catalogListView: 'catalog_list',
  catalogView: 'catalog__view',
  catalogViewActive: 'catalog__view_active',
  catalogViewTable: 'catalog__view_table',
  catalogViewList: 'catalog__view_list',
  catalogLabelText: 'label-text',
};

export const SortOptionMap: SortOption = {
  Name: 'title',
  Price: 'price',
  Rating: 'rating',
};

export const optionNames = ['Name ASC', 'Name DESC', 'Price ASC', 'Price DESC', 'Rating ASC', 'Rating DESC'];

export const itemsCart = ['Item', 'Description', 'Qty', 'Subtotal'];

export const valueOptionAsc = 'ASC';
