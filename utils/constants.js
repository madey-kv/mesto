export const card = [
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

const page = document.querySelector('.page');

export const buttonOpenPopupEdit = page.querySelector('.button_type_open-edit');
export const buttonOpenPopupAdd = page.querySelector('.button_type_open-add');

export const popupTypeEdit = page.querySelector('.popup_edit');
export const popupTypeAdd = page.querySelector('.popup_add');

const formElementEdit = page.querySelector('.popup__form_edit');

export const nameInput = formElementEdit.querySelector('.popup__item_type_name');
export const jobInput = formElementEdit.querySelector('.popup__item_type_job');

export const name = '.profile__name';
export const job = '.profile__description';

export const cardsList = document.querySelector('.cards__list');

export const validationObj = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.button_type_save',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'popup__form-item_invalid'
});

