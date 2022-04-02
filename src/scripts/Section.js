export class Section {
  constructor({ renderer, data }, cardsContainer) {
    this._renderer = renderer;
    this._itemsList = data;
    this._container = document.querySelector(cardsContainer);
  };

  renderCards() {
    this._itemsList.forEach(item => {
      this._renderer(item);
    })
  };

  addItems(card) {
    this._container.prepend(card);
  };
}
