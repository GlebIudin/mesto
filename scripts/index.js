const openPopup = document.querySelector("#popupProfileEdit");
const openAddPhotoPopup = document.querySelector("#popupAddPhoto");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const addButton = document.querySelector(".profile__add-button");
const photoClosePopupButton = document.querySelector("#photoPopupClose");
let name = document.querySelector(".profile__username");
let job = document.querySelector(".profile__description");
const elements = document.querySelector(".elements");
const postTemplate = document.querySelector("#postTemplate");
const userPost = postTemplate.content.querySelector(".elements__element");
const photoURLTemplate = userPost.querySelector("#photoTemplate");
const photoAltTemplate = userPost.querySelector("#photoTemplate");
const photoNameTemplate = userPost.querySelector("#headerTemplate");
const popupOpenPhoto = document.querySelector('#popupOpenPhoto');
let popupImage = document.querySelector('.popup__image')
let popupImageTitle = document.querySelector('.popup__img-title')
let formPhotoElement = document.querySelector("#photoAddForm");
let photoName = document.querySelector("#photoName_input");
let photoURL = document.querySelector("#photoURL_input");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector("#name_input");
let jobInput = document.querySelector("#job_input");


function popOpen() {
  openPopup.classList.add("popup_opened");

  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function popClose() {
  openPopup.classList.remove("popup_opened");
}

function popPhotoAddOpen() {
  openAddPhotoPopup.classList.add("popup_opened");
}

function popPhotoAddClose() {
  openAddPhotoPopup.classList.remove("popup_opened");
}

editButton.addEventListener("click", popOpen);
closeButton.addEventListener("click", popClose);
addButton.addEventListener("click", popPhotoAddOpen);
photoClosePopupButton.addEventListener("click", popPhotoAddClose);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  popClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Виды Архыза",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Виды Челябинской области",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Виды города Иваново",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Виды Камчатки",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Виды Холмогорского района",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Виды Байкала",
  },
];

function pushedLike(evt) {
  evt.target.classList.toggle("elements__like-button_active");
}

function openedPhoto() {
  popupOpenPhoto.classList.add("popup_opened");
}

function closedPhoto() {
  popupOpenPhoto.classList.remove("popup_opened");
}

initialCards.forEach((card) => {
  photoURLTemplate.src = card.link;
  photoAltTemplate.alt = card.alt;
  photoNameTemplate.textContent = card.name;
  let userPostCopy = postTemplate.content.cloneNode(true);

  const like = userPostCopy.querySelector('#likeButton');

  like.addEventListener('click', pushedLike);

  const cardDeleteButton = userPostCopy.querySelector("#cardDeleteButton");
  cardDeleteButton.addEventListener('click', function () {
    const postedCard = cardDeleteButton.closest('.elements__element');
    postedCard.remove()
  })

  const cardOpenButton = userPostCopy.querySelector('#openedPhoto');

  cardOpenButton.addEventListener("click", function (event) {
    popupOpenPhoto.classList.add('popup_opened');
    popupImage.src = card.link;
    popupImageTitle.textContent = card.name;
    popupImageTitle.alt = card.alt;
  });

  elements.append(userPostCopy);
});

function handleFormSubmitPhoto(evt) {
  evt.preventDefault();
  photoURLTemplate.src = photoURL.value;
  photoAltTemplate.alt = "Добавленное пользователем изображение";
  photoNameTemplate.textContent = photoName.value;
  const link = photoURL.value;
  const title = photoName.value;
  const userPostCopy = postTemplate.content.cloneNode(true);
  const like = userPostCopy.querySelector('#likeButton');
  function pushedLike(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  }
  like.addEventListener('click', pushedLike);

  const cardDeleteButton = userPostCopy.querySelector('#cardDeleteButton');
  cardDeleteButton.addEventListener('click', function () {
    const postedCard = cardDeleteButton.closest('.elements__element');
    postedCard.remove()
  })

  const cardOpenButton = userPostCopy.querySelector('#openedPhoto');

  cardOpenButton.addEventListener('click', function (event) {
    popupOpenPhoto.classList.add('popup_opened');
    popupImage.src = link;
    popupImageTitle.textContent = title;
    popupImageTitle.alt = "Добавленное пользователем изображение";
  });

  elements.prepend(userPostCopy);

  popPhotoAddClose();
};

formPhotoElement.addEventListener("submit", handleFormSubmitPhoto);
popupOpenPhoto.addEventListener('click', closedPhoto);



