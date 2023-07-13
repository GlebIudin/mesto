export default class Card {
  constructor(item, selector, openPopupHandler) {
    this.name = item.name;
    this.link = item.link;
    this.selector = selector;
    this.openPopupHandler = openPopupHandler;
  }

  //получил темплейт
  _getTemplate() {
    const cardTemplate = document.querySelector(this.selector);
    const cardItem = cardTemplate.content
      .querySelector(".elements__element")
      .cloneNode(true);
    return cardItem;
  }
  //установил слушателей
  _setEventListeners() {
    this.deleteButton = this.newCard.querySelector("#cardDeleteButton");
    this.likeButton = this.newCard.querySelector("#likeButton");
    this.openPhotoButton = this.newCard.querySelector("#openedPhoto");

    this.deleteButton.addEventListener("click", (evt) => {
      this._deleteCard(evt);
    });

    this.likeButton.addEventListener("click", (evt) => {
      this._toggleLike(evt);
    });

    this.openPhotoButton.addEventListener("click", () => {
      this._openCard(this.name, this.link);
    });
  }
  //нажатый лайк
  _toggleLike() {
    this.likeButton.classList.toggle("elements__like-button_active");
  }
  //удаление карточки
  _deleteCard() {
    this.newCard.closest(".elements__element").remove();
  }
  //открытие попапа с фотографией
  _openCard(name, link) {
    this.openPopupHandler(name, link);
  }
  //создание карточки
  generate() {
    this.newCard = this._getTemplate();
    const photoTemplate = this.newCard.querySelector("#photoTemplate")
    this._setEventListeners();

    this.newCard.querySelector("#headerTemplate").textContent = this.name;
    photoTemplate.src = this.link;
    photoTemplate.alt = this.name;

    return this.newCard;
  }
}
