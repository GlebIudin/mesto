import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._submitFormHandler = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this.submitButton = this._form.querySelector('.popup__save-button');
  }

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    const data = {};
    inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    return data
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues())
      this.close();
    });
  }

  close() {
    super.close();

    this._form.reset();
  }
}