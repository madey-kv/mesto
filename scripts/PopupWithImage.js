import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
    }

    openPopup(item) {
        const popupImage = this._popup.querySelector(".popup__preview-photo");
        const popupTitle = this._popup.querySelector(".popup__preview-name");
        popupImage.src = item.link;
        popupImage.alt = item.name;
        popupTitle.textContent = item.name;

        super.openPopup();
    }

    setEventListeners() {
        super.setEventListeners();
    }
}