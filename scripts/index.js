const profilePopup = document.querySelector("#popupProfileEdit");
const openAddPhotoPopup = document.querySelector("#popupAddPhoto");
const addButton = document.querySelector(".profile__add-button");
const name = document.querySelector(".profile__username");
const job = document.querySelector(".profile__description");
const elements = document.querySelector(".elements");
const postTemplate = document.querySelector("#postTemplate");
const userPost = postTemplate.content.querySelector(".elements__element");
const photoTemplate = userPost.querySelector("#photoTemplate");
const photoNameTemplate = userPost.querySelector("#headerTemplate");
const popupOpenPhoto = document.querySelector('#popupOpenPhoto');
const popupImage = document.querySelector('.popup__image')
const popupImageTitle = document.querySelector('.popup__img-title')
const formPhotoElement = document.querySelector("#photoAddForm");
const photoName = document.querySelector("#photoName_input");
const photoURL = document.querySelector("#photoURL_input");
const formPhoto = document.querySelector("#photoAddForm");
const formProfile = document.querySelector('#userForm');
const nameInput = document.querySelector("#name_input");
const jobInput = document.querySelector("#job_input");
const closeButtons = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector(".profile__edit-button");
const buttonSubmitPhoto = document.querySelector('#buttonSubmitPhoto');

const closePopupByOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

popupOpenPhoto.addEventListener('click', closePopupByOverlay)
profilePopup.addEventListener('click', closePopupByOverlay);
openAddPhotoPopup.addEventListener('click', closePopupByOverlay);

function fillProfileInputs(profilePopup) {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

//Код отвечающий за закрытие по оверлэю и эскейпу

const closePopupByEsc = (evt) => {
  if (evt.code === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function openPopup(profilePopup) {
  profilePopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// Listeners

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

editButton.addEventListener("click", function () {
  fillProfileInputs()
  openPopup(profilePopup);
});

addButton.addEventListener("click", function () {
  openPopup(openAddPhotoPopup);
});

// Обработчик «отправки» формы
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closePopup(profilePopup);
}

formProfile.addEventListener("submit", handleFormSubmitProfile);
formPhoto.addEventListener("submit", handleFormSubmitPhoto);

function toggleLike(evt) {
  evt.target.classList.toggle("elements__like-button_active");
}

initialCards.forEach((card) => {
  const userPostCopy = createCard(card);
  elements.append(userPostCopy);
});

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
  buttonSubmitPhoto.disabled = true;
};

formPhotoElement.addEventListener("submit", handleFormSubmitPhoto);

function createCard(item) {
  photoTemplate.src = item.link;
  photoTemplate.alt = item.alt;
  photoNameTemplate.textContent = item.name;
  const userPostCopy = postTemplate.content.cloneNode(true);

  const like = userPostCopy.querySelector('#likeButton');

  like.addEventListener('click', toggleLike);

  const cardDeleteButton = userPostCopy.querySelector("#cardDeleteButton");
  cardDeleteButton.addEventListener('click', function () {
    const postedCard = cardDeleteButton.closest('.elements__element');
    postedCard.remove()
  })

  const cardOpenButton = userPostCopy.querySelector('#openedPhoto');

  cardOpenButton.addEventListener("click", function (event) {
    openPopup(popupOpenPhoto)
    popupImage.src = item.link;
    popupImageTitle.textContent = item.name;
    popupImageTitle.alt = item.alt;
  });

  return userPostCopy
}
