import './pages/index.css';

import { Section } from './scripts/Section.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';
import { FormValidator } from './scripts/FormValidator.js';
import { Card } from './scripts/card.js';
import { validationConfiguration, initialCards } from './scripts/utils.js';

// инпуты для форм

const nameInput = document.querySelector('.popup__input_type-name');
const descrInput = document.querySelector('.popup__input_type-description');
const newName = document.querySelector('.profile__name');
const newDescr = document.querySelector('.profile__description');
const place = document.querySelector('.popup__input_type_place');
const link = document.querySelector('.popup__input_type_link');
const popupImageLink = document.querySelector('.popup__image');
const popupImageDescription = document.querySelector('.popup__description');

// кнопки

const popupEditButton = document.querySelector('.profile__edit-button');
const popupClosed = document.querySelectorAll('.popup__close-button');
const popupSavedCard = document.querySelector('.popup__save-button_card')
const popupAdd = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form');

// попапы

const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_addcard');
const formCard = document.querySelector('.popup__form_card');
const openImagePopup = document.querySelector('.popup_type_zoom');

// переменные для ПР7

const formValidationCard = new FormValidator(validationConfiguration, popupAddCard);
const formValidationInfo = new FormValidator(validationConfiguration, popupEdit);
formValidationCard.setEventListeners();
formValidationInfo.setEventListeners();

// селекторы

const userNameSelector = '.profile__name';
const userDescrSelector = '.profile__description';

// константы для ПР 8


// ПР 8

const userInfo = new UserInfo({userNameSelector, userDescrSelector});

// new section

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = createCard(item);
    section.addItems(newCard);
  }
});

// popup edit profile

const popupWithFormEditProfile = new PopupWithForm('.popup_type_edit', {
  submitFormHandler: (inputValues) => {
  userInfo.setUserInfo(inputValues.name, inputValues.info);
  }
});

popupEditButton.addEventListener('click', () => {
  const {name, info} = userInfo.getUserInfo();
  popupWithFormEditProfile.open();
  nameInput.value = name;
  descrInput.value = info;
  formValidationInfo.resetValidation();
});

popupWithFormEditProfile.setEventListeners();

// add card popup

const popWithFormAddCard = new PopupWithForm(popupAddCard, {
  submitFormHandler: (inputValues) => {
    const item = createCard({
      place: inputValues.place,
      link: inputValues.link
    });
    section.addItems(item);
  }
});

popupAdd.addEventListener('click', () => {
  popWithFormAddCard.open();
  formValidationCard.resetValidation();
});

popWithFormAddCard.setEventListeners();

// popup with image

const popupWithImage = new PopupWithImage(popupImageLink);

// zoom image

function zoomImage(place, link) {
  popupWithImage.open(place, link);
  popupWithImage.setEventListeners();
};

// Добвление новой карточки

const createCard = (data) => {
  const newCard = new Card(data, cardSelector, zoomImage);
  const card = newCard.addNewCard();
  return card;
};

section.renderCards();
