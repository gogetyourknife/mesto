let popup = document.querySelector('.popup');
let popupEdit = document.querySelector('.popup_type_edit');
let popupAddCard = document.querySelector('.popup_type_addcard');
let formElement = document.querySelector('.popup__form');
let popupEditButton = document.querySelector('.profile__edit-button');
let popupClosed = document.querySelectorAll('.popup__close-button');
let popupSaved = document.querySelector('.popup__save-button')
let popupSavedCard = document.querySelector('.popup__save-button_card')
let nameInput = document.querySelector('.popup__input_type_name');
let descrInput = document.querySelector('.popup__input_type_description');
let newName = document.querySelector('.profile__name');
let newDescr = document.querySelector('.profile__description');
// переменные для ПР5

let popupAdd = document.querySelector('.profile__add-button');
let card = document.querySelectorAll('.element__card');
const template = document.querySelector('#template').content;
const cardsContainer = document.querySelector('.element');
let formCard = document.querySelector('.popup__form_card');
let imagePopup = document.querySelector('.popup__image');
let descrImagePopup = document.querySelector('.popup__description');
let openImagePopup = document.querySelector('.popup_type_zoom');

// переменные для создания карточки
const deleteCardButton = document.querySelector('.element__delete-button');
const cardImage = document.querySelector('.element__image');
const cardWrapper = document.querySelector('.element__wrapper');
const cardTitle = document.querySelector('.element__title');
const form = document.querySelector('.popup_type_addcard');
const userTemplate = document.querySelector('#template');
const cardElement = document.querySelector('.element__card');
let place = document.querySelector('.popup__input_type_place');
let link = document.querySelector('.popup__input_type_link');

const buttonToOpenPopup = document.querySelectorAll('.open_button');

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

function openPopup() {
  popup.classList.add('popup_opened');
};

function closePopup() {
  popup.classList.remove('popup_opened');
};

function openEditPopup(evt) {
  evt.preventDefault();
  nameInput.value = newName.innerHTML;
  descrInput.value = newDescr.innerHTML;
  openPopup();
};

function openAddplacePopup (evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newDescr.textContent = descrInput.value;
  openPopup();
}

function openPopupImage() {
  openPopup();
};

// Создание карты

function createCard(place, link) {
  let newCard = template.querySelector('.element__card').cloneNode(true);
  newCard.querySelector('.element__image').src = link;
  newCard.querySelector('.element__title').textContent = place;
  newCard.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');}
    );
  newCard.querySelector('.element__delete-button').addEventListener('click', function () {
   newCard.remove();}
    );

    newCard.querySelector('.element__image').addEventListener('click', function (evt) {
      evt.preventDefault();
      document.querySelector('.popup__image').src = newCard.querySelector('.element__image').src;
      document.querySelector('.popup__description').textContent = newCard.querySelector('.element__title').textContent;
      openPopup();
    }
    );
    return newCard;
};

function addCard(newCard) {
  cardsContainer.append(newCard);

};

initialCards.forEach((item) => {
  let cardItem = createCard(item.place, item.link);
  addCard(cardItem);
});

popupSavedCard.addEventListener('click', function (evt) {
  evt.preventDefault();
  const card = createCard(place.value, link.value);
  addCard(card);
  closePopup();
  formCard.reset();
});


popupEditButton.addEventListener('click', openEditPopup);
popupAdd.addEventListener('click', openAddplacePopup);
cardImage.addEventListener('click', openPopupImage);
popupSaved.addEventListener('click', closePopup);

popupClosed.forEach((closed) => {
  closed.addEventListener('click', closePopup);
  });
