import {
  popupTypeEdit,
  popupTypeAdd,
  popupTypeChange,
  name,
  job,
  avatar,
  apiValues,
  cardList,
  buttonOpenPopupEdit,
  buttonOpenPopupAdd,
  buttonOpenPopupChange,
  nameInput,
  jobInput,
  validationObj,
  placeInput,
  titleInput
} from '../utils/constants.js'
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

import "./index.css"

const api = new Api(apiValues)

const defaultUserInfo = api.getUserInfo()

const userInfo = new UserInfo({name, job, avatar})

const popupPreview = new PopupWithImage('.popup_preview')

const popupEdit = new PopupWithForm('.popup_edit', handleFormEditSubmit)

function handleFormEditSubmit() {
  popupEdit.waitForLoading(true)
  api.editUserInfo({
    name: nameInput.value,
    about: jobInput.value
  })
    .then(result => {
      userInfo.setUserInfo(result)
      popupEdit.closePopup()
    })
    .catch(error => console.log(error))
    .finally(() => popupEdit.waitForLoading(false))
}

const popupAvatar = new PopupWithForm('.popup_change-avatar', handleFormAvatarSubmit)

function handleFormAvatarSubmit(data) {
  popupAvatar.waitForLoading(true)
  api.editUserAvatar(data)
    .then((result) => {
      userInfo.setAvatar(result)
      popupAvatar.closePopup()
    })
    .catch(error => console.log(error))
    .finally(() => popupAvatar.waitForLoading(false))
}

const cardsList = new Section(
  {
    renderer: renderCard
  },
  '.cards__list'
)

function renderCard(item) {
  const card = new Card(item, '.cards-template', defaultUserInfo, {
    handleCardClick,
    handleDeleteClick,
    handleLikeCard,
    handleDislikeCard
  })
  cardList.push({
    cardElement: card,
    cardId: item._id
  })
  return card.generate()
}

function handleCardClick(card) {
  popupPreview.openPopup(card)
}

function handleDeleteClick(cardId) {
  popupConfirm.openPopup(cardId)
}

function handleLikeCard(cardId) {
  return api.addLike(cardId)
}

function handleDislikeCard(cardId) {
  return api.deleteLike(cardId)
}

const popupAdd = new PopupWithForm('.popup_add', handleFormAddSubmit)

function handleFormAddSubmit() {
  popupAdd.waitForLoading(true)
  api.addNewCard({
    name: titleInput.value,
    link: placeInput.value
  })
    .then(result => {
      cardsList.addItem(renderCard(result))
      popupAdd.closePopup()
    })
    .catch(error => console.log(error))
    .finally(() => popupAdd.waitForLoading(false, 'popupAdd'))
}

const popupConfirm = new PopupWithConfirmation('.popup_confirm', handleFormConfirmSubmit)

function handleFormConfirmSubmit(cardId) {
  api.deleteCard(cardId)
    .then(() => {
      cardList.forEach(card => {
        if (card.cardId === cardId) {
          card.cardElement.deleteCard()
        }
      })
      popupConfirm.closePopup()
    })
    .catch(error => console.log(error))
}

const promises = [defaultUserInfo, api.getInitialCards()];

  Promise.all(promises)
    .then(([user, cards]) => {
      userInfo.setUserInfo(user);
      userInfo.setAvatar(user);
      cardsList.renderItems(cards);
    })
    .catch(error => console.log(error))

const profileFormValidator = new FormValidator(validationObj, popupTypeEdit);
const cardFormValidator = new FormValidator(validationObj, popupTypeAdd);
const changeFormValidator = new FormValidator(validationObj, popupTypeChange);

profileFormValidator.enableValidation()
cardFormValidator.enableValidation()
changeFormValidator.enableValidation()

function openPopup(form, popup) {
  form.resetValidation()
  popup.openPopup()
}

buttonOpenPopupEdit.addEventListener("click", () => {
  nameInput.value = userInfo._name.textContent;
  jobInput.value = userInfo._about.textContent;
  openPopup(profileFormValidator, popupEdit)
});

buttonOpenPopupAdd.addEventListener("click", () => {
  openPopup(cardFormValidator, popupAdd)
});

buttonOpenPopupChange.addEventListener("click", () => {
  openPopup(changeFormValidator, popupAvatar)
});

