const page = document.querySelector('.page');

const buttonOpenPopupEdit = page.querySelector('.button_type_open-edit');
const buttonOpenPopupAdd = page.querySelector('.button_type_open-add');
const buttonClosePopupEdit = page.querySelector('.button_type_close-edit');
const buttonClosePopupAdd = page.querySelector('.button_type_close-add');
const buttonSavePopupAdd = page.querySelector('.button_type_save-add');

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

const popupImage = page.querySelector('.popup__preview-photo');
const popupName = page.querySelector('.popup__preview-name');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  addEventListener('keydown', closeByEscape);
  popup.addEventListener('click', closeByOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeEventListener('keydown', closeByEscape);
  popup.removeEventListener('click', closeByOverlayClick);
}

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const closeByOverlayClick = (evt) => {
  if (evt.type === "click") {
    closePopup(evt.target);
  }
};

function handleProfileFormSubmit (event) {
  event.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupEdit);
}

const deleteCard = (event) => {
  event.target.closest('.cards__item').remove();
}

const likeCard = (event) => {
  event.target.classList.toggle('button_type_like-active');
}

function openCardPreview(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupName.textContent = name;
  openPopup(popupPreview);
}

function createCard(card) {
  const cardTemplate = document.querySelector('.cards-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__photo');
  const cardTitle = cardElement.querySelector('.cards__title');

  const buttonLikeCard = cardElement.querySelector('.button_type_like');
  const buttonDeleteCard = cardElement.querySelector('.button_type_delete');

  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;

  buttonDeleteCard.addEventListener('click', deleteCard);
  buttonLikeCard.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => openCardPreview(card.link, card.name));

  return cardElement;
}

function renderCardList() {
  const result = initialCards.map(item => {
    const initialCard = createCard(item);
    return initialCard;
  });
  cardsList.append(...result);
}

renderCardList();

page.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('button_type_close')) {
    closePopup(popupPreview);
  }
});

function handleAddCardFormSubmit(event) {
  disableButton(buttonSavePopupAdd, {});
  event.preventDefault();
  const newCard = createCard({name: cardInput.value, link: linkInput.value});
  cardsList.prepend(newCard);
  closePopup(popupAdd);
}

const clearInvalidFields = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__item'));
  inputList.forEach((input) => {
    input.parentNode.classList.remove('popup__form-item_invalid');
  });
}

buttonOpenPopupEdit.addEventListener('click', function (evt) {
  openPopup(popupEdit);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  clearInvalidFields(popupEdit);
});
buttonOpenPopupAdd.addEventListener('click', function (evt) {
  openPopup(popupAdd);
  formElementAdd.reset();
  clearInvalidFields(popupAdd);
});

buttonClosePopupEdit.addEventListener('click', () => closePopup(popupEdit));
buttonClosePopupAdd.addEventListener('click', () => closePopup(popupAdd));

formElementEdit.addEventListener('submit',  handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleAddCardFormSubmit);
