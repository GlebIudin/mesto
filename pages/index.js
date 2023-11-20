import Card from '../components/Card.js';
import initialCards from '../src/utils/cards.js';
import { containerSelector, profileEditButton, profilePopupSelector, popupCloseButton, addPhotoPopupSelector, profileAddButton, openedPhotoPopupSelector, nameInput, jobInput, addPhotoButton } from '../src/utils/constants.js';
import FormValidator from '../components/FormValidation';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import formValidationConfig from '../src/utils/validate.js';
import '../pages/index.css';

//Функция открытия карточки
function handleCardClick(name, link) {
  openedPhotoPopup.open(name, link);
}

//Создаём экземпляр класса PopupWithForm для попапа профиля
const profilePopup = new PopupWithForm(profilePopupSelector, handleFormSubmitProfile);
profilePopup.setEventListeners();

//Накинули слушателя на кнопку редактирования инфы профиля. Создаём userInfo, который вызывает метод getUserInfo и подставляем полученные значения в инпуты.
profileEditButton.addEventListener('click', () => {
  const userInfo = userData.getUserInfo();
  nameInput.value = userInfo.nameSelector;
  jobInput.value = userInfo.jobSelector;

  profileValidation.updateValidationProcces();

  profilePopup.open();
});

//Создаём экземпляр класса UserInfo для обработки данных юзера.
const userData = new UserInfo({ nameSelector: '.profile__username', jobSelector: '.profile__description' })

//Функция сабмита попапа профиля
function handleFormSubmitProfile(data) {
  userData.setUserInfo(data);
  profilePopup.close();
}

//Подключаем валидацию к попапу заполнения инфы профиля.
const profileValidation = new FormValidator(formValidationConfig, profilePopupSelector);
profileValidation.enableValidation();

//Создаём экземпляр класса PopupWithForm для попапа добавления фото
const addPhotoPopup = new PopupWithForm(addPhotoPopupSelector, handleFormSubmitCards);
addPhotoPopup.setEventListeners()

//Функция сабмита попапа добавления фото
function handleFormSubmitCards(item) {
  createCard(item);
  addPhotoPopup.close();
};

//Подключаем валидацию к попапу добавления фото.
const formPhotoValidation = new FormValidator(formValidationConfig, addPhotoPopupSelector);
formPhotoValidation.enableValidation();

//Накинули слушателя на кнопку добавления фото.
addPhotoButton.addEventListener('click', () => {
  formPhotoValidation.updateValidationProcces();
  addPhotoPopup.open()
})

//Функция создания карточки
function createCard(item) {
  const card = new Card(item, '#postTemplate', handleCardClick);
  const cardPost = card.generate();
  cardList.addItem(cardPost);
}

//Создаём экземпляр класса Section для подгрузки массива initialCards
const cardList = new Section({
  renderer: (element) => createCard(element),
},
  '.elements',
);

//Зарендерили массив
cardList.renderElements(initialCards);

//Создаём экземпляр класса PopupWithImage для попапа с открытым фото
const openedPhotoPopup = new PopupWithImage(openedPhotoPopupSelector);
openedPhotoPopup.setEventListeners();