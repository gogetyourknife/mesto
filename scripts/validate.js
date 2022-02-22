// показываем ошибку валидации

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input-border_active');
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
};

// убираем ошибку валидации

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input-border_active');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

// проверяем валидацию

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// перекрашиваем кнопку

const setSubmitButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_disabled');
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove('popup__save-button_disabled');
    buttonElement.removeAttribute('disabled', '');
  }
};

// функция-обработчик

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save-button');
  setSubmitButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      setSubmitButtonState(inputList, buttonElement);
    });
  });
};

// передаем обработчик в основную функцию

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
   formList.forEach((formElement) => {
   formElement.addEventListener('submit', (evt) => {
     evt.preventDefault();
   });
     setEventListeners(formElement);
 });
 }

 // элементы деструктуризации

  enableValidation({
    formElement: '.popup__form',
    inputElement: '.popup__input',
    errorMessage: 'form__input-error'
  });
