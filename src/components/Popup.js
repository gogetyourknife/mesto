export class Popup {
  constructor(popupSelector) {
    this._popupElement = popupSelector;
    this._closeByEscape = this._closeByEscape.bind(this);
  };

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEscape);
  };

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEscape);
  };

  _closeByEscape (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
