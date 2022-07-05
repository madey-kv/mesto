const page = document.querySelector('.page');

export const buttonOpenPopupEdit = page.querySelector('.button_type_open-edit');
export const buttonOpenPopupAdd = page.querySelector('.button_type_open-add');
export const buttonOpenPopupChange = page.querySelector('.button_type_change-avatar');

export const name = '.profile__name';
export const job = '.profile__description';
export const avatar = '.profile__photo';

const formElementEdit = page.querySelector('.popup__form_edit');

export const popupTypeEdit = page.querySelector('.popup_edit');
export const popupTypeAdd = page.querySelector('.popup_add');
export const popupTypeChange = page.querySelector('.popup_change-avatar');
export const popupTypeConfirm = page.querySelector('.popup_confirm');

export const nameInput = page.querySelector('.popup__item_type_name');
export const jobInput = page.querySelector('.popup__item_type_job');
export const placeInput = page.querySelector('.popup__item_type_card-link');
export const titleInput = page.querySelector('.popup__item_type_card-name');



export const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__form-item_invalid'
}

export const apiValues = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44/',
  headers: {
    authorization: 'ec409761-8205-4578-aa63-a715bc164b2a',
    'Content-Type': 'application/json'
  }
}

export const cardList = [];

