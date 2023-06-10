const profilePopup = document.querySelector("#popupProfileEdit");
const openAddPhotoPopup = document.querySelector("#popupAddPhoto");
const addButton = document.querySelector(".profile__add-button");
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
const closeButtons = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector(".profile__edit-button");

// Array

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

  handlePopupOverlay(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function fillInputs() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

//Код отвечающий за закрытие по оверлэю и эскейпу

function handleClosePopup (popup) {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.classList.remove('popup_opened');
}

const closePopupByOverlay = (evt) => {
  if(evt.target === evt.currentTarget) {
    handleClosePopup(evt.target);
  }
}

function handlePopupOverlay (popup) {
  popup.addEventListener('click', closePopupByOverlay);
}

const closePopupByEsc = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.code === 'Escape' && popupOpened) {
    handleClosePopup(popupOpened);
  }
}

document.addEventListener('keydown', closePopupByEsc);

// Listeners

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

editButton.addEventListener("click", function () {
  openPopup(profilePopup)
}, fillInputs());

addButton.addEventListener("click", function () {
  openPopup(openAddPhotoPopup);
});

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closePopup(popup);
}
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
    alt: photoName.value,
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

  popupOpenPhoto.addEventListener('click', closePopupByOverlay)
  
  return userPostCopy
}
