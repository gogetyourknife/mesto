import { zoomFunction } from './index.js';

export const settings = {
  template: '.template',
  element: '.element__card',
  delete: '.element__delete-button',
  image: '.element__image',
  title: '.element__title',
  like: '.element__like-button',
  zoom: zoomFunction,
};

export class Card {
  constructor(place, link, settings) {
    this._place = place;
    this._link = link;

    this._template = settings.template;
    this._cardItem = settings.element;
    this._deleteCard = settings.delete;
    this._cardImage = settings.image;
    this._title = settings.title;
    this._likeButton = settings.like;
    this._zoomImage = settings.zoom;
  };

  // template

  _getTemplate() {
    const clone = document.querySelector(this._template).content.cloneNode(true);
    return clone;
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

  // новая карточка

  addNewCard() {
    this._cardItem = this._getTemplate();

    const elementCard = this._cardItem.querySelector(this._element);
    const cardTitle = this._cardItem.querySelector(this._title);
    const cardImage = this._cardItem.querySelector(this._cardImage);

    const likeButton = this._cardItem.querySelector(this._likeButton);
    const deleteButton = this._cardItem.querySelector(this._deleteCard);

    cardTitle.textContent = this._place;
    cardImage.src = this._link;
    cardImage.alt = this._place;

    likeButton.addEventListener('click', () => {this._clickLike(likeButton)});
    deleteButton.addEventListener('click', () => {this._deleteCard(elementCard)});
    cardImage.addEventListener('click', () => {this._zoomImage(this._place, this._link)});

    return this._cardItem;
  };
};
