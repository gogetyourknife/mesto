import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitFormHandler }) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popupElement.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__save-button');
  };

  _getInputValues() {
    const inputList = Array.from(this._formElement.querySelectorAll('._popup__input'));
    const inputValues = {};
    inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  };

  _submitEventHandler(evt) {
    evt.preventDefault();
    this._submitFormHandler(this._getInputValues());
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitEventHandler);
  };

  close() {
    this._form.reset();
    this._form.removeEventListeners('submit', this._submitEventHandler);
    super.close();
  };
}
