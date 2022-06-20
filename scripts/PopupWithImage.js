import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupImage = this._popup.querySelector(".popup__preview-photo");
        this._popupTitle = this._popup.querySelector(".popup__preview-name");
    }

    openPopup(item) {
        this._popupImage.src = item.link;
        this._popupImage.alt = item.name;
        this._popupTitle.textContent = item.name;

        super.openPopup();
    }
}