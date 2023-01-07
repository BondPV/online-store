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
  headerCartCounter: '.header__cart-counter',
  headerTotalPrice: '.header__total-price',
  cartTotalQty: '.total-quantity',
  cartPriceWrap: '.total-price-container',
  cartTotalPrice: '.total-price',
  cartDiscountPrice: '.new-price',
  cartDiscountList: '.promo-list',
};

export const ClassListName = {
  selectSort: 'catalog__selectSort',
  catalogListView: 'catalog_list',
  catalogView: 'catalog__view',
  catalogViewActive: 'catalog__view_active',
  catalogViewTable: 'catalog__view_table',
  catalogViewList: 'catalog__view_list',
  catalogLabelText: 'label-text',
  cartDiscountPriceActive: 'new-price_active',
  cartPrevPrice: 'old-price',
};

export const SortOptionMap: SortOption = {
  Name: 'title',
  Price: 'price',
  Rating: 'rating',
};

export const optionNames = ['Name ASC', 'Name DESC', 'Price ASC', 'Price DESC', 'Rating ASC', 'Rating DESC'];

export const itemsCart = ['№', 'Item', 'Description', 'Qty', 'Subtotal'];

export const promoCodes = ['RS', 'EPAM', 'METRO'];

export const valueOptionAsc = 'ASC';
