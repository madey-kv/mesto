export default class FormValidator {
    constructor(obj, form) {
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(obj.inputSelector));
        this._input = this._form.querySelector(obj.inputSelector);
        this._invalidClass = obj.inputErrorClass;
        this._button = this._form.querySelector(obj.submitButtonSelector);
        this._inactiveButtonClass = obj.inactiveButtonClass;
    }

    _setInputListeners() {
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._input = input;
                this._isValid()
                this._toggleButtonState()
            })
        })
    }

    _isValid() {
        if (!this._input.validity.valid) {
            this._showError();
        } else {
            this._hideError();
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _showError() {
            this._error = this._form.querySelector(`#${this._input.id}-error`);
            this._input.parentNode.classList.add(this._invalidClass);
            this._error.textContent = this._input.validationMessage;
    }

    _hideError() {
        this._error = this._form.querySelector(`#${this._input.id}-error`);
        this._input.parentNode.classList.remove(this._invalidClass);
        this._error.textContent = '';
    }

    _disableButton() {
        this._button.classList.add(this._inactiveButtonClass);
        this._button.disabled = true;
    }

    _activateButton() {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.disabled = false;
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._activateButton();
        }
    };

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement)
        });
    }

    enableValidation() {
        this._toggleButtonState();
        this._isValid();
        this._setInputListeners()
    }
}

export { FormValidator };
