// инпуты для форм

export const inputWithName = document.querySelector('.popup__input_type-name'); // nameInput
export const inputWithDescription = document.querySelector('.popup__input_type-description'); // descrInput
// export const imageFromZoomPopup = document.querySelector('.popup__image'); // popupImageLink

// кнопки

export const buttonEditProfile = document.querySelector('.profile__edit-button'); // popupEditButton
export const buttonAddInformation = document.querySelector('.profile__add-button'); // popupAdd
export const buttonChangeAvatar = document.querySelector('.profile__avatar-button'); // changeAvatar
export const buttonDeleteCard = document.querySelector('.element__delete-button'); //deleteButton
export const buttonLikeCard = document.querySelector('.element__like-button');

// контейнер

export const cardsContainer = document.querySelector('.element');

// попапы

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAddCard = document.querySelector('.popup_type_addcard');
export const popupZoomImage = document.querySelector('.popup_type_zoom'); //openImagePopup
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const popupRemoval = document.querySelector('.popup_type_delete');

// информация о юзер

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

/* const userData = {
  name: 'Виктор',
  patronymic: 'Семёнович',
  age: 55
};

const printUserParams = ({ name, patronymic, age }) => {
  console.log(name);
  console.log(patronymic);
  console.log(age);
};


// код без использования деструктуризации параметров

class Card {
    constructor(data) {
        this._text = data.text;
        this._image = data.image;
        this._description = data.description;
    }
}

// код c использованием деструктуризации параметров

class Card {
    constructor({ text, image, description }) { // достаём ключи объекта сразу
    // теперь значения ключей объекта data
    // лежат в одноимённых переменных
        this._text = text;
        this._image = image;
        this._description = description;
    }
}

*/

export const validationConfiguration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-border_active',
  errorClass: 'popup__input-error_active',
}


// template

export const template = document.querySelector('.template');
export const cardElement = document.querySelector('.element__card');
export const cardImage = document.querySelector('.element__image');
export const cardTitle = document.querySelector('.element__title');
export const cardLikeCounter = document.querySelector('.element__like-counter');
