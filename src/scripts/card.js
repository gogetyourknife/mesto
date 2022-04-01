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
    content.querySelector('.element__card').cloneNode(true);
    return clone;
  };

  // новая карточка

  addNewCard() {
    this._cardItem = this._getTemplate();
    const cardImage = this._cardItem.querySelector(this._cardImage);
    cardTitle.textContent = this._place;
    cardImage.src = this._link;
    cardImage.alt = this._place;
    this._setEventListeners();
    return this._cardItem;
  };

    // ставим лайк

    _clickLike (like) {
      like.classList.toggle('element__like-button_active');
    };

    // удаляем

    _deleteCard (deleteCard) {
      deleteCard.remove();
      this._cardItem = null;
    };


  _setEventListeners() {
    this._cardItem.querySelector('.element__like-button')
    .addEventListener('click', this._clickLike);

    this._cardItem.querySelector('.element__delete-button')
    .addEventListener('click', this. _deleteCard);

    this._cardItem.querySelector('.popup__image').addEventListener('click', () => {
      this._zoomImage(this._place, this._link);
    });
  };
}
