export default class Card {
  constructor(data, selector, handleCardClick) {
    this._handleCardClick = handleCardClick;
    this.selector = selector;
    this._link = data.link;
    this._name = data.name;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this.selector)
    const cardItem = cardTemplate
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
    return cardItem
  }

  _setEventListeners() {
    this.deleteButton = this.element.querySelector('#cardDeleteButton');
    this.deleteButton.addEventListener('click', (evt) => {
      this._deleteCard(evt);
    });

    this.likeButton = this.element.querySelector('#likeButton');
    this.likeButton.addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });

    this.openPhotoButton = this.element.querySelector("#openedPhoto");
    this.openPhotoButton.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })

  }

  _toggleLike() {
    this.likeButton.classList.toggle('elements__like-button_active');
  }

  _deleteCard() {
    this.element.closest(".elements__element").remove();
  }

  generate() {
    this.element = this._getTemplate();
    const photoTemplate = this.element.querySelector("#photoTemplate")
    this._setEventListeners();

    photoTemplate.src = this._link;
    photoTemplate.alt = this._name;
    this.element.querySelector('#headerTemplate').textContent = this._name;

    return this.element
  }
}