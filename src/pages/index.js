import './index.css';

import {
  inputWithName,
  inputWithDescription,
  buttonEditProfile,
  buttonAddInformation,
  buttonChangeAvatar,
  popupEdit,
  popupAddCard,
  popupZoomImage,
  cardsContainer,
  userName,
  userDescr,
  userAvatar,
  popupAvatar,
  popupRemoval,
} from '../uitls/constants.js'

import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { validationConfiguration, settings } from '../uitls/constants.js';
import { api } from '../components/Api.js';

// api

let userId = null;

const userInfo = new UserInfo({userName, userDescr, userAvatar});

const cardsList = new Section(
  {
    items: [],
    renderer: (card) => {
      cardsList.addItems(createCard(card));
    },
  } , cardsContainer );

// делаем карточки по умолчанию

const getUserInfo = api.getProfileInfo();
const getCards = api.getInitialCards();

Promise.all([getUserInfo, getCards])
  .then(([userData, items]) => {
    userInfo.setUserAvatar(userData.avatar);
    userInfo.setUserInfo(userData.name, userData.about);
    userId = userData._id;

    items.reverse().forEach(data => {
      const cardItem = {
        name: data.name,
        link: data.link,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id,
        likes: data.likes,
      }
      cardsList.addItems(createCard(cardItem));
         console.log(cardItem);
    });
  })
  .catch((err) => {
    console.log(err);
  });

/* POPUP */

const formValidationCard = new FormValidator(validationConfiguration, popupAddCard);
const formValidationInfo = new FormValidator(validationConfiguration, popupEdit);
const formValidationAvatar = new FormValidator(validationConfiguration, popupAvatar);
formValidationCard.setEventListeners();
formValidationInfo.setEventListeners();
formValidationAvatar.setEventListeners();

// popup edit profile

const popupWithFormEditProfile = new PopupWithForm(popupEdit, {
  submitFormHandler: (inputValues) => {
    popupWithFormEditProfile.renderLoading(true);
    api.editProfile(inputValues.name, inputValues.about)
      .then(res => {
        userInfo.setUserInfo(res.name, res.about);
        popupWithFormEditProfile.close();
      })
      .finally(() => {
        popupWithFormEditProfile.renderLoading(false);
      }
      )
    }
});

buttonEditProfile.addEventListener('click', () => {
  const {name, about} = userInfo.getUserInfo();
  popupWithFormEditProfile.open();
  inputWithName.value = name;
  inputWithDescription.value = about;
  formValidationInfo.resetValidation();
});

popupWithFormEditProfile.setEventListeners();

// add card popup

const popupWithFormAddCard = new PopupWithForm(popupAddCard, {
  submitFormHandler: (inputValues) => {
    popupWithFormAddCard.renderLoading(true);
    api.addCard(inputValues.place, inputValues.link)
      .then(res =>
        {
          const item = createCard({
            name: res.name,
            link: res.link,
            id: res._id,
            userId: userId,
            ownerId: res.owner._id,
            likes: res.likes,
          });
          cardsList.addItems(item);
          popupWithFormAddCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormAddCard.renderLoading(false);
        });
    }
});

buttonAddInformation.addEventListener('click', () => {
  popupWithFormAddCard.open();
  formValidationCard.resetValidation();
});

popupWithFormAddCard.setEventListeners();

// popup with image

const popupWithImage = new PopupWithImage(popupZoomImage);

// zoom image

function zoomImage(place, link) {
  popupWithImage.open(place, link);
};

popupWithImage.setEventListeners();

// аватарка

const userUpdatedAvatar = new PopupWithForm(popupAvatar, {
  submitFormHandler: (inputValues) => {

  userUpdatedAvatar.renderLoading(true)
    api.updateAvatar(inputValues.avatar)
      .then(res => {
          userInfo.setUserAvatar(res.avatar)
          userUpdatedAvatar.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
         userUpdatedAvatar.renderLoading(false)
      })
    }
  });

  userUpdatedAvatar.setEventListeners();

  buttonChangeAvatar.addEventListener ('click', () => {
  userUpdatedAvatar.open();
  formValidationAvatar.resetValidation();
})

// удаление

const popupWithDelete = new PopupWithForm(popupRemoval, {
  submitFormHandler: () => {}
  });

popupWithDelete.setEventListeners();


// Добвление новой карточки

function createCard(data) {
  const newCard = new Card(
    data, settings, zoomImage,

    (id) => {
      popupWithDelete.open();
      popupWithDelete.updateSubmitHandler(() => {
        popupWithDelete.renderLoading(true);
        api.deleteCard(id)
          .then(res => {
            newCard.deleteCard(res);
            popupWithDelete.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            userUpdatedAvatar.renderLoading(false)
         });
      });
    },

    (id) => {
      if (newCard.isLiked()) {
        api.deleteLikes(id)
          .then(res => {
            newCard.setLikes(res.likes)
          })
          .catch((err) => {
            console.log(err);
          })
      }
        else {
          api.addLikes(id)
            .then(res => {
              newCard.setLikes(res.likes)
            })
            .catch((err) => {
              console.log(err);
            })
        }
    });
  const card = newCard.addNewCard();
  return card;
}
