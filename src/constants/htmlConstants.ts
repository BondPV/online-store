import { SortOption } from 'types/types';

export const IdMap = {
  catalog: '#catalog',
  valueFilters: '#value-filters',
  rangeFilters: '#range-filters',
};

export const ClassMap = {
  catalogHeader: '.catalog__header',
  selectSort: '.catalog__selectSort',
  catalog: '.catalog',
  catalogListView: '.catalog_list',
  catalogView: '.catalog__view',
  catalogViewTable: '.catalog__view-table',
  catalogViewList: '.catalog__view-list',
};

export const ClassListName = {
  selectSort: 'catalog__selectSort',
  catalogListView: 'catalog_list',
  catalogView: 'catalog__view',
  catalogViewTable: 'catalog__view-table',
  catalogViewList: 'catalog__view-list',
  iconFontSolid: 'fa-solid',
  iconFontTable: 'fa-table-cells',
  iconFontList: 'fa-list',
};

export const SortOptionMap: SortOption = {
  Name: 'title',
  Price: 'price',
  Rating: 'rating',
};

export const optionNames = ['Name ASC', 'Name DESC', 'Price ASC', 'Price DESC', 'Rating ASC', 'Rating DESC'];

export const valueOptionAsc = 'ASC';
