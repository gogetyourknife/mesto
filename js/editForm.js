document.querySelector('.profile__edit-button').addEventListener('click', () => {
  document.querySelector('.popup').classList.toggle('popup__opened');
});

document.querySelector('.popup__close-button').addEventListener('click', () => {
  document.querySelector('.popup').classList.toggle('popup__opened');
});
