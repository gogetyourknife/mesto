let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let popupEdit = document.querySelector('.profile__edit-button');
let popupClosed = document.querySelector('.popup__close-button');
let popupSaved = document.querySelector('.popup__save-button')
let nameInput = document.querySelector('.popup__input_type_name');
let descrInput = document.querySelector('.popup__input_type_description');
let newName = document.querySelector('.profile__name');
let newDescr = document.querySelector('.profile__description');

function openPopup () {
  popup.classList.toggle('popup_opened');
  nameInput.value = newName.innerHTML;
  descrInput.value = newDescr.innerHTML;
}
popupEdit.addEventListener('click', openPopup);

function closePopup () {
  popup.classList.toggle('popup_opened');
}
popupClosed.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  newName.textContent = nameInput.value;
  newDescr.textContent = descrInput.value;
}
popupSaved.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
