import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({popup, handleFormSubmit}) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }
}

