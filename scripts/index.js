import { validationConfiguration, FormValidation } from './validate.js';
import { Card, settings } from './card.js';

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
const imagePopup = document.querySelector('.popup__image');
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

const formValidationCard = new FormValidation(validationConfiguration, popupAddCard);
const formValidationInfo = new FormValidation(validationConfiguration, popupEdit);

// переменные для создания карточки
const initialCards = [
  {
    place: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    place: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    place: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    place: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    place: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    place: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Открытие и закрытие модальных окон

function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandlerEscape);
};

function openPropfilePopup () {
  nameInput.value = newName.innerHTML;
  descrInput.value = newDescr.innerHTML;
  formValidationInfo.resetValidation();
  formCard.reset()
  openPopup(popupEdit);
};

function openCardPopup() {
  formValidationCard.resetValidation();
  formCard.reset()
  openPopup(popupAddCard);
};


function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandlerEscape);
}

// Сохранение изменений в профиле

function saveNewName (evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newDescr.textContent = descrInput.value;
  closePopup(popupEdit);
}

// ловим эскейп

function keyHandlerEscape (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// ловим клик мышки

function mouseHandler (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

// Добвление новой карточки

function createCard(place, link, settings) {
  const newCard = new Card(place, link, settings);
  const card = newCard.addNewCard();
  return card;
};

initialCards.forEach((item) => {
  cardsContainer.prepend(createCard(item.place, item.link, settings));
});

popupSavedCard.addEventListener('click', function (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(place.value, link.value, settings));
  closePopup(popupAddCard);
});

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

popupEdit.addEventListener('click', mouseHandler);
popupAddCard.addEventListener('click', mouseHandler);
openImagePopup.addEventListener('click', mouseHandler);


export function zoomFunction (place, link) {
  popupImageDescription.textContent = place;
  popupImageLink.src = link;
  popupImageLink.alt = place;
  openPopup(openImagePopup);
};

formValidationCard.setEventListeners();
formValidationInfo.setEventListeners();
