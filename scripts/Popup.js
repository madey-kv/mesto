export default class Popup {
    constructor (popup) {
        this._popup = document.querySelector(popup);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    openPopup () {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handleOverlayClose);
    }

    closePopup () {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._handleOverlayClose);
    }

    _handleEscClose (evt) {
        if (evt.key === "Escape") {
            this.closePopup()
        }
    }

    _handleOverlayClose = (evt) => {
        if (evt.target === evt.currentTarget) {
          this.closePopup();
        }
    };

    setEventListeners () {
        this._closeButton = this._popup.querySelector('.button_type_close')
        this._closeButton.addEventListener('click', () => this.closePopup());
    }
}