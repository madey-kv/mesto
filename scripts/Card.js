export {card, Card}

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
    constructor(item, template, handleCardClick) {
        this._name = item.name;
        this._link = item.link;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }

    _getElement() {
        this._element = document
            .querySelector(this._template)
            .content.cloneNode(true);

        return this._element;
    }

    _deleteCard () {
       this._delete.parentNode.remove()
    }

    _likeCard () {
        this._like.classList.toggle('button_type_like-active')
    }

    _setEventListeners() {
        this._open.addEventListener('click', () => {
            this._handleCardClick();
        });

        this._delete.addEventListener('click', () => {
            this._deleteCard();
        });

        this._like.addEventListener('click', () => {
            this._likeCard();
        });
    }

    generate() {
        this._getElement();

        this._photo = this._element.querySelector('.cards__photo');
        this._photo.src = this._link;
        this._photo.alt = this._name;

        this._title = this._element.querySelector('.cards__title');
        this._title.textContent = this._name;

        this._like = this._element.querySelector('.button_type_like');
        this._delete = this._element.querySelector('.button_type_delete');
        this._open = this._element.querySelector('.button_type_card-open');
        this._setEventListeners();

        return this._element;
    }
}