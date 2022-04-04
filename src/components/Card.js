export class Card {
  constructor(data, settings, zoomImage) {
    this._place = data.place;
    this._link = data.link;
    this._template = settings.template;
    this._cardItem = settings.element;
    this._deleteButton = settings.trash;
    this._cardImage = settings.image;
    this._title = settings.title;
    this._likeButton = settings.like;
    this._zoomImage = zoomImage;
  };

  // template

  _getTemplate() {
    const clone = document
    .querySelector('#template')
    .content.querySelector('.element__card')
    .cloneNode(true);
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

  _setEventListenrs() {
    this._likeButton.addEventListener('click', () => {this._clickLike(this._likeButton)});
    this._deleteButton.addEventListener('click', () => {this._deleteCard(this._cardItem)});
    this._cardImage.addEventListener('click', () => {this._zoomImage(this._place, this._link)});
  }

    // новая карточка

  addNewCard() {
    this._cardItem = this._getTemplate();
    this._cardTitle = this._cardItem.querySelector(this._title);
    this._cardImage = this._cardItem.querySelector(this._cardImage);
    this._likeButton = this._cardItem.querySelector(this._likeButton);
    this._deleteButton = this._cardItem.querySelector(this._deleteButton);
    this._cardTitle.textContent = this._place;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._place;
    this._setEventListenrs();
    return this._cardItem;
    };
}
