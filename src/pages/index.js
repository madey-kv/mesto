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

function handleFormEditSubmit({name, description}) {
  popupEdit.waitForLoading(true)
  api.editUserInfo({
    name: name,
    about: description
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
    handleDeleteClick: () => handleDeleteClick(card._cardId, card),
    handleLikeCard: () => handleLikeCard(card)
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

const popupConfirm = new PopupWithConfirmation('.popup_confirm')

function handleDeleteClick(cardId, card) {
  popupConfirm.openPopup(cardId);
  popupConfirm.setCallback(() => {
    api.deleteCard(cardId)
      .then((res) => {
        card.deleteCard(res)
        popupConfirm.closePopup()
      })
      .catch(error => console.log(error))
  })
}

function handleLikeCard (card) {
  if (card.isLiked()) {
    api.deleteLike(card.returnId())
      .then((res) => {
        card.dislike()
        card.setNumOfLikes(res.likes)
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    api.addLike(card.returnId())
      .then((res) => {
        card.like()
        card.setNumOfLikes(res.likes)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const popupAdd = new PopupWithForm('.popup_add', handleFormAddSubmit)

function handleFormAddSubmit({place, link}) {
  popupAdd.waitForLoading(true)
  api.addNewCard({
    name: place,
    link: link
  })
    .then(result => {
      cardsList.addItem(renderCard(result))
      popupAdd.closePopup()
    })
    .catch(error => console.log(error))
    .finally(() => popupAdd.waitForLoading(false, 'popupAdd'))
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

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupAvatar.setEventListeners();
popupConfirm.setEventListeners();
popupPreview.setEventListeners();

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

