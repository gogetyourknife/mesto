import { FormValidator } from './FormValidator.js';
import { Card } from './card.js';
import { settings, validationConfiguration, initialCards } from './utils.js';

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

// переменные для ПР5

const cardsContainer = document.querySelector('.element');

// переменные для ПР7

const formValidationCard = new FormValidator(validationConfiguration, popupAddCard);
const formValidationInfo = new FormValidator(validationConfiguration, popupEdit);

// Открытие и закрытие модальных окон

function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

function openPropfilePopup () {
  nameInput.value = newName.textContent;
  descrInput.value = newDescr.textContent;
  formValidationInfo.resetValidation();
  openPopup(popupEdit);
};

function openCardPopup() {
  formValidationCard.resetValidation();
  openPopup(popupAddCard);
};


function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// Сохранение изменений в профиле

function saveNewName (evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newDescr.textContent = descrInput.value;
  closePopup(popupEdit);
}

// ловим эскейп

function closeByEscape (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// ловим клик мышки

function handleMouseClick (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

// Добвление новой карточки

function createCard(place, link) {
  const newCard = new Card(place, link, settings);
  const card = newCard.addNewCard();
  return card;
};

initialCards.forEach((item) => {
  cardsContainer.prepend(createCard(item.place, item.link, settings));
});

function addingCard (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(place.value, link.value, settings));
  closePopup(popupAddCard);
  formValidationCard.disableSubmitButton();
  formCard.reset()
};

popupSavedCard.addEventListener('click', addingCard);

// Обработчики

popupEditButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  openPropfilePopup();
});

popupAdd.addEventListener('click', (evt) => {
  evt.preventDefault();
  openCardPopup();
});

popupClosed.forEach((closed) => {
  closed.addEventListener('click', function() {
    popup.forEach((item) => {
      closePopup(item);
    });
  });
});

formElement.addEventListener('submit', saveNewName);

// закрытие при нажатии мышкой

popupEdit.addEventListener('click', handleMouseClick);
popupAddCard.addEventListener('click', handleMouseClick);
openImagePopup.addEventListener('click', handleMouseClick);


export function zoomFunction (place, link) {
  popupImageDescription.textContent = place;
  popupImageLink.src = link;
  popupImageLink.alt = place;
  openPopup(openImagePopup);
};

formValidationCard.setEventListeners();
formValidationInfo.setEventListeners();
