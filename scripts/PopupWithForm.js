import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = this._popup.querySelectorAll('.popup__item')
    this._submitButton = this._popup.querySelector('.submit')
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })
    return this._formValues;
  }


  waitForLoading(isLoading, popup) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      if (popup === 'add') {
        this._submitButton.textContent = 'Создать'
      } else {
        this._submitButton.textContent = 'Сохранить'
      }
    }
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    })
  }

  closePopup() {
    super.closePopup();
    this._form.reset()
  }
}
