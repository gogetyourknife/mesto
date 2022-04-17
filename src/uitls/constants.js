// инпуты для форм

export const nameInput = document.querySelector('.popup__input_type-name');
export const descrInput = document.querySelector('.popup__input_type-description');
export const popupImageLink = document.querySelector('.popup__image');

// кнопки

export const popupEditButton = document.querySelector('.profile__edit-button');
export const popupAdd = document.querySelector('.profile__add-button');
export const cardsContainer = document.querySelector('.element');
export const changeAvatar = document.querySelector('.profile__change-avatar');
export const deleteButton = document.querySelector('.element__delete-button');


// попапы

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAddCard = document.querySelector('.popup_type_addcard');
export const openImagePopup = document.querySelector('.popup_type_zoom');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const popupRemoval = document.querySelector('.popup_type_delete');
export const testing = document.querySelector('.profile__avatar-wrapper');

export const userName = '.profile__name';
export const userDescr = '.profile__description';
export const userAvatar = '.profile__avatar';

export const settings = {
  template: '.template',
  element: '.element__card',
  trash: '.element__delete-button',
  image: '.element__image',
  title: '.element__title',
  like: '.element__like-button',
  likeCounter: '.element__like-counter'
};

export const validationConfiguration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-border_active',
  errorClass: 'popup__input-error_active',
}
