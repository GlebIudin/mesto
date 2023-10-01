export default class Popup {

  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown',  (evt) => this._handleEscClose(evt));
    this._popupElement.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.removeEventListener('mousedown', this._handleOverlayClose);
  }
  _handleEscClose(evt) {
    if (evt.code === 'Escape'){
      this.close()
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget){
      this.close()
    }
  }

  setEventListeners() {
    this._popupElement.querySelector('.popup__close-button').addEventListener('click', () => {
      this.close();
    });
  }
};