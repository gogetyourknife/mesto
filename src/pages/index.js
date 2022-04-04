import './index.css';

import {
  nameInput,
  descrInput,
  popupEditButton,
  popupAdd,
  popupEdit,
  popupAddCard,
  openImagePopup,
  cardsContainer,
  userName,
  userDescr
} from '../uitls/constants.js'

import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { validationConfiguration, settings } from '../uitls/constants.js';
import { initialCards } from '../uitls/initials.js';

// переменные для ПР7

const formValidationCard = new FormValidator(validationConfiguration, popupAddCard);
const formValidationInfo = new FormValidator(validationConfiguration, popupEdit);
formValidationCard.setEventListeners();
formValidationInfo.setEventListeners();

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

const popupWithImage = new PopupWithImage(openImagePopup);

// zoom image

function zoomImage(place, link) {
  popupWithImage.open(place, link);
};

popupWithImage.setEventListeners();

// Добвление новой карточки

function createCard(data) {
  const newCard = new Card(data, settings, zoomImage);
  const card = newCard.addNewCard();
  return card;
};

const userInfo = new UserInfo({userName, userDescr});

// new section: cardslist

const cardsList = new Section(
  {
    renderer: (card) => {
      const newCard = createCard(card);
      cardsList.addItems(newCard);
    },
  } , cardsContainer );

cardsList.renderCards(initialCards);
