// инпуты для форм

export const nameInput = document.querySelector('.popup__input_type-name');
export const descrInput = document.querySelector('.popup__input_type-description');
export const popupImageLink = document.querySelector('.popup__image');

// кнопки

export const popupEditButton = document.querySelector('.profile__edit-button');
export const popupAdd = document.querySelector('.profile__add-button');
export const cardsContainer = document.querySelector('.element');


// попапы

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAddCard = document.querySelector('.popup_type_addcard');
export const openImagePopup = document.querySelector('.popup_type_zoom');

export const userName = '.profile__name';
export const userDescr = '.profile__description';

export const settings = {
  template: '.template',
  element: '.element__card',
  trash: '.element__delete-button',
  image: '.element__image',
  title: '.element__title',
  like: '.element__like-button',
};

export const validationConfiguration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-border_active',
  errorClass: 'popup__input-error_active',
}

