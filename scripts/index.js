let page = document.querySelector('.page');

let openButtonEdit = document.getElementById('open-edit');
let openButtonAdd = document.getElementById('open-add');
let closeButtonEdit = document.getElementById('close-edit');
let closeButtonAdd = document.getElementById('close-add');

let popupEdit = page.querySelector('.popup_edit');
let popupAdd = page.querySelector('.popup_add');
let popupPreview = page.querySelector('.popup_card');

let formElementEdit = page.querySelector('.popup__form_edit');
let formElementAdd = page.querySelector('.popup__form_add');

let nameInput = formElementEdit.querySelector('.popup__item_type_name');
let jobInput = formElementEdit.querySelector('.popup__item_type_job');
let cardInput = page.querySelector('.popup__item_type_card-name');
let linkInput = page.querySelector('.popup__item_type_card-edit');

let name = page.querySelector('.profile__name');
let job = page.querySelector('.profile__description');

let cardsList = document.querySelector('.cards__list');

let cardPopup = document.querySelector('.popup_card');
let popupImage = document.getElementById('popup__card-photo');
let popupName = cardPopup.querySelector('.popup__card-name');
let closeButtonPreview = cardPopup.querySelector('.button_type_close');

const initialCards = [
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

function popupOpenedEdit () {
  popupEdit.classList.add('popup_opened');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function popupOpenedAdd () {
  popupAdd.classList.add('popup_opened');
  cardInput.value = '';
  linkInput.value = '';
}

function openPreview () {
  popupPreview.classList.add('popup_opened');
}

function popupClosedEdit () {
  popupEdit.classList.remove('popup_opened');
}

function popupClosedAdd () {
  popupAdd.classList.remove('popup_opened');
}

function popupClosedPreview () {
  popupPreview.classList.remove('popup_opened');
}

function formSubmitHandlerEdit (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupClosedEdit();
}

const deleteCard = (event) => {
  event.target.closest('.cards__item').remove();
}

const likeCard = (event) => {
  event.target.classList.toggle('button_type_like-active');
}

function addCard(card) {
  const cardTemplate = document.querySelector('.cards-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__photo');
  const cardTitle = cardElement.querySelector('.cards__title');
  const cardLike = cardElement.querySelector('.button_type_like');
  const cardDelete = cardElement.querySelector('.button_type_delete');

  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;

  cardDelete.addEventListener('click', deleteCard);
  cardLike.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => cardPreview(card.link, card.name));
  return cardElement;
}

function renderList() {
  const result = initialCards.map(item => {
    const newCard = addCard(item);
    return newCard;
  });
  cardsList.append(...result);
}

function addNewCard(event) {
  event.preventDefault();
  const element = addCard({name: cardInput.value, link: linkInput.value});
  cardsList.prepend(element);
  popupClosedAdd();
}

function cardPreview(link, alt) {
  popupImage.src = link;
  popupImage.alt = alt;
  popupName.textContent = alt;
  openPreview();
}

renderList();

openButtonEdit.addEventListener('click', popupOpenedEdit);
openButtonAdd.addEventListener('click', popupOpenedAdd);
closeButtonEdit.addEventListener('click', popupClosedEdit);
closeButtonAdd.addEventListener('click', popupClosedAdd);
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementAdd.addEventListener('submit', addNewCard);
closeButtonPreview.addEventListener('click', popupClosedPreview);
