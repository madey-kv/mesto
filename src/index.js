import {card, Card} from '../scripts/Card.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import {FormValidator, validationObj} from '../scripts/FormValidator.js'
import './index.css';

export {popupPreview}

const page = document.querySelector('.page');

const buttonOpenPopupEdit = page.querySelector('.button_type_open-edit');
const buttonOpenPopupAdd = page.querySelector('.button_type_open-add');

const popupTypeEdit = page.querySelector('.popup_edit');
const popupTypeAdd = page.querySelector('.popup_add');

const formElementEdit = page.querySelector('.popup__form_edit');

const nameInput = formElementEdit.querySelector('.popup__item_type_name');
const jobInput = formElementEdit.querySelector('.popup__item_type_job');

const name = '.profile__name';
const job = '.profile__description';

const title = page.querySelector('.profile__name');
const description =  page.querySelector('.profile__description');

const popupPreview = new PopupWithImage(".popup_preview");

const cardList = new Section(
    {
      items: card,
      renderer: (item) => {
        const cardElement = new Card(item, ".cards-template", () => {
          popupPreview.openPopup(item);
        }).generate();

        cardList.addItem(cardElement);
      },
    },
    '.cards__list'
);

cardList.renderItems();
popupPreview.setEventListeners();

const popupEdit = new PopupWithForm({
  popup: ".popup_edit",
  handleFormSubmit: (item) => {
    const userInfo = new UserInfo({name: name, job: job}).getUserInfo();
    userInfo.name = nameInput.value
    userInfo.job = jobInput.value

    title.textContent = userInfo.name;
    description.textContent = userInfo.job;
    popupEdit.closePopup();
  }
})
popupEdit.setEventListeners();


const popupAdd = new PopupWithForm({
  popup: ".popup_add",
  handleFormSubmit: (item) => {
    const cardElement = new Card(item, ".cards-template", () => {
      popupPreview.openPopup(item);
    }).generate();

    cardList.addItem(cardElement);
  },
});
popupAdd.setEventListeners();

buttonOpenPopupEdit.addEventListener("click", () => {
  const userInfo = new UserInfo({name: name, job: job}).getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  popupEdit.openPopup();
  profileFormValidator.resetValidation();
});

buttonOpenPopupAdd.addEventListener("click", () => {
  popupAdd.openPopup();
  cardFormValidator.resetValidation();
});

const profileFormValidator = new FormValidator(validationObj, popupTypeEdit);
const cardFormValidator = new FormValidator(validationObj, popupTypeAdd);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();