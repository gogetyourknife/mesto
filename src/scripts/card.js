export class Card {
  constructor(data, cardSelector, zoomImage) {
    this._place = data.place;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._zoomImage = zoomImage;
  };

  // template

  _getTemplate() {
    const clone = document.querySelector(this._cardSelector).
    content.cloneNode(true);
    return clone;
  };

    // ставим лайк

    _clickLike (like) {
      like.classList.toggle('element__like-button_active');
    };

    // удаляем

    _deleteCard = () => {
      this._cardItem.remove();
      this._cardItem = null;
    };


  _setEventListenersForCard() {
    this._cardItem.querySelector('.element__like-button')
    .addEventListener('click', this._clickLike);

    this._cardItem.querySelector('.element__delete-button')
    .addEventListener('click', this._deleteCard);

    this._cardItem.querySelector('.popup__image').addEventListener('click', () => {
      this._zoomImage(this._place, this._link);
    });
  };

    // новая карточка

    addNewCard() {
      this._cardItem = this._getTemplate();

      const cardImage = this._cardItem.querySelector('.element__image');

      cardImage.src = this._link;
      cardImage.alt = this._place;

      const cardTitle = this._cardItem.querySelector('.element__title');

      cardTitle.textContent = this._place;

      this._setEventListenersForCard();

      return this._cardItem;
    };

}
