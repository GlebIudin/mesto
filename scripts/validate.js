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
        enableFormValidation(form, config);
    })
}

function enableFormValidation(form, config) {
    form.addEventListener('submit', disableSubmit);
    form.addEventListener('input', () => {
        toggleButton(form, config);
    });

    addInputListeners(form, config);
    toggleButton(form, config);
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

function addInputListeners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));

    inputList.forEach(function (item) {
        item.addEventListener('input', (evt) => {
            handleFormInput(evt, config)
        });
    })
}

function toggleButton(form, config) {
    const buttonSubmit = form.querySelector(config.buttonSelector);
    const isFormValid = form.checkValidity();

    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classList.toggle('button_disabled')
}

enableValidation(formValidationConfig);