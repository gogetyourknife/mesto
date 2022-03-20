export class Card {
  constructor(name, link, settings) {
    this._name = name;
    this._link = link;
    this._template = settings._template;
    this._likeButton = settings.like;
    this._deleteCard = settings.delete;
    this._title = settings.title;
    this._element = settings.element;
    this._image = settings.image;
    this._zoomImage = settings.zoom;
  };

  // template

  _addTemplate() {
    const clone = document.querySelector(this._template).content.template.cloneNode(true);
    return clone;
  };

  // ставим лайк

  _clickLike (like) {
    like.classList.toggle('element__like-button_active');
  };

  // удаляем

  _deleteCard (deleteCard) {
    deleteCard.remove();
  };

  // новая карточка

  addNewCard() {
    this._cardItem = this._addTemplate();
    const elementCard = this._cardItem.querySelector(this._element);
    const cardTitle = this._cardItem.querySelector(this._title);
    const cardImage = this._cardItem.querySelector(this._image);
    const likeButton = this._cardItem.querySelector(this._likeButton);
    const deleteButton = this._cardItem.querySelector(this._deleteCard);

    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = this._title;

    likeButton.addEventListener('click', () => {this._clickLike(likeButton)});
    deleteButton.addEventListener('click', () => {this._deleteCard(elementCard)});
    cardImage.addEventListener('click', () => {this._zoomImage(this._title, this._link)});

    return this._elementCard;
  };
};
