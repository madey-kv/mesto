export default class Popup {
    constructor (popup) {
        this._popup = document.querySelector(popup);
    }

    openPopup () {
        this._popup.classList.add('popup_opened');
    }

    closePopup () {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('click', this._handleOverlayClose);
    }

    _handleEscClose (evt) {
        if (evt.key === "Escape") {
            this.closePopup()
        }
    }

    _handleOverlayClose = (evt) => {
        if (evt.target === evt.currentTarget) {
            evt.target.closePopup();
        }
    };

    setEventListeners () {
        const closeButtons = document.querySelectorAll('.button_type_close');

        closeButtons.forEach((button) => {
            button.addEventListener('click', () => this.closePopup());
        });

        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._handleOverlayClose);
    }
}