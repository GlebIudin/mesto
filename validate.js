const formValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorClass: 'popup__input_type_error',
    buttonSelector: '.popup__save-button',
    buttonDisabledClass: 'button_disabled',
}

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