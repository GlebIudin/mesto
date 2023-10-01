import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector('.popup__image');
    this._title = this._popupElement.querySelector('.popup__img-title');
  }

  open(title, link) {
    super.open();
    this._title.textContent = title;
    this._image.src = link;
    this._image.alt = `${title}`;
  }
}