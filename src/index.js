import Card from '../scripts/Card.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import FormValidator from '../scripts/FormValidator.js';
import {
  card,
  buttonOpenPopupEdit,
  buttonOpenPopupAdd,
  popupTypeEdit,
  popupTypeAdd,
  nameInput,
  jobInput,
  name,
  job,
  cardsList,
  validationObj
} from '../utils/constants.js';
import './index.css';

const popupPreview = new PopupWithImage(".popup_preview");
popupPreview.setEventListeners();

const userInfo = new UserInfo({name: name, job: job});

function createCard(item) {
  const cardElement = new Card(item, ".cards-template", () => {
    popupPreview.openPopup(item);
  }).generate();
  return cardElement
}

const cardList  = new Section ({
  items: card,
  renderer: (item) => {
    const defaultCard = createCard(item)
    cardList.addItem(defaultCard)
  }
  }, '.cards__list')
cardList.renderItems()

function setUserInfo (item) {
  userInfo.setUserInfo(item)
}

const popupEdit = new PopupWithForm({popup: ".popup_edit", handleFormSubmit: setUserInfo})

popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
  popup: ".popup_add",
  handleFormSubmit: (item) => {
    const newCard = createCard(item)
    cardsList.prepend(newCard);
  }
});
popupAdd.setEventListeners();

const profileFormValidator = new FormValidator(validationObj, popupTypeEdit);
const cardFormValidator = new FormValidator(validationObj, popupTypeAdd);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

buttonOpenPopupEdit.addEventListener("click", () => {
  const item = userInfo.getUserInfo()
  nameInput.value = item.name;
  jobInput.value = item.job;
  popupEdit.openPopup();
  profileFormValidator.resetValidation();
});

buttonOpenPopupAdd.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  popupAdd.openPopup();
});