import Card from '../scripts/Card.js';
import InitialCards from '../scripts/cards.js';
import PopupWithImage from '../scripts/PopupWithImage';
import Section from "../scripts/Section";
import '../pages/index.css';
import PopupWithForm from "../scripts/PopupWithForm";
import { jobInput, nameInput, popupAddPhoto, profilePopup } from "../scripts/constants";
import FormValidator from "../scripts/FormValidation";
import validate from "../scripts/validate";
import UserInfo from '../scripts/UserInfo.js';

const popupWithImage = new PopupWithImage('#popupPhoto');
popupWithImage.setEventListeners();
const section = new Section({
  items: InitialCards,
  createElementHandler: (cardInfo) => {
    const card = new Card(
      cardInfo,
      '#postTemplate',
      () => popupWithImage.open(cardInfo.name, cardInfo.link)
    );
    return card.generate();
  }
}, '.elements');

const addPhotoPopup = new PopupWithForm('#popupAddPhoto', (inputInfo) => {
  const card = new Card(
    {
      name: inputInfo.photoName_input,
      link: inputInfo.photoURL_input
    },
    '#postTemplate',
    () => popupWithImage.open(inputInfo.photoName_input, inputInfo.photoURL_input)
  );
  const cardTemplate = card.generate();
  section.addItem(cardTemplate);
});
addPhotoPopup.setEventListeners();

const userInformation = new UserInfo('.profile__username', '.profile__description');

const profileEditPopup = new PopupWithForm('#popupProfileEdit', (inputInfo) => {
  inputInfo = { nameInput, jobInput };
  userInformation.setUserInfo(nameInput.value, jobInput.value);
  profileEditPopup.close()
});


document.querySelector('.profile__edit-button').addEventListener('click', function (event) {
  const [nameElement, descriptionElement] = userInformation.getUserInfo();
  nameInput.value = nameElement;
  jobInput.value = descriptionElement;
  profileEditPopup.open();
})
profileEditPopup.setEventListeners();

document.querySelector('.profile__add-button').addEventListener('click', () => {
  addPhotoPopup.open();
})

const formEditProfileValidation = new FormValidator(validate, profilePopup);
formEditProfileValidation.enableValidation();
const formAddPhotoValidation = new FormValidator(validate, popupAddPhoto);
formAddPhotoValidation.enableValidation();



