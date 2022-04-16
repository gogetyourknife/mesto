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
  userDescr,
  userAvatar,
  popupAvatar,
  popupRemoval,
  changeAvatar
} from '../uitls/constants.js'

import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { validationConfiguration, settings } from '../uitls/constants.js';
import { initialCards } from '../uitls/initials.js';
import { api } from '../components/Api.js';

// переменные для ПР7

const formValidationCard = new FormValidator(validationConfiguration, popupAddCard);
const formValidationInfo = new FormValidator(validationConfiguration, popupEdit);
const formValidationAvatar = new FormValidator(validationConfiguration, popupAvatar);
formValidationCard.setEventListeners();
formValidationInfo.setEventListeners();
formValidationAvatar.setEventListeners();

// ПР9 api

let userId; // переменная для id пользователя, let потому что может перезаписываться

// делаем карточки по умолчанию

api.getInitialCards()
  .then(cardsListInitial => {
    cardsListInitial.forEach(data =>
      {
        const cardItem = createCard({
          place: data.place,
          link: data.link,
          id: data._id,
          userId: userId,
          ownerId: data.owner._id,
          likes: data.likes,
        });
        cardsList.addItems(cardItem);
      })
  });

  // инфомация о юзере

  const userInfo = new UserInfo({userName, userDescr, userAvatar});

  // берем информацию о профиле

api.getProfileInfo()
  .then(res => {
    userInfo.setUserInfo(res.name, res.description, res.avatar);
    userId = res._id;
  });

// popup edit profile

const popupWithFormEditProfile = new PopupWithForm(popupEdit, {
  submitFormHandler: (inputValues) => {
    // newUserInfo.setUserInfo(inputValues.name, inputValues.description);
    api.editProfile(inputValues.name, inputValues.description)
      .then(res => {
        userInfo.setUserInfo(res.name, res.description, res.avatar);
      })
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
    // const item = createCard({
    //   place: inputValues.place,
    //   link: inputValues.link
    // });
    api.addCard(inputValues.place, inputValues.link)
      .then(res =>
        {
          const item = createCard({
            name: data.name,
            link: data.link,
            id: data._id,
            userId: data.userId,
            ownerId: res.owner._id,
            likes: data.likes,
          });
          cardsList.addItems(item);
        });
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

// удаление

const cardDeleteConfirm = new PopupWithForm(popupRemoval, {
  submitFormHandler: () => {
  api.deleteConfirmCard(id)
  }
});

cardConfirmDelete.setEventListeners();

// аватарка

changeAvatar.addEventListener('click', () => {
  userUpdatedAvatar.open();
  formValidationAvatar.resetValidation();
})


const userUpdatedAvatar = new PopupWithForm(popupAvatar, {
  submitFormHandler: (inputValues) => {
    api.updateAvatar(inputValues.avatar)
      .then(res => {
        userInfo.setUserInfo(res.name, res.description, res.avatar);
      });
  }
});

userUpdatedAvatar.setEventListeners();

// Добвление новой карточки

function createCard(data) {
  const newCard = new Card(
    data, settings, zoomImage,
    (id) => {
      cardDeleteConfirm.open();
      cardDeleteConfirm.changeAvatarHandler(() => {
        api.deleteConfirmCard(id)
          .then(res => {
            newCard.deleteCard(res);
            cardDeleteConfirm.close();
          });
      });
    },
    (id) => {
      if (newCard.isLiked()) {
        api.deleteLikes(id)
          .then(res => {
            newCard.setLikes(res.likes)
          })
      }
        else {
          api.addLikes(id)
            .then(res => {
              newCard.setLikes(res.likes)
            })
        }
    });
  const card = newCard.addNewCard();
  return card;
};

// new section: cardslist

const cardsList = new Section(
  {
    renderer: (card) => {
      const newCard = createCard(card);
      cardsList.addItems(newCard);
    },
  } , cardsContainer );

cardsList.renderCards(initialCards);
