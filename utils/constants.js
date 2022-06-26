const page = document.querySelector('.page');

export const buttonOpenPopupEdit = page.querySelector('.button_type_open-edit');
export const buttonOpenPopupAdd = page.querySelector('.button_type_open-add');
export const buttonOpenPopupChange = page.querySelector('.button_type_change-avatar');

export const popupTypeEdit = page.querySelector('.popup_edit');
export const popupTypeAdd = page.querySelector('.popup_add');
export const popupTypeChange = page.querySelector('.popup_change-avatar');
export const popupTypeConfirm = page.querySelector('.popup_confirm');


const formElementEdit = page.querySelector('.popup__form_edit');

export const nameInput = formElementEdit.querySelector('.popup__item_type_name');
export const jobInput = formElementEdit.querySelector('.popup__item_type_job');
export const photoInput = page.querySelector('.popup__item_type_avatar');

export const name = '.profile__name';
export const job = '.profile__description';
export const avatar = '.profile__photo';

export const cardsList = document.querySelector('.cards__list');

export const validationObj = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.button_type_save',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'popup__form-item_invalid'
});

