import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitFormHandler }) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popupElement.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__save-button');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  };

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  };

  changeAvatarHandler(changeAvatar) {
    this._submitFormHandler = changeAvatar;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues());
      this.close();
    }
  )
};

  close() {
    this._form.reset();
    super.close();
  };
}
