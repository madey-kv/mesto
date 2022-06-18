import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popup, handleFormSubmit }) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll(".popup__item");
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.closePopup();
        });
    }

    closePopup() {
        super.closePopup();
    }
}