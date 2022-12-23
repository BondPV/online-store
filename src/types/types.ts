export type FiltersValueType = 'brand' | 'category';
export type FiltersRangeType = 'price' | 'stock';

export type FiltersValueDataType = Record<FiltersValueType, string[]>;
export type FiltersRangeDataType = Record<FiltersRangeType, number[]>;

export type FiltersDataType = {
  filtersValue: FiltersValueDataType;
  filtersRange: FiltersRangeDataType;
};
