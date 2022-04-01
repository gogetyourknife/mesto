export class Section {
  constructor({ renderer, items }, cardsContainer) {
    this._renderer = renderer;
    this._itemsList = items;
    this._container = document.querySelector(cardsContainer);
  };

  renderCards() {
    this._itemsList.forEach(card => {
      this._renderer(card);
    })
  };

  addItems(card) {
    this._container.prepend(card);
  };
}
