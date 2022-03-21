export const validationConfiguration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-border_active',
  errorClass: 'popup__input-error_active',
}

export class FormValidator {
  constructor(validationConfiguration, formElement) {
    this._formElement = formElement;
    this._inputElement = validationConfiguration.inputSelector;
    this._submitButtonSelector = validationConfiguration.submitButtonSelector;
    this._inactiveButtonClass = validationConfiguration.inactiveButtonClass;
    this._inputErrorClass = validationConfiguration.inputErrorClass;
    this._errorClass = validationConfiguration.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  };

  // показываем ошибку валидации

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  // убираем ошибку валидации

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // проверяем валидацию

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // перекрашиваем кнопку

  _setSubmitButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  };

  disableSubmitButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass)
    this._buttonElement.disbaled = true;
  }

  enableSubmitButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass)
    this._buttonElement.disbaled = false;
  }

  // функция-обработчик

  setEventListeners = () => {
    this._setSubmitButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._setSubmitButtonState();
      });
    });
  };

  // сброс валидации

  resetValidation() {
    this._setSubmitButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };
};
