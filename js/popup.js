let popup = document.querySelectorAll('.popup');
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

// Открытие и закрытие модальных окон

function openPopupEdit() {
  popupEdit.classList.toggle('popup_opened');
  nameInput.value = newName.innerHTML;
  descrInput.value = newDescr.innerHTML;
};

popupEditButton.addEventListener('click', openPopupEdit);

function openPopupAdd() {
  popupAddCard.classList.toggle('popup_opened');
};

popupAdd.addEventListener('click', openPopupAdd);

// закрыть попап

function closePopup() {
  popup.forEach(function (item) {
    item.classList.remove('popup_opened');
  });
};

popupClosed.forEach((closed) => {
  closed.addEventListener('click', closePopup);
  });


function formSubmitHandler (evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newDescr.textContent = descrInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);
popupSaved.addEventListener('click', closePopup);

function openPopupImage() {
  openImagePopup.classList.add('popup_opened');
};


// Создание карты

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
    return newCard;
};

function addCard(newCard) {
  cardsContainer.append(newCard);
  newCard.querySelector('.element__image').addEventListener('click', function (evt) {
    evt.preventDefault();
    document.querySelector('.popup__image').src = newCard.querySelector('.element__image').src;
    document.querySelector('.popup__description').textContent = newCard.querySelector('.element__title').textContent;
    openPopupImage();
  });
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
