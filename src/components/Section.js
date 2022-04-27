export class Section {
  constructor({ items, renderer }, cardsContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = cardsContainer;
  };

  renderCards() {
    this._items.forEach((item) => {
       this._renderer(item);
    });
 }

  addItems(card) {
    this._container.append(card);
  };
}
