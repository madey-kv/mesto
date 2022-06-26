import Card from '../scripts/Card.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithConfirmation from '../scripts/PopupWithConfirmation.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import FormValidator from '../scripts/FormValidator.js';
import Api from '../scripts/Api.js';
import {
  buttonOpenPopupEdit,
  buttonOpenPopupAdd,
  buttonOpenPopupChange,
  popupTypeEdit,
  popupTypeAdd,
  popupTypeChange,
  nameInput,
  jobInput,
  name,
  job,
  avatar,
  cardsList,
  validationObj,
  photoInput,
  popupTypeConfirm
} from '../utils/constants.js';
import './index.css';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-44/',
  headers: {
    authorization: 'ec409761-8205-4578-aa63-a715bc164b2a',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
  .then((result) => {
    createUser(result);
  })
  .catch((error) => {
    console.log(error);
  });


const userInfo = new UserInfo({name: name, job: job, avatar: avatar});

const createUser = (user) => {
    userInfo.setUserInfo(user)
}

function waitForLoading(popup, isLoading) {
  const submitButton = document.querySelector(popup).querySelector('.button_type_save');

  if (isLoading) {
    submitButton.textContent = 'Загрузка…';
  }
  else {
    submitButton.textContent = 'Готово';
  }
}

const popupPreview = new PopupWithImage(".popup_preview");

popupPreview.setEventListeners();

const popupEdit = new PopupWithForm({
    popup: ".popup_edit",
    handleFormSubmit: (input) => {
        waitForLoading(".popup_edit", true);
        api.updateUserInfo({
            name: input['name'],
            about: input['description']
        })
            .then(data => {
                userInfo.setUserInfo(data);
                popupEdit.closePopup();
                waitForLoading(".popup_edit", false);
            });
    }
});

popupEdit.setEventListeners()

const popupAvatar = new PopupWithForm({
    popup: ".popup_change-avatar",
    handleFormSubmit: () => {
        waitForLoading(".popup_change-avatar", true);
        api.changeAvatar(photoInput.value)
            .then(data => {
                userInfo.setUserInfo(data.name, data.about, data.avatar);
                userInfo.setUserInfo(data);
                popupAvatar.closePopup();
                waitForLoading(".popup_change-avatar", false);
            });
    }
});

popupAvatar.setEventListeners()

const cardList = new Section({
    data: {},
    renderer: (item, userData) => {
      const card = renderCard(item, '.cards-template', userData);
      const cardElement = card.generate();
      cardList.addItem(cardElement);
    }
  }, '.cards__list'
);

const popupAdd = new PopupWithForm({
  popup: ".popup_add",
  handleFormSubmit: (input) => {
    waitForLoading(".popup_add", true);
    api.addNewCard({
      name: input['place'],
      link: input['link']
    })
      .then(data => {
        const card = renderCard(data, '.cards-template', userInfo.getUserInfo());
        const cardElement = card.generate();
        cardList.addItem(cardElement);
        waitForLoading(".popup_add", false);
        popupAdd.close();
      });
  }
});

popupAdd.setEventListeners()

const renderCard = function (data, cardSelector) {
  const card = new Card(
    data,
    cardSelector,
    {
      handleCardClick: (name, link) => {
        popupPreview.openPopup(name, link);
      },

      handleDeleteClick: (element, cardId) => {
        popupConfirm.openPopup({ element, cardId });
      }
    });
  return card;
};

const popupConfirm = new PopupWithConfirmation({
  popup: ".popup_confirm",
  handleFormSubmit: ( {element, cardId} ) => {
    waitForLoading(".popup_confirm", true);
    api.deleteCard(cardId)
      .then(() => {
        element.remove();
        waitForLoading(".popup_confirm", false);
        popupConfirm.closePopup();
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

popupConfirm.setEventListeners()

const promises = [api.getInitialCards(), api.getUserInfo()];

Promise.all(promises)
  .then(([card, user]) => {
    userInfo.setUserInfo(user._id, user.name, user.about, user.avatar);
    cardList.setRenderedItems(card);
    cardList.renderItems(user);
  })
  .catch((error) => {
    console.log(error);
  });

const profileFormValidator = new FormValidator(validationObj, popupTypeEdit);
const cardFormValidator = new FormValidator(validationObj, popupTypeAdd);
const changeFormValidator = new FormValidator(validationObj, popupTypeChange);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
changeFormValidator.enableValidation();

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

buttonOpenPopupChange.addEventListener("click", () => {
  changeFormValidator.resetValidation();
  popupAvatar.openPopup();
});

