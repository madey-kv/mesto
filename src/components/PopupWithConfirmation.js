import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._submitButton = this._popup.querySelector('.button_type_save')
  }

  setCallback(handleSubmit) {
    this.handleSubmit = handleSubmit
  }

  setEventListeners() {
    super.setEventListeners()
    this._submitButton.addEventListener('click', () => {
      this.handleSubmit();
    });
  }

  openPopup(cardId) {
    super.openPopup()
    this._cardId = cardId
  }
}
