let formElement = document.querySelector('.popup__opened');
let nameInput = document.querySelector('.popup__input_name');
let descrInput = document.querySelector('.popup__input_description');

nameInput.addEventListener('change', nameInputChange);
function nameInputChange() {
let valueName = nameInput.value;
let newName = document.querySelector('.profile__name');
newName.textContent = valueName;
};

descrInput.addEventListener('change', descrInputChange);
function descrInputChange() {
let valueDescr = descrInput.value;
let newDescr = document.querySelector('.profile__description');
newDescr.textContent = valueDescr;
};

formElement.addEventListener('submit', formSubmitHandler);
