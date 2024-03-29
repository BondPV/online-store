class SelfAssessment {
  constructor() {
    console.log(`
Выполнены все пункты задания. Итоговое количество баллов, 300 баллов
✔️ 1. Страница товаров с фильтрами, 120 баллов
  + Реализована фильтрация продуктов +40
  + Реализована сортировка продуктов +20
  + Реализован текстовый поиск по всем данным продуктов +15
  + Реализовано переключение вида найденных продуктов +10
  + Реализован роутинг с query-параметрами +10
  + Реализованы кнопки сброса и копирования поиска +10
  + Реализован блок кол-ва найденных товаров +5
  + Поведение карточек найденных товаров +10
✔️ 2. Страница корзины выбранных товаров, 60 баллов
  + Реализован блок отображения добавленных продуктов +5
  + Реализовано увеличение кол-ва конкретного товара и его удаление +10
  + Реализована пагинация +15
  + Хранение данных в localStorage +10
  + Реализован промокод блок +10
  + Реализована кнопка открытия модального окна оформления покупки + 5
  + Реализован блок с общей суммой и кол-вом всех выбранных товаров +5
✔️ 3. Модальное окно оформления(покупки) выбранных товаров, 50 баллов
  + Реализован блок ввода персональной информации с валидацией +20
  + Реализован блок ввода данных банковской карты с валидацией +20
  + Реализована кнопка завершения заказа +10
✔️ 4. Страница с описанием товара, 40 баллов
  + Реализованы блоки страницы +30
  + Страница открывается в новом окне по ссылке с id/name товара +10
✔️ 5. Header, содержащий кол-во добавленных в корзину товаров и общую сумму покупок, 20 баллов
  + Header содержит корзину товаров +10
  + Header содержит общую сумму покупок +10
✔️ 6. Страница 404, 10 баллов
  + Страница существует +6
  + Страница не реагирует на некорректные query-параметры +4
`);
  }
}

export default SelfAssessment;
