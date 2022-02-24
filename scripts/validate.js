const validationConfiguration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-border_active',
  errorClass: 'popup__input-error_active',
}

// показываем ошибку валидации

const showInputError = (formElement, inputElement, errorMessage, validationConfiguration) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfiguration.inputErrorClass);
  errorElement.classList.add(validationConfiguration.errorClass);
  errorElement.textContent = errorMessage;
};

// убираем ошибку валидации

const hideInputError = (formElement, inputElement, validationConfiguration) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfiguration.inputErrorClass);
  errorElement.classList.remove(validationConfiguration.errorClass);
  errorElement.textContent = '';
};

// проверяем валидацию

const checkInputValidity = (formElement, inputElement, validationConfiguration) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfiguration);
  } else {
    hideInputError(formElement, inputElement, validationConfiguration);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// перекрашиваем кнопку

function setSubmitButtonState(inputList, buttonElement, validationConfiguration) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfiguration.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfiguration.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// функция-обработчик

const setEventListeners = (formElement, validationConfiguration) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfiguration.inputSelector));
  const buttonElement = formElement.querySelector(validationConfiguration.submitButtonSelector);
  setSubmitButtonState(inputList, buttonElement, validationConfiguration);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfiguration);
      setSubmitButtonState(inputList, buttonElement, validationConfiguration);
    });
  });
};

// передаем обработчик в основную функцию

const enableValidation = (validationConfiguration) => {
  const formList = Array.from(document.querySelectorAll(validationConfiguration.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfiguration);
  });
};

// сброс валидации

function resetValidation(inputList, buttonElement, formElement, validationConfiguration) {
  setSubmitButtonState(inputList, buttonElement, validationConfiguration);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfiguration);
  });
}

  enableValidation(validationConfiguration);
