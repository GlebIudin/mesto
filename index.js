const profilePopup = document.querySelector("#popupProfileEdit");
const openAddPhotoPopup = document.querySelector("#popupAddPhoto");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const addButton = document.querySelector(".profile__add-button");
const photoClosePopupButton = document.querySelector("#photoPopupClose");
const name = document.querySelector(".profile__username");
const job = document.querySelector(".profile__description");
const elements = document.querySelector(".elements");
const postTemplate = document.querySelector("#postTemplate");
const userPost = postTemplate.content.querySelector(".elements__element");
const photoURLTemplate = userPost.querySelector("#photoTemplate");
const photoAltTemplate = userPost.querySelector("#photoTemplate");
const photoNameTemplate = userPost.querySelector("#headerTemplate");
const popupOpenPhoto = document.querySelector('#popupOpenPhoto');
const popupImage = document.querySelector('.popup__image')
const popupImageTitle = document.querySelector('.popup__img-title')
const formPhotoElement = document.querySelector("#photoAddForm");
const photoName = document.querySelector("#photoName_input");
const photoURL = document.querySelector("#photoURL_input");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector("#name_input");
const jobInput = document.querySelector("#job_input");
const popup = document.querySelector('.popup')

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function fillInputs() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

//Profile listeners
editButton.addEventListener("click", function () {
  openPopup(profilePopup)
}, fillInputs());

closeButton.addEventListener('click', function () {
  closePopup(profilePopup);
});

//Add photo listeners

addButton.addEventListener("click", function () {
  openPopup(openAddPhotoPopup);
});

photoClosePopupButton.addEventListener("click", function () {
  closePopup(openAddPhotoPopup);
});

//Open photo listeners

closeButton.addEventListener("click", function () {
  closePopup(popupOpenPhoto)
});

popupOpenPhoto.addEventListener('click', function () {
  closePopup(popupOpenPhoto)
});

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

  closePopup(popup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

function pushedLike(evt) {
  evt.target.classList.toggle("elements__like-button_active");
}

initialCards.forEach((card) => {
  const userPostCopy = createCard(card);
  elements.append(userPostCopy);
});

function pushedLike(evt) {
  evt.target.classList.toggle('elements__like-button_active');
}

function handleFormSubmitPhoto(evt) {
  evt.preventDefault();
  const userPostCopy = createCard({
    link: photoURL.value,
    alt: "Созданное пользователем изображение",
    name: photoName.value
  });
  elements.prepend(userPostCopy);

  closePopup(openAddPhotoPopup);
  evt.target.reset()
};

formPhotoElement.addEventListener("submit", handleFormSubmitPhoto);

function createCard(item) {
  photoURLTemplate.src = item.link;
  photoAltTemplate.alt = item.alt;
  photoNameTemplate.textContent = item.name;
  const userPostCopy = postTemplate.content.cloneNode(true);

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
    popupImage.src = item.link;
    popupImageTitle.textContent = item.name;
    popupImageTitle.alt = item.alt;
  });

  return userPostCopy
}

