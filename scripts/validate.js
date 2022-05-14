function showError(formElement, inputElement, errorMessage, obj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.parentNode.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
}

function hideError(formElement, inputElement, obj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.parentNode.classList.remove(obj.inputErrorClass);
    errorElement.textContent = '';
}

const isValid = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideError(formElement, inputElement, obj);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const disableButton = (button, obj) => {
    button.classList.add(obj.inactiveButtonClass);
    button.disabled = true;
}

const activateButton = (button, obj) => {
    button.classList.remove(obj.inactiveButtonClass);
    button.disabled = false;
}

const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, obj);
    } else {
        activateButton(buttonElement, obj);
    }
};

const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, obj);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, obj)
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};

const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, obj);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.button_type_save',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'popup__form-item_invalid'
});