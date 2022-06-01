import {openPopup, popupPreview} from "./index.js";

export {card, Card}

const popupImage = document.querySelector('.popup__preview-photo');
const popupName = document.querySelector('.popup__preview-name');

const card = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

class Card {
    constructor(item, template) {
        this._name = item.name;
        this._link = item.link;
        this._template = template;
    }

    _getElement() {
        const cardElement = document.querySelector(this._template).content.cloneNode(true);
        this._element = cardElement;

        return cardElement;
    }

    _openCardPreview() {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupName.textContent = this._name;
        openPopup(popupPreview);
    }

    _deleteCard () {
        this._item.remove();
    }

    _likeCard () {
        this._like.classList.toggle('button_type_like-active')
    }

    _setEventListeners() {
        this._element.querySelector('.button_type_card-open').addEventListener('click', () => {
            this._openCardPreview();
        });

        this._element.querySelector('.button_type_delete').addEventListener('click', () => {
            this._deleteCard();
        });

        this._element.querySelector('.button_type_like').addEventListener('click', () => {
            this._likeCard();
        });
    }

    generate() {
        this._getElement();

        this._setEventListeners();

        const cardPhoto = this._element.querySelector('.cards__photo');
        cardPhoto.src = this._link;
        cardPhoto.alt = this._name;
        this._element.querySelector('.cards__title').textContent = this._name;

        this._item = this._element.querySelector('.cards__item')
        this._like = this._element.querySelector('.button_type_like')

        return this._element;
    }
}