import Card from './Card.js';
import InitialCards from './cards.js';
import * as constants from './constants.js';
import formValidationConfig from './validate.js';
import FormValidation from './FormValidation.js';

function renderCard(card) {
  constants.elementsContainer.prepend(card);
}

function loadCard(item) {
  const card = new Card(item, '#postTemplate', openCard);
  const postedCard = card.generate();
  renderCard(postedCard);
}

function startingCards(items) {
  items.forEach(item => {
    loadCard(item)
  })
}

//загрузка карточек при открытии сайта
startingCards(InitialCards);

function openCard(name, link) {
  constants.photoPopupName.textContent = name;
  constants.photoPopupImage.src = link;
  openPopup(constants.photoPopup);
} 

const closePopupByOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

function fillProfileInputs(profilePopup) {
  constants.nameInput.value = constants.name.textContent;
  constants.jobInput.value = constants.job.textContent;
}

//Код отвечающий за закрытие по оверлэю и эскейпу

const closePopupByEsc = (evt) => {
  if (evt.code === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// Listeners

constants.closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

constants.editButton.addEventListener("click", function () {
  fillProfileInputs(constants.profilePopup)
  openPopup(constants.profilePopup);
});

constants.addButton.addEventListener("click", function () {
  openPopup(constants.popupAddPhoto);
});

constants.popupAddPhoto.addEventListener('click', closePopupByOverlay);
constants.profilePopup.addEventListener('click', closePopupByOverlay);
constants.photoPopup.addEventListener('click', closePopupByOverlay);

// Обработчик «отправки» формы
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  constants.name.textContent = constants.nameInput.value;
  constants.job.textContent = constants.jobInput.value;

  closePopup(constants.profilePopup);
}

constants.formProfile.addEventListener("submit", handleFormSubmitProfile);
constants.formPhoto.addEventListener("submit", handleFormSubmitPhoto);


// initialCards.forEach((card) => {
//   const userPostCopy = createCard(card);
//   constants.elementsContainer.append(userPostCopy);
// });

function handleFormSubmitPhoto(evt) {
  evt.preventDefault();
  const userPostCopy = loadCard({
    link: constants.photoURL.value,
    alt: constants.photoName.value,
    name: constants.photoName.value
  });

  closePopup(constants.popupAddPhoto);
  evt.target.reset()
  buttonSubmitPhoto.disabled = true;
};

// и её слушатель

constants.formPhotoElement.addEventListener("submit", handleFormSubmitPhoto);


const formEditProfileValidation = new FormValidation(formValidationConfig, constants.formProfile);
formEditProfileValidation.enableValidation();
const formAddPhotoValidation = new FormValidation(formValidationConfig, constants.popupAddPhoto);
formAddPhotoValidation.enableValidation();