export class Card {
  constructor(data, settings, zoomImage, deleteConfirmation, handleLikeClick) {
    this._template = settings.template;
    this._cardItem = settings.element;
    this._deleteButton = settings.trash;
    this._cardImage = settings.image;
    this._title = settings.title;
    this._likeButton = settings.like;
    this._likes = settings.likeCounter;

    // ПР 9 api

    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._name = data.name;
    this._link = data.link;

    this._deleteConfirmation = deleteConfirmation;
    this._handleLikeClick = handleLikeClick;
    this._zoomImage = zoomImage;
  };

  // template

  _getTemplate() {
    const clone = document
    .querySelector(this._template)
    .content.querySelector('.element__card')
    .cloneNode(true);
    return clone;
  };





    // ставим лайк

  // _clickLike (like) {
  //   like.classList.toggle('element__like-button_active');
  // };

  // условие что карточка лайкнута

  isLiked() {
    const likedCard = this._likes.find(user => user._id === this._userId);
    return likedCard;
  }

  _activeLike = () => {
    this._document.querySelector('.element__like-button').classList.add('element__like-button_active');
  }

  // что она не лайкнута

  _disabledLike = () => {
    this._document.querySelector('.element__like-button').classList.remove('element__like-button_active');
  }

  // поставляем количество лайков

  countLikes = () => {
    likeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._activeLike()
    } else {
      this._disabledLike()
    }
  }

    // удаляем

  _deleteCard = () => {
    this._cardItem.remove();
    this._cardItem = null;
    };







  _setEventListenrs() {
    // лайк
    // this._likeButton.addEventListener('click', () => {this._clickLike(this._likeButton)});

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardItem)
    });


    // удаление
    // this._deleteButton.addEventListener('click', () => {this._deleteCard(this._cardItem)});

    this._deleteButton.addEventListener('click', () => {
      this._deleteConfirmation(this._cardItem)
    });

    // зум карты

    this._cardImage.addEventListener('click', () => {this._zoomImage(this._name, this._link)});
  }

    // новая карточка

  addNewCard() {
    this._cardItem = this._getTemplate();
    this._cardTitle = this._cardItem.querySelector(this._title);
    this._cardImage = this._cardItem.querySelector(this._cardImage);
    this._likeButton = this._cardItem.querySelector(this._likeButton);
    this._deleteButton = this._cardItem.querySelector(this._deleteButton);
    this._likes = this._cardItem.querySelector(this._likes);
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if (this._ownerId !== this._userId) {
      this._cardItem.querySelector('.element__delete-button').style.display = 'none';
    }

    this._setEventListenrs();
    return this._cardItem;
    };
}
