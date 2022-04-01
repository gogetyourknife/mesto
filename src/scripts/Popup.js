export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeByEscape = this._closeByEscape.bind(this);
    this._handleMouseClick = this._handleMouseClick.bind(this);
  };

  setEventListeners() {
    this._popupElement.addEventListener('click', this._handleMouseClick);
    document.addEventListener('keydown', this._handleMouseClick);
  };

  removeEventListeners() {
    this._popupElement.removeEventListener('click', this._handleMouseClick);
    document.removeEventListener('keydown', this._handleMouseClick);
  };

  open() {
    this._popupElement.classList.add('popup_opened');
    this.setEventListeners();
  };

  close() {
    this._popupElement.classList.remove('popup_opened');
    this.removeEventListeners();

  };

  _closeByEscape (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _handleMouseClick (evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };
}
