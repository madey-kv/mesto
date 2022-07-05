import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmPopup) {
    super(popupSelector)
    this._handleConfirmation = handleConfirmPopup;
    this._submitButton = this._popup.querySelector('.button_type_save')
    this._confirmation = this._confirmation.bind(this)
  }

  _confirmation() {
    this._handleConfirmation(this._cardId)
  }

  _removeEventListeners() {
    super._removeEventListeners()
    this._submitButton.removeEventListener('click', this._confirmation)
  }

  setEventListeners() {
    super.setEventListeners()
    this._submitButton.addEventListener('click', this._confirmation)
  }

  openPopup(cardId) {
    super.openPopup()
    this._cardId = cardId
  }
}
