import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImageLink = this._popupElement.querySelector('.popup__image');
    this._popupImageDescription = this._popupElement.querySelector('.popup__description');
  };

  open(place, link) {
    this._popupImageDescription.textContent = place;
    this._popupImageLink.src = link;
    this._popupImageLink.alt = place;
    super.open();
  };
}
