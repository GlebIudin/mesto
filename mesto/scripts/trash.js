// FORM

function disableSubmit(evt) {
    evt.preventDefault();
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((form) => {
        setEventListeners(form, config);
    })
}

function setEventListeners (form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonSubmit = form.querySelector(config.buttonSelector);

    inputList.forEach(function (item) {
        item.addEventListener('input', (evt) => {
            handleFormInput(evt, config)
        });
    })
    
    form.addEventListener('submit', disableSubmit);
    form.addEventListener('input', () => {
        toggleButton(form, buttonSubmit, config);
    });

    toggleButton(form, buttonSubmit, config);
}


function handleFormInput(evt, config) {
    const input = evt.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`);
    if (input.validity.valid) {
        input.classList.remove(config.errorClass);
        errorElement.textContent = '';
    } else {
        input.classList.add(config.errorClass)
        errorElement.textContent = input.validationMessage;
    }
}

function toggleButton(form, buttonSubmit) {
    const isFormValid = form.checkValidity();

    buttonSubmit.disabled = !isFormValid;
}

enableValidation(formValidationConfig);

// FORM

// Старая функция создания карточки:
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

  // Старая функция создания карточки


class Card {
    constructor(data, selector) {
        this._selector = selector;
        this._name = data.name;
        this._link = data.link
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._selector)
            .content
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('#headerTemplate').innerText = this._name;
        this._element.querySelector('#photoTemplate').src = this._link;
        this._element.querySelector('#photoTemplate').alt = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('#likeButton').addEventListener('click', (evt) => {
            this._toggleLike(evt);
        });

        this._element.querySelector('#cardDeleteButton').addEventListener('click', (evt) => {
            this._deleteCard(evt);
        })

        this._element.querySelector('#popupOpenPhoto')
    }

    _toggleLike(evt) {
        evt.target.classList.toggle("elements__like-button_active");
    }

    _deleteCard(evt) {
        evt.target.closest('.elements__element').remove();
    }

    _openPopup(popup) {
        popup.classList.add('popup_opened');

        this._setEventListenersPopup()
    }

    _setEventListenersPopup() {

        this.popup.addEventListener('click', this._closePopupByOverlay);
        this.popup.addEventListener('keydown', this._closePopupByEscape)
    }

    _closePopup(popup) {
        popup.classList.remove('popup_opened');

        //снять листнер оверлея
    }

    _closePopupByOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            this._closePopup(evt.target)
        }
    };

    _closePopupByEscape = (evt) => {
        if (evt.code === 'Escape') {
            const popupOpened = document.querySelector('.popup_opened');
            this_closePopup(popupOpened);
        }
    };


}