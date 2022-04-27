import { Popup } from './Popup.js'

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitSelector) {
    super(popupSelector);
    this._submit = submitSelector;
  }

  deleteSubmitHandler(newSubmitHandler) {
    this._submitFormHandler = newSubmitHandler
  }

  _formSubmitHandler (evt) {
    evt.preventDefault();
    this._submitFormHandler();
  }

  setEventListeners() {
    super.setEventListeners();
    this._submit.addEventListener('submit', this._formSubmitHandler);
  }
}
