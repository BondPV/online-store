export type FiltersValueType = 'brand' | 'category';

// Record<Keys, Type> создает новый объектный тип (object type),
// ключами которого являются Keys, а значениями свойств — Type.

export type FiltersValueDataType = Record<FiltersValueType, string[]>;

export type FiltersDataType = {
  filtersValue: FiltersValueDataType;
};
