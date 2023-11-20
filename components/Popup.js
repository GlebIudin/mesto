export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closePopupButton = popup.querySelector('.popup__close-button');
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.code === 'Escape') {
      this.close()
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close()
    }
  }

  setEventListeners() {
    this._closePopupButton.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._handleOverlayClose);
  }
}