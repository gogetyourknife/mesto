import './pages/index.css';

import {
  nameInput,
  descrInput,
  place,
  link,
  popupImageLink,
  popupEditButton,
  popupAdd,
  popup,
  popupEdit,
  popupAddCard,
  formCard,
  openImagePopup
} from './scripts/constants.js'

import { Section } from './scripts/Section.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';
import { FormValidator } from './scripts/FormValidator.js';
import { Card } from './scripts/card.js';
import { validationConfiguration, initialCards } from './scripts/utils.js';

// переменные для ПР7

const formValidationCard = new FormValidator(validationConfiguration, popupAddCard);
const formValidationInfo = new FormValidator(validationConfiguration, popupEdit);
formValidationCard.setEventListeners();
formValidationInfo.setEventListeners();

// селекторы

const userNameSelector = '.profile__name';
const userDescrSelector = '.profile__description';

// popup edit profile

const popupWithFormEditProfile = new PopupWithForm(popupEdit, {
  submitFormHandler: (inputValues) => {
  userInfo.setUserInfo(inputValues.name, inputValues.description);
  }
});

popupEditButton.addEventListener('click', () => {
  const {name, description} = userInfo.getUserInfo();
  popupWithFormEditProfile.open();
  nameInput.value = name;
  descrInput.value = description;
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
    cardsList.addItems(item);
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
};

popupWithImage.setEventListeners();

// Добвление новой карточки

function createCard(data) {
  const newCard = new Card(data, '#template', zoomImage);
  const card = newCard.addNewCard();
  return card;
};

const userInfo = new UserInfo({userNameSelector, userDescrSelector});

// new section: cardslist

const cardsList = new Section({
  data: initialCards,
  renderer: (card) => {
    const newCard = createCard(card);
    cardsList.addItems(newCard);
  }
});

cardsList.renderCards();
