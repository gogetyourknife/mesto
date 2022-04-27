export class Card {
  constructor(data, settings, handleZoomImage, handleDeleteClick, handleLikeClick) {

    this._template = settings.template;
    this._cardItem = settings.element;
    this._deleteButton = settings.trash;
    this._cardImage = settings.image;
    this._title = settings.title;
    this._likeButton = settings.like;

    // ПР 9 api

    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._name = data.name;
    this._link = data.link;
    this._counter = data.likes;

    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleZoomImage = handleZoomImage;

  };

  _getTemplate() {
    const clone = document
    .querySelector(this._template)
    .content.querySelector('.element__card')
    .cloneNode(true);
    return clone;
  };

  deleteCard = () => {
    this._cardItem.remove();
    this._cardItem = null;
    };

  isLiked() {
    const isLikedCard = this._counter.find(user => user._id === this._userId);
    return isLikedCard;
  }

  setLikes(likeCounter) {
    this._counter = likeCounter;
    this.likeCounter = this._cardItem.querySelector('.element__like-counter');
    this.likeCounter.textContent = this._counter.length;

    if (this.isLiked()) {
      this._likeButton.classList.add('.element__like-button_active')
    } else {
      this._likeButton.classList.remove('.element__like-button_active')
    }
  }

  _setEventListenrs() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id)
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id)
    });

    this._cardImage.addEventListener('click', () => {this._handleZoomImage(this._name, this._link)});
  }

    // новая карточка

    // addnewcard выглядит очень грузно, разобью на две функции. add - создает карту, get - собирает данные о карте

  _getCardInfo() {
    this._cardItem = this._getTemplate();
    this._cardTitle = this._cardItem.querySelector(this._title);
    this._cardImage = this._cardItem.querySelector(this._cardImage);
    this._likeButton = this._cardItem.querySelector(this._likeButton);
    this._deleteButton = this._cardItem.querySelector(this._deleteButton);
  }

  addNewCard() {
    this._getCardInfo();

    this.setLikes(this._counter);

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if (this._ownerId !== this._userId) {
      this._cardItem.querySelector('.element__delete-button').style.visibility = "hidden";
    } else {
      this._cardItem.querySelector('.element__delete-button').style.visibility = 'visible';
    }

    this._setEventListenrs();
    return this._cardItem;
    };
}
