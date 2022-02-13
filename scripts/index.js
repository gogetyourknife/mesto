// инпуты для форм

const nameInput = document.querySelector('.popup__input_type_name');
const descrInput = document.querySelector('.popup__input_type_description');
const newName = document.querySelector('.profile__name');
const newDescr = document.querySelector('.profile__description');
const descrImagePopup = document.querySelector('.popup__description');
const place = document.querySelector('.popup__input_type_place');
const link = document.querySelector('.popup__input_type_link');
const popupImageLink = document.querySelector('.popup__image');
const popupImageDescription = document.querySelector('.popup__description');

// кнопки

const popupEditButton = document.querySelector('.profile__edit-button');
const popupClosed = document.querySelectorAll('.popup__close-button');
const popupSaved = document.querySelector('.popup__save-button')
const popupSavedCard = document.querySelector('.popup__save-button_card')
const popupAdd = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup__image');
const formElement = document.querySelector('.popup__form');
const newCardDelete = document.querySelector('.element__delete-button');

// попапы

const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_addcard');
const formCard = document.querySelector('.popup__form_card');
const openImagePopup = document.querySelector('.popup_type_zoom');

// переменные для ПР5

/* let card = document.querySelectorAll('.element__card'); */
const template = document.querySelector('#template').content;
const cardsContainer = document.querySelector('.element');

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
};

function openPropfilePopup (evt) {
  evt.preventDefault();
  nameInput.value = newName.innerHTML;
  descrInput.value = newDescr.innerHTML;
  openPopup(popupEdit);
};


function openPopupImage (place, link) {
  popupImageLink.src = link;
  popupImageDescription.textContent = place;
  openPopup(openImagePopup);
};

function closePopup(item) {
  item.classList.remove('popup_opened');
}

// Сохранение изменений в профиле

function saveNewName (evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newDescr.textContent = descrInput.value;
  closePopup(popupEdit);
}

// Создание новой карточки

function createCard(place, link) {
  const newCard = template.cloneNode(true);

  newCard.querySelector('.element__image').src = link;
  newCard.querySelector('.element__title').textContent = place;

  newCard.querySelector('.element__delete-button').addEventListener('click', function (event) {
    event.target.closest('.element__card').remove();
  })

  newCard.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  newCard.querySelector('.element__image').addEventListener('click', function (evt) {
    evt.preventDefault;
    openPopupImage(place, link)
  });
  return newCard;
};

// Добвление новой карточки

function addCard(newCard) {
  cardsContainer.prepend(newCard);
};

initialCards.forEach((item) => {
  const cardItem = createCard(item.place, item.link);
  addCard(cardItem);
});

popupSavedCard.addEventListener('click', function (evt) {
  evt.preventDefault();
  const card = createCard(place.value, link.value);
  addCard(card);
  closePopup(popupAddCard);
  formCard.reset();
});

// Обработчики

popupEditButton.addEventListener('click', openPropfilePopup);

popupAdd.addEventListener('click', () => {openPopup(popupAddCard)});

popupClosed.forEach((closed) => {
  closed.addEventListener('click', function() {
    popup.forEach((item) => {
      closePopup(item)
    });
  });
});

formElement.addEventListener('submit', saveNewName);



