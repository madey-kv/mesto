import {card, Card} from './Card.js'
import {FormValidator, validationObj} from './FormValidator.js'

export {openPopup, popupPreview}

const page = document.querySelector('.page');

const buttonOpenPopupEdit = page.querySelector('.button_type_open-edit');
const buttonOpenPopupAdd = page.querySelector('.button_type_open-add');

const popupEdit = page.querySelector('.popup_edit');
const popupAdd = page.querySelector('.popup_add');
const popupPreview = page.querySelector('.popup_preview');

const formElementEdit = page.querySelector('.popup__form_edit');
const formElementAdd = page.querySelector('.popup__form_add');

const nameInput = formElementEdit.querySelector('.popup__item_type_name');
const jobInput = formElementEdit.querySelector('.popup__item_type_job');
const cardInput = page.querySelector('.popup__item_type_card-name');
const linkInput = page.querySelector('.popup__item_type_card-link');

const name = page.querySelector('.profile__name');
const job = page.querySelector('.profile__description');

const cardsList = document.querySelector('.cards__list');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('click', closeByOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  popup.removeEventListener('click', closeByOverlayClick);
}

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const closeByOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

function handleProfileFormSubmit (event) {
  event.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupEdit);
}

function createCard (item) {
  const card = new Card(item, '.cards-template');
  const cardElement = card.generate();
  return cardElement
}

card.forEach((item ) => {
  const cardElement = createCard(item);
  cardsList.prepend(cardElement)
});

const closeButtons = document.querySelectorAll('.button_type_close');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function handleAddCardFormSubmit(event) {
  event.preventDefault();

  const item = [];
  item.name = cardInput.value;
  item.link = linkInput.value;

  const newCard = createCard(item);
  cardsList.prepend(newCard);
  closePopup(popupAdd);
}

const profileFormValidator = new FormValidator(validationObj, popupEdit);
const cardFormValidator = new FormValidator(validationObj, popupAdd);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

buttonOpenPopupEdit.addEventListener('click', function (evt) {
  openPopup(popupEdit);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  profileFormValidator.resetValidation();
});
buttonOpenPopupAdd.addEventListener('click', function (evt) {
  openPopup(popupAdd);
  formElementAdd.reset();
  cardFormValidator.resetValidation();
});

formElementEdit.addEventListener('submit',  handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleAddCardFormSubmit);