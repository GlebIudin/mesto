export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._submitButton = this._form.querySelector(this._config.buttonSelector);
    }

    _isInvalid = () => {
        return this._inputList.some((formElement) => {
            return !formElement.validity.valid;
        })
    }

    _isValid = (inputElement) => {
        if(inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage)
        }
    }

    _toggleButton = () => {
        if (this._isInvalid()) {
            this._submitButton.disabled = true;
            this._submitButton.classList.add(this._config.buttonDisabledClass);
        } else {
            this._submitButton.disabled = false;
            this._submitButton.classList.remove(this._config.buttonDisabledClass);
        }
    }

    updateValidationProcces() {
        this._toggleButton()
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        })
    }

    _hideInputError = (inputElement) => {
        const _error = this._form.querySelector(`#${inputElement.id}-error`);
        _error.classList.add(this._config.errorClass);
    }

    _showInputError = (inputElement, errorMessage) => {
        const _error = this._form.querySelector(`#${inputElement.id}-error`);
        _error.textContent = errorMessage;
        _error.classList.remove(this._config.errorClass);
    }


    _setEventListeners = () => {
        this._submitButton = this._form.querySelector(this._config.buttonSelector);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButton();
            })
        })
        this._toggleButton(this._submitButton, this._inputList);
    }

    enableValidation = () => {
        this._setEventListeners();
    }
}